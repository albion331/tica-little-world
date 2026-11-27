# Tisya's 20th Birthday — A Little Digital World

HTML, CSS, dan Vanilla JavaScript (ES Modules). Tanpa build step.

## Menjalankan di komputer
Ekstrak zip, lalu klik ganda `index.html`. Kamera paling andal lewat HTTPS (GitHub Pages).

Kode sumber berupa ES Modules; halaman memuat file `*.bundle.js`. Setelah mengubah kode, jalankan:

    python3 tools/bundle.py

## Deploy ke GitHub Pages
1. Buat repository baru, upload **isi** folder ini (`index.html` harus di root), termasuk `.nojekyll`.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. Tunggu sekitar 1–2 menit, buka `https://USERNAME.github.io/NAMA-REPO/`.

**Privasi:** situs GitHub Pages bisa dibuka siapa saja yang tahu alamatnya, dan repository publik
memperlihatkan semua foto dan surat. `noindex` hanya meminta mesin pencari tidak mengindeks.
Untuk akses terbatas, pakai hosting dengan autentikasi.

## Sprite kelinci
120 frame asli ada di `games/bunny-rescue/assets/bunnies/frames/`, dipetakan di `js/manifest.js`.
Atlas hanya punya 3 pose per baris (idle, run, jump, hide, peek). walk, exit, happy, carried memakai
ulang pose asli, dan gerak lompat/ayun ditambahkan lewat kode.

## Frame photobooth asli (belum ada)
Simpan PNG dengan tiga area foto transparan di `assets/photobooth/`, lalu isi `js/frame-config.js`
dan jalankan `python3 tools/bundle.py`. Ekspor PNG dengan frame ini perlu server/HTTPS.

## Catatan
- Font diambil dari Google Fonts (ada fallback bila offline).
- Efek suara dan musik game dibuat dengan Web Audio; musik website memakai `assets/music/for-my-core.mp3`.
  Pastikan Anda berhak membagikan lagu tersebut bila repository publik.
- Musik website berlanjut antarhalaman; browser (terutama iOS) bisa menunggu satu ketukan dulu.
- Arah arena game (potret/lanskap) ditentukan saat ronde dimulai.
- Progres jelajah disimpan di `localStorage` pada perangkat itu saja.
