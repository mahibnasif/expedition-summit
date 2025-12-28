import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { committees } from '../data/committees'
import { usePageTitle } from '../hooks/usePageTitle'

const resources = [
  {
    title: 'Background guides',
    body: 'Released six weeks before the conference for every committee, written by the chairs.',
  },
  {
    title: 'Position papers',
    body: 'Submitted through the participant portal two weeks out. Required for award eligibility.',
  },
  {
    title: 'First-timer clinic',
    body: 'A Saturday-morning session covering procedure, points, and motions before first committee.',
  },
  {
    title: 'Awards',
    body: 'Best Delegate, Outstanding Delegate, and Honorable Mention in every committee, plus delegation awards.',
  },
]

const levelTone = {
  Beginner: 'green',
  Intermediate: 'gold',
  Advanced: 'navy',
} as const

export default function Mun() {
  usePageTitle('Model UN')
  return (
    <>
      <PageHeader
        eyebrow="Track two"
        title="Model United Nations"
        description="Six committees, experienced chairs, and a crisis arc that runs all weekend — from beginner-friendly GAs to an advanced joint crisis."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Committees"
            title="The 2027 lineup"
            description="Every committee lists its topic, difficulty, and chair. Full details live on the committees page."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {committees.map((committee) => (
              <Card key={committee.id} className="flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-navy-900">
                    {committee.abbreviation}
                  </h3>
                  <Badge tone={levelTone[committee.level]}>{committee.level}</Badge>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-500">{committee.name}</p>
                <p className="mt-3 flex-1 text-sm text-slate-600">{committee.topic}</p>
                <p className="mt-4 text-xs text-slate-500">
                  Chair: {committee.chair} · {committee.size} delegates
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/committees" className="font-semibold text-gold-600 hover:text-gold-500">
              Read full committee descriptions →
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-navy-50 py-16 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Delegate resources" title="Everything you need to prepare" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <Card key={resource.title}>
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{resource.body}</p>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <ButtonLink to="/register" size="lg">
              Register as a delegate
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
