import { useState, useEffect } from 'react'

const KEY = 'netrunner-gigs'
const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? [] } catch { return [] }
}

export const STATUSES = ['open', 'active', 'done']
export const RISKS = ['low', 'mid', 'high']

export function useGigs() {
  const [gigs, setGigs] = useState(load)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(gigs)) }, [gigs])

  const addGig = (g) => setGigs((p) => [{ ...g, id: crypto.randomUUID(), status: 'open', createdAt: Date.now() }, ...p])
  const updateGig = (id, patch) => setGigs((p) => p.map((g) => (g.id === id ? { ...g, ...patch } : g)))
  const deleteGig = (id) => setGigs((p) => p.filter((g) => g.id !== id))
  return { gigs, addGig, updateGig, deleteGig }
}
