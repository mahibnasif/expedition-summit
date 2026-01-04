/**
 * Demo-mode data layer backed by localStorage.
 * Swap these functions for Supabase (or another backend) when the
 * project moves past the prototype stage — the rest of the app only
 * talks to this module.
 */

export type Role = 'delegate' | 'chair' | 'attendee' | 'volunteer' | 'speaker'

export interface RegistrationRecord {
  id: string
  createdAt: string
  role: Role
  fullName: string
  email: string
  phone?: string
  organization: string
  educationLevel: string
  committeePreferences?: string[]
  experience?: string
  caseCompetition?: boolean
  teamName?: string
  availability?: string
  sessionTopic?: string
  dietary?: string
  accessibility?: string
}

export interface Announcement {
  id: string
  title: string
  body: string
  publishedAt: string
}

export interface PositionPaper {
  registrationId: string
  committee: string
  content: string
  submittedAt: string
}

const REGISTRATIONS_KEY = 'expedition.registrations'
const ANNOUNCEMENTS_KEY = 'expedition.announcements'
const PAPERS_KEY = 'expedition.positionPapers'

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

function generateId() {
  const code = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `EXP-2027-${code}`
}

/** Sample records so the portal and dashboard are never empty in demo mode. */
export const seedRegistrations: RegistrationRecord[] = [
  {
    id: 'EXP-2027-DEMO',
    createdAt: '2026-07-01T10:00:00.000Z',
    role: 'delegate',
    fullName: 'Alex Demo',
    email: 'alex@example.com',
    organization: 'Riverside High School',
    educationLevel: 'High school',
    committeePreferences: ['UNSC', 'UNHRC', 'GA1 · DISEC'],
    experience: '3–5 conferences',
    dietary: 'Vegetarian',
  },
  {
    id: 'EXP-2027-S4MP',
    createdAt: '2026-07-03T15:30:00.000Z',
    role: 'attendee',
    fullName: 'Jordan Sample',
    email: 'jordan@example.com',
    organization: 'Lakeview University',
    educationLevel: 'Undergraduate',
    caseCompetition: true,
    teamName: 'Northline Strategy',
  },
  {
    id: 'EXP-2027-V0LN',
    createdAt: '2026-07-05T09:15:00.000Z',
    role: 'volunteer',
    fullName: 'Sam Placeholder',
    email: 'sam@example.com',
    organization: 'Lakeview University',
    educationLevel: 'Undergraduate',
    availability: 'Both days',
  },
]

export const seedAnnouncements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Background guides are live',
    body: 'All six committee background guides are now available. Position papers are due two weeks before the conference.',
    publishedAt: '2026-07-10T12:00:00.000Z',
  },
  {
    id: 'ann-2',
    title: 'Early registration extended',
    body: 'By popular demand, early registration pricing now runs through the end of the month.',
    publishedAt: '2026-07-18T12:00:00.000Z',
  },
]

export function getRegistrations(): RegistrationRecord[] {
  return [...seedRegistrations, ...read<RegistrationRecord[]>(REGISTRATIONS_KEY, [])]
}

export function saveRegistration(
  data: Omit<RegistrationRecord, 'id' | 'createdAt'>,
): RegistrationRecord {
  const record: RegistrationRecord = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  const stored = read<RegistrationRecord[]>(REGISTRATIONS_KEY, [])
  write(REGISTRATIONS_KEY, [...stored, record])
  return record
}

export function findRegistration(query: string): RegistrationRecord | undefined {
  const q = query.trim().toLowerCase()
  return getRegistrations().find(
    (r) => r.id.toLowerCase() === q || r.email.toLowerCase() === q,
  )
}

export function getAnnouncements(): Announcement[] {
  const all = [...seedAnnouncements, ...read<Announcement[]>(ANNOUNCEMENTS_KEY, [])]
  return all.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function publishAnnouncement(title: string, body: string): Announcement {
  const announcement: Announcement = {
    id: `ann-${Date.now()}`,
    title,
    body,
    publishedAt: new Date().toISOString(),
  }
  const stored = read<Announcement[]>(ANNOUNCEMENTS_KEY, [])
  write(ANNOUNCEMENTS_KEY, [...stored, announcement])
  return announcement
}

export function getPositionPaper(registrationId: string): PositionPaper | undefined {
  return read<PositionPaper[]>(PAPERS_KEY, []).find(
    (p) => p.registrationId === registrationId,
  )
}

/** Saves or replaces the delegate's position paper. */
export function submitPositionPaper(
  registrationId: string,
  committee: string,
  content: string,
): PositionPaper {
  const paper: PositionPaper = {
    registrationId,
    committee,
    content,
    submittedAt: new Date().toISOString(),
  }
  const others = read<PositionPaper[]>(PAPERS_KEY, []).filter(
    (p) => p.registrationId !== registrationId,
  )
  write(PAPERS_KEY, [...others, paper])
  return paper
}
