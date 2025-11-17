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
  const hex = id.toString(16).padStart(2, '0')
  return `t${hex}`
}

export function decodeLocationId(encoded: string): number | null {
  try {
    if (!encoded.startsWith('t')) {
      return null
    }
    
    const hex = encoded.slice(1)
    const id = parseInt(hex, 16)
    
    if (id >= 1 && id <= TOTAL_LOCATIONS) {
      return id
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
