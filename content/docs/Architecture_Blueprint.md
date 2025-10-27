# Aceh Commerce — Architecture Blueprint
**Version:** 1.0  
**Date:** 2025-10-14  
**Author:** Tech Architecture Team  
**Reviewed by:** Product Owner, DevOps Lead  

---

## 1. Overview
Blueprint ini menjelaskan arsitektur sistem **Aceh Commerce**, sebuah platform marketplace untuk UMKM di Aceh.  
Sistem dirancang untuk **scalability, security, dan modularity**, mendukung integrasi lintas layanan seperti pembayaran, logistik, dan analitik.

---

## 2. Architectural Principles
| Principle | Description |
|------------|-------------|
| **Separation of Concerns** | Backend, frontend, dan edge function dipisah untuk scalability |
| **Stateless API** | Semua komunikasi antar layanan berbasis token JWT |
| **Infrastructure as Code (IaC)** | Deployment diatur via Coolify dan Terraform |
| **Event-driven Architecture** | Webhook dan background jobs untuk event async |
| **Security by Default** | RLS Supabase, HTTPS, dan JWT digunakan di seluruh layer |

---

## 3. System Overview (C4 Level 1)
**Referensi:** `assets/c4/C1_System_Context.png`

**Deskripsi:**
- **External Users:** Vendor UMKM, Customer, Admin
- **System:** Aceh Commerce Platform
- **External Systems:** Midtrans, Xendit, Bank Aceh, Cloudflare CDN

Diagram ini menunjukkan konteks sistem utama dan bagaimana aktor eksternal berinteraksi dengan platform.

---

## 4. Containers Overview (C4 Level 2)
**Referensi:** `assets/c4/C2_Container.png`

### Main Containers
| Container | Technology | Responsibility |
|------------|-------------|----------------|
| **Frontend (Next.js)** | React + Next.js 15 | UI/UX & Client Interaction |
| **Backend API (Hono)** | Hono + TypeScript | Business logic & Routing |
| **Database (Supabase)** | PostgreSQL + RLS | Data persistence & Security |
| **Edge Functions** | Supabase Edge | Payment webhook, background jobs |
| **Storage** | S3-compatible | Product & media uploads |

---

## 5. Component Overview (C4 Level 3)
**Referensi:** `assets/c4/C3_Component_API.png`

**Komponen utama:**
- `AuthService`: registrasi, login, JWT issuance  
- `VendorService`: CRUD vendor, verifikasi, dokumen  
- `ProductService`: katalog produk, stok, kategori  
- `OrderService`: checkout, transaksi, notifikasi  
- `PaymentService`: integrasi Midtrans/Xendit  
- `AnalyticsService`: laporan penjualan dan insight  

---

## 6. Code-level View (C4 Level 4)
**Referensi:** `assets/c4/C4_Code.png`

Struktur direktori:
```bash
/apps
├─ frontend/ (Next.js)
├─ backend/ (Hono API)
├─ edge-functions/
├─ db/
└─ docs/
```


---

## 7. Deployment Topology
| Environment | Domain | Description |
|--------------|--------|-------------|
| **Production** | `app.acehcommerce.id` | Main marketplace |
| **Staging** | `staging.acehcommerce.id` | Pre-release testing |
| **Admin Portal** | `admin.acehcommerce.id` | Sistem internal admin |
| **API Gateway** | `api.acehcommerce.id` | REST API entrypoint |

---

## 8. Security & Compliance
- Supabase RLS aktif untuk semua tabel sensitif  
- TLS via Cloudflare  
- CSRF & XSS Protection via Helmet Middleware  
- Logging aktivitas user di schema `audit`

---

## 9. Future Architecture Plans
- Support multi-region replication  
- Integrasi AI-driven recommendation engine  
- Plugin-based extension system untuk vendor  

---

## 10. Diagram References
- `assets/c4/C1_System_Context.png`
- `assets/c4/C2_Container.png`
- `assets/c4/C3_Component_API.png`
- `assets/c4/C4_Code.png`
