### 🎯 Tujuan

Menentukan skema penomoran versi untuk menjaga konsistensi antar tim dan kompatibilitas antar komponen sistem.

* * * * *

### 🧮 Skema SemVer (Semantic Versioning)

`MAJOR.MINOR.PATCH`

| Bagian | Contoh | Deskripsi |
| --- | --- | --- |
| **MAJOR** | 2.x.x | Perubahan besar, tidak backward-compatible |
| **MINOR** | 1.4.x | Penambahan fitur baru tanpa merusak kompatibilitas |
| **PATCH** | 1.4.2 | Perbaikan bug kecil, tidak mengubah fungsionalitas |

* * * * *

### 🧩 Label Versi Pre-release

| Label | Contoh | Keterangan |
| --- | --- | --- |
| `-alpha` | v1.2.0-alpha.1 | Build awal untuk tes internal |
| `-beta` | v1.2.0-beta.2 | Build stabil untuk test eksternal |
| `-rc` | v1.2.0-rc1 | Release candidate sebelum produksi |
| `-stable` | v1.2.0 | Versi final yang dirilis publik |

* * * * *

### 🏷️ Tagging Guidelines

1.  Gunakan Git tag dengan format:

    `git tag -a v1.3.0 -m "Release v1.3.0"
    git push origin v1.3.0`

2.  Setiap rilis wajib memiliki:

    -   Changelog

    -   Dokumentasi versi (README update)

    -   Build artifact (Docker image + Supabase migration)

3.  Versi backend dan frontend disinkronkan agar kompatibel antar service.

* * * * *

### 📘 Contoh Pemetaan Versi

| Komponen | Versi | Kompatibel Dengan |
| --- | --- | --- |
| `core-api` | v1.3.0 | `dashboard-ui@v1.3.0` |
| `billing-service` | v1.1.2 | `core-api@v1.3.0` |
| `plugin-registry` | v0.9.5-beta | `core-api@v1.3.x` |

* * * * *

### 🧩 Auto-Bump CI Configuration

GitHub Action:

`on:
  push:
    branches:
      - main
jobs:
  versioning:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: phips28/gh-action-bump-version@v10.0.0
        with:
          tag-prefix: 'v'
          minor-wording: 'feat,feature'
          patch-wording: 'fix,bugfix'`