export interface Sponsor {
  id: string
  name: string
  tier: 'Platinum' | 'Gold' | 'Community'
  blurb: string
}

/** Placeholder sponsor list for the demo build. */
export const sponsors: Sponsor[] = [
  {
    id: 'northbridge',
    name: 'Northbridge Ventures',
    tier: 'Platinum',
    blurb: 'Early-stage venture fund backing student and first-time founders.',
  },
  {
    id: 'meridian',
    name: 'Meridian Consulting Group',
    tier: 'Platinum',
    blurb: 'Strategy consultancy and host of the case competition judging panel.',
  },
  {
    id: 'loomline',
    name: 'Loomline',
    tier: 'Gold',
    blurb: 'Collaboration platform powering the organizing team\u2019s workflows.',
  },
  {
    id: 'fieldnote',
    name: 'Fieldnote',
    tier: 'Gold',
    blurb: 'Research tools startup founded by summit speaker James Park.',
  },
  {
    id: 'campus-coffee',
    name: 'Campus Coffee Co.',
    tier: 'Community',
    blurb: 'Keeping delegates caffeinated through five committee sessions.',
  },
  {
    id: 'cityprint',
    name: 'CityPrint Studio',
    tier: 'Community',
    blurb: 'Printing partner for badges, placards, and event signage.',
  },
]
