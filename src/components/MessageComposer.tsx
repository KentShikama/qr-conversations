import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PaperPlaneRight } from '@phosphor-icons/react'
import { canPostMessage, recordMessagePost, getTimeUntilNextPost } from '@/lib/rateLimit'

interface MessageComposerProps {
  locationId: number
  onSubmit: (text: string, author?: string) => void
  isSubmitting: boolean
}

const MAX_CHARS = 500

export function MessageComposer({ locationId, onSubmit, isSubmitting }: MessageComposerProps) {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [canPost, setCanPost] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(0)

  useEffect(() => {
    const checkRateLimit = () => {
      const allowed = canPostMessage(locationId)
      setCanPost(allowed)
      
      if (!allowed) {
        const remaining = getTimeUntilNextPost(locationId)
        setTimeRemaining(remaining)
      }
    }

    checkRateLimit()
    const interval = setInterval(checkRateLimit, 1000)
    return () => clearInterval(interval)
  }, [locationId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!text.trim() || !canPost || isSubmitting) return
    
    await onSubmit(text.trim(), author.trim() || undefined)
    recordMessagePost(locationId)
    setText('')
    setAuthor('')
    setCanPost(false)
  }

  const charsRemaining = MAX_CHARS - text.length
  const isOverLimit = charsRemaining < 0

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-lg p-4">
      <div className="space-y-2">
        <Label htmlFor="author" className="text-sm text-muted-foreground">
          Name (optional)
        </Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Anonymous"
          maxLength={30}
          disabled={!canPost || isSubmitting}
          className="bg-background border-input"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm text-muted-foreground">
          Your message
        </Label>
        <Textarea
          id="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Leave a message for the next visitor..."
          rows={4}
          disabled={!canPost || isSubmitting}
          className="bg-background border-input resize-none"
        />
        <div className={`text-xs text-right font-mono ${
          isOverLimit ? 'text-destructive' : 
          charsRemaining < 50 ? 'text-accent' : 
          'text-muted-foreground'
        }`}>
          {charsRemaining} characters remaining
        </div>
      </div>

      {!canPost && timeRemaining > 0 && (
        <div className="text-sm text-muted-foreground text-center py-2">
          Please wait {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')} before posting again
        </div>
      )}

      <Button
        type="submit"
        disabled={!text.trim() || isOverLimit || !canPost || isSubmitting}
        className="w-full glow-accent-hover transition-all"
      >
        <PaperPlaneRight className="mr-2" />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
