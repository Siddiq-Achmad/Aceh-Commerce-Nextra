# Acceptance Criteria & Definition of Done
**Project:** Aceh Commerce  
**Version:** 1.0  
**Date:** 2025-10-14  

---

## 1. Definition of Done (DoD)
Sebuah fitur dianggap **selesai** jika memenuhi semua kriteria berikut:
- ✅ Kode lolos linting & unit test  
- ✅ PR telah direview & disetujui  
- ✅ Dokumentasi API dan schema database diperbarui  
- ✅ Fitur berhasil diuji di staging environment  
- ✅ Tidak ada regresi fungsional yang terdeteksi  

---

## 2. Feature Acceptance Matrix

| Fitur | Acceptance Criteria | Status |
|-------|----------------------|--------|
| **Vendor Registration** | Form validasi lengkap, email konfirmasi terkirim, data tersimpan | 🟢 Passed |
| **Product Upload** | Produk muncul di listing, gambar tampil di gallery | 🟢 Passed |
| **Checkout Process** | Transaksi berhasil tercatat, pembayaran sukses | 🟡 Pending |
| **Dashboard Analytics** | Data penjualan sesuai database | 🔵 In Progress |

---

## 3. Testing Layers
| Layer | Tools | Coverage Target |
|--------|--------|----------------|
| **Unit Tests** | Vitest | ≥90% |
| **Integration Tests** | Playwright | ≥85% |
| **Load Tests** | K6 | ≥70% under 500 req/s |
| **Security Tests** | OWASP ZAP | No critical vulnerabilities |

---

## 4. QA Sign-off Template

| QA Lead | Date | Notes |
|----------|------|--------|
| — | — | — |

---

## 5. Next Steps
- Tambah test coverage untuk fitur “Payout & Finance”
- Integrasi test otomatis ke CI/CD pipeline
