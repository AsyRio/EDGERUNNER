import { useEffect, useState } from 'react'

const WORD = 'EDGERUNNER'

export default function Intro({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2600)
    const t2 = setTimeout(onDone, 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  const skip = () => { setLeaving(true); setTimeout(onDone, 350) }

  return (
    <div onClick={skip} role="button" aria-label="Lewati intro"
      className={`intro fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-void ${leaving ? 'intro-out' : ''}`}>
      <div className="intro-scan" />
      <div className="intro-logo mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-cyan glow-cyan">
        <span className="text-6xl font-black text-yellow text-glow">E</span>
      </div>
      <h1 className="flex text-3xl font-black tracking-[0.25em] text-yellow text-glow sm:text-5xl" aria-label={WORD}>
        {[...WORD].map((c, i) => (
          <span key={i} className="intro-letter" style={{ animationDelay: `${0.5 + i * 0.09}s` }}>{c}</span>
        ))}
      </h1>
      <p className="intro-sub mt-4 text-xs tracking-[0.4em] text-cyan">// JACKING IN...</p>
      <div className="intro-bar mt-8 h-0.5 w-48 overflow-hidden bg-cyan/20"><div className="intro-bar-fill h-full bg-pink" /></div>
      <p className="absolute bottom-8 text-[10px] tracking-widest text-slate-500">TAP UNTUK LEWATI</p>
    </div>
  )
}
