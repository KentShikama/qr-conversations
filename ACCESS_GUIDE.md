# QR Conversations - Access Guide

## 🏠 Home Page
**URL:** `/#` or just the base URL

This is your landing page that explains the concept.

---

## 📍 Location Pages

Location pages use **encoded URLs** that are simple base64-encoded IDs with a 'q' prefix. Here's how to access them:

### Format
`/#/q{base64_encoded_id}`

Each encoded ID uses base64 encoding prefixed with 'q' to make it less obvious and harder to guess sequentially.

**Note:** Trailing slashes are automatically handled, so both `/#/qMQ` and `/#/qMQ/` will work.

### Example URLs for Testing

Here are the encoded URLs for all 10 locations:

1. **Location #1:** `/#/qMQ`
2. **Location #2:** `/#/qMg`
3. **Location #3:** `/#/qMw`
4. **Location #4:** `/#/qNA`
5. **Location #5:** `/#/qNQ`
6. **Location #6:** `/#/qNg`
7. **Location #7:** `/#/qNw`
8. **Location #8:** `/#/qOA`
9. **Location #9:** `/#/qOQ`
10. **Location #10:** `/#/qMTA`

### What These URLs Encode
Each encoded string is generated using:
- Base64 encoding of the location ID number
- A 'q' prefix for obfuscation
- Removal of padding characters (=) for cleaner URLs

This makes the URLs harder to guess sequentially while remaining compact and shareable.

---

## 🔐 Admin Dashboard

**URL:** `/#/admin`

The admin button on the home page is **intentionally hidden** (it's a tiny invisible dot in the bottom-right corner). 

### How to Access:
1. **Option A:** Navigate directly to `/#/admin` in your browser
2. **Option B:** On the home page, hover over the bottom-right corner until you see your cursor change, then click

### What You Can Do:
- View all messages from all locations
- See treasure hunt progress
- Monitor the entire QR conversation network

---

## 🗺️ Quick Test Navigation

To test the app locally, open these URLs in your browser:

```
http://localhost:5173/                  → Home page
http://localhost:5173/#/qMQ             → Location #1
http://localhost:5173/#/qMg             → Location #2
http://localhost:5173/#/qNA             → Location #4
http://localhost:5173/#/admin           → Admin dashboard
```

---

## 🎯 How the Encoding Works

If you need to generate URLs programmatically or create QR codes:

```javascript
// The encoding function (already in your codebase at src/lib/locations.ts)
import { encodeLocationId, generateLocationUrl } from '@/lib/locations'

// Generate encoded ID for a location
const encoded = encodeLocationId(5)
// Result: "qNQ"

// Generate full URL for a location
const url = generateLocationUrl(5)
// Result: "https://yoursite.com/#/qNQ"
```

The encoding uses simple base64 with a prefix, making it:
- **Non-obvious:** Not immediately apparent it's just a number
- **Validated:** Invalid codes are rejected
- **Compact:** Only 2-4 characters long
- **Simple:** Easy to encode/decode programmatically

---

## 🎨 Creating QR Codes

When you're ready to print QR codes for Tokyo, use the encoded URLs above. Each QR code should link to a unique location URL.

**Recommended QR Code Generator:** [qr-code-generator.com](https://www.qr-code-generator.com/) or any tool that supports custom URLs.

---

## 💡 Tips

- **Test different locations** by opening multiple browser tabs with different encoded URLs
- **The treasure hunt** tracks when users visit locations (stored in browser localStorage via useKV)
- **Messages persist** across page reloads using the Spark KV store
- **Admin access** requires the user to be the owner (checked via `spark.user()` API)
