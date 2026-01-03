import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import { usePageTitle } from '../hooks/usePageTitle'

interface GalleryItem {
  id: string
  caption: string
  year: '2026' | '2025'
  gradient: string
  span?: string
}

/**
 * Placeholder gallery — gradient tiles stand in for photos until
 * Expedition provides real event photography.
 */
const items: GalleryItem[] = [
  { id: 'g1', caption: 'Opening ceremony, Business Summit 2026', year: '2026', gradient: 'from-navy-900 to-navy-600', span: 'sm:col-span-2' },
  { id: 'g2', caption: 'Security Council in session', year: '2026', gradient: 'from-gold-500 to-gold-300' },
  { id: 'g3', caption: 'Case competition finalists', year: '2026', gradient: 'from-navy-700 to-gold-400' },
  { id: 'g4', caption: 'Delegate social, Saturday evening', year: '2026', gradient: 'from-navy-800 to-navy-400' },
  { id: 'g5', caption: 'Keynote Q&A', year: '2026', gradient: 'from-gold-600 to-navy-700', span: 'sm:col-span-2' },
  { id: 'g6', caption: 'Crisis committee midnight update', year: '2025', gradient: 'from-navy-950 to-navy-700' },
  { id: 'g7', caption: 'Awards ceremony, MUN 2025', year: '2025', gradient: 'from-gold-400 to-gold-200', span: 'sm:col-span-2' },
  { id: 'g8', caption: 'Workshop breakout groups', year: '2025', gradient: 'from-navy-600 to-navy-300' },
  { id: 'g9', caption: 'Volunteer crew at check-in', year: '2025', gradient: 'from-navy-800 to-gold-500' },
]

const years = ['All', '2026', '2025'] as const

export default function Gallery() {
  usePageTitle('Gallery')
  const [year, setYear] = useState<(typeof years)[number]>('All')
  const visible = year === 'All' ? items : items.filter((i) => i.year === year)

  return (
    <>
      <PageHeader
        eyebrow="Memories"
        title="Event gallery"
        description="Highlights from past Expedition summits and conferences. Photo placeholders pending official event photography."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div role="group" aria-label="Filter gallery by year" className="flex gap-2">
            {years.map((y) => (
              <button
                key={y}
                type="button"
                aria-pressed={year === y}
                onClick={() => setYear(y)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  year === y
                    ? 'bg-navy-900 text-white'
                    : 'border border-slate-300 text-navy-800 hover:border-navy-400'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {visible.map((item) => (
              <figure key={item.id} className={`group relative overflow-hidden rounded-2xl ${item.span ?? ''}`}>
                <div
                  aria-hidden="true"
                  className={`h-56 w-full bg-gradient-to-br ${item.gradient} transition-transform duration-300 group-hover:scale-105`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-4 text-sm font-medium text-white">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
