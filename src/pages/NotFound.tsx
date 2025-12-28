import Container from '../components/ui/Container'
import { ButtonLink } from '../components/ui/Button'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="font-display text-6xl font-bold text-gold-400">404</p>
        <h1 className="mt-4 text-3xl font-bold">This session isn't on the agenda</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-600">
          The page you're looking for doesn't exist or has moved. Head back to the
          homepage or check the schedule.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <ButtonLink to="/">Back to home</ButtonLink>
          <ButtonLink to="/schedule" variant="ghost">
            View schedule
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
