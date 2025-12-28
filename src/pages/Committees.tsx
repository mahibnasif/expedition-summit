import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { committees } from '../data/committees'
import { usePageTitle } from '../hooks/usePageTitle'

const levelTone = {
  Beginner: 'green',
  Intermediate: 'gold',
  Advanced: 'navy',
} as const

export default function Committees() {
  usePageTitle('Committees')
  return (
    <>
      <PageHeader
        eyebrow="Model UN"
        title="Committees & topics"
        description="Six committees across three difficulty levels. Background guides release six weeks before the conference."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="space-y-6">
            {committees.map((committee) => (
              <Card key={committee.id} className="md:flex md:items-start md:justify-between md:gap-8">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-display text-xl font-bold text-navy-900">
                      {committee.name}
                    </h2>
                    <Badge tone={levelTone[committee.level]}>{committee.level}</Badge>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-gold-600">
                    {committee.abbreviation}
                  </p>
                  <p className="mt-3 font-medium text-navy-800">Topic: {committee.topic}</p>
                  <p className="mt-2 text-sm text-slate-600">{committee.description}</p>
                </div>
                <dl className="mt-4 shrink-0 space-y-2 text-sm md:mt-1 md:text-right">
                  <div>
                    <dt className="font-semibold text-navy-900">Chair</dt>
                    <dd className="text-slate-600">{committee.chair}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-navy-900">Committee size</dt>
                    <dd className="text-slate-600">{committee.size} delegates</dd>
                  </div>
                </dl>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-navy-50 p-8 text-center">
            <h2 className="text-2xl font-bold">Country preferences</h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              Delegates rank three committee preferences during registration. Assignments
              are released through the participant portal.
            </p>
            <div className="mt-6">
              <ButtonLink to="/register">Register and pick preferences</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
