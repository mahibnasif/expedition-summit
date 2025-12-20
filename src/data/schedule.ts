export interface ScheduleItem {
  time: string
  title: string
  location: string
  track: 'summit' | 'mun' | 'both'
}

export interface ScheduleDay {
  id: string
  label: string
  date: string
  items: ScheduleItem[]
}

/** Placeholder schedule for the demo build. */
export const schedule: ScheduleDay[] = [
  {
    id: 'day-1',
    label: 'Day 1',
    date: 'Saturday, March 13',
    items: [
      { time: '8:00 AM', title: 'Check-in & badge pickup', location: 'Main Lobby', track: 'both' },
      { time: '9:00 AM', title: 'Opening ceremony', location: 'Grand Hall', track: 'both' },
      { time: '9:45 AM', title: 'Keynote: Leading through uncertainty — Amara Osei', location: 'Grand Hall', track: 'summit' },
      { time: '10:00 AM', title: 'First-timer clinic: rules of procedure', location: 'Room 204', track: 'mun' },
      { time: '10:30 AM', title: 'Committee session I', location: 'Committee rooms', track: 'mun' },
      { time: '11:00 AM', title: 'Case competition prompt release', location: 'Innovation Lab', track: 'summit' },
      { time: '12:30 PM', title: 'Lunch', location: 'Terrace Pavilion', track: 'both' },
      { time: '1:30 PM', title: 'Workshop: From user research to roadmap — Daniel Reyes', location: 'Innovation Lab', track: 'summit' },
      { time: '1:30 PM', title: 'Committee session II', location: 'Committee rooms', track: 'mun' },
      { time: '3:30 PM', title: 'Panel: Breaking into strategy & consulting', location: 'Grand Hall', track: 'summit' },
      { time: '5:00 PM', title: 'Committee session III', location: 'Committee rooms', track: 'mun' },
      { time: '7:00 PM', title: 'Delegate & attendee social', location: 'Terrace Pavilion', track: 'both' },
    ],
  },
  {
    id: 'day-2',
    label: 'Day 2',
    date: 'Sunday, March 14',
    items: [
      { time: '8:30 AM', title: 'Doors open', location: 'Main Lobby', track: 'both' },
      { time: '9:00 AM', title: 'Committee session IV', location: 'Committee rooms', track: 'mun' },
      { time: '9:00 AM', title: 'Fireside chat: Bootstrapping Fieldnote — James Park', location: 'Grand Hall', track: 'summit' },
      { time: '10:30 AM', title: 'Case competition: final presentations', location: 'Grand Hall', track: 'summit' },
      { time: '12:00 PM', title: 'Lunch', location: 'Terrace Pavilion', track: 'both' },
      { time: '1:00 PM', title: 'Committee session V — final votes', location: 'Committee rooms', track: 'mun' },
      { time: '2:30 PM', title: 'Networking mixer with speakers & judges', location: 'Terrace Pavilion', track: 'summit' },
      { time: '4:00 PM', title: 'Closing ceremony & awards', location: 'Grand Hall', track: 'both' },
    ],
  },
]
