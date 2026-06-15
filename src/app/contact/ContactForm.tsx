'use client';

import { useState, FormEvent } from 'react';

const ENQUIRY_TYPES = [
  { value: 'general', label: 'General enquiry' },
  { value: 'support', label: 'Seeking support' },
  { value: 'think-different', label: 'Think Different programme' },
  { value: 'listen-app', label: 'ListenApp' },
  { value: 'perpetrator', label: 'Perpetrator Programme' },
  { value: 'partnership', label: 'Partnership / Collaboration' },
  { value: 'media', label: 'Media & Press' },
  { value: 'donate', label: 'Donating / Fundraising' },
  { value: 'other', label: 'Other' },
];

type Status = 'idle' | 'submitting' | 'success' | 'error';

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [consentError, setConsentError] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    organisation: '',
    message: '',
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'consent' && checked) setConsentError(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!form.consent) {
      setConsentError(true);
      return;
    }

    setStatus('submitting');

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          'bot-field': honeypot,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          subject: form.subject,
          organisation: form.organisation,
          message: form.message,
          consent: form.consent ? 'yes' : '',
        }),
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      setStatus('success');
    } catch {
      setErrorMessage('Something went wrong. Please try again or email us directly.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className='bg-white rounded-2xl p-10 shadow-sm flex flex-col items-center text-center gap-4'>
        <div className='w-14 h-14 rounded-full bg-mf-green flex items-center justify-center'>
          <svg width='28' height='28' viewBox='0 0 28 28' fill='none' aria-hidden='true'>
            <path
              d='M6 14l6 6L22 8'
              stroke='#181634'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
        <h2 className='text-2xl font-bold text-mf-blue'>Message sent</h2>
        <p className='text-mf-blue/70'>
          Thank you for reaching out. We aim to respond within 2-3 working days.
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-2xl p-8 md:p-10 shadow-sm'>
      <h2 className='text-xl font-bold text-mf-blue mb-1'>Send us a message</h2>
      <p className='text-sm text-mf-blue/50 mb-6'>
        Fill in the form and a member of our team will be in touch.
      </p>

      <form
        name='contact'
        onSubmit={handleSubmit}
        noValidate
        className='space-y-5'
        data-netlify='true'
        netlify-honeypot='bot-field'
      >
        {/* Required hidden fields for Netlify */}
        <input type='hidden' name='form-name' value='contact' />

        {/* Honeypot — visually hidden, bots fill it in, Netlify discards those submissions */}
        <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden='true'>
          <label htmlFor='bot-field'>
            Leave this field empty
          </label>
          <input
            id='bot-field'
            name='bot-field'
            type='text'
            tabIndex={-1}
            autoComplete='off'
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Name row */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor='firstName' className='text-xs font-semibold text-mf-blue'>
              First name
            </label>
            <input
              id='firstName'
              name='firstName'
              type='text'
              required
              autoComplete='given-name'
              placeholder='Jane'
              value={form.firstName}
              onChange={handleChange}
              className='bg-chalk border border-mf-blue/15 rounded-xl px-4 py-2.5 text-sm text-mf-blue placeholder:text-mf-blue/30 focus:outline-none focus:ring-2 focus:ring-mf-green/40 focus:border-mf-green transition'
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <label htmlFor='lastName' className='text-xs font-semibold text-mf-blue'>
              Last name
            </label>
            <input
              id='lastName'
              name='lastName'
              type='text'
              required
              autoComplete='family-name'
              placeholder='Smith'
              value={form.lastName}
              onChange={handleChange}
              className='bg-chalk border border-mf-blue/15 rounded-xl px-4 py-2.5 text-sm text-mf-blue placeholder:text-mf-blue/30 focus:outline-none focus:ring-2 focus:ring-mf-green/40 focus:border-mf-green transition'
            />
          </div>
        </div>

        {/* Email */}
        <div className='flex flex-col gap-1.5'>
          <label htmlFor='email' className='text-xs font-semibold text-mf-blue'>
            Email address
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            placeholder='jane@example.com'
            value={form.email}
            onChange={handleChange}
            className='bg-chalk border border-mf-blue/15 rounded-xl px-4 py-2.5 text-sm text-mf-blue placeholder:text-mf-blue/30 focus:outline-none focus:ring-2 focus:ring-mf-green/40 focus:border-mf-green transition'
          />
        </div>

        {/* Enquiry type */}
        <div className='flex flex-col gap-1.5'>
          <label htmlFor='subject' className='text-xs font-semibold text-mf-blue'>
            What&apos;s your enquiry about?
          </label>
          <select
            id='subject'
            name='subject'
            required
            value={form.subject}
            onChange={handleChange}
            className='bg-chalk border border-mf-blue/15 rounded-xl px-4 py-2.5 text-sm text-mf-blue focus:outline-none focus:ring-2 focus:ring-mf-green/40 focus:border-mf-green transition appearance-none cursor-pointer'
          >
            <option value='' disabled>
              Please select...
            </option>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Organisation */}
        <div className='flex flex-col gap-1.5'>
          <label htmlFor='organisation' className='text-xs font-semibold text-mf-blue'>
            Organisation{' '}
            <span className='font-normal text-mf-blue/40'>(optional)</span>
          </label>
          <input
            id='organisation'
            name='organisation'
            type='text'
            autoComplete='organization'
            placeholder='Where do you work?'
            value={form.organisation}
            onChange={handleChange}
            className='bg-chalk border border-mf-blue/15 rounded-xl px-4 py-2.5 text-sm text-mf-blue placeholder:text-mf-blue/30 focus:outline-none focus:ring-2 focus:ring-mf-green/40 focus:border-mf-green transition'
          />
        </div>

        {/* Message */}
        <div className='flex flex-col gap-1.5'>
          <label htmlFor='message' className='text-xs font-semibold text-mf-blue'>
            Your message
          </label>
          <textarea
            id='message'
            name='message'
            required
            rows={5}
            placeholder='Tell us a bit about your enquiry...'
            value={form.message}
            onChange={handleChange}
            className='bg-chalk border border-mf-blue/15 rounded-xl px-4 py-2.5 text-sm text-mf-blue placeholder:text-mf-blue/30 focus:outline-none focus:ring-2 focus:ring-mf-green/40 focus:border-mf-green transition resize-y'
          />
        </div>

        {/* Consent */}
        <div className={`flex items-start gap-3 rounded-lg transition-colors ${consentError ? 'bg-mf-coral/10 border border-mf-coral/40 p-3 -mx-3' : ''}`}>
          <input
            id='consent'
            name='consent'
            type='checkbox'
            required
            checked={form.consent}
            onChange={handleChange}
            className='mt-0.5 w-4 h-4 accent-mf-green cursor-pointer flex-shrink-0'
          />
          <div>
            <label
              htmlFor='consent'
              className={`text-xs leading-relaxed cursor-pointer transition-colors ${consentError ? 'text-mf-coral font-medium' : 'text-mf-blue/60'}`}
            >
              I agree to The Mindful Foundation storing my data to respond to this
              enquiry, in accordance with the{' '}
              <a
                href='/privacy'
                className={`underline underline-offset-2 font-semibold ${consentError ? 'text-mf-coral' : 'text-mf-blue'}`}
              >
                Privacy Policy
              </a>
              .
            </label>
            {consentError && (
              <p className='text-xs text-mf-coral mt-1 font-medium'>
                Please tick this box to continue.
              </p>
            )}
          </div>
        </div>

        {/* Error message */}
        {status === 'error' && (
          <p role='alert' className='text-sm text-mf-coral'>
            {errorMessage}
          </p>
        )}

        {/* Submit */}
        <button
          type='submit'
          disabled={status === 'submitting'}
          className='w-full bg-mf-green text-ash font-bold text-sm rounded-full py-3 px-6 transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed'
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
