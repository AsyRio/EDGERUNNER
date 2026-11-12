import { useState, useEffect } from 'react'
import { Crosshair, BarChart3, User, WifiOff } from 'lucide-react'
import { useGigs } from './useGigs'
import Intro from './Intro'
import Gigs from './pages/Gigs'
import Stats from './pages/Stats'
import Profile from './pages/Profile'

const TABS = [
  { id: 'gigs', label: 'Gigs', icon: Crosshair },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
  { id: 'profile', label: 'Profil', icon: User },
]

export default function App() {
  const [tab, setTab] = useState(() => location.hash.slice(1) || 'gigs')
  const [online, setOnline] = useState(navigator.onLine)
  const [intro, setIntro] = useState(true)
  const data = useGigs()

  useEffect(() => { location.hash = tab }, [tab])
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false)
    addEventListener('online', on); addEventListener('offline', off)
    return () => { removeEventListener('online', on); removeEventListener('offline', off) }
  }, [])

  return (
    <>
    {intro && <Intro onDone={() => setIntro(false)} />}
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col">
      <header className="flex items-center justify-between px-4 pt-5 pb-3">
        <h1 className="flex items-center gap-2 text-xl font-bold tracking-widest text-yellow text-glow">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-cyan text-base glow-cyan">E</span>EDGERUNNER
        </h1>
        {!online && <span className="flex items-center gap-1 text-xs text-yellow"><WifiOff size={14} /> OFFLINE</span>}
      </header>

      <main className="flex-1 px-4 pb-28">
        {tab === 'gigs' && <Gigs {...data} />}
        {tab === 'stats' && <Stats gigs={data.gigs} />}
        {tab === 'profile' && <Profile />}
      </main>

      <nav className="fixed inset-x-0 bottom-0 border-t border-cyan/30 bg-void/95 backdrop-blur" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="mx-auto flex max-w-2xl">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs tracking-wider transition ${tab === id ? 'text-pink text-glow' : 'text-slate-400 hover:text-cyan'}`}>
              <Icon size={20} />{label.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>
    </div>
    </>
  )
}
