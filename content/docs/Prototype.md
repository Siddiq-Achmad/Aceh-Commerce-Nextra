# Prototype Documentation — Aceh Commerce
**Version:** 1.0  
**Date:** 2025-10-14  
**Author:** Product & Engineering Team  

---

## 1. Purpose
Dokumen ini menjelaskan hasil tahap prototyping dari platform Aceh Commerce, termasuk:
- Struktur awal database (ERD)
- Kontrak API
- Komponen UI utama berdasarkan hasil uji desain awal (Figma)

---

## 2. Prototype Objectives
- Validasi UX alur pendaftaran vendor
- Validasi API transaksi end-to-end
- Menentukan baseline performa dan arsitektur modular

---

## 3. Entity Relationship Diagram (ERD)
**Diagram Reference:** `assets/diagrams.pdf`

### Skema Database:
| Schema | Purpose |
|---------|----------|
| `auth` | User, role, permission |
| `core` | Produk, vendor, order |
| `finance` | Payment, payout, invoice |
| `audit` | Logs, activities |

**Contoh Relasi Utama:**
```bash
vendor (1) --- (n) product
product (1) --- (n) order
order (1) --- (1) payment
user (1) --- (n) vendor
```


---

## 4. API Contracts Overview
**Referensi:** `api/openapi.yaml`

| Endpoint | Method | Request Body | Response | Notes |
|-----------|---------|---------------|-----------|-------|
| `/vendors/register` | POST | Vendor registration | `201 Created` | Token issued |
| `/products` | GET | — | Product list | Pagination supported |
| `/orders` | POST | Order payload | Order object | Payment pending |
| `/payments/webhook` | POST | Midtrans callback | 200 OK | Event-driven |

---

## 5. Wireframes & UI Reference
Tersedia di direktori: `assets/wireframes/`

**Halaman utama:**
- Vendor Onboarding Form  
- Product Upload Dashboard  
- Order Tracking  
- Payment Confirmation Page  

**Figma Link:**  
`assets/figma_links.txt`

---

## 6. Prototype Testing Summary
| Test | Description | Result |
|------|--------------|--------|
| Vendor registration flow | Uji kelengkapan dan validasi form | ✅ Passed |
| Payment webhook simulation | Validasi integrasi dengan sandbox Midtrans | ✅ Passed |
| Product search & filter | Test kecepatan query Supabase | ⚠️ Optimization needed |

---

## 7. Learnings & Adjustments
- Edge Function perlu dioptimasi untuk latency di bawah 150ms  
- Tambahkan caching layer untuk katalog produk  
- Perlu mekanisme retry untuk pembayaran gagal  

---

## 8. Next Steps
- Refinement API versioning (`/api/v2`)  
- Integrasi load test otomatis dengan K6  
- Penyesuaian data seeder untuk vendor uji coba  

---

## 9. Appendix
- `assets/diagrams.pdf`  
- `assets/wireframes/`  
- `api/openapi.yaml`
