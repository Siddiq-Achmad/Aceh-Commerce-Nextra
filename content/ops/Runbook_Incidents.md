# Luxima Core Platform — Runbook: Incident Management

## 1. Overview
Dokumen ini menjelaskan prosedur standar penanganan insiden untuk seluruh layanan Luxima Core Platform, termasuk API, Auth, Supabase, dan tenant-facing applications.  
Tujuan utama adalah **meminimalkan downtime, menjaga integritas data, dan memastikan respons cepat terhadap gangguan**.

---

## 2. Incident Classification

| Severity | Impact | Example | Response Time |
|-----------|---------|----------|----------------|
| **P1 - Critical** | Sistem utama down | Auth API tidak bisa login, DB tidak dapat diakses | ≤ 15 menit |
| **P2 - High** | Fitur penting gagal | Dashboard tenant error, transaksi gagal | ≤ 30 menit |
| **P3 - Medium** | Bug minor, tidak memengaruhi operasi utama | UI error di halaman profil | ≤ 1 jam |
| **P4 - Low** | Permintaan optimisasi atau informasi | Latency tinggi di background job | ≤ 24 jam |

---

## 3. Detection & Escalation
1. **Automatic Detection:**  
   Sistem monitoring (Prometheus + Grafana + Alertmanager) mengirim alert ke Slack channel `#alerts`.
2. **Manual Report:**  
   Laporan manual dari tim support melalui Plane.so ticket `type=incident`.
3. **Escalation Flow:**
   - Level 1: On-call Engineer (DevOps)
   - Level 2: Platform Owner
   - Level 3: CTO / Management

---

## 4. Incident Response Workflow

| Tahap | Langkah | PIC |
|--------|----------|------|
| 🟢 Detection | Deteksi gangguan via alert/log | Monitoring System |
| 🟠 Diagnosis | Analisa log dan metrics | DevOps Engineer |
| 🔴 Mitigation | Rollback / failover / restart service | Platform Engineer |
| ⚪ Communication | Update status di `status.luxima.id` | Communication Officer |
| 🟣 Postmortem | Analisa akar penyebab (RCA) | Tech Lead |

---

## 5. Communication Templates

**Slack Message Example:**
```bash
🚨 [P1 INCIDENT] Auth Service Down
Detected at: 2025-10-14 09:23 WIB
Impact: All users cannot log in
Actions: Rolling back to previous deployment
ETA to recovery: 15 minutes
Owner: @devops-luxima
```


---

## 6. Postmortem Process
Setiap insiden P1/P2 harus disertai dokumen *Root Cause Analysis (RCA)* dalam 48 jam:
- Deskripsi insiden  
- Kronologi  
- Dampak  
- Akar penyebab  
- Solusi permanen  
- Preventive action  

Dokumen RCA disimpan di:
📁 `Plane.so / Circle: Incident Reports / RCA-[DATE].md`
