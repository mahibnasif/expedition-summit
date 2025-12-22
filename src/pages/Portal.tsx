import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { Button, ButtonLink } from '../components/ui/Button'
import { findRegistration, getAnnouncements, type RegistrationRecord } from '../lib/storage'
import { event } from '../data/event'

const roleLabels = {
  delegate: 'MUN Delegate',
  chair: 'Committee Chair',
  attendee: 'Summit Attendee',
  volunteer: 'Volunteer',
  speaker: 'Speaker / Judge',
} as const

const documents = [
  { name: 'Delegate handbook', detail: 'PDF · rules of procedure, awards criteria, venue map' },
  { name: 'Background guides', detail: 'PDF per committee · released 6 weeks out' },
  { name: 'Position paper template', detail: 'DOCX · required for award eligibility' },
  { name: 'Case competition brief', detail: 'PDF · released Saturday 11:00 AM' },
]

function LookupForm({ onFound }: { onFound: (r: RegistrationRecord) => void }) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const found = findRegistration(query)
    if (found) {
      setError('')
      onFound(found)
    } else {
      setError('No registration found for that ID or email. Try the demo ID: EXP-2027-DEMO')
    }
  }

  return (
    <Card className="mx-auto max-w-xl">
      <h2 className="font-display text-xl font-bold text-navy-900">Find your registration</h2>
      <p className="mt-1 text-sm text-slate-600">
        Enter the registration ID from your confirmation, or the email you registered with.
      </p>
      <form onSubmit={submit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="lookup" className="sr-only">
          Registration ID or email
        </label>
        <input
          id="lookup"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="EXP-2027-XXXX or you@school.edu"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 focus:outline-none"
        />
        <Button type="submit" className="shrink-0">
          Look up
        </Button>
      </form>
      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <p className="mt-4 text-xs text-slate-500">
        Haven't registered yet?{' '}
        <Link to="/register" className="font-semibold text-gold-600 hover:text-gold-500">
          Register here
        </Link>
        . Demo build: try <code className="rounded bg-navy-50 px-1">EXP-2027-DEMO</code>.
      </p>
    </Card>
  )
}

export default function Portal() {
  const [registration, setRegistration] = useState<RegistrationRecord | null>(null)
  const announcements = getAnnouncements()

  return (
    <>
      <PageHeader
        eyebrow="Participants"
        title="Participant portal"
        description="Check your registration status, committee assignment, announcements, and event documents."
      />

      <section className="py-16">
        <Container>
          {!registration ? (
            <LookupForm onFound={setRegistration} />
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Status card */}
              <Card className="lg:col-span-2">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold tracking-widest text-gold-600 uppercase">
                      {registration.id}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-bold text-navy-900">
                      {registration.fullName}
                    </h2>
                    <p className="text-sm text-slate-600">
                      {registration.organization} · {registration.educationLevel}
                    </p>
                  </div>
                  <Badge tone="gold">{roleLabels[registration.role]}</Badge>
                </div>

                <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-navy-50 p-4">
                    <dt className="text-sm font-semibold text-navy-900">Registration status</dt>
                    <dd className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                      Confirmed
                    </dd>
                  </div>
                  {registration.role === 'delegate' && (
                    <div className="rounded-xl bg-navy-50 p-4">
                      <dt className="text-sm font-semibold text-navy-900">Committee assignment</dt>
                      <dd className="mt-1 text-sm text-slate-600">
                        Pending — assignments release 4 weeks before the conference.
                        <span className="mt-1 block text-xs text-slate-500">
                          Your preferences: {registration.committeePreferences?.join(', ')}
                        </span>
                      </dd>
                    </div>
                  )}
                  <div className="rounded-xl bg-navy-50 p-4">
                    <dt className="text-sm font-semibold text-navy-900">Event</dt>
                    <dd className="mt-1 text-sm text-slate-600">
                      {event.dates}
                      <br />
                      {event.venue}, {event.city}
                    </dd>
                  </div>
                  <div className="rounded-xl bg-navy-50 p-4">
                    <dt className="text-sm font-semibold text-navy-900">Next step</dt>
                    <dd className="mt-1 text-sm text-slate-600">
                      {registration.role === 'delegate'
                        ? 'Position papers due 2 weeks before the conference.'
                        : registration.role === 'attendee'
                          ? 'Case competition prompt releases Saturday 11:00 AM.'
                          : 'Watch announcements for your briefing details.'}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink to="/schedule" variant="secondary">
                    View schedule
                  </ButtonLink>
                  <Button variant="ghost" onClick={() => setRegistration(null)}>
                    Look up another registration
                  </Button>
                </div>
              </Card>

              {/* Announcements */}
              <div className="space-y-6">
                <Card>
                  <h3 className="font-display text-lg font-bold text-navy-900">Announcements</h3>
                  {announcements.length === 0 ? (
                    <p className="mt-3 text-sm text-slate-500">No announcements yet.</p>
                  ) : (
                    <ul className="mt-3 space-y-4">
                      {announcements.map((a) => (
                        <li key={a.id} className="border-l-2 border-gold-400 pl-3">
                          <p className="text-sm font-semibold text-navy-900">{a.title}</p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {new Date(a.publishedAt).toLocaleDateString(undefined, {
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">{a.body}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>

                <Card>
                  <h3 className="font-display text-lg font-bold text-navy-900">Documents</h3>
                  <ul className="mt-3 space-y-3">
                    {documents.map((doc) => (
                      <li key={doc.name} className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-navy-900">{doc.name}</p>
                          <p className="text-xs text-slate-500">{doc.detail}</p>
                        </div>
                        <Badge tone="slate">Soon</Badge>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
