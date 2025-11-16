# Planning Guide

A social experiment and treasure hunt app where physical QR codes placed around Tokyo lead to location-specific conversation threads, allowing passersby to leave messages and reply to others, with an admin dashboard to monitor all conversations.

**Experience Qualities**: 
1. **Playful** - The treasure hunt mechanic and discovery of hidden conversations creates a sense of adventure and curiosity
2. **Intimate** - Anonymous but meaningful exchanges between strangers create authentic human connection
3. **Mysterious** - Non-obvious URLs and the hunt for all locations adds an element of intrigue and discovery

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple conversation threads, treasure hunt tracking, admin dashboard, but no complex authentication beyond owner check

## Essential Features

### Location Conversation Thread
- **Functionality**: Display only the most recent message for a location, allow users to reply to that message
- **Purpose**: Create a chain of replies where each person responds to the last visitor, forming an intimate one-to-one conversation thread
- **Trigger**: User scans QR code at physical location
- **Progression**: Scan QR → Decode location ID → View last message → Read previous visitor's message → Compose reply → Submit → See confirmation
- **Success criteria**: Only the last message is visible, new messages become the "last message", creating a conversation chain

### Non-obvious URL Encoding
- **Functionality**: Generate URLs using base64 encoding of location identifiers
- **Purpose**: Make URLs unpredictable to prevent people from accessing locations without physically visiting
- **Trigger**: QR code generation system
- **Progression**: Location ID → Base64 encode "qrconversations_location_N" → Generate URL → Create QR code
- **Success criteria**: URLs are not sequential or guessable, but decode reliably to location IDs

### Treasure Hunt Tracker
- **Functionality**: Track which locations a user has visited, show progress toward finding all QR codes
- **Purpose**: Gamify the experience and reward exploration
- **Trigger**: User visits a new location
- **Progression**: Visit location → Record visit in user's tracker → Update progress indicator → Show prize eligibility when all found
- **Success criteria**: Visits persist across sessions, progress accurately reflects discovered locations

### Admin Dashboard
- **Functionality**: GitHub owner login to view all messages across all locations (full history), monitor conversations, see analytics
- **Purpose**: Allow creator to moderate and understand how the experiment is being used, view the full conversation history that regular users cannot see
- **Trigger**: Owner accesses hidden admin trigger on home page
- **Progression**: Click hidden element → Navigate to admin → Check GitHub auth → Show all locations → View all messages by location → See timestamps and metadata
- **Success criteria**: Only owner can access, all messages visible (not just last message), organized by location, admin button is very subtle/hidden

### Message Posting
- **Functionality**: Simple form to compose and submit messages to a location thread
- **Purpose**: Allow anyone to participate in the conversation without barriers
- **Trigger**: User wants to reply after reading messages
- **Progression**: Click reply → Enter message text → Optional: add name/pseudonym → Submit → Message appears in thread
- **Success criteria**: No authentication required, messages save reliably, appear immediately

## Edge Case Handling
- **Invalid location codes**: Show friendly error page suggesting they scan a valid QR code
- **Empty conversations**: Display welcoming prompt encouraging user to be the first to leave a message
- **Very long messages**: Character limit (500 chars) with counter to keep messages concise
- **Spam prevention**: Rate limiting per device (one message per location every 5 minutes)
- **Missing location data**: Graceful fallback if location data doesn't load
- **Admin access without ownership**: Redirect to public view with message about owner-only access

## Design Direction
The design should feel urban and mysterious with a street art aesthetic - like finding hidden art installations around the city. It should balance digital minimalism with the tactile feeling of leaving messages in a chain letter. The interface should feel immediate and raw, not over-polished. Locations are anonymous (numbered only) to maintain mystery and encourage exploration without preconceptions.

## Color Selection
Custom palette - inspired by Tokyo neon nights and urban exploration

