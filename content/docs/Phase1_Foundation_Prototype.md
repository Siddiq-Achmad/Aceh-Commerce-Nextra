# Phase 1 – Foundation & Prototype  
**Duration:** Q1–Q2 2025  
**Goal:** Membangun fondasi arsitektur sistem, validasi konsep produk, dan MVP (Minimum Viable Product).

---

## 1. Objectives
- Membangun pondasi arsitektur microservices & multi-tenant
- Mengembangkan prototipe awal (UI, API, dan database)
- Validasi konsep dengan UMKM pilot di Aceh

---

## 2. Key Deliverables
| Deliverable | Description |
|--------------|-------------|
| **Core Infrastructure Setup** | Proxmox + Docker + Supabase self-hosted di Coolify |
| **Auth & Role System** | Sistem autentikasi multi-tenant dengan Supabase RLS |
| **Vendor Onboarding MVP** | Formulir pendaftaran vendor dengan validasi & approval admin |
| **Product Catalog Prototype** | Upload & listing produk vendor |
| **Payment Integration Sandbox** | Integrasi Xendit & Midtrans dalam mode sandbox |
| **Basic UI Prototype** | Wireframe Figma + frontend Next.js awal |

---

## 3. Milestones
| Milestone | Timeline | Owner |
|------------|-----------|--------|
| Arsitektur server & schema | Januari 2025 | DevOps |
| Setup Supabase & RLS | Februari 2025 | Backend Team |
| Vendor registration prototype | Maret 2025 | Frontend |
| Payment sandbox integration | April 2025 | Backend |
| User testing (pilot) | Mei 2025 | UX Team |

---

## 4. Validation Metrics
- 20+ vendor mendaftar selama pilot
- Latency API < 200ms
- Uji keamanan dasar (OWASP top 10)
- UI feedback positif ≥ 80%

---

## 5. Risks
- Keterbatasan bandwidth server lokal
- Adaptasi awal UMKM terhadap digital platform
- Overhead maintenance Coolify/Supabase

---

## 6. Outputs
- Prototype siap uji publik
- Blueprint dan dokumentasi arsitektur
- Dataset awal vendor dan produk
