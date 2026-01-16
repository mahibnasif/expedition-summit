import { beforeEach, describe, expect, it } from 'vitest'
import {
  findRegistration,
  getAnnouncements,
  getRegistrations,
  publishAnnouncement,
  saveRegistration,
} from './storage'

const baseRegistration = {
  role: 'delegate' as const,
  fullName: 'Test Delegate',
  email: 'test@example.com',
  organization: 'Test High School',
  educationLevel: 'High school',
  experience: '1–2 conferences',
}

beforeEach(() => {
  localStorage.clear()
})

describe('saveRegistration', () => {
  it('returns a record with a generated id and timestamp', () => {
    const record = saveRegistration(baseRegistration)
    expect(record.id).toMatch(/^EXP-[A-Z0-9]{6}$/)
    expect(new Date(record.createdAt).getTime()).not.toBeNaN()
  })

  it('persists the record', () => {
    const record = saveRegistration(baseRegistration)
    expect(getRegistrations().map((r) => r.id)).toContain(record.id)
  })

  it('starts with no registrations', () => {
    expect(getRegistrations()).toHaveLength(0)
  })
})

describe('findRegistration', () => {
  it('finds a stored record by id, ignoring case', () => {
    const record = saveRegistration(baseRegistration)
    expect(findRegistration(record.id.toLowerCase())?.email).toBe('test@example.com')
  })

  it('finds a stored record by email', () => {
    saveRegistration(baseRegistration)
    expect(findRegistration('TEST@EXAMPLE.COM')?.fullName).toBe('Test Delegate')
  })

  it('returns undefined for unknown queries', () => {
    expect(findRegistration('EXP-NOPE')).toBeUndefined()
  })
})

describe('announcements', () => {
  it('starts empty', () => {
    expect(getAnnouncements()).toHaveLength(0)
  })

  it('returns published announcements newest first', () => {
    publishAnnouncement('First', 'Body one')
    publishAnnouncement('Second', 'Body two')
    const all = getAnnouncements()
    expect(all).toHaveLength(2)
    const dates = all.map((a) => a.publishedAt)
    expect(dates).toEqual([...dates].sort().reverse())
  })
})
