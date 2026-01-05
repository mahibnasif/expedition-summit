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
        ctx.addIssue({
          code: 'custom',
          path: ['pref3'],
          message: 'Committee preferences must be different',
        })
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

export type RegistrationForm = z.infer<typeof registrationSchema>