- **Primary Color**: Deep Indigo `oklch(0.35 0.12 270)` - communicates mystery and depth, like twilight exploration
- **Secondary Colors**: Electric Blue `oklch(0.65 0.18 240)` for highlights, suggesting digital/tech aspect; Charcoal `oklch(0.25 0.01 270)` for cards and depth
- **Accent Color**: Neon Cyan `oklch(0.78 0.15 195)` - eye-catching for CTAs and discovered locations, evokes Tokyo neon signs
- **Foreground/Background Pairings**:
  - Background (Deep Black `oklch(0.12 0.01 270)`): Light Gray text `oklch(0.95 0.01 270)` - Ratio 15.8:1 ✓
  - Card (Charcoal `oklch(0.25 0.01 270)`): White text `oklch(0.98 0 0)` - Ratio 10.2:1 ✓
  - Primary (Deep Indigo `oklch(0.35 0.12 270)`): White text `oklch(0.98 0 0)` - Ratio 6.1:1 ✓
  - Accent (Neon Cyan `oklch(0.78 0.15 195)`): Deep Black text `oklch(0.12 0.01 270)` - Ratio 11.4:1 ✓
  - Muted (Dark Gray `oklch(0.35 0.01 270)`): Light Gray text `oklch(0.85 0.01 270)` - Ratio 5.8:1 ✓

## Font Selection
Fonts should feel modern and urban with excellent readability for message threads - monospace touches to evoke street codes and digital authenticity.

- **Typographic Hierarchy**: 
  - H1 (Location Title): JetBrains Mono Bold/32px/tight letter spacing - tech aesthetic
  - H2 (Section Headers): Inter Bold/24px/normal spacing - clean hierarchy
  - Body (Messages): Inter Regular/16px/1.6 line-height - optimal readability
  - Metadata (timestamps): JetBrains Mono Regular/13px/wide spacing - subtle distinction
  - UI Labels: Inter Medium/14px/normal spacing

## Animations
Animations should feel snappy and urban - like graffiti appearing or neon signs flickering on. Brief and purposeful, suggesting the ephemeral nature of street art and spontaneous conversations.

- **Purposeful Meaning**: Messages should fade in as if being spray-painted, new locations should pulse subtly when discovered, progress bars should feel like revealing hidden content
- **Hierarchy of Movement**: 
  - New message submission: Quick fade-up (200ms) with subtle scale
  - Location discovery: Celebration burst animation with confetti-like particles
  - Treasure hunt progress: Smooth fill animation
  - Admin dashboard: Subtle transitions between location views

## Component Selection
- **Components**: 
  - Card (message threads and location cards with custom dark styling)
  - Textarea (message composition with character counter)
  - Button (primary for submit, secondary for navigation, modified with neon glow on hover)
  - Badge (location visited indicators with neon styling)
  - Progress (treasure hunt completion with custom neon fill)
  - Tabs (admin dashboard location switching)
  - ScrollArea (long message threads)
  - Alert (success/error feedback with custom styling)
  
- **Customizations**: 
  - Custom QR code display component with frame/border styling
  - Location identifier display with encoded URL
  - Message component with timestamp and optional name
  - Treasure hunt map/grid visualization
  - Admin analytics cards
  
- **States**: 
  - Buttons: Default has subtle border, hover adds neon cyan glow, active has pressed effect, disabled is muted
  - Textarea: Focus shows accent border with glow, character counter changes color approaching limit
  - Cards: Hover lifts slightly with shadow increase
  
- **Icon Selection**: 
  - MapPin (location markers)
  - QrCode (main icon for locations)
  - ChatCircle (messages/conversations)
  - Trophy (treasure hunt completion)
  - Eye (view/admin)
  - PaperPlaneRight (send message)
  
- **Spacing**: 
  - Page padding: p-6 mobile, p-8 desktop
  - Card gaps: gap-4
  - Message spacing: space-y-3
  - Section separation: mb-8
  
- **Mobile**: 
  - Stack location header and info vertically
  - Full-width message cards
  - Fixed bottom compose bar on conversation view
  - Hamburger menu for admin navigation
  - Single column treasure hunt grid
