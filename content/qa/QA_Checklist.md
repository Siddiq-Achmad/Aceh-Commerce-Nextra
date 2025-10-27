### ✅ Tujuan

Memastikan seluruh fitur Luxima Core Platform memenuhi standar kualitas fungsional dan non-fungsional sebelum rilis.

* * * * *

### 🔍 **Pre-Deployment QA Checklist**

| Kategori | Item | Status | Catatan |
| --- | --- | --- | --- |
| **Auth** | Login, Register, Forgot Password berfungsi dengan validasi yang benar | ☐ |  |
| **RLS Policy** | Data antar tenant benar-benar terisolasi | ☐ |  |
| **API** | Semua endpoint OpenAPI tervalidasi (status code, payload) | ☐ |  |
| **UI/UX** | Tidak ada elemen broken di resolusi <1024px | ☐ |  |
| **Billing** | Subscription & plan switching berfungsi dengan benar | ☐ |  |
| **Plugin System** | Install, Update, Uninstall berjalan tanpa error | ☐ |  |
| **Performance** | Response time rata-rata <200ms | ☐ |  |
| **Security** | Tidak ada JWT expired leak atau endpoint tanpa guard | ☐ |  |
| **Logging** | Semua error ter-record di Supabase logs + Loki | ☐ |  |
| **Deployment** | CI/CD berjalan tanpa kegagalan | ☐ |  |

* * * * *

### 🔁 **Post-Deployment QA Checklist**

| Kategori | Item | Status | Catatan |
| --- | --- | --- | --- |
| **Smoke Test** | Endpoint utama (`/auth`, `/tenants`, `/billing`) memberikan respons valid | ☐ |  |
| **Uptime** | Semua layanan ≥ 99.5% uptime (monitoring 24 jam) | ☐ |  |
| **Error Rate** | < 0.1% error di edge functions | ☐ |  |
| **Alerting** | Notifikasi Telegram + Grafana alert berfungsi | ☐ |  |
| **Backup** | Snapshot PostgreSQL & Redis harian aktif | ☐ |  |

* * * * *

### 🧩 QA Review Workflow

1.  Developer melakukan `Merge Request` ke branch `staging`.
2.  QA Engineer menjalankan regression test via `pnpm test:e2e`.
3.  QA Manager menandai checklist ✅.
4.  Setelah semua modul "Passed", branch di-merge ke `main`.
5.  Release Candidate ditandai dengan versi semantik (mis. `v1.2.0-rc1`).

* * * * *