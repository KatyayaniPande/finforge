import { NextResponse } from 'next/server';

const ANALYSIS_SERVICE_URL = 'http://127.0.0.1:8000/analyze';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Verify it's a PDF
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Create new FormData for the analysis service
    const analysisFormData = new FormData();
    analysisFormData.append('file', file);

    try {
      // Forward to the analysis endpoint
      const response = await fetch(ANALYSIS_SERVICE_URL, {
        method: 'POST',
        body: analysisFormData,
      });

      if (!response.ok) {
        throw new Error(`Analysis service error: ${response.status}`);
      }

      const result = await response.json();

      // Return the analysis results
      return NextResponse.json({
        success: true,
        data: result
      });

    } catch (fetchError) {
      console.error('Error connecting to analysis service:', fetchError);
      return NextResponse.json(
        {
          success: false,
          error: 'Could not connect to analysis service. Make sure it is running at http://127.0.0.1:8000'
        },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('Error in analyze API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during analysis'
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}; 