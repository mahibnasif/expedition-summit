export interface Committee {
  id: string
  name: string
  abbreviation: string
  topic: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  size: number
  chair: string
  description: string
}

/** Placeholder committee lineup for the demo build. */
export const committees: Committee[] = [
  {
    id: 'ga1',
    name: 'General Assembly First Committee',
    abbreviation: 'GA1 · DISEC',
    topic: 'Regulating autonomous weapons systems',
    level: 'Beginner',
    size: 60,
    chair: 'Sofia Marino',
    description:
      'A classic large-committee experience covering disarmament and international security. Ideal for first-time delegates learning parliamentary procedure.',
  },
  {
    id: 'ecosoc',
    name: 'Economic and Social Council',
    abbreviation: 'ECOSOC',
    topic: 'Financing climate adaptation in developing economies',
    level: 'Beginner',
    size: 45,
    chair: 'Ravi Chandra',
    description:
      'Delegates negotiate funding frameworks and development policy with an emphasis on consensus building and resolution writing.',
  },
  {
    id: 'unhrc',
    name: 'Human Rights Council',
    abbreviation: 'UNHRC',
    topic: 'Digital surveillance and the right to privacy',
    level: 'Intermediate',
    size: 40,
    chair: 'Elena Petrova',
    description:
      'A mid-size committee balancing state security arguments against individual rights, with moderated caucuses driving fast-paced debate.',
  },
  {
    id: 'who',
    name: 'World Health Organization',
    abbreviation: 'WHO',
    topic: 'Global pandemic preparedness and equitable vaccine access',
    level: 'Intermediate',
    size: 40,
    chair: 'Marcus Cole',
    description:
      'Delegates draft actionable health policy while managing competing national interests and limited resources.',
  },
  {
    id: 'unsc',
    name: 'United Nations Security Council',
    abbreviation: 'UNSC',
    topic: 'Maritime security in contested waters',
    level: 'Advanced',
    size: 15,
    chair: 'Sofia Marino',
    description:
      'A small, high-intensity committee where veto powers, bloc politics, and midnight crises test experienced delegates.',
  },
  {
    id: 'jcc',
    name: 'Joint Crisis Committee',
    abbreviation: 'JCC',
    topic: 'The Fractured Accord — a two-cabinet crisis simulation',
    level: 'Advanced',
    size: 30,
    chair: 'Noah Bennett',
    description:
      'Two competing cabinets respond to a continuous crisis arc with directives, covert actions, and a live crisis staff.',
  },
]
