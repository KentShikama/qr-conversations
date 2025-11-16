import { Message } from '@/lib/locations'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

interface MessageCardProps {
  message: Message
  index: number
}

export function MessageCard({ message, index }: MessageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="bg-card border border-border rounded-lg p-4 space-y-2"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-card-foreground leading-relaxed flex-1">
          {message.text}
        </p>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
        {message.author && (
          <>
            <span className="text-accent">{message.author}</span>
            <span>•</span>
          </>
        )}
        <span>{format(message.timestamp, 'MMM d, yyyy h:mm a')}</span>
      </div>
    </motion.div>
  )
}
