### 🎯 Tujuan

Mendefinisikan strategi deployment multi-environment untuk platform **Aceh Commerce**, dengan high availability dan minimal downtime.

* * * * *

### 🌐 Environment Overview

| Environment | Domain | Tujuan |
| --- | --- | --- |
| **Development** | `dev.acehcommerce.local` | Uji fitur awal |
| **Staging** | `staging.acehcommerce.id` | QA & pre-release test |
| **Production** | `acehcommerce.id` | Publik, real users |**Bagian 11: Monitoring & Observability** untuk dokumentasi proyek **Luxima Core Platform**, yang terdiri dari tiga file utama:\
📁 `Monitoring_Setup.md`\
📁 `Alerting_Guide.md`\
📁 `Logging_Architecture.md`

* * * * *

📊 **Monitoring_Setup.md**
--------------------------

# Luxima Core Platform --- Monitoring Setup

## 1. Overview
Sistem monitoring pada Luxima Core Platform dirancang untuk memberikan visibilitas penuh terhadap performa, keamanan, dan kesehatan seluruh layanan microservices.
Monitoring dilakukan menggunakan stack berikut:
- **Prometheus** --- metrics collection
- **Grafana** --- metrics visualization & dashboard
- **Loki** --- log aggregation
- **Promtail** --- log forwarding agent
- **Alertmanager** --- incident alert system
- **Tempo** --- distributed tracing

---

## 2. Monitoring Objectives
1. Menjamin uptime minimal **99.9%** untuk semua layanan utama.
2. Mendeteksi degradasi performa lebih awal (CPU, RAM, Disk, API latency).
3. Memberikan visibilitas real-time pada beban setiap tenant.
4. Memastikan anomali segera terdeteksi dan dikirimkan ke tim DevOps/SRE.

---

## 3. Architecture Overview
```plaintext
[Proxmox Host]
   ├─ Node Exporter (Hardware Metrics)
   ├─ cAdvisor (Container Metrics)
   ├─ Prometheus (Data Store)
   ├─ Grafana (Visualization)
   ├─ Loki + Promtail (Logs)
   └─ Tempo (Traces) 
```

Semua komponen di-deploy melalui Docker Compose atau Helm Chart di cluster Proxmox/LXC environment.

* * * * *

## 4. Prometheus Configuration
----------------------------

-   Metrics dari service dikumpulkan melalui endpoint `/metrics` (Hono + Supabase Edge Functions)

-   Scrape interval: 15s

-   Retention data: 30 hari

-   Label tambahan:

    -   `tenant_id`

    -   `service_name`

    -   `environment` (`production`, `staging`, `dev`)

* * * * *

## 5. Grafana Dashboards
----------------------

Grafana digunakan sebagai titik utama observasi. Dashboard utama:

1.  **System Overview** → CPU, Memory, Disk usage per VM/LXC

2.  **Application Metrics** → API latency, request throughput, error rate

3.  **Tenant Metrics** → jumlah tenant aktif, user login trend, plugin usage

4.  **Database Metrics** → query time, lock wait, replication lag

5.  **Security Overview** → login gagal, RLS violation attempt, JWT validation errors

Grafana dapat diakses melalui:\
🔗 `https://grafana.luxima.id`

* * * * *

## 6. Tracing with Tempo
----------------------

Tempo digunakan untuk distributed tracing antar microservices:

-   Setiap request memiliki `X-Trace-ID`

-   Tracing dikirim via OTLP ke Tempo

-   Hasil visualisasi tersedia di panel Grafana "Request Traces"

* * * * *

## 7. Monitoring Security Events
------------------------------

-   Integrasi dengan Supabase Logs (Audit + Edge Function)

-   Semua event login gagal dan perubahan role dikirim ke Loki

-   Deteksi pola brute-force dan DoS melalui Prometheus rule

 `---
## ⚠️ **Alerting_Guide.md**


# Luxima Core Platform --- Alerting Guide

## 1. Overview
Sistem alerting digunakan untuk mendeteksi dan memberi tahu tim ketika terjadi anomali atau gangguan.
Komponen utama:
- **Alertmanager** --- mengatur routing notifikasi
- **Prometheus Rules** --- mendefinisikan kondisi alert
- **Slack Integration** --- mengirim notifikasi ke channel #alerts dan #security-alerts

---
## 2. Alert Channels
| Channel | Tujuan | Audience |
|----------|--------|-----------|
| #alerts | General service alerts | DevOps & Engineering |
| #security-alerts | Security events | Security & Admin |
| Email | High-severity incident | Management & CTO |
| PagerDuty | Critical outages | On-call engineers |

---
## 3. Alert Severity Levels
| Level | Warna | Kriteria |
|--------|--------|-----------|
| 🔴 Critical | Merah | Layanan utama down / database unresponsive |
| 🟠 Warning | Oranye | Latency tinggi, CPU/RAM di atas threshold |
| 🟡 Notice | Kuning | Event abnormal namun non-kritis |
| 🟢 Info | Hijau | Deploy/backup sukses, informasi umum |

---
## 4. Sample Prometheus Alert Rules

```yaml
groups:
  - name: luxima-core.rules
    rules:
      - alert: HighCPULoad
        expr: node_load1 > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "CPU usage tinggi di {{ $labels.instance }}"
          description: "Load CPU melebihi 90% selama lebih dari 5 menit."

      - alert: DatabaseDown
        expr: pg_up == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Database Supabase tidak merespons"
          description: "Instance database tidak menjawab query."

      - alert: APIErrorRateHigh
        expr: sum(rate(http_requests_total{status_code=~"5.."}[1m])) / sum(rate(http_requests_total[1m])) > 0.05
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Error rate API tinggi"
          description: "Lebih dari 5% request menghasilkan status 5xx."

      - alert: TenantRLSViolation
        expr: increase(rls_violation_total[10m]) > 0
        labels:
          severity: critical
        annotations:
          summary: "Pelanggaran RLS terdeteksi"
          description: "Ada akses lintas tenant yang terblokir oleh policy RLS."`
```
* * * * *

