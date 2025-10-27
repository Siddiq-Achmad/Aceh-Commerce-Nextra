### 🎯 Tujuan

Mendefinisikan strategi deployment multi-environment untuk platform **Aceh Commerce**, dengan high availability dan minimal downtime.

* * * * *

### 🌐 Environment Overview

| Environment | Domain | Tujuan |
| --- | --- | --- |
| **Development** | `dev.acehcommerce.local` | Uji fitur awal |
| **Staging** | `staging.acehcommerce.id` | QA & pre-release test |
| **Production** | `acehcommerce.id` | Publik, real users |
| **Admin Panel** | `admin.acehcommerce.id` | Manajemen sistem |
| **Auth Service** | `auth.acehcommerce.id` | Autentikasi JWT |
| **API Gateway** | `api.acehcommerce.id` | Layanan utama |

* * * * *

### 🧱 Infrastruktur Dasar

-   **Hypervisor:** Proxmox VE Cluster

-   **Container Management:** Docker + Kubernetes (microservices)

-   **Deployment Orchestrator:** Coolify (auto-deploy via GitHub Webhook)

-   **Database:** Supabase (PostgreSQL self-hosted di `supabase.acehcommerce.id`)

-   **Edge Functions:** Dijalankan via Supabase Functions + Fly.io failover

-   **Storage:** MinIO (object storage untuk media vendor dan user)

* * * * *

### 🧩 Strategi Deployment

| Tipe | Deskripsi | Cocok untuk |
| --- | --- | --- |
| **Blue-Green Deployment** | Dua environment aktif (Blue & Green), switch DNS saat stable | Production |
| **Rolling Update** | Deploy bertahap tanpa downtime | Staging |
| **Canary Release** | Deploy ke subset user | Fitur eksperimen |
| **Shadow Deployment** | Deploy paralel untuk load testing | Pre-Release Validation |

* * * * *

### ⚙️ Deployment Flow

`Git Commit (main)
   ↓
CI Build & Test
   ↓
Docker Image build & push ke registry.luxima.id
   ↓
Coolify auto-deploy ke Staging
   ↓
Manual Approval → Deploy ke Production
   ↓
Grafana & Telegram Alert aktif`

* * * * *

### 🔐 Security Hardening Deployment

-   Semua environment dilindungi dengan HTTPS (Let's Encrypt wildcard).

-   Variable environment dienkripsi via Coolify Secret Manager.

-   Tidak ada akses langsung ke database; semua query melalui Supabase API.

-   Audit log deployment dicatat di `internal.audit_deploy`.

* * * * *

### 💾 Backup & Recovery Strategy

| Komponen | Frekuensi | Tool | Retensi |
| --- | --- | --- | --- |
| Database | 2x per hari | Supabase Backup | 30 hari |
| Object Storage | Harian | MinIO Snapshot | 14 hari |
| Deployment Snapshot | Tiap versi | Proxmox Template | 7 hari |
| Logs | Real-time | Loki → S3 archive | 60 hari |

* * * * *

### 📈 Post-Deployment Monitoring

-   **Smoke Test:** otomatis via GitHub Actions (`pnpm run test:smoke`)

-   **Error Log Scan:** per 5 menit via Loki query

-   **Performance Baseline:** per 30 menit via Prometheus metric

-   **Auto-rollback trigger:** jika error rate > 5% dalam 10 menit