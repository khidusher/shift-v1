import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact-form';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <main className="page-wrap">
      <div className="page-heading">
        <p className="eyebrow">SHIFT 1.0 · WES × UENR SCC</p>
        <h1>
          Get in touch with the <span className="gradient-text">team</span>
        </h1>
        <p>
          Have a question about attending, serving, or supporting SHIFT 1.0?
          Send a message to the organizing team.
        </p>
      </div>
      <div className="contact-grid">
        <section aria-labelledby="contact-details-title" className="panel contact-card">
          <p className="eyebrow">The organizers</p>
          <h2 id="contact-details-title">Let’s build this together.</h2>
          <p className="panel-copy">
            SHIFT 1.0 is hosted by Worldwide Evangelism Service (WES), in
            partnership with the UENR Student Christian Council (SCC).
          </p>
          <div className="event-facts">
            <div>
              <span className="fact-label">Event</span>
              <span className="fact-value">
                Beyond the Degree: Building Your Career, Purpose &amp; Legacy
              </span>
            </div>
            <div>
              <span className="fact-label">Date &amp; time</span>
              <span className="fact-value">
                Saturday, November 28, 2026 · 9:00 AM–2:00 PM
              </span>
            </div>
            <div>
              <span className="fact-label">Venue</span>
              <span className="fact-value">
                University of Energy and Natural Resources (UENR)
              </span>
            </div>
          </div>
          <p className="panel-copy">
            General Secretary: <strong>Justice Kelvin Larnyoh</strong>
          </p>
        </section>
        <section aria-labelledby="message-title" className="panel contact-card">
          <h2 id="message-title">Send a message</h2>
          <p className="panel-copy">
            For attendee support, partnership questions, or general inquiries.
          </p>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
