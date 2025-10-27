# Luxima Core Platform — Security Plan

## 1. Overview
Luxima Core Platform menerapkan sistem keamanan berlapis untuk menjaga integritas data tenant, pengguna, serta sistem internal. Fokus utama mencakup:
- Isolasi tenant berbasis RLS (Row-Level Security)
- Token-based Auth (JWT Supabase + Hono Middleware)
- Secure cookie session untuk SSR access
- Audit logging pada semua aktivitas kritikal
- Integrasi dengan sistem alert & monitoring (Grafana, Loki, Prometheus)

---

## 2. Core Security Principles
1. **Least Privilege Access** — setiap pengguna hanya memiliki akses sesuai peran dan ruang lingkup organisasi/tenant-nya.
2. **Zero Trust Model** — setiap permintaan API diverifikasi melalui token dan konteks tenant.
3. **Data Encryption** — semua data in-transit dienkripsi menggunakan TLS 1.3, dan data at-rest dienkripsi melalui PostgreSQL + disk-level encryption.
4. **Separation of Concerns** — service dan modul dipisahkan berdasarkan fungsi (Auth, Billing, Plugin, Admin, Tenant).
5. **Auditability** — semua request penting (login, update, permission change, billing, plugin install) dicatat secara otomatis.

---

## 3. Authentication & Authorization
- **Authentication**: handled by Supabase Auth Edge Function (JWT-based, stateless).
- **Authorization**: diatur menggunakan Role-Based Access Control (RBAC) yang dikelola di schema `core`.
- **Session**: untuk SSR page, cookie session terenkripsi digunakan dengan key rotasi otomatis setiap 30 hari.

---

## 4. Multi-Tenant Isolation
- Setiap tenant memiliki `tenant_id` unik.
- Semua tabel yang berhubungan dengan data tenant menerapkan **RLS policy**.
- Query dari API hanya dapat membaca data sesuai `tenant_id` dari JWT claim.

---

## 5. Logging & Monitoring
- **Audit Logs** disimpan di `internal.audit_logs`.
- **Error & Access Logs** dikirim ke Loki melalui Promtail.
- **Security Alerts** dikirim ke channel Slack #security-alerts ketika ada aktivitas mencurigakan.

---

## 6. Backup & Recovery
- Backup dilakukan otomatis setiap 6 jam dan disimpan di object storage terenkripsi.
- Retention policy: 30 hari rolling backup.
- Disaster recovery test dilakukan setiap 3 bulan.

---

## 7. Security Testing
- **Static Code Analysis (SAST)**: dijalankan oleh GitHub Actions (CodeQL).
- **Dependency Scan**: melalui Trivy & npm audit.
- **Penetration Testing**: dilakukan secara triwulan menggunakan OWASP ZAP.
- **RLS Integrity Check**: dijalankan setiap deployment.

---

## 8. Incident Response Plan
1. Deteksi anomali (melalui alert Grafana/Slack)
2. Aktivasi Incident Response Playbook
3. Lockdown sementara endpoint terindikasi
4. Investigasi log & snapshot database
5. Laporan resmi ke channel internal dan audit report

---

## 9. Compliance Alignment
- GDPR Compliant (Data Subject Rights, Consent Management)
- ISO 27001-aligned (Access Control, Security Policies)
- Supabase Self-Hosting mengikuti **Privacy by Design** prinsip.

---

## 10. Key Rotation Policy
- JWT Secret: rotasi setiap 90 hari.
- API Keys: otomatis expired setelah 30 hari jika tidak digunakan.
- Encryption Keys: dikelola via Coolify Secrets Vault + environment scoped isolation.

---

## 11. Security Contact
Security issues atau vulnerability report dikirim ke:
📧 `security@luxima.id`
