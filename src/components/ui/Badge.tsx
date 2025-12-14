import type { ReactNode } from 'react'

const tones = {
  gold: 'bg-gold-100 text-gold-800',
  navy: 'bg-navy-100 text-navy-800',
  green: 'bg-emerald-100 text-emerald-800',
  slate: 'bg-slate-100 text-slate-700',
} as const

export default function Badge({
  children,
  tone = 'navy',
}: {
  children: ReactNode
  tone?: keyof typeof tones
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
