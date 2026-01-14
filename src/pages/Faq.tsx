import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import { ButtonLink } from '../components/ui/Button'
import { faqs } from '../data/faqs'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Faq() {
  usePageTitle('FAQ')
  return (
    <>
      <PageHeader
        eyebrow="Help"
        title="Frequently asked questions"
        description="The questions delegates, attendees, and parents ask us most."
      />

      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-6 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold text-navy-900">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-gold-500 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-navy-50 p-8 text-center">
            <h2 className="text-xl font-bold">Still have a question?</h2>
            <p className="mt-2 text-slate-600">
              The organizing team usually replies within two days.
            </p>
            <div className="mt-5">
              <ButtonLink to="/contact" variant="secondary">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
