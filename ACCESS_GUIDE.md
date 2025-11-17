# QR Conversations - Access Guide

## 🏠 Home Page
**URL:** `/#` or just the base URL

This is your landing page that explains the concept.

---

## 📍 Location Pages

Location pages use **encoded URLs** that are not immediately sequential. Here's how to access them:

### Format
`/#/{encoded_location_id}`

Each encoded ID is a 10-character hash that uniquely identifies a location without revealing its sequence number.

**Note:** Trailing slashes are automatically handled, so both `/#/6trgpq500e` and `/#/6trgpq500e/` will work.

### Example URLs for Testing

Here are the encoded URLs for all 10 locations:

1. **Location #1:** `/#/6trgpq500e`
2. **Location #2:** `/#/6trgpq5c0i`
3. **Location #3:** `/#/6trgpq5h0f`
4. **Location #4:** `/#/6trgpq5m0m`
5. **Location #5:** `/#/6trgpq5r0g`
6. **Location #6:** `/#/6trgpq5w0n`
7. **Location #7:** `/#/6trgpq6h0h`
8. **Location #8:** `/#/6trgpq6m0o`
9. **Location #9:** `/#/6trgpq6r0i`
10. **Location #10:** `/#/6trgpq6v0k`

### What These URLs Encode
Each encoded string is generated using:
- A hash of the location ID combined with a salt
- A checksum for validation
- Base36 encoding for compact representation

This makes the URLs harder to guess sequentially while remaining shareable.

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
http://localhost:5173/#/6trgpq500e      → Location #1
http://localhost:5173/#/6trgpq5c0i      → Location #2
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
// Result: "6trgpq5r0g"

// Generate full URL for a location
const url = generateLocationUrl(5)
// Result: "https://yoursite.com/#/6trgpq5r0g"
```

The encoding uses a hash-based approach with salt and checksum, making it:
- **Non-sequential:** Can't guess location 2 from location 1
- **Validated:** Invalid codes are rejected
- **Compact:** Only 10 characters long

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
