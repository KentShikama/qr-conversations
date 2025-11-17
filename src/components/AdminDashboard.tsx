import { useEffect, useState } from 'react'
import { Message, LOCATIONS } from '@/lib/locations'
import { MessageCard } from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Eye, SignOut, ChatCircle } from '@phosphor-icons/react'
import { ScrollArea } from '@/components/ui/scroll-area'

interface AdminDashboardProps {
  onExit: () => void
}

export function AdminDashboard({ onExit }: AdminDashboardProps) {
  const [user, setUser] = useState<any>(null)
  const [allMessages, setAllMessages] = useState<Record<number, Message[]>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await window.spark.user()
        setUser(userData)
        await loadAllMessages()
      } catch (error) {
        console.error('Error loading admin dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [onExit])

  const loadAllMessages = async () => {
    const messagesMap: Record<number, Message[]> = {}
    
    for (const location of LOCATIONS) {
      try {
        const messages = await window.spark.kv.get<Message[]>(`messages_${location.id}`)
        messagesMap[location.id] = messages || []
      } catch (error) {
        messagesMap[location.id] = []
      }
    }
    
    setAllMessages(messagesMap)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const totalMessages = Object.values(allMessages).reduce((sum, msgs) => sum + msgs.length, 0)

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold font-mono">Admin Dashboard</h1>
            {user && <p className="text-muted-foreground">Welcome, {user.login}</p>}
          </div>
          <Button onClick={onExit} variant="outline">
            <SignOut className="mr-2" />
            Exit Admin
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Messages</p>
              <p className="text-3xl font-bold text-accent">{totalMessages}</p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active Locations</p>
              <p className="text-3xl font-bold text-accent">
                {Object.values(allMessages).filter(msgs => msgs.length > 0).length}
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Locations</p>
              <p className="text-3xl font-bold text-accent">{LOCATIONS.length}</p>
            </div>
          </Card>
        </div>

        <Tabs defaultValue={LOCATIONS[0].id.toString()} className="w-full">
          <ScrollArea className="w-full">
            <TabsList className="w-full justify-start">
              {LOCATIONS.map((location) => (
                <TabsTrigger key={location.id} value={location.id.toString()} className="flex items-center gap-2">
                  <ChatCircle size={16} weight={allMessages[location.id]?.length > 0 ? 'fill' : 'regular'} />
                  Location #{location.id}
                  {allMessages[location.id]?.length > 0 && (
                    <span className="ml-1 text-xs bg-accent text-accent-foreground rounded-full px-2 py-0.5">
                      {allMessages[location.id].length}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          {LOCATIONS.map((location) => (
            <TabsContent key={location.id} value={location.id.toString()} className="space-y-4 mt-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold font-mono">Location #{location.id}</h2>
                <p className="text-sm text-muted-foreground">
                  {allMessages[location.id]?.length || 0} message{allMessages[location.id]?.length === 1 ? '' : 's'}
                </p>
              </div>

              {!allMessages[location.id] || allMessages[location.id].length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No messages yet at this location</p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {allMessages[location.id]
                    .sort((a, b) => b.timestamp - a.timestamp)
                    .map((message, index) => (
                      <MessageCard key={message.id} message={message} index={index} />
                    ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
