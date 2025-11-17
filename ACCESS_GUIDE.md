# QR Conversations - Access Guide

## 🏠 Home Page
**URL:** `/#` or just the base URL

This is your landing page that explains the concept.

---

## 📍 Location Pages

Location pages use **encoded URLs** to make them slightly less obvious. Here's how to access them:

### Format
`/#/{encoded_location_id}`

### Example URLs for Testing

Here are the encoded URLs for all 10 locations:

1. **Location #1:** `/#/t01`
2. **Location #2:** `/#/t02`
3. **Location #3:** `/#/t03`
4. **Location #4:** `/#/t04`
5. **Location #5:** `/#/t05`
6. **Location #6:** `/#/t06`
7. **Location #7:** `/#/t07`
8. **Location #8:** `/#/t08`
9. **Location #9:** `/#/t09`
10. **Location #10:** `/#/t0a`

### What These URLs Encode
Each encoded string uses hexadecimal notation prefixed with 't':
- Location 1: `t` + `01` (hex) = `t01`
- Location 10: `t` + `0a` (hex) = `t0a`

This makes the URLs short and slightly obfuscated.

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
http://localhost:5173/          → Home page
http://localhost:5173/#/t01     → Location #1
http://localhost:5173/#/t02     → Location #2
http://localhost:5173/#/admin   → Admin dashboard
```

---

## 🎯 How the Encoding Works

If you need to generate URLs programmatically or create QR codes:

```javascript
// The encoding function (already in your codebase at src/lib/locations.ts)
function encodeLocationId(id) {
  const hex = id.toString(16).padStart(2, '0')
  return `t${hex}`
}

// Example: Generate URL for location 5
const encoded = encodeLocationId(5)
const url = `https://yoursite.com/#/${encoded}`
// Result: https://yoursite.com/#/t05
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
