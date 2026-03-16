import { NextRequest, NextResponse } from 'next/server';

import { fetchApi } from '@/lib/api-client';
import { isApiError } from '@/types/api';

interface ContactFormStepData {
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

  // reCAPTCHA (only for step 3)
  recaptcha_token?: string;
}

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

// Function to verify reCAPTCHA token
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY environment variable is not set');
    return false;
  }

  if (!token || token.trim() === '') {
    console.error('reCAPTCHA token is empty or null');
    return false;
  }

  try {
    // Use URLSearchParams for proper encoding
    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);
    
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();
    
    if (!data.success && data['error-codes']) {
      console.error('reCAPTCHA API Error Codes:', data['error-codes']);
    }
    
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: ContactFormStepData = await request.json();

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
      // Step 3: Session ID and reCAPTCHA validation
      if (!body.form_session_id) {
        return NextResponse.json(
          {
            errors: [{ message: 'form_session_id is required for step 3' }],
            status_code: 422,
          },
          { status: 422 }
        );
      }

      // Verify reCAPTCHA token
      if (!body.recaptcha_token) {
        return NextResponse.json(
          {
            errors: [{ message: 'Please complete the reCAPTCHA verification' }],
            status_code: 422,
          },
          { status: 422 }
        );
      }

      const isRecaptchaValid = await verifyRecaptcha(body.recaptcha_token);
      if (!isRecaptchaValid) {
        return NextResponse.json(
          {
            errors: [{ message: 'reCAPTCHA verification failed. Please try again.' }],
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

    // Remove recaptcha_token before forwarding to admin API
    const { recaptcha_token, ...bodyForApi } = body;

    try {
      // Forward the request to the admin API using the new endpoint
      const data = await fetchApi<StepSuccessResponse>('pages/contact-us/submit-step', {
        method: 'POST',
        body: bodyForApi,
      });

      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      // Handle API errors
      if (isApiError(error)) {
        return NextResponse.json(
          {
            errors: error.errors,
            status_code: error.statusCode,
          },
          { status: error.statusCode }
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
