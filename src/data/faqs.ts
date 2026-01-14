export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'Who can participate?',
    answer:
      'High school and university students are welcome across both the business summit and Model UN tracks. No prior experience is required for most programming.',
  },
  {
    question: 'When is the next event?',
    answer:
      'Dates for the next edition have not been announced yet. Register your interest and we will contact you as soon as details are confirmed.',
  },
  {
    question: 'How do I register?',
    answer:
      'Use the registration page to sign up as a delegate, chair, attendee, volunteer, or speaker. It takes about three minutes.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Pricing is announced with each edition. Need-based fee waivers have been available in past seasons — mention it during registration and the team will follow up.',
  },
  {
    question: 'What about dietary restrictions or accessibility needs?',
    answer:
      'Both are collected during registration and go directly to the operations team. You can also contact us any time with specific questions.',
  },
]
