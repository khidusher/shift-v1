'use client';

import { useState } from 'react';

type SubmissionStatus = {
  message: string;
  tone: 'error' | 'success';
} | null;

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>(null);

  return (
    <form
      className="registration-form"
      onSubmit={async (event) => {
        event.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setStatus(null);

        const form = event.currentTarget;
        const formData = new FormData(form);
        const payload = Object.fromEntries(formData.entries());

        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          const result: { error?: string; message?: string } =
            await response.json();

          if (!response.ok) {
            setStatus({
              message: result.error ?? 'Registration could not be completed.',
              tone: 'error',
            });
            return;
          }

          form.reset();
          setStatus({
            message: result.message ?? 'Your registration was received.',
            tone: 'success',
          });
        } catch {
          setStatus({
            message:
              'Could not reach the registration service. Please try again.',
            tone: 'error',
          });
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div className="field">
        <label htmlFor="full-name">Full name *</label>
        <input
          autoComplete="name"
          id="full-name"
          name="full_name"
          placeholder="e.g. Samuel Kwadwo Mensah"
          required
        />
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="phone">WhatsApp / phone number *</label>
          <input
            autoComplete="tel"
            id="phone"
            name="phone"
            placeholder="+233 24 123 4567"
            required
            type="tel"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            autoComplete="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label htmlFor="academic-level">Current level *</label>
          <select defaultValue="" id="academic-level" name="academic_level" required>
            <option disabled value="">
              Choose your level
            </option>
            <option value="100">Level 100</option>
            <option value="200">Level 200</option>
            <option value="300">Level 300</option>
            <option value="400">Level 400</option>
            <option value="postgrad">Postgraduate / Alumni / Professional</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="department">Department / field of study</label>
          <input
            id="department"
            name="department"
            placeholder="e.g. Computer Science"
          />
        </div>
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
        {isSubmitting ? 'Submitting…' : 'Register for SHIFT'}
      </button>
    </form>
  );
}
