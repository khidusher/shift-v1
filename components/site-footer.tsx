import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-note">
          <p>
            Let’s mentor, encourage, and build a generation that leads with
            purpose and excellence in Christ.
          </p>
          <p className="footer-signoff">
            Justice Kelvin Larnyoh · General Secretary, Worldwide Evangelism
            Service
          </p>
        </div>
        <nav aria-label="Footer navigation" className="footer-nav">
          <Link href="/">Home</Link>
          <Link href="/register">Register</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <p className="copyright">
          © 2026 Worldwide Evangelism Service (WES) × UENR SCC
        </p>
      </div>
    </footer>
  );
}
