import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import PageHeader from '../components/ui/PageHeader'
import Container from '../components/ui/Container'
import Card from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { TextField, SelectField, TextareaField, CheckboxField } from '../components/forms/fields'
import { committees } from '../data/committees'
import { saveRegistration, type RegistrationRecord, type Role } from '../lib/storage'
import { usePageTitle } from '../hooks/usePageTitle'

const roles: { value: Role; title: string; description: string }[] = [
  { value: 'delegate', title: 'MUN Delegate', description: 'Debate in one of six committees across the weekend.' },
  { value: 'chair', title: 'Committee Chair', description: 'Apply to chair a committee and lead debate.' },
  { value: 'attendee', title: 'Summit Attendee', description: 'Keynotes, workshops, panels, and the case competition.' },
  { value: 'volunteer', title: 'Volunteer', description: 'Join the operations team behind the event.' },
  { value: 'speaker', title: 'Speaker / Judge', description: 'Host a session or judge the case competition.' },
]

const registrationSchema = z
  .object({
    role: z.enum(['delegate', 'chair', 'attendee', 'volunteer', 'speaker'], {
      message: 'Please select a role to continue',
    }),
    fullName: z.string().min(2, 'Please enter your full name'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    organization: z.string().min(2, 'Please enter your school or organization'),
    educationLevel: z.string().min(1, 'Please select your education level'),
    pref1: z.string().optional(),
    pref2: z.string().optional(),
    pref3: z.string().optional(),
    experience: z.string().optional(),
    caseCompetition: z.boolean().optional(),
    teamName: z.string().optional(),
    availability: z.string().optional(),
    sessionTopic: z.string().optional(),
    dietary: z.string().optional(),
    accessibility: z.string().optional(),
    agree: z.boolean().refine((v) => v, 'Please accept the participation policy'),
  })
  .superRefine((data, ctx) => {
    const require = (field: keyof typeof data, message: string) => {
      if (!data[field]) ctx.addIssue({ code: 'custom', path: [field], message })
    }

    if (data.role === 'delegate') {
      require('pref1', 'Select your first committee preference')
      require('pref2', 'Select your second committee preference')
      require('pref3', 'Select your third committee preference')
      require('experience', 'Select your experience level')
      const prefs = [data.pref1, data.pref2, data.pref3].filter(Boolean)
      if (new Set(prefs).size !== prefs.length) {
        ctx.addIssue({ code: 'custom', path: ['pref3'], message: 'Committee preferences must be different' })
      }
    }
    if (data.role === 'chair') {
      require('pref1', 'Select the committee you want to chair')
      require('experience', 'Tell us about your chairing experience')
    }
    if (data.role === 'volunteer') {
      require('availability', 'Select your availability')
    }
    if (data.role === 'speaker') {
      require('sessionTopic', 'Describe your proposed session or judging interest')
    }
  })

type RegistrationForm = z.infer<typeof registrationSchema>

const stepFields: (keyof RegistrationForm)[][] = [
  ['role'],
  ['fullName', 'email', 'phone', 'organization', 'educationLevel'],
  ['pref1', 'pref2', 'pref3', 'experience', 'caseCompetition', 'teamName', 'availability', 'sessionTopic'],
  ['dietary', 'accessibility', 'agree'],
]

const stepLabels = ['Role', 'About you', 'Details', 'Review']

const committeeOptions = committees.map((c) => ({ value: c.abbreviation, label: `${c.abbreviation} — ${c.topic}` }))

const educationOptions = [
  { value: 'High school', label: 'High school' },
  { value: 'Undergraduate', label: 'Undergraduate' },
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Other', label: 'Other' },
]

const experienceOptions = [
  { value: 'First conference', label: 'This is my first conference' },
  { value: '1–2 conferences', label: '1–2 conferences' },
  { value: '3–5 conferences', label: '3–5 conferences' },
  { value: '6+ conferences', label: '6+ conferences' },
]

const availabilityOptions = [
  { value: 'Day 1 only', label: 'Day 1 only (Saturday)' },
  { value: 'Day 2 only', label: 'Day 2 only (Sunday)' },
  { value: 'Both days', label: 'Both days' },
]

export default function Register() {
  usePageTitle('Register')
  const [step, setStep] = useState(0)
  const [confirmation, setConfirmation] = useState<RegistrationRecord | null>(null)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { caseCompetition: false, agree: false },
    mode: 'onTouched',
  })

  const role = watch('role')
  const values = watch()

  const next = async () => {
    const valid = await trigger(stepFields[step])
    if (valid) setStep((s) => s + 1)
  }

  const back = () => setStep((s) => Math.max(0, s - 1))

  const onSubmit = async (data: RegistrationForm) => {
    // Demo build: registrations are stored locally in the browser.
    await new Promise((r) => setTimeout(r, 600))
    const record = saveRegistration({
      role: data.role,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || undefined,
      organization: data.organization,
      educationLevel: data.educationLevel,
      committeePreferences:
        data.role === 'delegate'
          ? [data.pref1!, data.pref2!, data.pref3!]
          : data.role === 'chair'
            ? [data.pref1!]
            : undefined,
      experience: data.experience || undefined,
      caseCompetition: data.role === 'attendee' ? data.caseCompetition : undefined,
      teamName: data.teamName || undefined,
      availability: data.availability || undefined,
      sessionTopic: data.sessionTopic || undefined,
      dietary: data.dietary || undefined,
      accessibility: data.accessibility || undefined,
    })
    setConfirmation(record)
  }

  if (confirmation) {
    return (
      <>
        <PageHeader eyebrow="Registration" title="You're registered!" />
        <section className="py-16">
          <Container className="max-w-2xl">
            <Card className="text-center">
              <p className="text-sm font-semibold tracking-widest text-gold-600 uppercase">
                Registration ID
              </p>
              <p className="mt-2 font-display text-3xl font-bold text-navy-900">
                {confirmation.id}
              </p>
              <p className="mt-4 text-slate-600">
                Thanks, {confirmation.fullName.split(' ')[0]}! Save this ID — you'll use
                it (or your email) to access the{' '}
                <Link to="/portal" className="font-semibold text-gold-600 hover:text-gold-500">
                  participant portal
                </Link>
                , where committee assignments, announcements, and documents will appear.
              </p>
              <p className="mt-4 rounded-lg bg-navy-50 p-3 text-xs text-slate-500">
                Demo build: this registration is stored locally in your browser and is
                not an official Expedition registration.
              </p>
            </Card>
          </Container>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow="Join us"
        title="Register for Expedition 2027"
        description="One form for delegates, chairs, attendees, volunteers, and speakers — about three minutes."
      />

      <section className="py-16">
        <Container className="max-w-2xl">
          {/* Progress */}
          <ol className="mb-8 flex items-center gap-2" aria-label="Registration progress">
            {stepLabels.map((label, i) => (
              <li key={label} className="flex flex-1 flex-col gap-1">
                <span
                  className={`h-1.5 rounded-full ${i <= step ? 'bg-gold-400' : 'bg-slate-200'}`}
                  aria-hidden="true"
                />
                <span
                  className={`text-xs font-semibold ${i === step ? 'text-navy-900' : 'text-slate-400'}`}
                  aria-current={i === step ? 'step' : undefined}
                >
                  {label}
                </span>
              </li>
            ))}
          </ol>

          <Card>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {step === 0 && (
                <fieldset>
                  <legend className="font-display text-xl font-bold text-navy-900">
                    How are you joining us?
                  </legend>
                  <div className="mt-4 space-y-3">
                    {roles.map((r) => (
                      <label
                        key={r.value}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                          role === r.value
                            ? 'border-gold-400 bg-gold-50'
                            : 'border-slate-200 hover:border-navy-300'
                        }`}
                      >
                        <input
                          type="radio"
                          value={r.value}
                          className="mt-1 accent-navy-900"
                          {...register('role')}
                        />
                        <span>
                          <span className="block font-semibold text-navy-900">{r.title}</span>
                          <span className="block text-sm text-slate-600">{r.description}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.role && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                      {errors.role.message}
                    </p>
                  )}
                </fieldset>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-display text-xl font-bold text-navy-900">About you</h2>
                  <TextField
                    id="fullName"
                    label="Full name"
                    autoComplete="name"
                    registration={register('fullName')}
                    error={errors.fullName?.message}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    registration={register('email')}
                    error={errors.email?.message}
                  />
                  <TextField
                    id="phone"
                    label="Phone (optional)"
                    type="tel"
                    autoComplete="tel"
                    registration={register('phone')}
                    error={errors.phone?.message}
                  />
                  <TextField
                    id="organization"
                    label="School / organization"
                    registration={register('organization')}
                    error={errors.organization?.message}
                  />
                  <SelectField
                    id="educationLevel"
                    label="Education level"
                    placeholder="Select your level"
                    options={educationOptions}
                    registration={register('educationLevel')}
                    error={errors.educationLevel?.message}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-display text-xl font-bold text-navy-900">
                    {roles.find((r) => r.value === role)?.title} details
                  </h2>

                  {role === 'delegate' && (
                    <>
                      <SelectField
                        id="pref1"
                        label="First committee preference"
                        placeholder="Select a committee"
                        options={committeeOptions}
                        registration={register('pref1')}
                        error={errors.pref1?.message}
                      />
                      <SelectField
                        id="pref2"
                        label="Second committee preference"
                        placeholder="Select a committee"
                        options={committeeOptions}
                        registration={register('pref2')}
                        error={errors.pref2?.message}
                      />
                      <SelectField
                        id="pref3"
                        label="Third committee preference"
                        placeholder="Select a committee"
                        options={committeeOptions}
                        registration={register('pref3')}
                        error={errors.pref3?.message}
                      />
                      <SelectField
                        id="experience"
                        label="MUN experience"
                        placeholder="Select your experience"
                        options={experienceOptions}
                        registration={register('experience')}
                        error={errors.experience?.message}
                      />
                    </>
                  )}

                  {role === 'chair' && (
                    <>
                      <SelectField
                        id="pref1"
                        label="Committee you'd like to chair"
                        placeholder="Select a committee"
                        options={committeeOptions}
                        registration={register('pref1')}
                        error={errors.pref1?.message}
                      />
                      <TextareaField
                        id="experience"
                        label="Chairing experience"
                        hint="Conferences chaired, committees run, crisis experience — a few sentences is plenty."
                        registration={register('experience')}
                        error={errors.experience?.message}
                      />
                    </>
                  )}

                  {role === 'attendee' && (
                    <>
                      <CheckboxField
                        id="caseCompetition"
                        label="I want to compete in the case competition"
                        registration={register('caseCompetition')}
                        error={errors.caseCompetition?.message}
                      />
                      {values.caseCompetition && (
                        <TextField
                          id="teamName"
                          label="Team name (optional)"
                          hint="Leave blank to be matched with a team at the opening mixer."
                          registration={register('teamName')}
                          error={errors.teamName?.message}
                        />
                      )}
                    </>
                  )}

                  {role === 'volunteer' && (
                    <SelectField
                      id="availability"
                      label="Availability"
                      placeholder="Select your availability"
                      options={availabilityOptions}
                      registration={register('availability')}
                      error={errors.availability?.message}
                    />
                  )}

                  {role === 'speaker' && (
                    <TextareaField
                      id="sessionTopic"
                      label="Proposed session or judging interest"
                      hint="A working title and a sentence or two about the format."
                      registration={register('sessionTopic')}
                      error={errors.sessionTopic?.message}
                    />
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-display text-xl font-bold text-navy-900">
                    Almost done
                  </h2>

                  <dl className="rounded-xl bg-navy-50 p-4 text-sm">
                    <div className="flex justify-between py-1">
                      <dt className="font-medium text-navy-900">Role</dt>
                      <dd className="text-slate-600">
                        {roles.find((r) => r.value === values.role)?.title}
                      </dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="font-medium text-navy-900">Name</dt>
                      <dd className="text-slate-600">{values.fullName}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="font-medium text-navy-900">Email</dt>
                      <dd className="text-slate-600">{values.email}</dd>
                    </div>
                    <div className="flex justify-between py-1">
                      <dt className="font-medium text-navy-900">Organization</dt>
                      <dd className="text-slate-600">{values.organization}</dd>
                    </div>
                  </dl>

                  <TextField
                    id="dietary"
                    label="Dietary restrictions (optional)"
                    registration={register('dietary')}
                    error={errors.dietary?.message}
                  />
                  <TextField
                    id="accessibility"
                    label="Accessibility needs (optional)"
                    registration={register('accessibility')}
                    error={errors.accessibility?.message}
                  />
                  <CheckboxField
                    id="agree"
                    label={
                      <>
                        I agree to the participation policy and code of conduct, and I
                        understand this demo registration is stored locally in my browser.
                      </>
                    }
                    registration={register('agree')}
                    error={errors.agree?.message}
                  />
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-4">
                {step > 0 ? (
                  <Button type="button" variant="ghost" onClick={back}>
                    Back
                  </Button>
                ) : (
                  <span />
                )}
                {step < stepLabels.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => {
                      if (step === 0 && !role) {
                        setValue('role', undefined as never, { shouldValidate: true })
                      }
                      void next()
                    }}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting…' : 'Submit registration'}
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </Container>
      </section>
    </>
  )
}
