import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import { ButtonLink } from '../components/ui/Button'
import { team, type TeamMember } from '../data/team'
import { usePageTitle } from '../hooks/usePageTitle'

const departments: TeamMember['department'][] = [
  'Leadership',
  'MUN Secretariat',
  'Summit Team',
  'Operations',
]

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="flex items-start gap-4">
      <div
        aria-hidden="true"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-900 font-display font-bold text-gold-400"
      >
        {member.initials}
      </div>
      <div>
        <h3 className="font-display font-semibold text-navy-900">{member.name}</h3>
        <p className="text-sm font-medium text-gold-600">{member.role}</p>
        <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
      </div>
    </Card>
  )
}

export default function Team() {
  usePageTitle('Team')

  return (
    <>
      <PageHeader
        eyebrow="People"
        title="The organizing team"
        description="Expedition is entirely student-run — from crisis design to sponsorships to this website."
      />

      <section className="py-16 sm:py-24">
        <Container>
          {departments.map((dept) => (
            <div key={dept} className="mb-12 last:mb-0">
              <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">{dept}</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {team
                  .filter((m) => m.department === dept)
                  .map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
              </div>
            </div>
          ))}

          <div className="mt-16 rounded-2xl bg-navy-50 p-8 text-center">
            <h2 className="text-2xl font-bold">Want to join the team?</h2>
            <p className="mx-auto mt-2 max-w-xl text-slate-600">
              We recruit volunteers and committee staff every season. Register as a
              volunteer or reach out directly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <ButtonLink to="/register">Volunteer with us</ButtonLink>
              <ButtonLink to="/contact" variant="ghost">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
