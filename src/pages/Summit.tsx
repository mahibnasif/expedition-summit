import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import SpeakerCard from '../components/SpeakerCard'
import { speakers } from '../data/speakers'
import { usePageTitle } from '../hooks/usePageTitle'

const sessions = [
  {
    title: 'Opening keynote: Leading through uncertainty',
    format: 'Keynote',
    detail: 'Amara Osei on building teams and companies that survive their first crisis.',
  },
  {
    title: 'From user research to roadmap',
    format: 'Workshop',
    detail: 'A hands-on product workshop with Daniel Reyes. Laptops required, templates provided.',
  },
  {
    title: 'Breaking into strategy & consulting',
    format: 'Panel',
    detail: 'Consultants and in-house strategists on casing, recruiting timelines, and first-year realities.',
  },
  {
    title: 'Founder fireside: Bootstrapping Fieldnote',
    format: 'Fireside chat',
    detail: 'James Park on revenue-first growth, saying no to venture capital, and campus startups.',
  },
  {
    title: 'Case competition: live final',
    format: 'Competition',
    detail: 'The top four teams present to the judging panel. Open to all attendees.',
  },
]

export default function Summit() {
  usePageTitle('Business Summit')
  const summitSpeakers = speakers.filter((s) => s.track === 'summit')

  return (
    <>
      <PageHeader
        eyebrow="Track one"
        title="Business Summit"
        description="Keynotes, workshops, panels, and a judged case competition — built for students exploring startups, product, strategy, and finance."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Program"
            title="Sessions you can expect"
            description="The full timetable lives on the schedule page; here is the shape of the weekend."
          />
          <div className="mt-10 space-y-4">
            {sessions.map((session) => (
              <Card key={session.title} className="sm:flex sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-900">
                    {session.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{session.detail}</p>
                </div>
                <div className="mt-3 shrink-0 sm:mt-1">
                  <Badge tone="gold">{session.format}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Case competition" title="Compete on a live business case" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="font-display text-3xl font-bold text-gold-500">1</p>
              <h3 className="mt-2 font-semibold text-navy-900">Form a team</h3>
              <p className="mt-1 text-sm text-slate-600">
                Teams of three to five register together or get matched at the opening mixer.
              </p>
            </Card>
            <Card>
              <p className="font-display text-3xl font-bold text-gold-500">2</p>
              <h3 className="mt-2 font-semibold text-navy-900">Crack the case</h3>
              <p className="mt-1 text-sm text-slate-600">
                The prompt drops Saturday morning. Teams get six hours, mentor check-ins, and a slide limit.
              </p>
            </Card>
            <Card>
              <p className="font-display text-3xl font-bold text-gold-500">3</p>
              <h3 className="mt-2 font-semibold text-navy-900">Pitch the judges</h3>
              <p className="mt-1 text-sm text-slate-600">
                Finalists present live on Sunday. Judges score on insight, feasibility, and delivery.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Speakers" title="Summit speakers" />
            <ButtonLink to="/speakers" variant="ghost">
              Full speaker list
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {summitSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <ButtonLink to="/register" size="lg">
              Register for the Summit
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
