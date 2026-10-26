import crypto from 'crypto';

import { NextRequest, NextResponse } from 'next/server';
import mailchimp from '@mailchimp/mailchimp_marketing';

import { RECAPTCHA_ACTIONS } from '@/constants/recaptcha';
import { requireRecaptchaV3 } from '@/lib/recaptcha';

interface NewsletterFormData {
  email: string;
  recaptcha_token?: string;
}

interface ApiError {
  field: string;
  message: string;
}

interface ApiErrorResponse {
  errors: ApiError[];
  status_code: number;
}

interface ApiSuccessResponse {
  success: boolean;
  message: string;
}

function initializeMailchimp() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!apiKey || !serverPrefix) {
    throw new Error('Mailchimp configuration is missing');
  }

  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  return mailchimp;
}

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterFormData = await request.json();

    if (!body.email) {
      return NextResponse.json<ApiErrorResponse>(
        {
          errors: [{ field: 'email', message: 'Email is required' }],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json<ApiErrorResponse>(
        {
          errors: [{ field: 'email', message: 'Please enter a valid email address' }],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    const recaptchaError = await requireRecaptchaV3(
      body.recaptcha_token,
      RECAPTCHA_ACTIONS.NEWSLETTER,
    );
    if (recaptchaError) return recaptchaError;

    const listId = process.env.MAILCHIMP_LIST_ID;
    
    if (!listId) {
      console.error('MAILCHIMP_LIST_ID environment variable is not set');
      return NextResponse.json<ApiErrorResponse>(
        {
          errors: [{ field: 'general', message: 'Newsletter service is not configured' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }

    try {
      const mc = initializeMailchimp();
      
      const subscriberHash = crypto
        .createHash('md5')
        .update(body.email.toLowerCase())
        .digest('hex');

      try {
        const existingMember = await mc.lists.getListMember(listId, subscriberHash);
        
        if (existingMember.status === 'subscribed') {
          return NextResponse.json<ApiSuccessResponse>(
            {
              success: true,
              message: "You're already subscribed to our newsletter!",
            },
            { status: 200 }
          );
        } else {
          await mc.lists.updateListMember(listId, subscriberHash, {
            status: 'subscribed',
          });

          return NextResponse.json<ApiSuccessResponse>(
            {
              success: true,
              message: 'Welcome back! You have been re-subscribed to our newsletter.',
            },
            { status: 200 }
          );
        }
      } catch (error: any) {
        if (error.status === 404) {
          const response = await mc.lists.addListMember(listId, {
            email_address: body.email,
            status: 'subscribed',
            merge_fields: {
              SOURCE: 'Website Footer',
            },
            tags: ['Website Signup'],
          });

          return NextResponse.json<ApiSuccessResponse>(
            {
              success: true,
              message: 'Thank you for subscribing to our newsletter!',
            },
            { status: 200 }
          );
        } else {
          throw error;
        }
      }
    } catch (mailchimpError: any) {
      console.error('Mailchimp API error:', mailchimpError);
      
      if (mailchimpError.response?.body?.title === 'Member Exists') {
        return NextResponse.json<ApiSuccessResponse>(
          {
            success: true,
            message: "You're already on our list!",
          },
          { status: 200 }
        );
      }

      if (mailchimpError.response?.body?.detail) {
        return NextResponse.json<ApiErrorResponse>(
          {
            errors: [{ field: 'email', message: mailchimpError.response.body.detail }],
            status_code: 400,
          },
          { status: 400 }
        );
      }

      return NextResponse.json<ApiErrorResponse>(
        {
          errors: [{ field: 'general', message: 'Failed to subscribe. Please try again later.' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json<ApiErrorResponse>(
      {
        errors: [{ field: 'general', message: 'An unexpected error occurred. Please try again later.' }],
        status_code: 500,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}