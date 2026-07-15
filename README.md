# GroKro (GroBro)

Hindi-first Android app that teaches Indian users how to start small businesses through short videos and step-by-step visual guides.

## Start here

1. **`SOURCE_OF_TRUTH_2026-07-15.md`** — final product + stack decisions (overrides everything)
2. **`BUILD_PLAN.md`** — phased build plan the AI follows
3. **`grobro-app/`** — the Expo (React Native + TypeScript) application

## Stack

Expo + Expo Router + NativeWind + Zustand · Firebase (Phone OTP, Firestore, Storage, Analytics) · Razorpay (₹5 trial → ₹199/month UPI Autopay)

## Local setup

- Requires Node 18+ (Node 22 recommended)
- `google-services.json` is NOT committed (public repo). Place your Firebase Android config at `grobro-app/google-services.json` before building.

```bash
cd grobro-app
npm install
npx expo start
```

Native builds (Firebase OTP requires a development build, not Expo Go):

```bash
npx eas build --profile development --platform android
```
