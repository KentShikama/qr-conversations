import { useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Message, LOCATIONS, getLocationById } from '@/lib/locations'
import { MessageCard } from '@/components/MessageCard'
import { MessageComposer } from '@/components/MessageComposer'
import { TreasureHunt } from '@/components/TreasureHunt'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { MapPin, ArrowLeft } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface LocationViewProps {
  locationId: number
  onBack: () => void
}

export function LocationView({ locationId, onBack }: LocationViewProps) {
  const location = getLocationById(locationId)
  const [messages, setMessages] = useKV<Message[]>(`messages_${locationId}`, [])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [locationId])

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold font-mono">Location Not Found</h1>
          <p className="text-muted-foreground">
            This QR code doesn't seem to be valid. Make sure you scanned a QR Conversations code!
          </p>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmitMessage = async (text: string, author?: string) => {
    setIsSubmitting(true)
    
    try {
      const newMessage: Message = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        locationId,
        text,
        author,
        timestamp: Date.now(),
      }

      setMessages((current) => [...(current || []), newMessage])
      
      toast.success('Message posted!', {
        description: 'Your message has been added to this location.',
      })
    } catch (error) {
      toast.error('Failed to post message', {
        description: 'Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="mr-2" />
          Back
        </Button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <MapPin className="text-accent" size={32} weight="fill" />
            <h1 className="text-3xl font-bold font-mono">{location.name}</h1>
          </div>
          <p className="text-muted-foreground text-lg">{location.description}</p>
          <p className="text-xs font-mono text-muted-foreground">Location #{location.id}</p>
        </motion.div>

        <TreasureHunt currentLocationId={locationId} />

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Messages from Visitors</h2>
          
          {!messages || messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-card border border-border rounded-lg p-8 text-center"
            >
              <p className="text-muted-foreground">
                No messages yet. Be the first to leave one!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {messages
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((message, index) => (
                  <MessageCard key={message.id} message={message} index={index} />
                ))}
            </div>
          )}
        </div>

        <MessageComposer
          locationId={locationId}
          onSubmit={handleSubmitMessage}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}
