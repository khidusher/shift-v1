import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/register', label: 'Register' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link aria-label="SHIFT home" className="brand" href="/">
          <span aria-hidden="true" className="brand-orb" />
          <span>SHIFT</span>
          <span className="brand-edition">1.0</span>
        </Link>
        <nav aria-label="Main navigation" className="main-nav">
          {links.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/register">
          Register <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </header>
  );
}
