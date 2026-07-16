'use client';

import Script from 'next/script';

// Register the Stripe Buy Button web component for JSX/TypeScript.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'buy-button-id'?: string;
        'publishable-key'?: string;
      };
    }
  }
}

interface StripeBuyButtonProps {
  buyButtonId: string;
  publishableKey: string;
}

export default function StripeBuyButton({
  buyButtonId,
  publishableKey,
}: StripeBuyButtonProps) {
  return (
    <>
      <Script src='https://js.stripe.com/v3/buy-button.js' strategy='afterInteractive' />
      <stripe-buy-button
        buy-button-id={buyButtonId}
        publishable-key={publishableKey}
      />
    </>
  );
}
