'use client';

import { useState } from 'react';

type SubmissionStatus = {
  message: string;
  tone: 'error' | 'success';
} | null;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>(null);

  return (
    <form
      className="contact-form"
      onSubmit={async (event) => {
        event.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setStatus(null);

        const form = event.currentTarget;
        const payload = Object.fromEntries(new FormData(form).entries());

        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const result: { error?: string; message?: string } =
            await response.json();

          if (!response.ok) {
            setStatus({
              message: result.error ?? 'Your message could not be sent.',
              tone: 'error',
            });
            return;
          }

          form.reset();
          setStatus({
            message: result.message ?? 'Your message was received.',
            tone: 'success',
          });
        } catch {
          setStatus({
            message: 'Could not reach the message service. Please try again.',
            tone: 'error',
          });
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div aria-hidden="true" className="form-honeypot">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          autoComplete="off"
          id="contact-website"
          name="website"
          tabIndex={-1}
        />
      </div>
      <div className="field">
        <label htmlFor="contact-name">Full name *</label>
        <input
          autoComplete="name"
          id="contact-name"
          name="name"
          placeholder="Your name"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="contact-email">Email address *</label>
        <input
          autoComplete="email"
          id="contact-email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
      </div>
      <div className="field">
        <label htmlFor="topic">Inquiry topic *</label>
        <select defaultValue="attendee" id="topic" name="topic">
          <option value="attendee">Attendee support</option>
          <option value="partnership">Partnership and sponsors</option>
          <option value="speaker">Speaker inquiry</option>
          <option value="general">General question</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          placeholder="How can the SHIFT team help?"
          required
          rows={5}
        />
      </div>
      {status && (
        <p
          className={`form-status form-status-${status.tone}`}
          role={status.tone === 'error' ? 'alert' : 'status'}
        >
          {status.message}
        </p>
      )}
      <button className="button-primary" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
