import { useEffect } from 'react'

export function useTrackVisitor(page: string) {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page }),
        })
      } catch (error) {
        // Silently fail - don't break the app for tracking errors
        console.error('Failed to track visitor:', error)
      }
    }

    trackVisitor()
  }, [page])
}
