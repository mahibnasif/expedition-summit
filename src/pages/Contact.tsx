import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { event } from '../data/event'
import { usePageTitle } from '../hooks/usePageTitle'

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Please add a short subject'),
  message: z.string().min(20, 'Please write at least a couple of sentences'),
})

type ContactForm = z.infer<typeof contactSchema>

const inputClass =
  'mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 focus:outline-none'

export default function Contact() {
  usePageTitle('Contact')
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) })

  const onSubmit = async (_data: ContactForm) => {
    // Demo build: submissions are not sent anywhere yet.
    await new Promise((r) => setTimeout(r, 600))
    setSent(true)
  }

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact the team"
        description={`Questions about registration, sponsorship, or logistics? Write to us or use the form — we usually reply within two days.`}
      />

      <section className="py-16 sm:py-24">
        <Container className="grid max-w-4xl gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold">Direct contact</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-navy-900">Email</dt>
                <dd className="text-slate-600">{event.email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-900">Venue</dt>
                <dd className="text-slate-600">
                  {event.venue}
                  <br />
                  {event.city}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-navy-900">Event dates</dt>
                <dd className="text-slate-600">{event.dates}</dd>
              </div>
            </dl>
          </div>

          <Card className="md:col-span-3">
            {sent ? (
              <div className="py-8 text-center" role="status">
                <p className="font-display text-xl font-bold text-navy-900">
                  Message sent
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Thanks for reaching out — the team will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-navy-900">
                    Name
                  </label>
                  <input id="name" className={inputClass} {...register('name')} />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-navy-900">
                    Email
                  </label>
                  <input id="email" type="email" className={inputClass} {...register('email')} />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-navy-900">
                    Subject
                  </label>
                  <input id="subject" className={inputClass} {...register('subject')} />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-navy-900">
                    Message
                  </label>
                  <textarea id="message" rows={5} className={inputClass} {...register('message')} />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            )}
          </Card>
        </Container>
      </section>
    </>
  )
}
