# Darknet Watch

Darknet Watch is a real-time network monitoring dashboard that simulates packet flow, bandwidth usage, and threat notifications. It is built as a demo for visualizing how a security team might keep tabs on critical infrastructure traffic without needing a live data feed.

## Features

- Live network statistics that refresh every few seconds (packets per second, bandwidth, active connections, and detected threats).
- Bandwidth line chart powered by Recharts to show short-term trends.
- Security alert panel that surfaces simulated DoS events, suspicious activity, and blocked connections.
- Rolling traffic table with randomized IP addresses, ports, and protocol metadata to mimic log ingestion.
- Modern UI components styled with Tailwind CSS and shadcn/ui primitives.

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm (bundled with recent Node distributions)

### Installation

```sh
npm install
```

### Running the development server

```sh
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) where you can explore the dashboard.

### Production build

```sh
npm run build
```

To preview the production bundle locally:

```sh
npm run preview
```

### Additional scripts

- `npm run build:dev` — build with the development mode flag for quick diagnostics.
- `npm run lint` — run ESLint across the project.

## Project structure

```
src/
  components/         # Dashboard widgets (stats cards, charts, tables, alerts)
  hooks/              # Reusable hooks (if added later)
  lib/                # Utility helpers
  pages/              # Route-level components (Index, NotFound)
  App.tsx             # Application shell and router
  main.tsx            # React entry point
```

## Customizing the data feed

Network traffic is currently generated with simple randomizers inside each component. This keeps the UI lively without requiring backend infrastructure. If you want to integrate real metrics, replace the random data in `NetworkDashboard`, `BandwidthChart`, `AlertsPanel`, and `TrafficTable` with calls to your API or WebSocket stream.

## Tech stack

- React + TypeScript
- Vite build tooling
- Tailwind CSS + shadcn/ui for styling and components
- TanStack Query for future data fetching scenarios
- Recharts for charting

## License

No license has been provided yet. Add one if you intend to share or publish this project.
