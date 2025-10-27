# Functional Requirements Document (FRD)
**Project:** Aceh Commerce Platform  
**Version:** 1.0  
**Date:** 2025-10-14  
**Author:** Aceh Commerce Core Team

---

## 1. Purpose
Dokumen ini menjelaskan kebutuhan fungsional dari platform **Aceh Commerce**, termasuk fitur utama, alur pengguna, dan batasan sistem untuk memastikan kesesuaian dengan tujuan bisnis dan UX.

---

## 2. Scope
Platform ini berfokus pada pemberdayaan UMKM di Aceh dengan menyediakan marketplace digital lengkap yang mencakup:
- Registrasi dan manajemen vendor UMKM
- Listing produk dan jasa lokal
- Pembayaran online dan rekonsiliasi
- Dashboard penjualan dan analitik

---

## 3. Key Modules
| Modul | Deskripsi | Aktor |
|-------|------------|--------|
| **Authentication & Authorization** | Login, registrasi, reset password | Vendor, Admin |
| **Vendor Management** | Profil, dokumen legal, status verifikasi | Admin |
| **Product Catalog** | CRUD produk, stok, kategori | Vendor |
| **Order Management** | Pemesanan, pembayaran, pengiriman | Customer, Vendor |
| **Payment Integration** | Gateway (Midtrans, Xendit, Bank Aceh) | Vendor, Customer |
| **Reporting Dashboard** | Penjualan, omzet, transaksi harian | Vendor |
| **Notifications & Messaging** | Email, push notification, chat UMKM | Semua pengguna |

---

## 4. Use Cases
### UC-01 — Vendor Registration
- **Aktor:** Vendor  
- **Deskripsi:** Vendor mendaftar dengan data bisnis dan dokumen legal  
- **Alur:**
  1. Mengisi form registrasi  
  2. Upload KTP & NIB  
  3. Menunggu verifikasi admin  
  4. Akses dashboard vendor  

### UC-02 — Product Upload
- **Aktor:** Vendor  
- **Deskripsi:** Menambahkan produk baru ke katalog  
- **Hasil:** Produk tampil di marketplace publik  

---

## 5. Non-Functional Requirements (NFR)
| Kategori | Kebutuhan |
|-----------|-----------|
| **Performance** | <200ms response time untuk 80% API |
| **Availability** | 99.9% uptime |
| **Security** | Enkripsi AES-256 untuk data sensitif |
| **Scalability** | Modular microservice architecture |
| **Localization** | Bahasa Indonesia default, siap multi-language |

---

## 6. Dependencies
- Supabase (Database + Auth)
- Next.js 15 (Frontend)
- Hono (Backend API)
- Midtrans/Xendit SDK

---

## 7. Future Enhancements
- Loyalty program untuk pelanggan
- Integrasi logistik (SiCepat, JNE)
- Mobile App (PWA)

---

## 8. Approval
| Role | Name | Signature | Date |
|------|------|------------|------|
| Product Owner | — | — | — |
| Tech Lead | — | — | — |
| QA Lead | — | — | — |
