import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import SectionHeading from '../components/ui/SectionHeading'
import { event } from '../data/event'
import { usePageTitle } from '../hooks/usePageTitle'

const travelOptions = [
  {
    title: 'By car',
    body: 'On-site parking garage with a discounted event rate of $10/day. Rideshare drop-off is at the North Entrance on Meridian Boulevard.',
  },
  {
    title: 'By public transit',
    body: 'The Convention Center light-rail station is a four-minute walk from the main doors. Weekend service runs every 15 minutes.',
  },
  {
    title: 'Flying in',
    body: 'The venue is about 25 minutes from the airport by rideshare or the airport rail link. Plan to arrive Friday evening for Saturday check-in.',
  },
]

const rooms = [
  { name: 'Grand Hall', purpose: 'Opening & closing ceremonies, keynotes, case competition final' },
  { name: 'Innovation Lab', purpose: 'Summit workshops and case competition workrooms' },
  { name: 'Committee Rooms 201–206', purpose: 'All six MUN committees' },
  { name: 'Terrace Pavilion', purpose: 'Lunches, socials, and the networking mixer' },
]

export default function Venue() {
  usePageTitle('Venue & Travel')

  return (
    <>
      <PageHeader
        eyebrow="Logistics"
        title="Venue & travel"
        description={`${event.venue}, ${event.city} — everything you need to plan your trip.`}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Getting there" title="Travel options" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {travelOptions.map((option) => (
              <Card key={option.title}>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  {option.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{option.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Inside the venue"
            title="Where everything happens"
            description="All spaces are on the first and second floors, within a three-minute walk of each other."
          />
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-navy-50 text-xs tracking-wide text-slate-500 uppercase">
                  <th scope="col" className="px-6 py-3">Space</th>
                  <th scope="col" className="px-6 py-3">Used for</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.name} className="border-b border-slate-100 last:border-0">
                    <td className="px-6 py-4 font-medium text-navy-900">{room.name}</td>
                    <td className="px-6 py-4 text-slate-600">{room.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Staying over" title="Hotels" />
            <p className="mt-4 text-slate-600">
              A discounted room block is being finalized with two hotels within walking
              distance of the venue. Booking links will be published here and announced
              through the participant portal once rates are confirmed.
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Access" title="Accessibility" />
            <p className="mt-4 text-slate-600">
              The venue is fully wheelchair accessible, including all committee rooms and
              the Grand Hall stage. Accessibility needs collected during registration go
              directly to the operations team — you can also reach us any time at{' '}
              <a href={`mailto:${event.email}`} className="font-semibold text-gold-600 hover:text-gold-500">
                {event.email}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
