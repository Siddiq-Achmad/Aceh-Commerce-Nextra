### 🎯 Tujuan

Menstandarkan proses rilis agar seluruh tim (dev, QA, ops) memahami alur, risiko, dan langkah validasi sebelum dan sesudah deploy.

* * * * *

### 🧭 Tahapan Rilis

| Fase | Deskripsi | Tools |
| --- | --- | --- |
| **1\. Development** | Implementasi fitur baru, bug fix, refactor | GitHub / Plane.so Work Items |
| **2\. Code Review** | Peer review, linting, testing otomatis | GitHub Actions, ESLint, Vitest |
| **3\. Staging Deployment** | Build otomatis dan deploy ke environment staging | Coolify auto-deploy |
| **4\. QA Verification** | Pengujian integrasi dan regresi | Playwright, Postman, Supabase QA checklist |
| **5\. Pre-Release Tagging** | Menandai versi RC (`vX.Y.Z-rc`) | Git Tag |
| **6\. Production Deployment** | Rilis stabil ke environment produksi | Coolify + Proxmox cluster |
| **7\. Post-Release Review** | Audit log, rollback check, analisis metrik | Grafana, Loki, Plane.so issue tracker |

* * * * *

### ⚙️ Branching Strategy

`main       → Production-ready code
staging    → QA testing & release candidate
develop    → Feature integration
feature/*  → Feature branches per module
hotfix/*   → Critical fix untuk production `

**Contoh workflow:**

1.  Dev membuat branch `feature/plugin-system`.

2.  Setelah QA pass → merge ke `staging`.

3.  Setelah regression test → tag `v1.0.0-rc1`.

4.  Jika stabil → merge ke `main` dan release `v1.0.0`.

* * * * *

### 🧩 Release Artifacts

| Artifact | Lokasi | Keterangan |
| --- | --- | --- |
| Build Output | `/out` (Next.js build) | File statis siap deploy |
| Docker Image | `registry.luxima.id/aceh-commerce:{version}` | Image untuk deployment |
| Changelog | `CHANGELOG.md` | Ringkasan perubahan tiap versi |
| Migration Files | `/db/migrations/*.sql` | Disertakan dalam pipeline |
| Docs Snapshot | `/docs/releases/{version}/` | Dokumen versi rilis (markdown/pdf) |

* * * * *

### 🧾 Change Log Format

`## [1.2.0] - 2025-10-14
### Added
- New Vendor Dashboard analytics module
### Fixed
- Billing webhook duplicate issue
### Changed
- Improved plugin install performance by 20%`

* * * * *

### 🔄 Rollback Procedure

1.  Jalankan rollback via Coolify (`Deploy previous revision`).

2.  Restore snapshot database dari Supabase Backup (RPO ≤ 1 jam).

3.  Invalidasi cache CDN.

4.  Notifikasi tim melalui Telegram `#luxima-alerts`.