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

const HASH_SALT = 'qr_tokyo_2024'

function simpleHash(input: string): string {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36).padStart(8, '0').slice(0, 8)
}

export function encodeLocationId(id: number): string {
  const baseStr = `${HASH_SALT}_${id}`
  const hash = simpleHash(baseStr)
  const checksum = ((id * 7 + 13) % 97).toString(36).padStart(2, '0')
  return `${hash}${checksum}`
}

export function decodeLocationId(encoded: string): number | null {
  try {
    if (encoded.length !== 10) {
      return null
    }
    
    for (let id = 1; id <= TOTAL_LOCATIONS; id++) {
      if (encodeLocationId(id) === encoded) {
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
