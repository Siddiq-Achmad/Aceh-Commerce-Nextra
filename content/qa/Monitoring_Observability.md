### 🎯 Tujuan

Menjamin visibilitas penuh terhadap performa, error, dan keamanan sistem Luxima di seluruh environment.

* * * * *

### 🧠 Observability Stack Overview

| Komponen | Fungsi | Tool |
| --- | --- | --- |
| **Logs** | Menyimpan error dan event sistem | Loki + Supabase Logs |
| **Metrics** | Memonitor resource (CPU, RAM, Requests/sec) | Prometheus |
| **Tracing** | Menelusuri request antar microservice | OpenTelemetry + Tempo |
| **Visualization** | Dashboard KPI, error rate, uptime | Grafana |
| **Alerting** | Mengirim notifikasi ke channel Telegram & Email | Grafana Alert Rules + Supabase Webhooks |

* * * * *

### 📊 Metric Dashboard Contoh

#### Grafana Panels:

-   **API Response Time (p95)**
-   **Edge Function Error Rate**
-   **Supabase DB Query Latency**
-   **Tenant Signup Trend**
-   **Plugin Install Success Rate**
-   **Billing Job Queue Status**

* * * * *

### ⚡ Alert Rules

| Metric | Threshold | Action |
| --- | --- | --- |
| API Error Rate > 2% | Kirim notifikasi ke `#luxima-alerts` Telegram | 🚨 |
| DB Latency > 300ms | Auto-scale database instance | ⚙️ |
| Edge Function Timeout > 5% | Restart worker pod | 🔁 |
| Uptime < 99.5% | Email devops@luxima.id | 📧 |

* * * * *

### 🔄 Log Retention Policy

| Log Type | Retention | Storage |
| --- | --- | --- |
| Application Logs | 30 hari | Loki (S3 backend) |
| Security Events | 90 hari | Supabase Log Storage |
| Audit Logs | 180 hari | PostgreSQL `core.audit_log` |
| Metrics | 60 hari | Prometheus TSDB |

* * * * *

### 🧩 Example Observability Flow

`[Edge Function Error]
   ↓
Captured by Loki
   ↓
Forwarded to Grafana Alert
   ↓
Telegram Alert Sent
   ↓
Developer reviews in Grafana dashboard
   ↓
Issue created automatically in Plane.so`

* * * * *

📘 Maintenance SOP
------------------

1.  **QA Automation:** dijalankan di setiap push dan pull request.
2.  **Error Escalation:** error critical memicu alert Telegram + issue otomatis.
3.  **Log Rotation:** dijalankan setiap minggu via cron.
4.  **Observability Dashboard:** diperbarui setiap minggu oleh tim DevOps.
5.  **QA Retrospective:** setiap akhir sprint, analisis bug dan root cause dilakukan untuk mencegah regresi.