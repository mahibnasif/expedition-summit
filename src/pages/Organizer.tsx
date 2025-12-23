import { useMemo, useState, type FormEvent } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import {
  getRegistrations,
  getAnnouncements,
  publishAnnouncement,
  type Role,
} from '../lib/storage'

const roleLabels: Record<Role, string> = {
  delegate: 'Delegate',
  chair: 'Chair',
  attendee: 'Attendee',
  volunteer: 'Volunteer',
  speaker: 'Speaker/Judge',
}

const roleTones: Record<Role, 'navy' | 'gold' | 'green' | 'slate'> = {
  delegate: 'navy',
  chair: 'gold',
  attendee: 'green',
  volunteer: 'slate',
  speaker: 'gold',
}

function exportCsv(rows: ReturnType<typeof getRegistrations>) {
  const header = ['ID', 'Name', 'Email', 'Role', 'Organization', 'Level', 'Preferences', 'Registered']
  const lines = rows.map((r) =>
    [
      r.id,
      r.fullName,
      r.email,
      roleLabels[r.role],
      r.organization,
      r.educationLevel,
      r.committeePreferences?.join(' | ') ?? '',
      new Date(r.createdAt).toLocaleDateString(),
    ]
      .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
      .join(','),
  )
  const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'expedition-registrations.csv'
  link.click()
  URL.revokeObjectURL(url)
}

export default function Organizer() {
  const [filter, setFilter] = useState<Role | 'all'>('all')
  const [refresh, setRefresh] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [published, setPublished] = useState(false)

  const registrations = useMemo(() => getRegistrations(), [refresh])
  const announcements = useMemo(() => getAnnouncements(), [refresh])

  const visible =
    filter === 'all' ? registrations : registrations.filter((r) => r.role === filter)

  const counts = registrations.reduce<Record<string, number>>((acc, r) => {
    acc[r.role] = (acc[r.role] ?? 0) + 1
    return acc
  }, {})

  const publish = (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    publishAnnouncement(title.trim(), body.trim())
    setTitle('')
    setBody('')
    setPublished(true)
    setRefresh((n) => n + 1)
  }

  return (
    <>
      <PageHeader
        eyebrow="Internal"
        title="Organizer dashboard"
        description="Review registrations, publish announcements, and export participant data. Demo build — seeded with sample data."
      />

      <section className="py-16">
        <Container>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Card className="text-center">
              <p className="font-display text-3xl font-bold text-navy-900">
                {registrations.length}
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                Total
              </p>
            </Card>
            {(Object.keys(roleLabels) as Role[]).map((role) => (
              <Card key={role} className="text-center">
                <p className="font-display text-3xl font-bold text-navy-900">
                  {counts[role] ?? 0}
                </p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  {roleLabels[role]}s
                </p>
              </Card>
            ))}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Registrations table */}
            <Card className="lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl font-bold text-navy-900">Registrations</h2>
                <div className="flex items-center gap-3">
                  <label htmlFor="role-filter" className="sr-only">
                    Filter by role
                  </label>
                  <select
                    id="role-filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as Role | 'all')}
                    className="rounded-md border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="all">All roles</option>
                    {(Object.keys(roleLabels) as Role[]).map((role) => (
                      <option key={role} value={role}>
                        {roleLabels[role]}s
                      </option>
                    ))}
                  </select>
                  <Button variant="ghost" onClick={() => exportCsv(visible)}>
                    Export CSV
                  </Button>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase">
                      <th scope="col" className="py-2 pr-4">Participant</th>
                      <th scope="col" className="py-2 pr-4">Role</th>
                      <th scope="col" className="py-2 pr-4">Organization</th>
                      <th scope="col" className="py-2 pr-4">Preferences</th>
                      <th scope="col" className="py-2">Registered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((r) => (
                      <tr key={r.id} className="border-b border-slate-100">
                        <td className="py-3 pr-4">
                          <p className="font-medium text-navy-900">{r.fullName}</p>
                          <p className="text-xs text-slate-500">
                            {r.id} · {r.email}
                          </p>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge tone={roleTones[r.role]}>{roleLabels[r.role]}</Badge>
                        </td>
                        <td className="py-3 pr-4 text-slate-600">{r.organization}</td>
                        <td className="py-3 pr-4 text-xs text-slate-500">
                          {r.committeePreferences?.join(', ') ?? '—'}
                        </td>
                        <td className="py-3 text-slate-600">
                          {new Date(r.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {visible.length === 0 && (
                  <p className="py-8 text-center text-sm text-slate-500">
                    No registrations match this filter.
                  </p>
                )}
              </div>
            </Card>

            {/* Announcements */}
            <div className="space-y-6">
              <Card>
                <h2 className="font-display text-xl font-bold text-navy-900">
                  Publish announcement
                </h2>
                <form onSubmit={publish} className="mt-4 space-y-3">
                  <div>
                    <label htmlFor="ann-title" className="text-sm font-medium text-navy-900">
                      Title
                    </label>
                    <input
                      id="ann-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="ann-body" className="text-sm font-medium text-navy-900">
                      Message
                    </label>
                    <textarea
                      id="ann-body"
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={3}
                      className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Publish to portal
                  </Button>
                  {published && (
                    <p className="text-sm text-emerald-600" role="status">
                      Published — participants can see it in the portal.
                    </p>
                  )}
                </form>
              </Card>

              <Card>
                <h2 className="font-display text-xl font-bold text-navy-900">Recent</h2>
                <ul className="mt-3 space-y-3">
                  {announcements.slice(0, 4).map((a) => (
                    <li key={a.id} className="border-l-2 border-gold-400 pl-3">
                      <p className="text-sm font-semibold text-navy-900">{a.title}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(a.publishedAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
