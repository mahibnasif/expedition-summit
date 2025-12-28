import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import Badge from '../components/ui/Badge'
import { schedule } from '../data/schedule'
import { usePageTitle } from '../hooks/usePageTitle'

type TrackFilter = 'all' | 'summit' | 'mun'

const trackLabels: Record<'summit' | 'mun' | 'both', { label: string; tone: 'gold' | 'navy' | 'slate' }> = {
  summit: { label: 'Summit', tone: 'gold' },
  mun: { label: 'Model UN', tone: 'navy' },
  both: { label: 'Everyone', tone: 'slate' },
}

export default function Schedule() {
  usePageTitle('Schedule')
  const [day, setDay] = useState(schedule[0].id)
  const [track, setTrack] = useState<TrackFilter>('all')

  const activeDay = schedule.find((d) => d.id === day) ?? schedule[0]
  const items = activeDay.items.filter(
    (item) => track === 'all' || item.track === track || item.track === 'both',
  )

  return (
    <>
      <PageHeader
        eyebrow="Program"
        title="Event schedule"
        description="Two days across both tracks. Filter by day and track to plan your weekend."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label="Select day" className="flex gap-2">
              {schedule.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  aria-pressed={day === d.id}
                  onClick={() => setDay(d.id)}
                  className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                    day === d.id
                      ? 'bg-navy-900 text-white'
                      : 'border border-slate-300 text-navy-800 hover:border-navy-400'
                  }`}
                >
                  {d.label} · {d.date}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-sm font-medium text-navy-800">
              Track
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value as TrackFilter)}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="all">All tracks</option>
                <option value="summit">Business Summit</option>
                <option value="mun">Model UN</option>
              </select>
            </label>
          </div>

          <ol className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {items.map((item, i) => (
              <li key={`${item.time}-${item.title}-${i}`} className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4">
                <span className="w-20 shrink-0 font-display text-sm font-semibold text-navy-900">
                  {item.time}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-navy-900">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.location}</p>
                </div>
                <Badge tone={trackLabels[item.track].tone}>{trackLabels[item.track].label}</Badge>
              </li>
            ))}
          </ol>

          {items.length === 0 && (
            <p className="mt-10 text-center text-slate-500">
              No sessions match this filter.
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
