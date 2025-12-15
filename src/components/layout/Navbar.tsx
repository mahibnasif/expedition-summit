import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { event, navLinks } from '../../data/event'
import { ButtonLink } from '../ui/Button'

function BrandMark() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="Expedition home">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#0f2a43" />
        <path d="M9 22 L16 8 L23 22 L16 18 Z" fill="#f4b942" />
      </svg>
      <span className="font-display text-lg font-bold text-navy-900">
        Expedition <span className="text-gold-600">2027</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-gold-600' : 'text-navy-800 hover:text-gold-600'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandMark />

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <div className="ml-3">
            <ButtonLink to="/register">Register</ButtonLink>
          </div>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-navy-900 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive ? 'bg-navy-50 text-gold-600' : 'text-navy-800 hover:bg-navy-50'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2">
              <ButtonLink to="/register" className="w-full">
                Register for {event.shortName}
              </ButtonLink>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
