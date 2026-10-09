import type { Metadata } from 'next';
import { RegistrationForm } from '@/components/registration-form';

export const metadata: Metadata = {
  title: 'Register',
};

export default function RegisterPage() {
  return (
    <main className="page-wrap">
      <div className="page-heading">
        <p className="eyebrow">November 28, 2026 · UENR Campus</p>
        <h1>
          Secure your seat for <span className="gradient-text">SHIFT 1.0</span>
        </h1>
        <p>
          Join students, mentors, and kingdom professionals for a day of
          conversation about faith, career, and purposeful leadership.
        </p>
      </div>
      <div className="form-layout">
        <aside className="panel">
          <h2>Event details</h2>
          <p className="panel-copy">
            Hosted by Worldwide Evangelism Service and the UENR Student
            Christian Council.
          </p>
          <div className="event-facts">
            <div>
              <span className="fact-label">Date</span>
              <span className="fact-value">Saturday, November 28, 2026</span>
            </div>
            <div>
              <span className="fact-label">Time</span>
              <span className="fact-value">9:00 AM–2:00 PM</span>
            </div>
            <div>
              <span className="fact-label">Venue</span>
              <span className="fact-value">
                University of Energy and Natural Resources (UENR)
              </span>
            </div>
          </div>
          <p className="panel-copy">
            Theme: <strong>Beyond the Degree: Building Your Career, Purpose
            &amp; Legacy</strong>
          </p>
        </aside>
        <section aria-labelledby="registration-title" className="panel">
          <h2 id="registration-title">Attendee registration</h2>
          <p className="panel-copy">
            Share your details to prepare your registration.
          </p>
          <RegistrationForm />
        </section>
      </div>
    </main>
  );
}
