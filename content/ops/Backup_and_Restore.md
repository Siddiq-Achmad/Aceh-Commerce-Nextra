# Luxima Core Platform — Backup & Restore Procedure

## 1. Overview
Backup dilakukan untuk memastikan **pemulihan cepat terhadap kehilangan data** akibat kegagalan sistem, kesalahan manusia, atau serangan siber.  
Strategi ini meliputi **database, file storage, konfigurasi, dan container images**.

---

## 2. Backup Policy

| Komponen | Frekuensi | Retensi | Lokasi |
|-----------|------------|-----------|----------|
| Supabase Database | Harian (03:00 WIB) | 30 hari | `object-storage.luxima.id/backups/db/` |
| Object Storage | Harian | 30 hari | `object-storage.luxima.id/backups/files/` |
| Configs (Nginx, Coolify, Docker Compose) | Mingguan | 90 hari | `proxmox-backup.luxima.id` |
| VM Snapshots | Mingguan | 2 siklus | `Proxmox VE` |

---

## 3. Backup Workflow

```plaintext
[Supabase DB] → pg_dump → compress → upload → Object Storage
[File Storage] → rsync → tar.gz → upload → Backup Bucket
[Configs] → git commit & push → config-repo.luxima.id
```

-   Semua backup otomatis dilakukan menggunakan `cron` di container `backup-agent`.

-   Metadata backup dicatat di tabel `internal.backup_logs`.

* * * * *

## 4. Encryption & Security
-------------------------

-   Semua file backup dienkripsi dengan AES-256 sebelum upload.

-   Akses hanya diberikan ke role `backup_admin`.

-   Kunci enkripsi disimpan di Vault service (HashiCorp Vault).

* * * * *

## 5. Restore Procedure
---------------------

### a. Database Restore

`pg_restore -h db.supabase.luxima.id -U postgres -d luxima_core backup_2025-10-13.dump`

### b. File Restore

`aws s3 sync s3://object-storage.luxima.id/backups/files/restore ./restore-folder`

### c. Full VM Restore

1.  Login ke Proxmox

2.  Pilih VM → `Restore → Select Snapshot`

3.  Verifikasi konfigurasi jaringan

4.  Jalankan kembali VM dan uji konektivitas

* * * * *

## 6. Verification
----------------

Setelah setiap restore, lakukan langkah berikut:

-   Jalankan query validasi data (`SELECT count(*)` per tabel utama)

-   Bandingkan checksum file (`md5sum`)

-   Pastikan aplikasi dapat login dan query berjalan normal

* * * * *

## 7. Disaster Recovery (DR)
--------------------------

Luxima memiliki **DR plan** di node sekunder (`proxmox-node2.luxima.id`):

-   Backup dikirimkan harian via rsync

-   DR test dilakukan setiap 6 bulan

-   Recovery Point Objective (RPO): 24 jam

-   Recovery Time Objective (RTO): 2 jam



