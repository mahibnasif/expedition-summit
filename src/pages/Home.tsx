import { ButtonLink } from '../components/ui/Button'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Stat from '../components/ui/Stat'
import SpeakerCard from '../components/SpeakerCard'
import { event } from '../data/event'
import { speakers } from '../data/speakers'
import { usePageTitle } from '../hooks/usePageTitle'

const highlights = [
  {
    title: 'Keynotes & panels',
    body: 'Founders, product leaders, and strategists share what actually worked — and what did not.',
  },
  {
    title: 'Case competition',
    body: 'Teams tackle a live business case and pitch to a judging panel of industry professionals.',
  },
  {
    title: 'Committee debate',
    body: 'Six committees spanning classic GA sessions to a fast-moving joint crisis simulation.',
  },
  {
    title: 'Networking',
    body: 'Structured mixers connect delegates, attendees, speakers, and sponsors across both tracks.',
  },
]

export default function Home() {
  usePageTitle()
  const featured = speakers.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 py-20 text-white sm:py-28">
        <Container>
          <p className="mb-4 text-sm font-semibold tracking-widest text-gold-400 uppercase">
            {event.dates} · {event.venue}, {event.city}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-6xl">
            Where ambition meets <span className="text-gold-400">diplomacy</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-navy-100">
            {event.name} brings together student leaders for two days of keynotes,
            case competitions, and committee debate — one venue, two tracks, hundreds
            of ideas.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink to="/register" size="lg">
              Register now
            </ButtonLink>
            <ButtonLink to="/schedule" size="lg" variant="secondary">
              View schedule
            </ButtonLink>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-navy-700 pt-10 sm:grid-cols-4">
            <Stat value="2" label="Days" />
            <Stat value="6" label="MUN committees" />
            <Stat value="20+" label="Speakers & chairs" />
            <Stat value="500" label="Expected participants" />
          </div>
        </Container>
      </section>

      {/* Tracks */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Two tracks, one event"
            title="Choose your arena"
            description="Attend the Business Summit, compete as a Model UN delegate, or move between both across the weekend."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="border-t-4 border-t-gold-400">
              <h3 className="text-xl font-bold">Business Summit</h3>
              <p className="mt-3 text-slate-600">
                Keynotes, panels, hands-on workshops, and a case competition judged by
                industry professionals. Built for students exploring startups, product,
                strategy, and finance.
              </p>
              <div className="mt-6">
                <ButtonLink to="/summit" variant="ghost">
                  Explore the Summit
                </ButtonLink>
              </div>
            </Card>
            <Card className="border-t-4 border-t-navy-900">
              <h3 className="text-xl font-bold">Model United Nations</h3>
              <p className="mt-3 text-slate-600">
                Six committees ranging from beginner-friendly General Assemblies to an
                advanced joint crisis. Background guides, awards, and experienced chairs
                included.
              </p>
              <div className="mt-6">
                <ButtonLink to="/mun" variant="ghost">
                  Explore Model UN
                </ButtonLink>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <section className="bg-navy-50 py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Why attend"
            title="A weekend that works as hard as you do"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <Card key={item.title}>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{item.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured speakers */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Featured"
              title="Speakers & secretariat"
              description="A first look at the people leading keynotes, workshops, and committees."
            />
            <ButtonLink to="/speakers" variant="ghost">
              See all speakers
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 py-16 text-center sm:py-20">
        <Container>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to join {event.shortName}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-200">
            Registration is open for delegates, chairs, summit attendees, volunteers,
            and speakers.
          </p>
          <div className="mt-8">
            <ButtonLink to="/register" size="lg">
              Start your registration
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
