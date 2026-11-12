import { User, IdCard, Users } from 'lucide-react'

const PROFILE = [
  { icon: User, label: 'Nama', value: 'Rio Hotasy Parulian Simanjuntak' },
  { icon: IdCard, label: 'NIM', value: '21120124140144' },
  { icon: Users, label: 'Kelompok', value: '11' },
]

export default function Profile() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold tracking-widest text-cyan">// PROFIL RUNNER</h2>
      <div className="glow-cyan rounded-lg border border-cyan/50 bg-panel p-5">
        <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border-2 border-pink bg-void text-4xl font-bold text-pink glow-pink">R</div>
        <ul className="space-y-4">
          {PROFILE.map(({ icon: Icon, label, value }) => (
            <li key={label} className="flex items-center gap-3">
              <Icon className="text-pink" size={20} />
              <div><p className="text-xs uppercase tracking-wider text-slate-400">{label}</p><p className="font-bold text-cyan">{value}</p></div>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-center text-xs text-slate-500">Praktikum PPB — Modul 5 · PWA React + Vite</p>
    </section>
  )
}
