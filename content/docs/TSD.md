# Technical Specification Document (TSD)
**Project:** Aceh Commerce  
**Version:** 1.0  
**Date:** 2025-10-14  

---

## 1. System Overview
Platform dibangun dengan pendekatan **modular microservices**, memanfaatkan:
- **Frontend:** Next.js 15 + ShadCN UI  
- **Backend:** Hono + Supabase Edge Functions  
- **Database:** Supabase PostgreSQL  
- **Deployment:** Proxmox + Coolify  
- **Monitoring:** Prometheus + Grafana  

---

## 2. Architecture Diagram
Referensi: `docs/Architecture_Blueprint.md`  
Tambahan file visual: `assets/c4/C2_Container.png`

---

## 3. API Structure
Semua API menggunakan RESTful + JSON dengan autentikasi JWT Supabase.

| Endpoint | Method | Description | Auth |
|-----------|---------|-------------|------|
| `/api/v1/vendors` | GET | List vendor | Admin |
| `/api/v1/vendor` | POST | Create vendor | Public |
| `/api/v1/products` | GET | Product listing | Public |
| `/api/v1/orders` | POST | Create order | Vendor |
| `/api/v1/payments/webhook` | POST | Payment confirmation | System |

---

## 4. Database Schema Overview
Schema utama:
- `auth` — manajemen user & role  
- `core` — transaksi, produk, vendor  
- `finance` — payment, payout  
- `audit` — logs & activity  

Diagram ERD tersedia di `docs/Prototype.md`.

---

## 5. Integration Points
| Service | Type | Description |
|----------|------|-------------|
| **Midtrans / Xendit** | Payment | Payment gateway |
| **Supabase Auth** | Identity | JWT + RLS policies |
| **S3-Compatible Storage** | Media | Upload foto produk |
| **Cloudflare** | CDN & security | Performance |

---

## 6. Performance & Scalability Plan
- Load balancer via HAProxy  
- Auto-scaling Docker containers  
- Query caching via Supabase Realtime  
- Edge Function untuk event-driven job  

---

## 7. Security Measures
- Role-based access (RLS)
- JWT expiration: 1h
- Audit log untuk semua aksi sensitif
- HTTPS enforcement & CSP header

---

## 8. DevOps & CI/CD
- Repository: GitHub / Gitea
- Pipeline: GitHub Actions → Coolify Deploy
- Environment:
  - `staging.acehcommerce.id`
  - `app.acehcommerce.id`
- Backup otomatis tiap 12 jam

---

## 9. Appendix
- `api/openapi.yaml` — API spec  
- `db/migrations/` — schema evolusi  
