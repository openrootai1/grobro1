# GroKro Build Plan

**Created:** 15 July 2026  
**Read first:** `SOURCE_OF_TRUTH_2026-07-15.md` (it overrides everything, including this file)

This is the step-by-step execution plan the AI follows to build the app.
Each phase ends with something that runs. Check off items as they complete.

---

## Phase 0 — Environment check
- [x] Verify Node.js (18+), npm, git are installed
- [x] Verify GitHub CLI is logged in as `openrootai1`
- [x] Verify `google-services.json` exists in project root

## Phase 1 — Scaffold the app
- [x] Create Expo app (TypeScript) in `grobro-app/` inside this folder
- [x] Set Android package `com.grobro.app`, app name GroKro
- [x] Install core deps: Expo Router, NativeWind, Zustand
- [x] Create feature-based folder structure from SOURCE_OF_TRUTH §7
- [x] App boots to a placeholder screen
- [x] Initial commit pushed to `openrootai1/grobro1`

## Phase 2 — Theme + navigation shell
- [x] Purple GroKro theme (colors, typography constants)
- [x] Bottom tabs: Home | Video Guides | Visual Guides
- [x] Top bar: logo left, Profile icon right → Profile screen
- [x] Placeholder screens for all tabs + Profile

## Phase 3 — Firebase + Phone OTP auth
- [x] Install Firebase (React Native Firebase for native OTP support)
- [x] Wire `google-services.json`
- [x] Phone number entry screen → OTP screen → verify
- [x] Create/update user doc in Firestore `users`
- [x] Zustand `authStore` (login state, user)
- [x] Logged-out users always land on login; logged-in users skip it

## Phase 4 — Content data + screens
- [x] Firestore collections: `businesses`, `videos`, `visualGuides` (per SOURCE_OF_TRUTH §6)
- [x] Seed script with ~10 placeholder businesses + sample videos (owner replaces with real content)
- [x] Home screen: hero + business grid (from mocks)
- [x] Video Guides tab: business list → video list → video player
- [x] Visual Guides tab: business list → guide sections (heading/text/image)
- [x] All fetching through Screen → Hook → Service pattern

## Phase 5 — Trial gate + subscription state
- [x] Mandatory Trial screen after login (no content previews)
- [x] `subscriptions` collection + `subscriptionStore`
- [x] Content gate: active trial/subscription required for all content
- [x] Stub payment ("Start ₹5 Trial" activates a 3-day trial in Firestore)
- [x] Cancel-trial flow with confirmation + repurchase screen

## Phase 6 — Profile + support
- [x] Profile screen: name, phone, subscription status, logout
- [x] Support form (name + message → `supportRequests`)

## Phase 7 — Analytics
- [x] Firebase Analytics events from SOURCE_OF_TRUTH §8

## Phase 8 — Real payments (Razorpay)
- [ ] Razorpay SDK integration (needs owner's Razorpay account + keys)
- [ ] ₹5 trial charge → UPI Autopay ₹199/month subscription
- [ ] Webhook/verification approach documented for owner

## Status notes (15 July 2026)

- Phases 0–7 are code-complete: the app compiles and bundles cleanly.
- Firestore is seeded with 10 placeholder businesses, 40 videos (sample MP4), 10 visual guides — owner replaces via `grobro-app/scripts/seedContent.mjs` or Firebase console.
- OTP login, trial flow, and analytics need a **development build on a real Android device** to verify at runtime (Expo Go cannot run native Firebase). That is the next step: Phase 9's dev build.
- Payment is stubbed: "Start ₹5 Trial" activates the trial without charging. Razorpay (Phase 8) needs the owner's Razorpay account.

## Phase 9 — Build + release
- [x] EAS Build config (project linked: d10507f5-b7d7-4215-919e-bd9d8d035072; preview APK built 15 Jul 2026)
- [ ] Add signing SHA-1/SHA-256 to Firebase Android app (required for OTP on device)
- [ ] Owner installs dev build on Android phone and tests OTP with test number
- [ ] Firestore security rules locked down
- [ ] Production build → Play Store guidance
- [ ] EAS Update (OTA) pipeline for small fixes

---

## Working rules for every step
- Follow SOURCE_OF_TRUTH architecture, naming, and file-size limits
- Commit + push to GitHub after each phase completes
- Anything requiring owner console clicks (Firebase, Razorpay, Play) is listed and requested, never assumed
- Prefer the simplest implementation that satisfies V1
