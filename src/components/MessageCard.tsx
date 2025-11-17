import { Message } from '@/lib/locations'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
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
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-card border border-border rounded-lg p-6 space-y-3 shadow-sm"
    >
      <p className="text-card-foreground leading-relaxed text-lg">
        {message.text}
      </p>
      <div className="text-sm text-muted-foreground font-mono">
        {format(message.timestamp, 'yyyy年M月d日 H:mm', { locale: ja })}
      </div>
    </motion.div>
  )
}
