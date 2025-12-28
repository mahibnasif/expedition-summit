import { useEffect } from 'react'
import { event } from '../data/event'

/** Sets the document title for the current page, restoring context on route change. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${event.shortName}` : event.shortName
  }, [title])
}
