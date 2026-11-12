# EDGERUNNER — Netrunner Gigs

Pelacak gig netrunner bergaya cyberpunk. Catat pekerjaan (gig), pantau statusnya, dan lihat statistik penghasilan. Bisa di-install sebagai PWA dan tetap jalan offline.

## Fitur

- **Gigs** — tambah, ubah, dan hapus gig (judul, klien, reward, tingkat risiko, catatan)
- **Status gig** — `open` → `active` → `done`
- **Gig bawaan** — beberapa gig contoh yang selalu muncul (hanya statusnya yang bisa diubah)
- **Stats** — ringkasan gig dan reward
- **Profil** — halaman profil netrunner
- **PWA & offline** — bisa di-install dan dipakai tanpa internet
- Data tersimpan di `localStorage` perangkat

## Tech Stack

React 19 · Vite · Tailwind CSS 4 · lucide-react · vite-plugin-pwa

## Menjalankan

```bash
npm install
npm run dev       # mode pengembangan
npm run build     # build produksi
npm run preview   # pratinjau hasil build
```

## Struktur

```
src/
├── App.jsx        # layout & navigasi tab
├── Intro.jsx      # layar intro
├── useGigs.js     # state gig + penyimpanan localStorage
└── pages/         # Gigs, Stats, Profile
```

## Deploy

Konfigurasi untuk [Vercel](https://vercel.com) sudah tersedia di `vercel.json`.
