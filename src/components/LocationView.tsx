import { useEffect, useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Message, getLocationById } from '@/lib/locations'
import { MessageCard } from '@/components/MessageCard'
import { MessageComposer } from '@/components/MessageComposer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Heart } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface LocationViewProps {
  locationId: number
  onBack: () => void
}

export function LocationView({ locationId, onBack }: LocationViewProps) {
  const location = getLocationById(locationId)
  const [messages, setMessages] = useKV<Message[]>(`messages_${locationId}`, [])
  const [lastSubmittedMessage, setLastSubmittedMessage] = useKV<Message | null>(`last_submitted_${locationId}`, null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [locationId])

  useEffect(() => {
    const hash = window.location.hash
    if (hash.includes('thankyou') && lastSubmittedMessage) {
      setShowThankYou(true)
    }
  }, [lastSubmittedMessage])

  if (!location) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">ロケーションが見つかりません</h1>
          <p className="text-muted-foreground">
            このQRコードは無効です。
          </p>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2" />
            戻る
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmitMessage = async (text: string) => {
    setIsSubmitting(true)
    
    try {
      const newMessage: Message = {
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        locationId,
        text,
        timestamp: Date.now(),
      }

      setMessages((current) => [...(current || []), newMessage])
      setLastSubmittedMessage(newMessage)
      setShowThankYou(true)
      window.location.hash = `/${window.location.hash.split('/')[1]}/thankyou`
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const lastMessage = messages && messages.length > 0 
    ? messages[messages.length - 1] 
    : null

  if (showThankYou && lastSubmittedMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Heart size={80} weight="fill" className="text-accent mx-auto" />
          </motion.div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">メッセージを残しました</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              あなたのメッセージを次の方に届けます。
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="text-sm text-muted-foreground">あなたのメッセージ:</div>
            <MessageCard message={lastSubmittedMessage} index={0} />
          </div>

          <Button 
            onClick={onBack} 
            variant="outline"
            size="lg"
            className="mt-8"
          >
            <ArrowLeft className="mr-2" />
            ホームに戻る
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <Button onClick={onBack} variant="ghost" size="sm">
          <ArrowLeft className="mr-2" />
          戻る
        </Button>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <h2 className="text-xl font-bold">前の人のメッセージ</h2>
            
            {!lastMessage ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">
                  まだメッセージがありません。最初の一人になりましょう！
                </p>
              </div>
            ) : (
              <MessageCard message={lastMessage} index={0} />
            )}
          </motion.div>

          <MessageComposer
            locationId={locationId}
            onSubmit={handleSubmitMessage}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
}
