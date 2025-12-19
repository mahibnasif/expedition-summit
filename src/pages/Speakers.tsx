import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import SpeakerCard from '../components/SpeakerCard'
import { speakers } from '../data/speakers'

type Filter = 'all' | 'summit' | 'mun'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'summit', label: 'Business Summit' },
  { value: 'mun', label: 'Model UN' },
]

export default function Speakers() {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? speakers : speakers.filter((s) => s.track === filter)

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Speakers & secretariat"
        description="The founders, product leaders, chairs, and crisis staff shaping the 2027 program."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div role="group" aria-label="Filter speakers by track" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filter === f.value
                    ? 'bg-navy-900 text-white'
                    : 'border border-slate-300 text-navy-800 hover:border-navy-400'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-10 text-center text-slate-500">
              No speakers found for this track yet.
            </p>
          )}
        </Container>
      </section>
    </>
  )
}
