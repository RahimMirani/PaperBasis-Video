# PaperBasis Launch Video

A 4K product launch video for PaperBasis, built with [Remotion](https://remotion.dev/) — programmatic video creation in React.

## Overview

This project produces a 40-second (1200 frames @ 30fps) launch video at **3840×2160** resolution. The video follows a narrative arc from problem to solution, showcasing PaperBasis features and ending with a call-to-action.

## Tech Stack

- **Remotion 4** – Video composition and rendering
- **React 19** – Component-based UI
- **Tailwind CSS v4** – Styling
- **TypeScript** – Type safety

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

Open Remotion Studio to preview and edit the video:

```bash
npm run dev
```

### Build

Bundle the video for rendering:

```bash
npm run build
```

### Other Scripts

| Command | Description |
|---------|-------------|
| `npm run upgrade` | Upgrade Remotion to the latest version |
| `npm run lint` | Run ESLint and TypeScript checks |

## Video Structure

The composition is organized into 8 scenes with smooth transitions:

| Scene | Frames | Duration | Description |
|-------|--------|----------|-------------|
| 1. Stuck in 1993 | 0–150 | 0–5s | Hook + opener (dark theme) |
| 2. Problem Statement | 150–260 | 5–8.7s | Three core problems (light) |
| 3. Solution Intro | 260–420 | 8.7–14s | Solution introduction (dark) |
| 4. Feature: Citations | 420–630 | 14–21s | Citations feature demo (light) |
| 5. Feature: Code | 630–840 | 21–28s | Code feature demo (dark) |
| 6. Product Reveal | 840–970 | 28–32.3s | Product showcase (light) |
| 7. Tagline | 970–1070 | 32.3–35.7s | Brand tagline (light) |
| 8. Logo Reveal + CTA | 1070–1200 | 35.7–40s | Logo and call-to-action (light) |

The video alternates between dark (`#0f0f0f`) and light (`#FFFBF5`) backgrounds with smooth spring-based transitions.

## Project Structure

```
src/
├── Root.tsx          # Remotion root, composition registration
├── Composition.tsx   # Main PaperBasisLaunch composition
├── index.css         # Global styles
└── components/
    ├── StuckIn1993      # Opening hook scene
    ├── ProblemStatement # Problem statement scene
    ├── SolutionIntro    # Solution introduction
    ├── FeatureCitations # Citations feature demo
    ├── FeatureCode      # Code feature demo
    ├── ProductReveal    # Product showcase
    ├── Tagline          # Brand tagline
    ├── LogoReveal       # Logo + CTA
    ├── KineticText      # Animated text utilities
    ├── MotionGraphics   # Floating shapes, orbs, particles, etc.
    └── ...
```

## Configuration

- **Output format**: JPEG for video frames
- **Overwrite**: Output files are overwritten by default
- **Styling**: Tailwind v4 via `@remotion/tailwind-v4`

## License

UNLICENSED – Private project.
