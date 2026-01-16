import { z } from 'zod'

export const registrationSchema = z
  .object({
    role: z.enum(['delegate', 'chair', 'attendee', 'volunteer', 'speaker'], {
      message: 'Please select a role to continue',
    }),
    fullName: z.string().min(2, 'Please enter your full name'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    organization: z.string().min(2, 'Please enter your school or organization'),
    educationLevel: z.string().min(1, 'Please select your education level'),
    experience: z.string().optional(),
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
      require('experience', 'Select your experience level')
    }
    if (data.role === 'chair') {
      require('experience', 'Tell us about your chairing experience')
    }
    if (data.role === 'volunteer') {
      require('availability', 'Select your availability')
    }
    if (data.role === 'speaker') {
      require('sessionTopic', 'Describe your proposed session or judging interest')
    }
  })

export type RegistrationForm = z.infer<typeof registrationSchema>
