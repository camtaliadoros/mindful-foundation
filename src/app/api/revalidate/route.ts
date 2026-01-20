import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token for security
    const secret = request.nextUrl.searchParams.get('secret');
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (!expectedSecret) {
      return NextResponse.json(
        { message: 'Revalidation secret not configured' },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { message: 'Invalid secret token' },
        { status: 401 }
      );
    }

    // Get the document type from the request body (if provided)
    // Sanity webhooks send the document data in the body
    let documentType: string | undefined;
    try {
      const body = await request.json();
      documentType = body._type;
    } catch {
      // If no body or invalid JSON, continue with full revalidation
    }

    // Revalidate all pages that might be affected
    // This ensures all content updates are reflected immediately
    revalidatePath('/', 'layout');
    revalidatePath('/about');
    revalidatePath('/think-different');
    revalidatePath('/listen-app');
    revalidatePath('/perpetrator-programme');
    revalidatePath('/news');
    revalidatePath('/news/[slug]', 'page');

    // If a specific document type is provided, we can be more selective
    if (documentType) {
      switch (documentType) {
        case 'homepage':
          revalidatePath('/');
          break;
        case 'aboutPage':
          revalidatePath('/about');
          break;
        case 'thinkDifferentPage':
          revalidatePath('/think-different');
          break;
        case 'listenAppPage':
          revalidatePath('/listen-app');
          break;
        case 'perpetratorProgrammePage':
          revalidatePath('/perpetrator-programme');
          break;
        case 'article':
          revalidatePath('/news');
          revalidatePath('/news/[slug]', 'page');
          break;
        case 'ctaBlock':
        case 'siteSettings':
        case 'logoSection':
          // These affect multiple pages, so revalidate all
          revalidatePath('/', 'layout');
          revalidatePath('/about');
          revalidatePath('/think-different');
          revalidatePath('/listen-app');
          revalidatePath('/perpetrator-programme');
          break;
      }
    }

    return NextResponse.json({
      revalidated: true,
      message: 'Revalidation successful',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    );
  }
}
