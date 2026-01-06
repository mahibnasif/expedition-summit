import { beforeEach, describe, expect, it } from 'vitest'
import {
  findRegistration,
  getAnnouncements,
  getPositionPaper,
  getRegistrations,
  publishAnnouncement,
  saveRegistration,
  seedRegistrations,
  submitPositionPaper,
} from './storage'

const baseRegistration = {
  role: 'delegate' as const,
  fullName: 'Test Delegate',
  email: 'test@example.com',
  organization: 'Test High School',
  educationLevel: 'High school',
  committeePreferences: ['UNSC', 'WHO', 'ECOSOC'],
}

beforeEach(() => {
  localStorage.clear()
})

describe('saveRegistration', () => {
  it('returns a record with a generated id and timestamp', () => {
    const record = saveRegistration(baseRegistration)
    expect(record.id).toMatch(/^EXP-2027-[A-Z0-9]{4}$/)
    expect(new Date(record.createdAt).getTime()).not.toBeNaN()
  })

  it('persists the record alongside seed data', () => {
    const record = saveRegistration(baseRegistration)
    const all = getRegistrations()
    expect(all).toHaveLength(seedRegistrations.length + 1)
    expect(all.map((r) => r.id)).toContain(record.id)
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

  it('finds the seeded demo registration', () => {
    expect(findRegistration('EXP-2027-DEMO')?.fullName).toBe('Alex Demo')
  })

  it('returns undefined for unknown queries', () => {
    expect(findRegistration('EXP-0000-NOPE')).toBeUndefined()
  })
})

describe('announcements', () => {
  it('includes published announcements sorted newest first', () => {
    publishAnnouncement('Test title', 'Test body')
    const all = getAnnouncements()
    expect(all[0].title).toBe('Test title')
    const dates = all.map((a) => a.publishedAt)
    expect(dates).toEqual([...dates].sort().reverse())
  })
})

describe('position papers', () => {
  it('stores and retrieves a paper by registration id', () => {
    submitPositionPaper('EXP-2027-DEMO', 'UNSC', 'My position paper text.')
    expect(getPositionPaper('EXP-2027-DEMO')?.committee).toBe('UNSC')
  })

  it('replaces an existing paper for the same registration', () => {
    submitPositionPaper('EXP-2027-DEMO', 'UNSC', 'First draft')
    submitPositionPaper('EXP-2027-DEMO', 'UNSC', 'Final draft')
    expect(getPositionPaper('EXP-2027-DEMO')?.content).toBe('Final draft')
  })

  it('returns undefined when no paper was submitted', () => {
    expect(getPositionPaper('EXP-2027-XXXX')).toBeUndefined()
  })
})
