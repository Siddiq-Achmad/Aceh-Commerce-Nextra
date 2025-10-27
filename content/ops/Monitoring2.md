# Luxima Core Platform --- Monitoring Overview

## 1. Purpose
Monitoring digunakan untuk memastikan setiap service berjalan sesuai SLA, dan mempermudah deteksi dini terhadap potensi masalah performa atau downtime.

---
## 2. Tools Overview
| Tool | Fungsi |
|------|---------|
| **Prometheus** | Mengumpulkan metrics |
| **Grafana** | Visualisasi metrics dan log |
| **Loki + Promtail** | Centralized logging |
| **Tempo** | Distributed tracing |
| **Alertmanager** | Sistem notifikasi alert |
| **Uptime Kuma** | Ping & availability check per endpoint |

---
## 3. Metrics Monitored
| Kategori | Metrics | Threshold |
|-----------|----------|-----------|
| System | CPU, RAM, Disk usage | < 85% |
| Application | API latency, error rate | < 2% error |
| Database | Query time, replication lag | < 100ms |
| Network | Bandwidth, dropped packets | < 1% loss |
| Security | Login failed, brute-force attempts | Alert > 5 per minute |

---
## 4. Dashboard References
| Dashboard | URL | Deskripsi |
|------------|------|-----------|
| System Health | https://grafana.luxima.id/d/system-health | CPU, RAM, Disk usage |
| API Performance | https://grafana.luxima.id/d/api-performance | Request count & latency |
| Database Overview | https://grafana.luxima.id/d/db-overview | Query timing & slow queries |
| Tenant Metrics | https://grafana.luxima.id/d/tenant | Active users, request load |
| Security Overview | https://grafana.luxima.id/d/security | Auth attempts & blocked access |

---
## 5. Log Integration
- Semua log service dikumpulkan melalui Loki.
- Query log dapat dilakukan menggunakan label seperti:
```logql
{service="auth-api", level="error"} |= "invalid"`
```

-   Correlation ID (`X-Request-ID`) digunakan untuk tracing lintas service.


## 6. Alerting Summary
--------------------

-   Alert dikirim melalui Slack `#alerts` dan email `alerts@luxima.id`

-   Critical alerts → PagerDuty escalation

-   Warning alerts → Tercatat dalam `incident_log` Plane.so


## 7. Maintenance Windows
-----------------------

-   Monitoring paused setiap Minggu, 01:00--02:00 WIB untuk maintenance rutin.

-   Semua downtime terencana harus diumumkan di `status.luxima.id` minimal 24 jam sebelumnya.


## 8. Continuous Improvement
--------------------------

-   Evaluasi efektivitas alert dilakukan setiap bulan.

-   Metrics baru ditambahkan berdasarkan feedback dev dan ops.

-   Dashboards disesuaikan tiap fase pengembangan (Prototype → Production → Scale).