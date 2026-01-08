import { describe, expect, it } from 'vitest'
import { registrationSchema, type RegistrationForm } from './registrationSchema'

const validDelegate: RegistrationForm = {
  role: 'delegate',
  fullName: 'Test Delegate',
  email: 'delegate@example.com',
  organization: 'Test High School',
  educationLevel: 'High school',
  pref1: 'UNSC',
  pref2: 'WHO',
  pref3: 'ECOSOC',
  experience: '1–2 conferences',
  agree: true,
}

function errorPaths(data: unknown): string[] {
  const result = registrationSchema.safeParse(data)
  if (result.success) return []
  return result.error.issues.map((issue) => issue.path.join('.'))
}

describe('registrationSchema', () => {
  it('accepts a complete delegate registration', () => {
    expect(registrationSchema.safeParse(validDelegate).success).toBe(true)
  })

  it('rejects an invalid email', () => {
    expect(errorPaths({ ...validDelegate, email: 'not-an-email' })).toContain('email')
  })

  it('rejects a delegate with missing committee preferences', () => {
    const paths = errorPaths({ ...validDelegate, pref2: undefined, pref3: undefined })
    expect(paths).toContain('pref2')
    expect(paths).toContain('pref3')
  })

  it('rejects duplicate committee preferences', () => {
    expect(errorPaths({ ...validDelegate, pref2: 'UNSC' })).toContain('pref3')
  })

  it('rejects an unaccepted participation policy', () => {
    expect(errorPaths({ ...validDelegate, agree: false })).toContain('agree')
  })

  it('requires chairs to pick a committee and describe experience', () => {
    const paths = errorPaths({
      ...validDelegate,
      role: 'chair',
      pref1: undefined,
      experience: undefined,
    })
    expect(paths).toContain('pref1')
    expect(paths).toContain('experience')
  })

  it('requires volunteers to state availability', () => {
    expect(errorPaths({ ...validDelegate, role: 'volunteer' })).toContain('availability')
  })

  it('requires speakers to propose a session', () => {
    expect(errorPaths({ ...validDelegate, role: 'speaker' })).toContain('sessionTopic')
  })

  it('does not require committee preferences for attendees', () => {
    const attendee = {
      ...validDelegate,
      role: 'attendee' as const,
      pref1: undefined,
      pref2: undefined,
      pref3: undefined,
      experience: undefined,
    }
    expect(registrationSchema.safeParse(attendee).success).toBe(true)
  })
})
