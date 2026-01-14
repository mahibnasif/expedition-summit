import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { event } from '../data/event'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Events() {
  usePageTitle('Events')

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Our events"
        description="Business summits and Model United Nations conferences, organized by students for students."
      />

      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <Card>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-navy-900">
                  {event.name}
                </h2>
                <p className="mt-1 text-sm text-slate-600">{event.lastSeason}</p>
              </div>
              <Badge tone="slate">Concluded</Badge>
            </div>
            <p className="mt-4 text-slate-600">
              Our most recent season wrapped up in January. Recaps, photos, and
              highlights will be added here.
            </p>
          </Card>

          <div className="mt-10 rounded-2xl bg-navy-50 p-8 text-center">
            <h2 className="text-2xl font-bold">Next edition</h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              Dates and details for the next season will be announced here. Register
              now and we'll contact you when everything is confirmed.
            </p>
            <div className="mt-6">
              <ButtonLink to="/register">Register your interest</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
