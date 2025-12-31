import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function diff(target: Date): Countdown {
  const ms = target.getTime() - Date.now()
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1_000) % 60,
    isPast: false,
  }
}

/** Ticks once per second toward a target date. */
export function useCountdown(target: Date): Countdown {
  const [value, setValue] = useState(() => diff(target))

  useEffect(() => {
    const interval = setInterval(() => setValue(diff(target)), 1000)
    return () => clearInterval(interval)
  }, [target])

  return value
}
