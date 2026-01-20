import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Force this route to be dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Verify the secret token for security
    const secret = request.nextUrl.searchParams.get('secret');
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (!expectedSecret) {
      console.error('SANITY_REVALIDATE_SECRET not configured');
      return NextResponse.json(
        { message: 'Revalidation secret not configured' },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      console.error('Invalid secret token provided');
      return NextResponse.json(
        { message: 'Invalid secret token' },
        { status: 401 }
      );
    }

    // Get the document type from the request body
    let documentType: string | undefined;
    try {
      const body = await request.json();
      documentType = body._type;
      console.log('Revalidating for document type:', documentType);
    } catch (error) {
      console.log('No body provided, performing full revalidation');
    }

    // Always revalidate all pages to ensure consistency
    const pathsToRevalidate = [
      '/',
      '/about',
      '/think-different',
      '/listen-app',
      '/perpetrator-programme',
      '/news',
    ];

    pathsToRevalidate.forEach((path) => {
      revalidatePath(path, 'page');
    });

    // Also revalidate layout for global components
    revalidatePath('/', 'layout');

    // Revalidate dynamic routes
    revalidatePath('/news/[slug]', 'page');

    console.log('Revalidation completed successfully');

    return NextResponse.json({
      revalidated: true,
      message: 'Revalidation successful',
      timestamp: new Date().toISOString(),
      documentType: documentType || 'all',
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
