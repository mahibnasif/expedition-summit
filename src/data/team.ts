export interface TeamMember {
  id: string
  name: string
  role: string
  department: 'Leadership' | 'MUN Secretariat' | 'Summit Team' | 'Operations'
  bio: string
  initials: string
}

/** Placeholder organizing team for the demo build. */
export const team: TeamMember[] = [
  {
    id: 'founder-1',
    name: 'Rayan Chowdhury',
    role: 'Co-Founder & Event Director',
    department: 'Leadership',
    bio: 'Oversees the combined event and keeps both tracks moving in the same direction.',
    initials: 'RC',
  },
  {
    id: 'founder-2',
    name: 'Nadia Islam',
    role: 'Co-Founder & Partnerships Lead',
    department: 'Leadership',
    bio: 'Runs sponsor relations, speaker outreach, and the budget that makes it all real.',
    initials: 'NI',
  },
  {
    id: 'sg',
    name: 'Lena Vogel',
    role: 'Secretary-General',
    department: 'MUN Secretariat',
    bio: 'Leads the secretariat and sets the academic direction for all six committees.',
    initials: 'LV',
  },
  {
    id: 'dg',
    name: 'Omar Haddad',
    role: 'Director-General',
    department: 'MUN Secretariat',
    bio: 'Owns committee operations, chair training, and crisis logistics.',
    initials: 'OH',
  },
  {
    id: 'usg-delegate',
    name: 'Grace Lin',
    role: 'USG Delegate Affairs',
    department: 'MUN Secretariat',
    bio: 'Handles registrations, country assignments, and delegate communication.',
    initials: 'GL',
  },
  {
    id: 'summit-lead',
    name: 'Tomas Rivera',
    role: 'Summit Program Lead',
    department: 'Summit Team',
    bio: 'Curates the keynote, panel, and workshop lineup for the business track.',
    initials: 'TR',
  },
  {
    id: 'case-lead',
    name: 'Aisha Karim',
    role: 'Case Competition Lead',
    department: 'Summit Team',
    bio: 'Writes the case, recruits judges, and runs the competition day-of.',
    initials: 'AK',
  },
  {
    id: 'ops-lead',
    name: 'Ben Okafor',
    role: 'Operations Lead',
    department: 'Operations',
    bio: 'Venue, catering, signage, AV, and the volunteer crew that holds it together.',
    initials: 'BO',
  },
  {
    id: 'design-lead',
    name: 'Dana Whitfield',
    role: 'Design & Communications Lead',
    department: 'Operations',
    bio: 'Owns the event brand, social announcements, and printed materials.',
    initials: 'DW',
  },
]
