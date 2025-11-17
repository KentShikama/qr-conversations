import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { PaperPlaneRight } from '@phosphor-icons/react'

interface MessageComposerProps {
  locationId: number
  onSubmit: (text: string) => void
  isSubmitting: boolean
}

const MAX_CHARS = 500

export function MessageComposer({ onSubmit, isSubmitting }: MessageComposerProps) {
  const [text, setText] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!text.trim() || isSubmitting) return
    
    await onSubmit(text.trim())
    setText('')
  }

  const charsRemaining = MAX_CHARS - text.length
  const isOverLimit = charsRemaining < 0

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="message" className="text-base">
          あなたのメッセージ
        </Label>
        <Textarea
          id="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="次の方へメッセージを残してください..."
          rows={5}
          disabled={isSubmitting}
          className="bg-background border-input resize-none text-base"
        />
        <div className={`text-xs text-right font-mono ${
          isOverLimit ? 'text-destructive' : 
          charsRemaining < 50 ? 'text-accent' : 
          'text-muted-foreground'
        }`}>
          {charsRemaining}文字
        </div>
      </div>

      <Button
        type="submit"
        disabled={!text.trim() || isOverLimit || isSubmitting}
        className="w-full glow-accent-hover transition-all"
        size="lg"
      >
        <PaperPlaneRight className="mr-2" />
        {isSubmitting ? '送信中...' : 'メッセージを送る'}
      </Button>
    </form>
  )
}
