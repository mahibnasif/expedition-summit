import { describe, expect, it } from 'vitest'
import { registrationSchema, type RegistrationForm } from './registrationSchema'

const validDelegate: RegistrationForm = {
  role: 'delegate',
  fullName: 'Test Delegate',
  email: 'delegate@example.com',
  organization: 'Test High School',
  educationLevel: 'High school',
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

  it('rejects a delegate without an experience level', () => {
    expect(errorPaths({ ...validDelegate, experience: undefined })).toContain('experience')
  })

  it('rejects an unaccepted participation policy', () => {
    expect(errorPaths({ ...validDelegate, agree: false })).toContain('agree')
  })

  it('requires chairs to describe their experience', () => {
    expect(
      errorPaths({ ...validDelegate, role: 'chair', experience: undefined }),
    ).toContain('experience')
  })

  it('requires volunteers to state availability', () => {
    expect(errorPaths({ ...validDelegate, role: 'volunteer' })).toContain('availability')
  })

  it('requires speakers to propose a session', () => {
    expect(errorPaths({ ...validDelegate, role: 'speaker' })).toContain('sessionTopic')
  })

  it('does not require extra details for attendees', () => {
    const attendee = {
      ...validDelegate,
      role: 'attendee' as const,
      experience: undefined,
    }
    expect(registrationSchema.safeParse(attendee).success).toBe(true)
  })
})
