export interface Speaker {
  id: string
  name: string
  role: string
  organization: string
  track: 'summit' | 'mun'
  bio: string
  initials: string
}

/** Placeholder speaker roster for the demo build. */
export const speakers: Speaker[] = [
  {
    id: 'amara-osei',
    name: 'Amara Osei',
    role: 'Founder & CEO',
    organization: 'Northbridge Ventures',
    track: 'summit',
    bio: 'Amara leads an early-stage venture fund focused on student and first-time founders, and opens the summit with a keynote on resilient leadership.',
    initials: 'AO',
  },
  {
    id: 'daniel-reyes',
    name: 'Daniel Reyes',
    role: 'Head of Product',
    organization: 'Loomline',
    track: 'summit',
    bio: 'Daniel runs product at a fast-growing collaboration platform and hosts the workshop on turning user research into roadmaps.',
    initials: 'DR',
  },
  {
    id: 'priya-raman',
    name: 'Priya Raman',
    role: 'Director of Strategy',
    organization: 'Meridian Consulting Group',
    track: 'summit',
    bio: 'Priya advises Fortune 500 clients on market entry and judges the case competition final round.',
    initials: 'PR',
  },
  {
    id: 'james-park',
    name: 'James Park',
    role: 'Startup Founder',
    organization: 'Fieldnote',
    track: 'summit',
    bio: 'James bootstrapped a research tools company from a dorm room and shares candid lessons in the founder fireside chat.',
    initials: 'JP',
  },
  {
    id: 'lena-vogel',
    name: 'Lena Vogel',
    role: 'Secretary-General',
    organization: 'Expedition MUN 2027',
    track: 'mun',
    bio: 'Lena has chaired twelve conferences across three circuits and leads this year\u2019s secretariat.',
    initials: 'LV',
  },
  {
    id: 'omar-haddad',
    name: 'Omar Haddad',
    role: 'Director-General',
    organization: 'Expedition MUN 2027',
    track: 'mun',
    bio: 'Omar oversees committee operations and crisis design, bringing experience from national and international circuits.',
    initials: 'OH',
  },
  {
    id: 'sofia-marino',
    name: 'Sofia Marino',
    role: 'Chair, Security Council',
    organization: 'Expedition MUN 2027',
    track: 'mun',
    bio: 'Sofia chairs the Security Council and hosts the position-paper writing clinic for first-time delegates.',
    initials: 'SM',
  },
  {
    id: 'noah-bennett',
    name: 'Noah Bennett',
    role: 'Crisis Director',
    organization: 'Expedition MUN 2027',
    track: 'mun',
    bio: 'Noah designs the joint crisis committee and has directed award-winning crisis simulations for five years.',
    initials: 'NB',
  },
]
