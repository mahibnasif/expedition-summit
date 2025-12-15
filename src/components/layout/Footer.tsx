import { Link } from 'react-router-dom'
import { event, navLinks } from '../../data/event'
import Container from '../ui/Container'

const secondaryLinks = [
  { to: '/committees', label: 'Committees' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/contact', label: 'Contact' },
  { to: '/portal', label: 'Participant Portal' },
  { to: '/organizer', label: 'Organizer Dashboard' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold text-white">{event.organization}</p>
            <p className="mt-2 max-w-xs text-sm">{event.tagline}</p>
            <p className="mt-4 text-sm">
              {event.dates} · {event.venue}, {event.city}
            </p>
          </div>

          <nav aria-label="Footer event pages">
            <p className="mb-3 text-sm font-semibold tracking-widest text-gold-400 uppercase">Event</p>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer resources">
            <p className="mb-3 text-sm font-semibold tracking-widest text-gold-400 uppercase">Resources</p>
            <ul className="space-y-2 text-sm">
              {secondaryLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-navy-800 pt-6 text-xs text-navy-400">
          <p>
            © {new Date().getFullYear()} {event.organization}. Demo build — all content is
            placeholder pending official review.
          </p>
        </div>
      </Container>
    </footer>
  )
}
