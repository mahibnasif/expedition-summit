import { ButtonLink } from '../components/ui/Button'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import { event } from '../data/event'
import { usePageTitle } from '../hooks/usePageTitle'

const highlights = [
  {
    title: 'Business summits',
    body: 'Keynotes, panels, workshops, and case competitions connecting students with industry professionals.',
  },
  {
    title: 'Model United Nations',
    body: 'Committee debate and diplomacy simulations for delegates of every experience level.',
  },
  {
    title: 'Networking',
    body: 'Structured mixers that connect delegates, attendees, speakers, and partners.',
  },
  {
    title: 'Student-run',
    body: 'Every part of the organization — from programming to operations — is led by students.',
  },
]

export default function Home() {
  usePageTitle()

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 py-20 text-white sm:py-28">
        <Container>
          <p className="mb-4 text-sm font-semibold tracking-widest text-gold-400 uppercase">
            {event.organization}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-6xl">
            Where ambition meets <span className="text-gold-400">diplomacy</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-navy-100">
            {event.organization} is a student-run organization producing business
            summits and Model United Nations conferences. Our most recent season ran
            from {event.lastSeason}.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink to="/register" size="lg">
              Register your interest
            </ButtonLink>
            <ButtonLink to="/about" size="lg" variant="secondary">
              Learn more
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* What we do */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Two tracks, one community"
            description="Expedition brings business education and diplomatic simulation together under one roof."
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

      {/* CTA */}
      <section className="bg-navy-950 py-16 text-center sm:py-20">
        <Container>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Be part of the next edition
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-200">
            Register as a delegate, attendee, chair, volunteer, or speaker and we'll
            reach out when the next season is announced.
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
