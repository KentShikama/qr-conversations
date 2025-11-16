import { useKV } from '@github/spark/hooks'
import { TOTAL_LOCATIONS, LOCATIONS } from '@/lib/locations'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, MapPin } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface TreasureHuntProps {
  currentLocationId: number
}

export function TreasureHunt({ currentLocationId }: TreasureHuntProps) {
  const [visitedLocations, setVisitedLocations] = useKV<number[]>('visited-locations', [])

  const visited = visitedLocations || []
  const hasVisited = visited.includes(currentLocationId)
  
  if (!hasVisited) {
    setVisitedLocations((current) => [...(current || []), currentLocationId])
  }

  const progress = (visited.length / TOTAL_LOCATIONS) * 100
  const allFound = visited.length === TOTAL_LOCATIONS

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-lg p-6 space-y-4"
    >
      <div className="flex items-center gap-3">
        <Trophy className="text-accent" size={24} weight="fill" />
        <h2 className="text-xl font-bold font-mono">Treasure Hunt</h2>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-accent font-mono font-bold">
            {visited.length}/{TOTAL_LOCATIONS}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {allFound ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-accent/10 border border-accent rounded-lg p-4 text-center space-y-2"
        >
          <Trophy className="mx-auto text-accent" size={48} weight="fill" />
          <h3 className="font-bold text-lg">Congratulations!</h3>
          <p className="text-sm text-muted-foreground">
            You've found all {TOTAL_LOCATIONS} locations! Contact the creator to claim your prize.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Find all {TOTAL_LOCATIONS} QR codes around Tokyo to win!
          </p>
          <div className="grid grid-cols-2 gap-2">
            {LOCATIONS.map((location) => {
              const isVisited = visited.includes(location.id)
              return (
                <Badge
                  key={location.id}
                  variant={isVisited ? 'default' : 'outline'}
                  className={isVisited ? 'bg-accent text-accent-foreground' : 'opacity-50'}
                >
                  <MapPin className="mr-1" size={14} weight={isVisited ? 'fill' : 'regular'} />
                  {location.id}
                </Badge>
              )
            })}
          </div>
        </div>
      )}
    </motion.div>
  )
}
