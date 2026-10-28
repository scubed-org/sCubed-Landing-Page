import { NextRequest, NextResponse } from 'next/server';

import { fetchApi } from '@/lib/api-client';
import {
  blockedContentResponse,
  invalidBodyResponse,
  isFirewallBlock,
  readJsonBody,
} from '@/lib/route-errors';
import { isApiError } from '@/types/api';

type ContactFormStepData = {
  step: 1 | 2 | 3;
  form_session_id?: string;

  // Step 1 fields
  email_id?: string;

  // Step 2 fields
  first_name?: string;
  last_name?: string;
  phone_number?: string;

  // Step 3 fields
  company_name?: string;
  state?: string;
  state_code?: string;
  comments?: string;
  specialities?: string;
  staff?: number;
  other_software_experience?: boolean;
  software_name?: string;

  // reCAPTCHA: v3 on step 1, v2 checkbox on step 3; verified by the admin API
  recaptcha_token?: string;
};

interface ApiError {
  field?: string;
  message: string;
}

interface ApiErrorResponse {
  errors: ApiError[];
  status_code: number;
}

interface StepSuccessResponse {
  success: boolean;
  message: string;
  data: {
    form_session_id: string;
    current_step: number;
    next_step: number | null;
    completion_status: 'incomplete' | 'completed';
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await readJsonBody<ContactFormStepData>(request);
    if (!body) return invalidBodyResponse();

    // Validate step parameter
    if (!body.step || ![1, 2, 3].includes(body.step)) {
      return NextResponse.json(
        {
          errors: [{ message: 'Invalid step parameter' }],
          status_code: 400,
        },
        { status: 400 }
      );
    }

    // Step-specific validation
    if (body.step === 1) {
      // Step 1: Email validation
      if (!body.email_id) {
        return NextResponse.json(
          {
            errors: [{ message: 'Email is required for step 1' }],
            status_code: 422,
          },
          { status: 422 }
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email_id)) {
        return NextResponse.json(
          {
            errors: [{ message: 'Please enter a valid email address' }],
            status_code: 422,
          },
          { status: 422 }
        );
      }
    } else if (body.step === 2) {
      // Step 2: Name validation
      if (!body.form_session_id) {
        return NextResponse.json(
          {
            errors: [{ message: 'form_session_id is required for step 2' }],
            status_code: 422,
          },
          { status: 422 }
        );
      }

      if (!body.first_name) {
        return NextResponse.json(
          {
            errors: [{ message: 'First name is required for step 2' }],
            status_code: 422,
          },
          { status: 422 }
        );
      }
    } else if (body.step === 3) {
      // Step 3: Session ID validation
      if (!body.form_session_id) {
        return NextResponse.json(
          {
            errors: [{ message: 'form_session_id is required for step 3' }],
            status_code: 422,
          },
          { status: 422 }
        );
      }

    }

    // Get the admin API URL from environment variables
    const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_APP_API_URL;

    if (!adminApiUrl) {
      console.error('NEXT_PUBLIC_ADMIN_APP_API_URL environment variable is not set');
      return NextResponse.json(
        {
          errors: [{ message: 'Service configuration error' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }


    try {
      // Forward the request to the admin API using the new endpoint
      const data = await fetchApi<StepSuccessResponse>(
        'pages/contact-us/submit-step',
        {
          method: 'POST',
          body,
        },
      );

      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      // Handle API errors
      if (isApiError(error)) {
        if (
          isFirewallBlock(
            error.statusCode,
            error.response?.headers.get('content-type'),
          )
        ) {
          return blockedContentResponse();
        }

        // A network failure has no status of its own
        const status = error.statusCode || 502;
        return NextResponse.json(
          {
            errors: error.errors,
            status_code: status,
          },
          { status }
        );
      }

      // Handle unexpected errors
      return NextResponse.json(
        {
          errors: [{ message: 'An unexpected error occurred' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      {
        errors: [{ message: 'An unexpected error occurred. Please try again later.' }],
        status_code: 500,
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
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
