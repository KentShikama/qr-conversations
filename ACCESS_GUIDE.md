# QR Conversations - Access Guide

## 🏠 Home Page
**URL:** `/#` or just the base URL

This is your landing page that explains the concept.

---

## 📍 Location Pages

Location pages use **encoded URLs** to prevent people from guessing sequential locations. Here's how to access them:

### Format
`/#/{encoded_location_id}`

### Example URLs for Testing

Here are the encoded URLs for all 10 locations:

1. **Location #1:** `/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzE`
2. **Location #2:** `/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzI`
3. **Location #3:** `/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzM`
4. **Location #4:** `/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzQ`
5. **Location #5:** `/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzU`
6. **Location #6:** `/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzY`
7. **Location #7:** `/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzc`
8. **Location #8:** `/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzg`
9. **Location #9:** `/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzk`
10. **Location #10:** `/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzEw`

### What These URLs Encode
Each encoded string is the base64 encoding of:
- Location 1: `qrconversations_location_1`
- Location 2: `qrconversations_location_2`
- etc.

This makes the URLs non-obvious but predictable if you know the pattern.

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
http://localhost:5173/                                              → Home page
http://localhost:5173/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzE          → Location #1
http://localhost:5173/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzI          → Location #2
http://localhost:5173/#/admin                                        → Admin dashboard
```

---

## 🎯 How the Encoding Works

If you need to generate URLs programmatically or create QR codes:

```javascript
// The encoding function (already in your codebase at src/lib/locations.ts)
function encodeLocationId(id) {
  const str = `qrconversations_location_${id}`
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

// Example: Generate URL for location 5
const encoded = encodeLocationId(5)
const url = `https://yoursite.com/#/${encoded}`
// Result: https://yoursite.com/#/cXJjb252ZXJzYXRpb25zX2xvY2F0aW9uXzU
```

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
