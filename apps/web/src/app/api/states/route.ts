import { NextRequest, NextResponse } from 'next/server';

import { fetchApi } from '@/lib/api-client';
import { isApiError } from '@/types/api';

interface Timezone {
  timezone_id: number;
  timezone: {
    timezone: string;
  };
}

interface State {
  id: number;
  name: string;
  code: string;
  timezones: Timezone[];
}

interface StatesResponse {
  count: number;
  rows: State[];
}

export async function GET(request: NextRequest) {
  try {
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
      // Forward the optional country filter through; the API defaults to US states
      const countryId = request.nextUrl.searchParams.get('country_id');
      const endpoint = countryId
        ? `states?country_id=${encodeURIComponent(countryId)}`
        : 'states';

      // Forward the request to the admin API using centralized API client
      const data = await fetchApi<StatesResponse>(endpoint, {
        method: 'GET',
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
          errors: [{ message: 'An unexpected error occurred while fetching states' }],
          status_code: 500,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('States API error:', error);
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
