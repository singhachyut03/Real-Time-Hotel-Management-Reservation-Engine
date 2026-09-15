# StayOps — Real-Time Hotel Management & Reservation Engine

A production-grade, full-featured modern hotel management and reservation web platform built with React, Vite, Tailwind CSS, and Lucide React. Inspired by the usability and high information density of Booking.com on the public portal side, fused with a sleek, real-time SaaS hotel operations command hub.

---

## 🌟 Key Highlights

- **Dual-Experience Platform**:
  - **Public Guest Portal**: High-conversion landing page, Booking.com-inspired room discovery with granular multi-faceted filters, image galleries, room specs, transparent dynamic pricing breakdown, and a 5-step instant reservation wizard.
  - **Hotel Operations Control Hub**: Real-time room status grid across 50 rooms and 5 floors, check-in/out workflows, 4-stage Housekeeping Kanban, Maintenance work order tracker with room lockdowns, Guest CRM directory, Itemized Tax Invoicing, and Rule-based Smart Insights.
- **Dynamic Pricing Engine**:
  - Automatically calculates rates based on base price, day of the week (+15% weekend surge), live hotel occupancy (+20% surge when occupancy ≥ 85%), seasonal modifiers, optional add-ons, and 18% GST statutory taxes.
  - Transparent UI explanation: informs the guest exactly *why* rates fluctuate.
- **Deterministic Room Lifecycle**:
  $$\text{Available} \longrightarrow \text{Reserved} \longrightarrow \text{Occupied} \longrightarrow \text{Cleaning (Needs Cleaning)} \longrightarrow \text{In Progress} \longrightarrow \text{Inspection} \longrightarrow \text{Available}$$
  - Maintenance interruptions take rooms out of inventory immediately, requiring repair resolution and housekeeping sanitization before returning to availability.
- **Production Dark Aesthetic**:
  - Primary Background: `#07111F`
  - Secondary Dark Navy: `#0B1628`
  - Cards: `#101D30`
  - Primary Blue: `#4F8CFF`
  - Accent Cyan: `#4FD8FF`
  - Main Text: `#F5F7FB`
  - Secondary Text: `#8B99AF`
  - Borders: `#1D2B40`
  - Status Indicators: Available (Green), Occupied (Blue), Cleaning (Amber), Maintenance (Red), Reserved (Purple).
- **Zero-Backend Friction**:
  - Uses normalized LocalStorage persistence for instant offline readiness and real-time state synchronization.
  - Pre-seeded with **50 rooms**, **20+ reservations**, **15+ guests**, **10+ housekeeping tasks**, and **5+ maintenance issues**, with a 1-click **Reset Demo** button in settings.

---

## 📁 Application Structure & Routes

### Public Guest Portal
- `/` — **Landing Page**: Brand hero, featured room showcase, platform value cards, operational previews, and policy footer.
- `/rooms` — **Room Discovery**: Real-time search panel (Destination, Check-in, Check-out, Guests), sidebar filters (Room Type, Bed Type, Price Slider, Amenities, Breakfast, Free Cancellation, Availability), and rich room cards with dynamic total calculation.
- `/rooms/:id` — **Room Details**: High-res 5-image gallery grid with lightbox modal, detailed specs (size, capacity, bed), amenities, policies, and desktop sticky booking panel.
- `/my-bookings` — **Reservation Lookup**: Find booking by ID (e.g. `#STY4821`) and view/print invoices.
- `/about` — **About Hotel**: Story, architectural imagery, hospitality pillars, and location details.
- `/login` — **Sign In**: Quick one-click demo login for Admin or Guest.

### Hotel Operations Workspace
- `/dashboard` — **Operations Dashboard**: Live occupancy rate, today's revenue, arrivals/departures, 50-room interactive status grid, real-time activity log, attention alerts, and quick actions.
- `/reservations` — **Reservations Management**: Filterable registry (Today, Upcoming, Checked-in, Completed, Cancelled), right-side detail drawer, check-in / check-out actions, and tax invoice generation.
- `/rooms-management` — **Visual Rooms Directory**: Filter by status and floor (Floor 1-5), room specifications, current guest link, and maintenance lockdown triggers.
- `/guests` — **Guest CRM**: Lifetime spending, total stays, VIP tiers (Silver, Gold, Platinum, Diamond), preferences, and historical stay ledger.
- `/housekeeping` — **Housekeeping Kanban**: 4-column drag-and-drop / click-to-advance board (`Needs Cleaning` ➔ `In Progress` ➔ `Inspection` ➔ `Ready`).
- `/maintenance` — **Maintenance Issue Tracker**: Priority work orders (High, Medium, Low), repair team assignments, room lockdown, and post-repair turnover handoff.
- `/billing` — **Revenue & Invoicing**: Revenue collection ledger, GST statutory tax summary, and printable/downloadable guest tax invoices.
- `/insights` — **Smart Insights**: Rule-based intelligence alerts for weekend demand surges, room turnover bottlenecks, unpaid balances, and long-term maintenance holds.
- `/settings` — **System Settings**: Hotel property details, dynamic pricing multiplier controls, and one-click demo data reset.

---

## 🛠️ Technology Stack

- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS with custom StayOps tokens & glowing elevation utilities
- **Icons**: Lucide React
- **Animation & FX**: CSS3 transitions, keyframe slide drawers, Canvas Confetti
- **State Management**: React Context API with normalized LocalStorage persistence
- **Routing**: React Router DOM (v6)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or newer)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/singhachyut03/Real-Time-Hotel-Management-Reservation-Engine.git
cd Real-Time-Hotel-Management-Reservation-Engine

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port specified in terminal).

### 4. Build for Production
```bash
npm run build
```

---

## 📄 License
MIT License. Built with ❤️ for StayOps Grand & Suites.