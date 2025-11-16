export interface Message {
  id: string
  locationId: number
  text: string
  author?: string
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
  const str = `qrconversations_location_${id}`
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export function decodeLocationId(encoded: string): number | null {
  try {
    const padded = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(encoded.length + (4 - (encoded.length % 4)) % 4, '=')
    
    const decoded = atob(padded)
    const match = decoded.match(/^qrconversations_location_(\d+)$/)
    
    if (match) {
      const id = parseInt(match[1], 10)
      if (id >= 1 && id <= TOTAL_LOCATIONS) {
        return id
      }
    }
    return null
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
