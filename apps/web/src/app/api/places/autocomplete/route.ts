import { NextRequest, NextResponse } from 'next/server';

import {
  ADDRESS_PLACE_TYPES,
  SUPPORTED_ADDRESS_REGION_CODES,
} from '@/constants/places';

const PLACES_AUTOCOMPLETE_URL = 'https://places.googleapis.com/v1/places:autocomplete';

interface AutocompleteRequest {
  input: string;
  types?: string[];
}

interface AutocompleteV1Response {
  suggestions?: Array<{
    placePrediction: {
      placeId: string;
      text: {
        text: string;
      };
      structuredFormat: {
        mainText: {
          text: string;
        };
        secondaryText: {
          text: string;
        };
      };
    };
  }>;
  error?: {
    message: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (!apiKey) {
      console.error('GOOGLE_PLACES_API_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      );
    }

    const body: AutocompleteRequest = await request.json();

    if (!body.input || body.input.length < 3) {
      return NextResponse.json({ suggestions: [] }, { status: 200 });
    }

    const response = await fetch(PLACES_AUTOCOMPLETE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: JSON.stringify({
        input: body.input,
        includedRegionCodes: [...SUPPORTED_ADDRESS_REGION_CODES],
        includedPrimaryTypes: body.types || [...ADDRESS_PLACE_TYPES],
        languageCode: 'en',
      }),
    });

    if (!response.ok) {
      console.error('Google Places API error:', response.status, response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch suggestions' },
        { status: response.status }
      );
    }

    const data: AutocompleteV1Response = await response.json();

    if (data.error) {
      console.error('Places API error:', data.error.message);
      return NextResponse.json(
        { error: data.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Places autocomplete API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
