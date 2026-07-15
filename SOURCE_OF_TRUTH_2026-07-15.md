# GroKro / GroBro — Source of Truth

**Date:** 15 July 2026  
**Status:** FINAL decisions for V1 build  
**Audience:** AI agents (Cursor, ChatGPT, Claude, etc.) and humans  

Before writing or changing any code, read this file first.  
If this file conflicts with older product docs (`GroKro_Product Docs/`), **this file wins**.

---

## 1. What we are building

A simple Android content app that helps Hindi-speaking Indian users learn how to start small businesses through:

1. **Video Guides** — short sequential videos per business  
2. **Visual Guides** — step-by-step text + images (not PDFs)

**Brand**
- Product name in copy/docs: **GroKro** (also referred to as GroBro in older UI mocks)
- Tagline: Grow Together  
- Android package name: `com.grobro.app` (do not change)

**Audience**
- Beginners, Tier-2 / Tier-3 India  
- Mostly phone-number users  
- Mixed Hindi + English UI/content (no language toggle in V1)

**Primary goals (priority order)**
1. Trial conversion  
2. Subscription retention  
3. Content consumption  
4. Analytics accuracy  
5. Development speed  

This is **not** a social app, marketplace, LMS, or community product.

---

## 2. Final technology stack (LOCKED)

| Layer | Choice | Notes |
|---|---|---|
| App framework | **Expo (React Native) + TypeScript** | AI-friendly; EAS Build + OTA updates |
| Navigation | **Expo Router** | Feature routes under `app/` |
| Styling | **NativeWind** | Keep UI simple and fast |
| State | **Zustand** | Auth + subscription only (small stores) |
| Auth | **Firebase Authentication — Phone OTP only** | No password, no Google/social in V1 |
| Database | **Cloud Firestore** | Users, businesses, videos, guides, subscriptions |
| File storage | **Firebase Storage** | Thumbnails, guide images; videos as MP4 URLs or Storage |
| Analytics | **Firebase Analytics** (+ Meta SDK later) | Required events listed below |
| Payments | **Razorpay + UPI Autopay** | ₹5 trial → ₹199/month |
| Backend #2 | **Supabase — NOT used in V1** | Do not set up unless explicitly requested later |
| Play Billing | **Not used in V1** | Revisit only if Play policy forces it |
| Source control | **GitHub** `openrootai1/grobro1` | |
| Updates | **Expo EAS Update (OTA)** for small fixes; Play Store for major releases | |

### Why this stack (owner is a non-coder)
- Expo OTA lets AI fix and ship without constant Play Store waits  
- Firebase is already created and wired for OTP  
- One backend (Firebase) reduces setup and debug surface  
- Razorpay matches India UPI trial/subscription model in the product docs  

---

## 3. Accounts & project IDs (current)

| Service | Value |
|---|---|
| GitHub repo | https://github.com/openrootai1/grobro1 |
| GitHub owner | `openrootai1` (CLI may also have `earthailabs`; use `openrootai1` for this repo) |
| Firebase project name | `grobro` |
| Firebase project ID | `grobro-331f6` |
| Android package | `com.grobro.app` |
| Firebase config file | `google-services.json` (in project root; copy into Expo Android app path when scaffolded) |
| Firebase plan | Spark (free) for early development |
| Phone Auth test number | `+91 99999 00000` with fixed OTP (as configured in Firebase) |

Owner preference: minimize manual console work; AI does code, wiring, and repo pushes. Owner provides console clicks only when Google/Firebase require human login.

---

## 4. App structure & navigation (LOCKED)

### Bottom tabs (3)
1. **Home** — conversion-focused landing  
2. **Video Guides** — businesses → video lists → player  
3. **Visual Guides** — businesses → visual guide content  

### Top bar
- Left: GroKro logo + name  
- Right: **Profile** icon (not a bottom tab)

### Do not use
- Bottom tab named “Guided Steps” or “Profile”  
- Categories, filters, tags, recommendations in V1  

Older UI mocks showed Home / Videos / Guided Steps.  
**Final V1:** Home / Video Guides / Visual Guides, with Profile via top icon.

---

## 5. Core user flows

### Auth
App open → Phone number → OTP → Firebase verify → create/update user in Firestore → continue

### Access / monetization (mandatory)
OTP success → **Trial screen (mandatory)** → ₹5 trial via Razorpay → content access  

**Trial screen must include**
- Trust graphics, conversion copy, subscription info, CTA  

**Trial screen must NOT include**
- Content previews, video previews, business previews  

**Rule:** All business content requires **active trial or active subscription**.

### Trial / subscription model
- Trial: **₹5**, **3 days**  
- Then auto-convert to **₹199 / month** (Razorpay UPI Autopay)  
- Cancel trial → confirmation → access until trial end → repurchase screen  

### Content
- About **10** flat business opportunities (no category taxonomy in V1)  
- Each business: many videos (ordered) + optional visual guide  
- Real videos will be provided by the owner  

---

## 6. Data model (Firestore)

Collections (keep simple; do not invent future tables):

### `users`
- `firebaseUid`, `phoneNumber`, `name`, `createdAt`, `updatedAt`

