import { Card } from '@/components/ui/card'
import { LOCATIONS } from '@/lib/locations'
import { QrCode } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface HomeViewProps {
  onViewLocation: (id: number) => void
  onAdminAccess: () => void
}

export function HomeView({ onViewLocation, onAdminAccess }: HomeViewProps) {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 py-20"
        >
          <QrCode className="mx-auto text-accent glow-accent" size={80} weight="fill" />
          <h1 className="text-6xl font-bold font-mono">QR Conversations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A social experiment across Tokyo. Find QR codes hidden around the city, read the last message, and leave your reply for the next person.
          </p>
        </motion.div>

        <div className="text-center space-y-8 py-12">
          <h2 className="text-2xl font-bold font-mono">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 space-y-4 bg-card/50 backdrop-blur">
              <div className="text-5xl">📱</div>
              <h3 className="font-bold text-lg">1. Scan QR Code</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Find and scan QR codes placed around Tokyo
              </p>
            </Card>
            <Card className="p-8 space-y-4 bg-card/50 backdrop-blur">
              <div className="text-5xl">💬</div>
              <h3 className="font-bold text-lg">2. Read & Reply</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Read the last message and reply to continue the conversation
              </p>
            </Card>
            <Card className="p-8 space-y-4 bg-card/50 backdrop-blur">
              <div className="text-5xl">🏆</div>
              <h3 className="font-bold text-lg">3. Win Prize</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Find all {LOCATIONS.length} locations to win a special prize!
              </p>
            </Card>
          </div>
        </div>

        <div 
          className="fixed bottom-4 right-4 w-2 h-2 cursor-pointer opacity-0 hover:opacity-20 transition-opacity"
          onClick={onAdminAccess}
          title="Admin"
        />
      </div>
    </div>
  )
}
