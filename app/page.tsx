import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  UserRound,
} from 'lucide-react';

const focusAreas = [
  {
    number: '01',
    title: 'Faith',
    copy: 'Grow spiritually and carry the values of Christ into every sphere of life.',
  },
  {
    number: '02',
    title: 'Career',
    copy: 'Build practical confidence and prepare to thrive in your chosen profession.',
  },
  {
    number: '03',
    title: 'Purpose',
    copy: 'Connect your gifts and ambitions to a life of meaningful, lasting impact.',
  },
];

const speakerPlaceholders = ['01', '02', '03', '04', '05'];

export default function HomePage() {
  return (
    <main className="page-wrap">
      <section aria-labelledby="home-title" className="hero">
        <div aria-hidden="true" className="hero-visual">
          <Image
            alt=""
            className="hero-backdrop"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 1180px"
            src="/images/shift-event.jpg"
          />
        </div>
        <div className="hero-content">
          <p className="eyebrow">WES × UENR Student Christian Council</p>
          <h1 id="home-title">
            SHIFT <span>1.0</span>
          </h1>
          <p className="theme-title">
            Beyond the Degree: Building Your Career, Purpose &amp; Legacy
          </p>
          <p className="hero-copy">
            A gathering for students and young adults to connect faith with
            career growth, personal purpose, and long-term impact. Let’s build
            a generation that leads with both purpose and excellence in Christ.
          </p>
          <div className="event-meta">
            <span className="meta-chip">
              <CalendarDays aria-hidden="true" className="inline-icon" size={15} />
              Saturday, November 28, 2026 · 9:00 AM–2:00 PM
            </span>
            <span className="meta-chip">
              <MapPin aria-hidden="true" className="inline-icon" size={15} />
              University of Energy and Natural Resources
            </span>
          </div>
          <div className="hero-actions">
            <Link className="button-primary" href="/register">
              Register for SHIFT <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link className="button-secondary" href="/contact">
              Contact the team
            </Link>
          </div>
        </div>
        <aside aria-label="Event message" className="hero-aside">
          <span aria-hidden="true" className="hero-aside-mark">
            S.
          </span>
          <h2>More than a degree.</h2>
          <p>
            Come ready to connect, grow, and take your next step with purpose.
          </p>
          <div aria-label="SHIFT community leaders" className="partner-row">
            <div className="partner-avatars">
              <Image
                alt="WES community leader"
                className="partner-avatar"
                height={44}
                sizes="44px"
                src="/images/community-leader.jpg"
                width={44}
              />
              <Image
                alt="UENR student leader"
                className="partner-avatar"
                height={44}
                sizes="44px"
                src="/images/student-leader.jpg"
                width={44}
              />
              <Image
                alt="Campus leader"
                className="partner-avatar"
                height={44}
                sizes="44px"
                src="/images/campus-leader.jpg"
                width={44}
              />
            </div>
            <span>Community partners</span>
          </div>
        </aside>
      </section>

      <section aria-labelledby="why-title" className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Faith in every sphere</p>
            <h2 id="why-title">Why SHIFT?</h2>
          </div>
          <p>Spiritual depth. Professional growth. Lasting impact.</p>
        </div>
        <div className="value-grid">
          {focusAreas.map((area) => (
            <article className="value-card" key={area.number}>
              <span className="value-index">{area.number} / SHIFT</span>
              <h3>{area.title}</h3>
              <p>{area.copy}</p>
            </article>
          ))}
        </div>
        <div className="callout">
          <p>
            Your prayers, service, support, and presence all help make this
            vision a reality. Join us in encouraging young people to thrive.
          </p>
          <Link className="button-secondary" href="/contact">
            Get involved <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section aria-labelledby="speakers-title" className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Keynote mentors &amp; leaders</p>
            <h2 id="speakers-title">Featured lineup</h2>
          </div>
          <p>Speaker announcements coming soon.</p>
        </div>
        <div className="speaker-grid">
          {speakerPlaceholders.map((number) => (
            <article className="speaker-card" key={number}>
              <div className="speaker-photo-placeholder">
                <UserRound size={42} strokeWidth={1.2} />
                <span>Photo coming soon</span>
              </div>
              <div className="speaker-card-copy">
                <span className="speaker-label">SPEAKER {number}</span>
                <div className="speaker-card-title">
                  <h3>To be announced</h3>
                  <ArrowUpRight aria-hidden="true" size={17} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
