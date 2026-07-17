import { revalidateTag } from 'next/cache';
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

    // Document type from the Sanity webhook payload
    let documentType: string | undefined;
    try {
      const body = await request.json();
      documentType = body?._type;
    } catch {
      // No body is fine — the global tag below still refreshes all content.
    }

    // `expire: 0` expires immediately rather than serving stale-while-revalidate,
    // so an editor publishing in Sanity sees the change on the next request.
    const profile = { expire: 0 };

    // Every Sanity fetch carries the 'sanity' tag, so this refreshes everything.
    const revalidated = ['sanity'];
    revalidateTag('sanity', profile);

    // Also purge the specific document type, for targeted invalidation.
    if (documentType) {
      revalidateTag(documentType, profile);
      revalidated.push(documentType);
    }

    console.log('Revalidated tags:', revalidated.join(', '));

    return NextResponse.json({
      revalidated: true,
      tags: revalidated,
      documentType: documentType || 'unknown',
      timestamp: new Date().toISOString(),
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
