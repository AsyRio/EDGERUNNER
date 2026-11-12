import { useState, useEffect } from 'react'

const KEY = 'netrunner-gigs'
const KEY_FEATURED = 'netrunner-gigs-featured'
const read = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback } catch { return fallback }
}

export const STATUSES = ['open', 'active', 'done']
export const RISKS = ['low', 'mid', 'high']

// Gig bawaan: selalu muncul untuk semua orang yang membuka aplikasi.
// Ubah isi daftar ini untuk mengganti gig bawaannya.
export const FEATURED_GIGS = [
  { id: 'featured-1', title: 'Heist Arasaka Tower', client: 'Fixer Rogue', reward: 25000, risk: 'high', status: 'open',
    notes: 'Tembus firewall lantai 40 dan curi data prototipe. Waktu hanya 15 menit sebelum ICE aktif.' },
  { id: 'featured-2', title: 'Backdoor Kamera Watson', client: 'Regina Jones', reward: 8500, risk: 'mid', status: 'open',
    notes: 'Pasang backdoor di jaringan CCTV distrik Watson. Jangan sampai terdeteksi NCPD.' },
  { id: 'featured-3', title: 'Hapus Jejak Digital', client: 'Wakako Okada', reward: 3200, risk: 'low', status: 'open',
    notes: 'Bersihkan riwayat transaksi klien dari server Kang Tao. Pekerjaan cepat dan aman.' },
]
const FEATURED_IDS = new Set(FEATURED_GIGS.map((g) => g.id))
export const isFeatured = (g) => FEATURED_IDS.has(g.id)

export function useGigs() {
  const [mine, setMine] = useState(() => read(KEY, []))
  const [featuredStatus, setFeaturedStatus] = useState(() => read(KEY_FEATURED, {}))
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(mine)) }, [mine])
  useEffect(() => { localStorage.setItem(KEY_FEATURED, JSON.stringify(featuredStatus)) }, [featuredStatus])

  const gigs = [
    ...FEATURED_GIGS.map((g) => ({ ...g, status: featuredStatus[g.id] ?? g.status })),
    ...mine,
  ]

  const addGig = (g) => setMine((p) => [{ ...g, id: crypto.randomUUID(), status: 'open', createdAt: Date.now() }, ...p])
  const updateGig = (id, patch) => {
    // Gig bawaan hanya boleh diubah statusnya (disimpan per perangkat).
    if (FEATURED_IDS.has(id)) { if (patch.status) setFeaturedStatus((s) => ({ ...s, [id]: patch.status })); return }
    setMine((p) => p.map((g) => (g.id === id ? { ...g, ...patch } : g)))
  }
  const deleteGig = (id) => { if (!FEATURED_IDS.has(id)) setMine((p) => p.filter((g) => g.id !== id)) }
  return { gigs, addGig, updateGig, deleteGig }
}
