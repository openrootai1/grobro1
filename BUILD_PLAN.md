# GroKro Build Plan

**Created:** 15 July 2026  
**Read first:** `SOURCE_OF_TRUTH_2026-07-15.md` (it overrides everything, including this file)

This is the step-by-step execution plan the AI follows to build the app.
Each phase ends with something that runs. Check off items as they complete.

---

## Phase 0 — Environment check
- [ ] Verify Node.js (18+), npm, git are installed
- [ ] Verify GitHub CLI is logged in as `openrootai1`
- [ ] Verify `google-services.json` exists in project root

## Phase 1 — Scaffold the app
- [ ] Create Expo app (TypeScript) in `grobro-app/` inside this folder
- [ ] Set Android package `com.grobro.app`, app name GroKro
- [ ] Install core deps: Expo Router, NativeWind, Zustand
- [ ] Create feature-based folder structure from SOURCE_OF_TRUTH §7
- [ ] App boots to a placeholder screen
- [ ] Initial commit pushed to `openrootai1/grobro1`

## Phase 2 — Theme + navigation shell
- [ ] Purple GroKro theme (colors, typography constants)
- [ ] Bottom tabs: Home | Video Guides | Visual Guides
- [ ] Top bar: logo left, Profile icon right → Profile screen
- [ ] Placeholder screens for all tabs + Profile

## Phase 3 — Firebase + Phone OTP auth
- [ ] Install Firebase (React Native Firebase for native OTP support)
- [ ] Wire `google-services.json`
- [ ] Phone number entry screen → OTP screen → verify
- [ ] Create/update user doc in Firestore `users`
- [ ] Zustand `authStore` (login state, user)
- [ ] Logged-out users always land on login; logged-in users skip it

## Phase 4 — Content data + screens
- [ ] Firestore collections: `businesses`, `videos`, `visualGuides` (per SOURCE_OF_TRUTH §6)
- [ ] Seed script with ~10 placeholder businesses + sample videos (owner replaces with real content)
- [ ] Home screen: hero + business grid (from mocks)
- [ ] Video Guides tab: business list → video list → video player
- [ ] Visual Guides tab: business list → guide sections (heading/text/image)
- [ ] All fetching through Screen → Hook → Service pattern

## Phase 5 — Trial gate + subscription state
- [ ] Mandatory Trial screen after login (no content previews)
- [ ] `subscriptions` collection + `subscriptionStore`
- [ ] Content gate: active trial/subscription required for all content
- [ ] Stub payment ("Start ₹5 Trial" activates a 3-day trial in Firestore)
- [ ] Cancel-trial flow with confirmation + repurchase screen

## Phase 6 — Profile + support
- [ ] Profile screen: name, phone, subscription status, logout
- [ ] Support form (name + message → `supportRequests`)

## Phase 7 — Analytics
- [ ] Firebase Analytics events from SOURCE_OF_TRUTH §8

## Phase 8 — Real payments (Razorpay)
- [ ] Razorpay SDK integration (needs owner's Razorpay account + keys)
- [ ] ₹5 trial charge → UPI Autopay ₹199/month subscription
- [ ] Webhook/verification approach documented for owner

## Phase 9 — Build + release
- [ ] EAS Build config (development build first — required for native Firebase)
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
