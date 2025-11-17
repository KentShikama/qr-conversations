import { useState, useEffect } from 'react'
import { HomeView } from '@/components/HomeView'
import { LocationView } from '@/components/LocationView'
import { AdminDashboard } from '@/components/AdminDashboard'
import { decodeLocationId, encodeLocationId } from '@/lib/locations'
import { Toaster } from '@/components/ui/sonner'

type View = 'home' | 'location' | 'admin'

function App() {
  const [currentView, setCurrentView] = useState<View>('home')
  const [currentLocationId, setCurrentLocationId] = useState<number | null>(null)

  useEffect(() => {
    const hash = window.location.hash.slice(1).replace(/\/$/, '')
    
    if (hash.startsWith('/admin')) {
      setCurrentView('admin')
    } else if (hash.startsWith('/')) {
      const encoded = hash.slice(1)
      if (encoded) {
        const locationId = decodeLocationId(encoded)
        if (locationId) {
          setCurrentLocationId(locationId)
          setCurrentView('location')
        } else {
          setCurrentView('home')
        }
      } else {
        setCurrentView('home')
      }
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1).replace(/\/$/, '')
      
      if (newHash.startsWith('/admin')) {
        setCurrentView('admin')
      } else if (newHash.startsWith('/')) {
        const encoded = newHash.slice(1)
        if (encoded) {
          const locationId = decodeLocationId(encoded)
          if (locationId) {
            setCurrentLocationId(locationId)
            setCurrentView('location')
          } else {
            setCurrentView('home')
          }
        } else {
          setCurrentView('home')
        }
      } else {
        setCurrentView('home')
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleViewLocation = (id: number) => {
    setCurrentLocationId(id)
    setCurrentView('location')
    window.location.hash = `/${encodeLocationId(id)}`
  }

  const handleGoHome = () => {
    setCurrentView('home')
    setCurrentLocationId(null)
    window.location.hash = ''
  }

  const handleAdminAccess = () => {
    setCurrentView('admin')
    window.location.hash = '/admin'
  }

  const handleExitAdmin = () => {
    setCurrentView('home')
    window.location.hash = ''
  }

  return (
    <>
      {currentView === 'home' && (
        <HomeView onViewLocation={handleViewLocation} onAdminAccess={handleAdminAccess} />
      )}
      
      {currentView === 'location' && currentLocationId && (
        <LocationView locationId={currentLocationId} onBack={handleGoHome} />
      )}
      
      {currentView === 'admin' && (
        <AdminDashboard onExit={handleExitAdmin} />
      )}
      
      <Toaster />
    </>
  )
}

export default App