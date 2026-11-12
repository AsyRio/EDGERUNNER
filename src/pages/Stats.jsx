export default function Stats({ gigs }) {
  const count = (s) => gigs.filter((g) => g.status === s).length
  const earned = gigs.filter((g) => g.status === 'done').reduce((a, g) => a + g.reward, 0)
  const pending = gigs.filter((g) => g.status !== 'done').reduce((a, g) => a + g.reward, 0)
  const pct = gigs.length ? Math.round((count('done') / gigs.length) * 100) : 0

  const Card = ({ label, value, color }) => (
    <div className={`rounded-lg border bg-panel p-4 ${color}`}>
      <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  )

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold tracking-widest text-cyan">// STATISTIK RUNNER</h2>
      <div className="grid grid-cols-2 gap-3">
        <Card label="Total Gig" value={gigs.length} color="border-cyan text-cyan" />
        <Card label="Open" value={count('open')} color="border-slate-500 text-slate-200" />
        <Card label="Active" value={count('active')} color="border-yellow text-yellow" />
        <Card label="Done" value={count('done')} color="border-pink text-pink" />
      </div>
      <div className="rounded-lg border border-yellow bg-panel p-4">
        <p className="text-xs uppercase tracking-wider text-slate-400">Eddies Terkumpul</p>
        <p className="text-3xl font-bold text-yellow text-glow">€$ {earned.toLocaleString('id-ID')}</p>
        <p className="mt-1 text-xs text-slate-400">Potensi belum cair: €$ {pending.toLocaleString('id-ID')}</p>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-xs text-slate-400"><span>PROGRESS</span><span>{pct}%</span></div>
        <div className="h-3 overflow-hidden rounded bg-panel"><div className="glow-pink h-full bg-pink transition-all" style={{ width: `${pct}%` }} /></div>
      </div>
    </section>
  )
}
