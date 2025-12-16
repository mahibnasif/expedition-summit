import type { Speaker } from '../data/speakers'
import Badge from './ui/Badge'
import Card from './ui/Card'

export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Card className="flex flex-col">
      <div className="flex items-center gap-4">
        <div
          aria-hidden="true"
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy-900 font-display text-lg font-bold text-gold-400"
        >
          {speaker.initials}
        </div>
        <div>
          <p className="font-display font-semibold text-navy-900">{speaker.name}</p>
          <p className="text-sm text-slate-600">
            {speaker.role} · {speaker.organization}
          </p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm text-slate-600">{speaker.bio}</p>
      <div className="mt-4">
        <Badge tone={speaker.track === 'summit' ? 'gold' : 'navy'}>
          {speaker.track === 'summit' ? 'Business Summit' : 'Model UN'}
        </Badge>
      </div>
    </Card>
  )
}
