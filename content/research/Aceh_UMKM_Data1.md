# Research: Aceh UMKM & Ecosystem - Summary and References

**Purpose:** Provide focused research notes and actionable implications specific to Aceh (UMKM, logistics, payments, government programs) to support Aceh Commerce Project planning and execution.

## Key Findings & Implications

### 1. Kopi Gayo (Aceh Arabica) — Production & Opportunity
- Aceh is a major producer of Arabica coffee (Kopi Gayo); according to the Ministry of Agriculture's Coffee Commodity Outlook 2022, Aceh averages around **66,000 tons** of Arabica coffee per year (peaked ~69,000 tons in 2022). This makes coffee (and its derivatives) the highest-priority product vertical for the platform. citeturn0search0turn0search12
- **Implication:** Prioritize product flows for coffee (KG sizing, roast profiles, certifications, export packaging, origin storytelling).

### 2. Government Programs & UMKM Digitalization
- Dinas Koperasi & UKM Aceh runs programs to support digitalization for UMKM (e.g., *UMKM Go Digital*, Digital Entrepreneur Class). These programs are active channels for vendor onboarding and capacity building. citeturn0search1turn0search19
- **Implication:** Pursue formal partnership (MoU) with Diskop Aceh to recruit pilot vendors and run training workshops.

### 3. Payment Gateways & Webhook Security
- Midtrans and Xendit are widely used in Indonesia for e-commerce payments. Both provide webhook notifications and recommend signature/token verification to secure webhook endpoints. (Midtrans docs: HTTP(S) Notification; Xendit docs: webhook behavior & verification token). citeturn0search2turn0search9turn0search15
- **Implication:** Implement robust webhook handlers with signature verification, idempotency, and logging. Keep both sandbox and production credentials isolated in secret manager.

### 4. Logistics & Shipping in Aceh
- RajaOngkir provides an API aggregator for shipping costs and supports multiple couriers (JNE, SiCepat, J&T, Pos Indonesia). Local courier coverage in Aceh is provided by JNE, Pos Indonesia, SiCepat, and regional operators. Freight/large shipments may require specialized cargo services. citeturn0search4turn0search5turn0search22
- **Implication:** Build a modular shipping adapter (RajaOngkir + direct courier APIs). Include options for heavy/fragile goods, and clear shipping cost transparency for buyers/sellers.

### 5. UMKM Readiness & Training Needs
- Local reports show active training programs; however vendor digital literacy varies — many UMKM need hands-on help with photography, packaging, and listing optimization. citeturn0search13turn0search7
- **Implication:** Create vendor enablement kits (photo templates, product description templates, packaging guides) and an onboarding concierge service in early launch phases.

## Recommended Next Steps (immediate)
1. Reach out to Diskop Aceh to propose pilot partnership and training cohort. citeturn0search7
2. Implement webhook verification per Midtrans/Xendit docs (see links below). citeturn0search2turn0search9
3. Prototype shipping cost flows using RajaOngkir sandbox. citeturn0search4
4. Prepare vendor onboarding kit (templates + short video tutorials).

---
## Sources & Links (collected)
- WRI Indonesia — "The Forest Monitoring Story Behind a Cup of Gayo Coffee". citeturn0search0
- Ministry/Research papers & coffee production stats (references in WRI & ResearchGate). citeturn0search12
- Diskop Aceh — UMKM Go Digital program page. citeturn0search1turn0search7
- Midtrans docs — Webhooks & HTTP Notification. citeturn0search2turn0search8
- Xendit docs — Webhook verification & handling. citeturn0search3turn0search9
- RajaOngkir — API docs. citeturn0search4
- SiCepat, JNE, courier coverage references. citeturn0search5turn0search23

---
_Notes:_ This file is a short brief. If you want, I can expand each source into an annotated bibliography with direct links and contact points (Diskop Aceh officers, courier API sales reps, payment gateway technical onboarding).