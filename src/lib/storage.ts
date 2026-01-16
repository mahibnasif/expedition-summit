/**
 * Browser-local data layer backed by localStorage.
 * Swap these functions for Supabase (or another backend) to persist
 * registrations centrally — the rest of the app only talks to this module.
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
  experience?: string
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

const REGISTRATIONS_KEY = 'expedition.registrations'
const ANNOUNCEMENTS_KEY = 'expedition.announcements'

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
  const code = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `EXP-${code}`
}

export function getRegistrations(): RegistrationRecord[] {
  return read<RegistrationRecord[]>(REGISTRATIONS_KEY, [])
}

export function saveRegistration(
  data: Omit<RegistrationRecord, 'id' | 'createdAt'>,
): RegistrationRecord {
  const record: RegistrationRecord = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  }
  write(REGISTRATIONS_KEY, [...getRegistrations(), record])
  return record
}

export function findRegistration(query: string): RegistrationRecord | undefined {
  const q = query.trim().toLowerCase()
  return getRegistrations().find(
    (r) => r.id.toLowerCase() === q || r.email.toLowerCase() === q,
  )
}

export function getAnnouncements(): Announcement[] {
  return read<Announcement[]>(ANNOUNCEMENTS_KEY, []).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  )
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
