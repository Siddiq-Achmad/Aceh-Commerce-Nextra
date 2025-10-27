# Aceh Commerce Project — Vendor Payout Process

## 1. Overview
Dokumen ini menjelaskan proses pembayaran vendor secara sistematis untuk memastikan **ketepatan waktu, akurasi, dan transparansi**.

---

## 2. Payout Schedule
- **Harapan**: Vendor menerima dana sesuai frekuensi yang dipilih (Harian, Mingguan)
- **Cut-off Time**:
  - Harian → 23:59 WIB
  - Mingguan → Setiap Jumat 23:59 WIB
- Semua transaksi diproses melalui sistem otomatis, dan tercatat di dashboard vendor.

---

## 3. Payout Calculation
1. Hitung total transaksi berhasil (selesai / terkonfirmasi)
2. Kurangi biaya platform (commission fee, biaya pembayaran)
3. Kurangi biaya retur/refund yang terjadi selama periode payout
4. Tambahkan saldo sebelumnya jika ada
5. Konfirmasi total akhir

---

## 4. Payment Methods
| Method | Detail |
|--------|--------|
| Bank Transfer | Rekening BRI, BCA, Mandiri, dll |
| eWallet | Gopay, OVO, Dana |
| Hybrid | Sebagian ke bank, sebagian ke eWallet |

---

## 5. Payout Workflow

```plaintext
1. System calculates total earnings
2. Deduct fees and refunds
3. Generate payout batch
4. Validate accounts and balances
5. Execute transfer
6. Update dashboard & send notification
```
---

## 6. Notifications
- Vendor menerima email dan in-app notification
- Detail yang diinformasikan:
    - Total payout
    - Rincian fee & refund
    - Estimasi waktu dana masuk

---

## 7. Exception Handling
- Gagal transfer → retry otomatis dalam 2 jam
- Rekening invalid → notifikasi ke vendor + tim finance
- Refund dispute → ditangani tim finance & support

---

## 8. Record Keeping
- Semua transaksi disimpan di database schema finance.payouts
- Backup harian ke object storage
- Audit trail tersedia untuk internal compliance & reporting

---
