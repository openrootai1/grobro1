/**
 * Seeds placeholder businesses, videos, and visual guides into Firestore.
 * Works while Firestore is in TEST MODE (open rules). Re-running overwrites
 * the same documents, so it is safe to run multiple times.
 *
 * Usage: node scripts/seedContent.mjs
 */

const PROJECT_ID = "grobro-331f6";
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

// Public sample MP4s — the owner will replace these with real videos.
const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const BUSINESSES = [
  { id: "dairy", title: "Dairy Business", desc: "गाय-भैंस से दूध का बिज़नेस शुरू करें" },
  { id: "fast-food", title: "Fast Food Business", desc: "छोटा स्टॉल, बड़ा मुनाफा" },
  { id: "mobile-repair", title: "Mobile Repair Business", desc: "मोबाइल रिपेयरिंग सीखें और कमाएं" },
  { id: "ai-academy", title: "AI Academy Business", desc: "AI ट्यूशन सेंटर शुरू करें" },
  { id: "kirana", title: "Kirana Store Business", desc: "अपनी किराना दुकान शुरू करें" },
  { id: "beauty-parlour", title: "Beauty Parlour Business", desc: "घर से ब्यूटी पार्लर शुरू करें" },
  { id: "coaching", title: "Coaching Centre", desc: "कोचिंग सेंटर खोलें और पढ़ाएं" },
  { id: "online-service", title: "Online Service Centre", desc: "ऑनलाइन सेवा केंद्र शुरू करें" },
  { id: "home-made", title: "Home Made Products", desc: "घर के बने प्रोडक्ट बेचें" },
  { id: "freelancing", title: "Freelancing Services", desc: "फ्रीलांसिंग से घर बैठे कमाएं" },
];

const VIDEO_STEPS = [
  { title: "पूरा प्लान", desc: "पूंजी, जगह, लाइसेंस और ज़रूरी तैयारी" },
  { title: "जगह कैसे चुनें", desc: "सही लोकेशन चुनने का तरीका" },
  { title: "ज़रूरी सामान और सेटअप", desc: "मशीन, सामान और शुरुआती सेटअप" },
  { title: "ग्राहक कैसे बढ़ाएं", desc: "मार्केटिंग और कमाई बढ़ाने के तरीके" },
];

function toFirestoreValue(v) {
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number")
    return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (v === null) return { nullValue: null };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toFirestoreValue) } };
  return { mapValue: { fields: toFields(v) } };
}

function toFields(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, toFirestoreValue(v)])
  );
}

async function putDoc(collection, docId, data) {
  const res = await fetch(`${BASE}/${collection}/${docId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fields: toFields(data) }),
  });
  if (!res.ok) {
    throw new Error(`${collection}/${docId}: ${res.status} ${await res.text()}`);
  }
}

async function main() {
  for (const [i, biz] of BUSINESSES.entries()) {
    await putDoc("businesses", biz.id, {
      title: biz.title,
      description: biz.desc,
      thumbnailUrl: "",
      coverImageUrl: "",
      isActive: true,
      orderIndex: i,
    });

    for (const [j, step] of VIDEO_STEPS.entries()) {
      await putDoc("videos", `${biz.id}-v${j + 1}`, {
        businessId: biz.id,
        title: `Step ${j + 1}: ${step.title}`,
        description: step.desc,
        thumbnailUrl: "",
        videoUrl: SAMPLE_VIDEO,
        orderIndex: j,
        durationSeconds: 300,
        isPublished: true,
      });
    }

    await putDoc("visualGuides", `${biz.id}-guide`, {
      businessId: biz.id,
      title: `${biz.title} — पूरी गाइड`,
      isPublished: true,
      contentJson: {
        sections: VIDEO_STEPS.map((step, j) => ({
          heading: `Step ${j + 1}: ${step.title}`,
          text: `${step.desc}. यह प्लेसहोल्डर कंटेंट है — असली गाइड जल्द जोड़ी जाएगी।`,
        })),
      },
    });

    console.log(`Seeded: ${biz.title}`);
  }
  console.log("Done. 10 businesses, 40 videos, 10 visual guides.");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