## 5. Notification Routing Example
--------------------------------
```yaml
`route:
  receiver: "slack"
  routes:
    - match:
        severity: critical
      receiver: "pagerduty"
    - match:
        severity: warning
      receiver: "slack"
    - match:
        severity: info
      receiver: "email"

receivers:
  - name: "slack"
    slack_configs:
      - channel: "#alerts"
        send_resolved: true
  - name: "pagerduty"
    pagerduty_configs:
      - service_key: ${PAGERDUTY_API_KEY}
  - name: "email"
    email_configs:
      - to: "alerts@luxima.id"`
```
* * * * *

## 6. Alert Escalation Flow
-------------------------

1.  **Critical alert muncul** → Slack + PagerDuty

2.  **On-call engineer respon dalam 10 menit**

3.  Jika tidak terselesaikan dalam 30 menit → alert naik ke CTO & System Owner

4.  Setelah recovery, dilakukan RCA (Root Cause Analysis)

* * * * *

## 7. Alert Recovery Policy
-------------------------

-   Alert dianggap *resolved* setelah kondisi normal kembali selama 5 menit.

-   Semua alert terekam dalam `internal.alert_logs` schema.

-   Setiap insiden memiliki *post-mortem report* di Plane.so.

---

## 🧠 **Logging_Architecture.md**


# Luxima Core Platform --- Logging Architecture

## 1. Overview
Sistem logging pada Luxima menggunakan **Loki** sebagai storage utama, dengan **Promtail** sebagai agent pengumpul log dari semua container & Edge Function.
Tujuan utama:
- Menyediakan visibilitas aktivitas sistem secara real-time
- Menyimpan jejak audit dan error untuk debugging
- Mendukung pencarian cepat dan korelasi antar service

---
## 2. Log Flow Diagram
```plaintext
[Service / Container]
   → Promtail
       → Loki
           → Grafana (Query & Visualization)`
```
* * * * *

## 3. Log Sources
---------------

| Source | Format | Retention |
| --- | --- | --- |
| Hono API | JSON structured log | 30 hari |
| Supabase Edge Functions | JSON structured log | 30 hari |
| Docker Containers | STDOUT | 15 hari |
| Proxmox VM | Syslog | 30 hari |
| Nginx / OLS | Combined log | 14 hari |
| Security Alerts | JSON | 60 hari |

* * * * *

## 4. Log Structure
-----------------

```bash
{
  "timestamp": "2025-10-14T03:22:11.789Z",
  "service": "auth-api",
  "level": "error",
  "tenant_id": "tenant_123",
  "user_id": "uuid-abc",
  "event": "login_failed",
  "message": "Invalid credentials attempt",
  "context": {
    "ip": "103.244.117.21",
    "user_agent": "Mozilla/5.0"
  }
}
```

* * * * *

## 5. Loki Retention & Partitioning
---------------------------------

-   Retention:

    -   Default logs: 30 hari

    -   Security logs: 60 hari

    -   Audit logs: 90 hari

-   Partitioning:

    -   Berdasarkan `tenant_id`, `service`, dan `environment`

* * * * *

## 6. Log Query Examples
----------------------

```bash
{service="auth-api", level="error"} |= "login_failed"
{tenant_id="tenant_001"} | json | line_format "{{.event}} by {{.user_id}}"
{service="billing"} |= "payment_failed"
```

* * * * *

## 7. Log Correlation
-------------------

Semua request memiliki header:

`X-Request-ID: <UUID>
X-Tenant-ID: <tenant_id>`

Header ini digunakan untuk menghubungkan log antar service dan tracing di Tempo.

* * * * *

## 8. Storage & Backup
--------------------

-   Loki data disimpan di `object-storage.luxima.id` dengan lifecycle policy 90 hari.

-   Backup log dilakukan harian ke bucket `logs-archive`.

-   Semua log terenkripsi menggunakan server-side encryption (AES256).

* * * * *

## 9. Observability Maturity Roadmap
----------------------------------

| Tahap | Status | Keterangan |
| --- | --- | --- |
| Basic Metrics (CPU, RAM, Disk) | ✅ | Prometheus + Grafana |
| Application Logs | ✅ | Loki + Promtail |
| Distributed Tracing | ✅ | Tempo |
| Anomaly Detection | 🚧 | Akan diintegrasikan dengan ML-based alert engine |
| SLA / SLO Dashboards | 🚧 | Dalam pengembangan di Grafana |
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