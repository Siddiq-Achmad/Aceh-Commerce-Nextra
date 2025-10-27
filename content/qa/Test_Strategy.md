📄 8.1 --- Test_Strategy.md
-------------------------

### 🎯 Tujuan

Menetapkan metodologi dan cakupan pengujian yang konsisten untuk setiap komponen Luxima Core Platform.

### 📦 Cakupan Pengujian

| Level | Fokus | Tools | Target |
| --- | --- | --- | --- |
| Unit Test | Fungsi tunggal atau modul kecil | Vitest / Jest | Auth Utils, Validation, Supabase Helpers |
| Integration Test | Interaksi antar modul | Supertest / Postman | API endpoints (Auth, Billing, Plugin) |
| End-to-End Test | Jalur bisnis lengkap | Playwright / Cypress | Registrasi Tenant → Login → Install Plugin |
| Load Test | Performansi & Scalability | k6 / Locust | API Gateway, Edge Functions |
| Security Test | Vulnerability & RLS enforcement | OWASP ZAP / custom SQL probes | RLS, JWT, API access tokens |

* * * * *

### 🧭 Test Environment Strategy

| Environment | Tujuan | Automation Level | Data Policy |
| --- | --- | --- | --- |
| **Dev** | Pengujian fungsi dasar | High (CI/CD triggered) | Mock + Synthetic |
| **Staging** | Uji integrasi & performa | Medium | Anonymized production clone |
| **Production** | Monitoring & smoke test | Low (manual or alert-based) | Real data (readonly) |

* * * * *

### ⚙️ Continuous Integration Pipeline (CI)

1.  **Linting & Type Checking** --- Pre-commit hooks (Husky)
2.  **Unit Tests** --- Menjalankan `pnpm test:unit`
3.  **Integration Tests** --- Menjalankan `pnpm test:integration`
4.  **E2E Tests** --- Menjalankan `pnpm test:e2e`
5.  **Coverage Report** --- Upload ke `test_reports/coverage.json`
6.  **Deployment Gate** --- Deploy hanya jika coverage ≥ 85%

* * * * *

### 📈 Test Coverage Goals

| Modul | Target Coverage |
| --- | --- |
| Auth System | 95% |
| Tenant Management | 90% |
| Plugin System | 85% |
| Billing System | 90% |
| Core API Gateway | 92% |