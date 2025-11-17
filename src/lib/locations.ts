export interface Message {
  id: string
  locationId: number
  text: string
  timestamp: number
}

export interface Location {
  id: number
}

export const TOTAL_LOCATIONS = 10

export const LOCATIONS: Location[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
]

export function encodeLocationId(id: number): string {
  const base64 = btoa(id.toString())
  return `q${base64.replace(/=/g, '')}`
}

export function decodeLocationId(encoded: string): number | null {
  try {
    if (!encoded.startsWith('q')) {
      return null
    }
    
    const base64 = encoded.slice(1)
    const padding = '='.repeat((4 - base64.length % 4) % 4)
    const decoded = atob(base64 + padding)
    const id = parseInt(decoded, 10)
    
    if (isNaN(id) || id < 1 || id > TOTAL_LOCATIONS) {
      return null
    }
    
    return id
  } catch {
    return null
  }
}

export function getLocationById(id: number): Location | undefined {
  return LOCATIONS.find(loc => loc.id === id)
}

export function generateLocationUrl(id: number): string {
  const encoded = encodeLocationId(id)
  return `${window.location.origin}/#/${encoded}`
}
