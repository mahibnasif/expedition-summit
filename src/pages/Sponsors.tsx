import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { ButtonLink } from '../components/ui/Button'
import { sponsors } from '../data/sponsors'
import { event } from '../data/event'

const tiers = ['Platinum', 'Gold', 'Community'] as const
const tierTone = { Platinum: 'gold', Gold: 'navy', Community: 'slate' } as const

export default function Sponsors() {
  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Sponsors & partners"
        description="The organizations making the 2027 edition possible."
      />

      <section className="py-16 sm:py-24">
        <Container>
          {tiers.map((tier) => {
            const list = sponsors.filter((s) => s.tier === tier)
            if (list.length === 0) return null
            return (
              <div key={tier} className="mb-12 last:mb-0">
                <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">
                  {tier} partners
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((sponsor) => (
                    <Card key={sponsor.id}>
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg font-semibold text-navy-900">
                          {sponsor.name}
                        </h3>
                        <Badge tone={tierTone[sponsor.tier]}>{sponsor.tier}</Badge>
                      </div>
                      <p className="mt-3 text-sm text-slate-600">{sponsor.blurb}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </Container>
      </section>

      <section className="bg-navy-950 py-16">
        <Container className="text-center">
          <p className="mb-2 text-sm font-semibold tracking-widest text-gold-400 uppercase">
            Sponsor the event
          </p>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
            Put your brand in front of 500 student leaders
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy-200">
            Sponsorship packages include branding across the venue, a booth at the
            networking mixer, and a seat on the case competition judging panel. Reach
            the team at {event.email}.
          </p>
          <div className="mt-8">
            <ButtonLink to="/contact">Get the sponsorship deck</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
