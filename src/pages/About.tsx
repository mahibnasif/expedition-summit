import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import { ButtonLink } from '../components/ui/Button'
import { event } from '../data/event'
import { usePageTitle } from '../hooks/usePageTitle'

const values = [
  {
    title: 'Learning by doing',
    body: 'Sessions are hands-on — delegates debate, attendees workshop, and teams compete on real cases.',
  },
  {
    title: 'Access for everyone',
    body: 'Beginner-friendly programming and mentoring for first-time participants.',
  },
  {
    title: 'Real-world connections',
    body: 'Speakers, judges, and chairs engage with participants throughout our events, not just during their sessions.',
  },
]

export default function About() {
  usePageTitle('About')
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`What is ${event.organization}?`}
        description="A student-led organization producing conferences that blend business education with diplomatic simulation."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Our story" title="Two communities, one stage" />
              <div className="mt-6 space-y-4 text-slate-600">
                <p>
                  Expedition brings together two kinds of student events — business
                  summits and Model United Nations conferences — run by one team.
                  Combining them creates something unusual: an experience where a
                  delegate can leave committee, catch a keynote, and come back with a
                  sharper argument.
                </p>
                <p>
                  Our most recent season ran from {event.lastSeason}, and the next
                  edition is in the works.
                </p>
                <p>
                  The organization is entirely student-run, from programming to
                  partnerships to the website you are reading now.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {values.map((value) => (
                <Card key={value.title}>
                  <h3 className="font-display text-lg font-semibold text-navy-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-slate-600">{value.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-16">
        <Container className="text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Want to be part of it?</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Register your interest for the next edition, or reach out to the team
            directly.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <ButtonLink to="/register">Register</ButtonLink>
            <ButtonLink to="/contact" variant="ghost">
              Contact the team
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
