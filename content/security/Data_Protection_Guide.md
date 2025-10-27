# Luxima Core Platform — Data Protection Guide

## 1. Data Classification
| Kategori | Jenis Data | Proteksi |
|-----------|-------------|----------|
| Public | Blog, Metadata plugin | No encryption |
| Confidential | Tenant data, Billing info | AES-256 encryption |
| Restricted | User credentials, API keys | Vault-encrypted, RBAC-restricted |
| Critical | Access tokens, audit logs | Encrypted + restricted to system users only |

---

## 2. Data Retention Policy
| Jenis Data | Durasi Retensi | Catatan |
|-------------|----------------|----------|
| Tenant logs | 90 hari | Auto-archived ke object storage |
| Audit logs | 180 hari | Dihapus otomatis setelah masa retensi |
| Billing records | 5 tahun | Untuk keperluan legal & compliance |
| API access logs | 30 hari | Disimpan di internal schema |

---

## 3. Encryption Standards
- **At Rest**: AES-256 GCM
- **In Transit**: TLS 1.3
- **Hashing**: bcrypt (Auth), SHA-256 (Checksum)
- **Key Storage**: Environment Vault (Coolify Secrets)

---

## 4. Access Control
- Database hanya dapat diakses melalui Supabase API.
- Admin console (`admin.luxima.id`) memiliki role-based access (RBAC).
- Tenant data tidak dapat diakses lintas organisasi.
- Developer akses terbatas hanya ke schema `core` pada staging environment.

---

## 5. Data Minimization
- Data pribadi yang tidak digunakan akan dihapus otomatis melalui background jobs.
- Semua form data memiliki consent checkbox sebelum data disimpan.

---

## 6. Data Subject Rights (GDPR Alignment)
- **Right to Access**: user dapat meminta export data melalui `profile.luxima.id`.
- **Right to Erasure**: data dapat dihapus dari sistem setelah verifikasi identitas.
- **Right to Portability**: data disediakan dalam format JSON/CSV.
- **Right to Rectification**: user dapat memperbarui data pribadi kapan pun.

---

## 7. Breach Notification
Jika terjadi insiden kebocoran data:
1. Tim security akan memberi notifikasi ke semua tenant terdampak dalam 72 jam.
2. Analisis log & scope breach dilakukan.
3. Rencana mitigasi dan perbaikan segera dijalankan.

---

## 8. Data Backup & Restore
- Backup disimpan di lokasi terpisah dari database utama.
- Semua backup terenkripsi dan memiliki checksum validasi.
- Restore dapat dilakukan hanya oleh superadmin menggunakan token keamanan.

---

## 9. Compliance Reference
- **GDPR** — General Data Protection Regulation (EU)
- **ISO/IEC 27001:2022** — Information Security Management System
- **OWASP Top 10 2023** — Web Application Security Standards
