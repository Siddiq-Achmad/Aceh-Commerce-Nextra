🧩 Bagian 7 — Implementation Artifacts
======================================

Direktori ini berisi seluruh artefak implementasi teknis yang menjadi hasil konkret dari desain sistem, mulai dari migrasi database, API specification, edge functions, hingga skema deployment.

Struktur ini memastikan bahwa semua artefak memiliki dokumentasi dan traceability ke **Functional Requirement Document (FRD)** dan **Technical Specification Document (TSD)**.

📁 Struktur Direktori
---------------------

```bash
implementation/
├── database/
│   ├── migrations/
│   │   ├── 001_init_core_schema.sql
│   │   ├── 002_auth_roles_permissions.sql
│   │   ├── 003_tenant_management.sql
│   │   ├── 004_billing_subscription.sql
│   │   ├── 005_plugin_registry.sql
│   │   └── README.md
│   ├── seeds/
│   │   ├── roles_default.sql
│   │   ├── plans_default.sql
│   │   └── tenants_demo.sql
│   ├── RLS_policies/
│   │   ├── auth_rls.sql
│   │   ├── tenant_rls.sql
│   │   └── audit_rls.sql
│   └── views/
│       ├── v_audit_logs.sql
│       └── v_tenant_summary.sql
│
├── api/
│   ├── openapi/
│   │   ├── openapi.yaml
│   │   ├── openapi.json
│   │   └── README.md
│   ├── sdk/
│   │   ├── js/
│   │   ├── python/
│   │   └── postman_collection.json
│   └── tests/
│       ├── auth_api.test.json
│       ├── billing_api.test.json
│       └── plugin_api.test.json
│
├── edge_functions/
│   ├── auth/
│   │   ├── login.ts
│   │   ├── register.ts
│   │   └── verifyToken.ts
│   ├── billing/
│   │   ├── createInvoice.ts
│   │   ├── updateSubscription.ts
│   │   └── webhookHandler.ts
│   ├── plugins/
│   │   ├── installPlugin.ts
│   │   ├── validatePlugin.ts
│   │   └── publishPlugin.ts
│   └── README.md
│
├── deployment/
│   ├── docker-compose.yml
│   ├── proxmox_templates.md
│   ├── coolify_setup.md
│   ├── supabase_selfhost_setup.md
│   └── CI_CD_pipeline.yml
│
└── README.md

```

📄 7.1 — Migrations Documentation (database/migrations/README.md)
-----------------------------------------------------------------

### Tujuan

Menstandarkan struktur dan urutan migrasi database untuk semua modul di dalam sistem Luxima.

### Konvensi Penamaan

```bash
{sequence}_{module_name}.sql
Contoh: 002_auth_roles_permissions.sql
```

### Struktur File SQL

*   **Schema Definition:** pembuatan tabel dan relasi antar schema (auth, core, internal, public).
*   **RLS Setup:** kebijakan row-level security (RLS) untuk multi-tenant dan isolasi data.
*   **Trigger & Functions:** log audit, perhitungan otomatis quota, dsb.
*   **Seed Data:** role default, plan default, dan data demonstrasi.

📄 7.2 — API Specification (api/openapi/openapi.yaml)
-----------------------------------------------------

### Deskripsi

OpenAPI 3.1 spec yang mendefinisikan semua endpoint API Luxima Platform, baik public maupun internal.

### Komponen Utama

*   **Authentication & Tokens**
    *   /auth/login
    *   /auth/refresh
    *   /auth/verify
*   **Tenant Management**
    *   /tenants
    *   /tenants/{id}/members
*   **Billing**
    *   /subscriptions
    *   /invoices
    *   /plans
*   **Plugins**
    *   /plugins
    *   /plugins/{id}/install
    *   /plugins/{id}/publish

### Output Turunan

*   openapi.json → digunakan untuk SDK generation.
*   postman\_collection.json → untuk testing manual API.
*   sdk/js & sdk/python → auto-generated client libraries.

📄 7.3 — Edge Functions (edge\_functions/README.md)
---------------------------------------------------

### Lingkungan

Semua edge functions dijalankan melalui Supabase Edge Runtime dengan format **Hono Framework + Better-Auth**.

### Tujuan

Menangani proses serverless seperti:

*   Validasi token & session
    
*   Event asynchronous (webhook, plugin validation)
    
*   Automasi billing dan quota enforcement
    

### Contoh Struktur:

```ts

// edge_functions/auth/register.ts
import { Hono } from 'hono';
import { supabase } from '../_shared/client';

const app = new Hono();

app.post('/', async (c) => {
  const body = await c.req.json();
  const { email, password } = body;
  const { data, error } = await supabase.auth.signUp({ email, password });
  return c.json({ data, error });
});

export default app;

```

📄 7.4 — Deployment Configuration (deployment/)
-----------------------------------------------

### docker-compose.yml

Menjalankan seluruh komponen sistem secara lokal:

*   Supabase
*   API Gateway
*   Plugin Registry
*   Coolify agent
*   PostgreSQL + PgAdmin
*   Redis Queue Worker

### CI\_CD\_pipeline.yml

Pipeline CI/CD mencakup:

*   Lint & Test
*   Database Migration
*   Build Docker Image
*   Deploy ke Proxmox / Coolify Environment

### proxmox\_templates.md

Deskripsi template VM untuk:

*   API node
*   Edge function runtime
*   PostgreSQL cluster
*   Monitoring (Prometheus + Grafana)

📄 7.5 — Traceability Matrix
----------------------------

| Artefak | Mengacu ke FRD Section | Mengacu ke TSD Section | Acceptance Reference |
| --- | --- | --- | --- |
| `001_init_core_schema.sql` | FR-1.0 Core Entities | TSD-DB-1 | AC-01 |
| `auth/login.ts` | FR-2.1 Authentication | TSD-AUTH-2 | AC-05 |
| `billing/createInvoice.ts` | FR-4.2 Billing | TSD-BILL-1 | AC-12 |
| `plugin/installPlugin.ts` | FR-5.3 Plugin System | TSD-PLUG-3 | AC-20 |

* * * * *

📄 7.6 — README Overview
------------------------

### 📌 Tujuan

Dokumentasi ini bertujuan memastikan:

*   Semua implementasi teknis terdokumentasi dan mudah direplikasi.
*   Dapat dijalankan di lingkungan lokal dan produksi tanpa inkonsistensi.
*   Dapat dihubungkan ke **documentation lineage** (BRD → FRD → TSD → Implementation).

### 🔄 Maintenance Flow

1.  Setiap migrasi baru harus didokumentasikan.
2.  OpenAPI harus diupdate jika endpoint berubah.
3.  Edge Functions mengikuti versioning semver berbasis modul.
4.  Deployment pipeline diupdate jika ada perubahan struktur container atau konfigurasi Coolify.