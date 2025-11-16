import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LOCATIONS, encodeLocationId, generateLocationUrl } from '@/lib/locations'
import { QrCode, Eye, MapPin, Copy } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface HomeViewProps {
  onViewLocation: (id: number) => void
  onAdminAccess: () => void
}

export function HomeView({ onViewLocation, onAdminAccess }: HomeViewProps) {
  const copyUrl = (locationId: number) => {
    const url = generateLocationUrl(locationId)
    navigator.clipboard.writeText(url)
    toast.success('URL copied!', {
      description: 'Link copied to clipboard',
    })
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 py-12"
        >
          <QrCode className="mx-auto text-accent glow-accent" size={64} weight="fill" />
          <h1 className="text-5xl font-bold font-mono">QR Conversations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A social experiment across Tokyo. Find QR codes, leave messages, connect with strangers.
          </p>
          <Button onClick={onAdminAccess} variant="outline" className="mt-4">
            <Eye className="mr-2" />
            Admin Access
          </Button>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">All Locations</h2>
          <p className="text-center text-muted-foreground">
            Find these QR codes around Tokyo to participate in the treasure hunt!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6 space-y-4 hover:border-accent transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-accent" size={24} weight="fill" />
                    <div>
                      <h3 className="font-bold text-lg">{location.name}</h3>
                      <p className="text-sm text-muted-foreground">{location.description}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-background rounded p-3 space-y-2">
                  <p className="text-xs font-mono text-muted-foreground">Encoded URL:</p>
                  <p className="text-xs font-mono break-all text-accent">
                    {encodeLocationId(location.id)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => onViewLocation(location.id)}
                    className="flex-1 glow-accent-hover"
                    size="sm"
                  >
                    <QrCode className="mr-2" size={16} />
                    View Location
                  </Button>
                  <Button
                    onClick={() => copyUrl(location.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center space-y-4 py-12">
          <h2 className="text-2xl font-bold font-mono">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 space-y-3">
              <div className="text-4xl">📱</div>
              <h3 className="font-bold">1. Scan QR Code</h3>
              <p className="text-sm text-muted-foreground">
                Find and scan QR codes placed around Tokyo
              </p>
            </Card>
            <Card className="p-6 space-y-3">
              <div className="text-4xl">💬</div>
              <h3 className="font-bold">2. Read & Reply</h3>
              <p className="text-sm text-muted-foreground">
                Read messages from previous visitors and add your own
              </p>
            </Card>
            <Card className="p-6 space-y-3">
              <div className="text-4xl">🏆</div>
              <h3 className="font-bold">3. Win Prize</h3>
              <p className="text-sm text-muted-foreground">
                Find all {LOCATIONS.length} locations to win a special prize!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
