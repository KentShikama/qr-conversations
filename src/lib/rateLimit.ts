const RATE_LIMIT_MS = 5 * 60 * 1000

export function canPostMessage(locationId: number): boolean {
  const key = `lastPost_${locationId}`
  const lastPost = localStorage.getItem(key)
  
  if (!lastPost) {
    return true
  }
  
  const lastPostTime = parseInt(lastPost, 10)
  const now = Date.now()
  
  return now - lastPostTime >= RATE_LIMIT_MS
}

export function recordMessagePost(locationId: number): void {
  const key = `lastPost_${locationId}`
  localStorage.setItem(key, Date.now().toString())
}

export function getTimeUntilNextPost(locationId: number): number {
  const key = `lastPost_${locationId}`
  const lastPost = localStorage.getItem(key)
  
  if (!lastPost) {
    return 0
  }
  
  const lastPostTime = parseInt(lastPost, 10)
  const now = Date.now()
  const timeRemaining = RATE_LIMIT_MS - (now - lastPostTime)
  
  return Math.max(0, Math.ceil(timeRemaining / 1000))
}