### `businesses`
- `title`, `description`, `thumbnailUrl`, `coverImageUrl`, `isActive`, `createdAt`, `orderIndex`

### `videos`
- `businessId`, `title`, `description`, `thumbnailUrl`, `videoUrl`, `orderIndex`, `durationSeconds?`, `isPublished`

### `visualGuides`
- `businessId`, `title`, `contentJson` (sections: heading/text/image), `isPublished`

### `subscriptions`
- `userId`, `status`, `trialStartedAt`, `trialEndAt`, `subscriptionStartedAt`, `subscriptionEndAt`, `razorpaySubscriptionId`

### `supportRequests`
- `userId`, `name`, `message`, `status`, `createdAt`

Storage folders (Firebase Storage):  
`business-thumbnails/`, `business-covers/`, `video-thumbnails/`, `guide-images/`  
Videos: MP4 URLs (Storage or external); no module hierarchy beyond Business → Videos.

---

## 7. Folder architecture (Expo)

Feature-based. No DB calls from screens.

```text
src/
  app/                 # Expo Router only
  features/
    auth/
    home/
    video-guides/
    visual-guides/
    profile/
    subscription/
  shared/              # reusable UI + hooks (no business logic)
  services/
    firebase/
    razorpay/
    analytics/
  store/               # Zustand
  types/
  constants/
  lib/
```

**Correct:** Screen → Hook → Service → Firebase  
**Wrong:** Screen → Firebase  

---

## 8. Analytics (do not remove without approval)

Firebase events (minimum):
- `app_opened`, `otp_started`, `otp_verified`
- `trial_screen_viewed`, `trial_started`, `trial_cancelled`
- `subscription_started`, `subscription_renewed`, `repurchase_screen_viewed`
- `business_opened`, `video_started`, `video_completed`, `visual_guide_opened`
- `profile_opened`, `support_submitted`

Meta (add when ads SDK is integrated):
- `CompleteRegistration`, `StartTrial`, `Subscribe`

Primary acquisition channel: **Meta / Facebook Ads**.

---

## 9. V1 non-goals (do not build)

- Categories, filters, tags, recommendations  
- Bookmarks / watch history  
- Offline downloads  
- Notifications  
- Comments, likes, community, chat  
- Language switcher  
- Admin panel  
- Google/email/password login  
- Supabase  
- Google Play Billing (unless later forced by policy)

---

## 10. Design / UX rules

- Simple, fast, mobile-first; optimize for low-end Android  
- Prefer clarity over heavy animation or visual effects  
- Match purple GroKro mock direction where practical, but product flows in this file override mock navigation  
- Every network/auth/payment/content action: loading + success + error states  

### File size limits (soft rules for AI)
- Components ≤ 200 lines  
- Screens ≤ 300 lines  
- Services ≤ 200 lines  
- Hooks ≤ 150 lines  
- Zustand stores ≤ 150 lines  

### TypeScript
- Strict mode  
- Avoid `any`

---

## 11. Security

Never commit or embed in the app:
- Firebase Admin credentials  
- Razorpay secret key  
- Any service-role / server secrets  

Only public client keys may live in the mobile app.  
Start Firestore in test mode for early build; lock rules before real users.

---

## 12. Build / release workflow

```text
AI develops in Cursor
  → push to GitHub (openrootai1/grobro1)
  → Expo EAS Build (Android)
  → Google Play
  → EAS Update (OTA) for small fixes
```

Owner is a **non-coder**. Prefer:
- Clear run instructions  
- Minimal manual console steps  
- Manual testing checklist over complex automated test suites in V1  

---

## 13. Reference assets in this folder

| Path | Role |
|---|---|
| `Homep Page.png` | Home UI reference |
| `Videos Main page.png` | Videos list UI reference |
| `Video Category main page.png` | Business / step list UI reference |
| `index.html` | Early HTML phone preview (not production) |
| `google-services.json` | Firebase Android config |
| `GroKro_Product Docs/*.docx` | Older product docs (secondary; overridden by this file where conflicting) |

---

## 14. Immediate next build order

1. Scaffold Expo TypeScript app with package `com.grobro.app`  
2. Wire Firebase Auth (Phone OTP) + Firestore  
3. Auth screens → mandatory Trial screen (Razorpay can be stubbed, then real)  
4. Tabs: Home / Video Guides / Visual Guides + Profile  
5. Seed ~business/video content structure for owner’s real videos  
6. Subscription state gate on all content  
7. Analytics events  
8. EAS Build + first OTA pipeline  

---

## 15. Decision log (15 July 2026)

- Chose **Expo over Flutter** for OTA + AI-maintainability for a non-coder owner  
- Chose **Firebase-only backend** (no Supabase in V1) even though older architecture docs mentioned Supabase  
- Chose **Razorpay** (₹5 → ₹199) over Play Billing for V1 India UPI flow  
- Chose bottom nav **Home | Video Guides | Visual Guides**; Profile via top icon  
- OTP-only auth; no guest browsing of content before trial  
- Confirmed GitHub repo and Firebase project above  

---

**End of source of truth — 15 July 2026**
