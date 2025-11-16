export interface Message {
  id: string
  locationId: number
  text: string
  author?: string
  timestamp: number
}

export interface Location {
  id: number
  name: string
  description: string
}

export const TOTAL_LOCATIONS = 10

export const LOCATIONS: Location[] = [
  { id: 1, name: "Shibuya Crossing", description: "The world's busiest intersection" },
  { id: 2, name: "Senso-ji Temple", description: "Ancient Buddhist temple in Asakusa" },
  { id: 3, name: "Tokyo Skytree", description: "Towering above the city" },
  { id: 4, name: "Meiji Shrine", description: "Peaceful forest sanctuary" },
  { id: 5, name: "Tsukiji Outer Market", description: "Fresh seafood and street food" },
  { id: 6, name: "Harajuku Takeshita Street", description: "Youth culture and fashion" },
  { id: 7, name: "Akihabara Electric Town", description: "Tech and anime paradise" },
  { id: 8, name: "Roppongi Hills", description: "Art, shopping, and views" },
  { id: 9, name: "Ueno Park", description: "Museums and cherry blossoms" },
  { id: 10, name: "Odaiba Waterfront", description: "Futuristic entertainment district" },
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
