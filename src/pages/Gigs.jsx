import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, Play, Undo2, X, Skull } from 'lucide-react'

const EMPTY = { title: '', client: '', reward: '', risk: 'low', notes: '' }
const RISK_STYLE = { low: 'text-cyan border-cyan', mid: 'text-yellow border-yellow', high: 'text-pink border-pink' }
const FILTERS = ['all', 'open', 'active', 'done']
const NEXT = { open: 'active', active: 'done', done: 'open' }

export default function Gigs({ gigs, addGig, updateGig, deleteGig }) {
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [show, setShow] = useState(false)
  const [filter, setFilter] = useState('all')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const close = () => { setShow(false); setEditId(null); setForm(EMPTY) }

  const submit = (e) => {
    e.preventDefault()
    const data = { ...form, title: form.title.trim(), reward: Number(form.reward) || 0 }
    if (!data.title) return
    editId ? updateGig(editId, data) : addGig(data)
    close()
  }
  const edit = (g) => { setForm({ ...g, reward: String(g.reward) }); setEditId(g.id); setShow(true) }
  const remove = (g) => { if (confirm(`Hapus gig "${g.title}"?`)) deleteGig(g.id) }

  const list = gigs.filter((g) => filter === 'all' || g.status === filter)
  const input = 'w-full rounded border border-cyan/30 bg-void px-3 py-2 text-sm outline-none focus:border-cyan focus:glow-cyan'

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1 text-xs uppercase tracking-wider ${filter === f ? 'border-pink bg-pink/20 text-pink' : 'border-slate-600 text-slate-400'}`}>{f}</button>
        ))}
        <button onClick={() => setShow(true)} className="glow-pink ml-auto flex items-center gap-1 rounded bg-pink px-3 py-1.5 text-sm font-bold text-void">
          <Plus size={16} /> GIG BARU
        </button>
      </div>

      {show && (
        <form onSubmit={submit} className="glow-cyan mb-5 space-y-3 rounded-lg border border-cyan/50 bg-panel p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-cyan">{editId ? 'EDIT GIG' : 'GIG BARU'}</h2>
            <button type="button" onClick={close} aria-label="Tutup"><X size={18} /></button>
          </div>
          <input className={input} placeholder="Judul gig (mis. Heist Arasaka Tower)" value={form.title} onChange={set('title')} required />
          <input className={input} placeholder="Klien (mis. Fixer Rogue)" value={form.client} onChange={set('client')} />
          <div className="grid grid-cols-2 gap-3">
            <input className={input} type="number" min="0" placeholder="Reward (€$)" value={form.reward} onChange={set('reward')} />
            <select className={input} value={form.risk} onChange={set('risk')}>
              <option value="low">Risiko: Rendah</option><option value="mid">Risiko: Sedang</option><option value="high">Risiko: Tinggi</option>
            </select>
          </div>
          <textarea className={input} rows={3} placeholder="Catatan misi..." value={form.notes} onChange={set('notes')} />
          <button className="w-full rounded bg-cyan py-2 font-bold text-void">{editId ? 'SIMPAN PERUBAHAN' : 'TAMBAH GIG'}</button>
        </form>
      )}

      {list.length === 0 && (
        <div className="py-16 text-center text-slate-500"><Skull className="mx-auto mb-2" />Belum ada gig. Night City sepi...</div>
      )}

      <ul className="space-y-3">
        {list.map((g) => (
          <li key={g.id} className={`rounded-lg border-l-4 bg-panel p-4 ${g.status === 'done' ? 'border-slate-600 opacity-60' : 'border-pink'}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className={`font-bold ${g.status === 'done' ? 'line-through' : 'text-glow text-cyan'}`}>{g.title}</h3>
                {g.client && <p className="text-xs text-slate-400">Klien: {g.client}</p>}
              </div>
              <span className={`shrink-0 rounded border px-2 py-0.5 text-[10px] uppercase ${RISK_STYLE[g.risk]}`}>{g.risk}</span>
            </div>
            {g.notes && <p className="mt-2 text-sm text-slate-300">{g.notes}</p>}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-yellow">€$ {g.reward.toLocaleString('id-ID')} <span className="ml-2 text-xs uppercase text-slate-400">[{g.status}]</span></span>
              <div className="flex gap-1">
                <button onClick={() => updateGig(g.id, { status: NEXT[g.status] })} aria-label="Ganti status" className="rounded p-2 text-cyan hover:bg-cyan/10">
                  {g.status === 'open' ? <Play size={16} /> : g.status === 'active' ? <Check size={16} /> : <Undo2 size={16} />}
                </button>
                <button onClick={() => edit(g)} aria-label="Edit" className="rounded p-2 text-yellow hover:bg-yellow/10"><Pencil size={16} /></button>
                <button onClick={() => remove(g)} aria-label="Hapus" className="rounded p-2 text-pink hover:bg-pink/10"><Trash2 size={16} /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
