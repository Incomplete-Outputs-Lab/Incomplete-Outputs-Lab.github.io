# 未完成成果物研究所 Landing Page

Dark, broadcast-tech landing page for Incomplete-Outputs-Lab with subtle scanline accents and SVG animations powered by anime.js.

## Overview

This is the official landing page for **未完成成果物研究所 (Incomplete-Outputs-Lab)**, an independent R&D team focused on broadcast production tools and hardware development.

### Key Features

- **Broadcast-tech aesthetic**: Dark theme, green accent, monospace typography, light scanline overlay
- **Dynamic SVG Animations**: Background waveforms, oscilloscope-style monitors, and PCB circuit visualizations
- **Responsive Design**: Mobile-first approach with optimized layouts for all screen sizes
- **Performance Optimized**: GPU-accelerated animations, debounced resize handlers, and efficient SVG rendering
- **Accessible**: Semantic HTML, WCAG AA color contrast, and `prefers-reduced-motion` support

## Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom CRT effects, animations, and responsive styling
- **Tailwind CSS v4**: Utility-first CSS framework via Play CDN
- **anime.js**: Powerful animation library for SVG and DOM manipulation
- **IBM Plex Mono**: Professional monospace typography

## File Structure

```
/
├── index.html                      # Main entry point
├── assets/
│   ├── css/
│   │   └── custom.css             # CRT effects, terminal styling
│   └── js/
│       ├── config.js              # Project data, constants
│       └── animations.js          # anime.js animation logic
├── README.md                       # This file
└── .gitignore                     # Git ignore file
```

## Project Showcase

### 1. obs-sync
**Distributed OBS Synchronization System**
- Type: Software
- Status: Production
- Visualization: Waveform monitor
- Stack: Rust, React, Tauri, WebSocket, obs-websocket

### 2. stream-monitor
**Broadcast Statistics Analyzer**
- Type: Software
- Status: Active Development
- Visualization: Waveform monitor
- Stack: Rust, React, Tauri, DuckDB, Webhooks

### 3. bi-kanpe
**Bi-directional cue / teleprompter app**
- Type: Software
- Status: Active
- Visualization: Project card (live badge)
- Stack: Rust, Tauri, TypeScript, WebSocket, StreamDeck
- Repository: [Incomplete-Outputs-Lab/bi-kanpe](https://github.com/Incomplete-Outputs-Lab/bi-kanpe)

### 4. Iryx
**IP control panels for broadcast software**
- Type: Hardware
- Status: R&D
- Visualization: PCB circuit board animation
- Stack: Rust (Embassy), Raspberry Pi 5/Pico, KiCad, NDI SDK
- Lineup: VMTALLY, VMReplay, VMSwitch, VMDeluxe

## Local Development

### Prerequisites

- Modern web browser (Chrome 111+, Safari 16.4+, Firefox 128+)
- Local web server (optional, for testing)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Incomplete-Outputs-Lab/Incomplete-Outputs-Lab.github.io.git
cd Incomplete-Outputs-Lab.github.io
```

2. Open `index.html` in your browser, or serve with a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

3. Visit `http://localhost:8000`

## Customization

### Changing Colors

Edit `assets/css/custom.css`:

```css
:root {
  --terminal-green: #00ff00;  /* Main accent color */
  --terminal-bg: #000000;     /* Background */
  --terminal-text: #cccccc;   /* Text color */
  --terminal-dim: #003300;    /* Inactive traces */
}
```

### Adding/Editing Projects

Edit `assets/js/config.js` in the `PROJECTS` array:

```javascript
{
  name: 'your-project',
  fullName: 'Full Project Name',
  status: '[ PHASE: STATUS ]',
  concept: 'Your tagline here',
  description: 'Detailed description...',
  techStack: ['Tech1', 'Tech2', 'Tech3'],
  type: 'software' // or 'hardware'
}
```

### Adjusting Animation Speed

Edit `assets/js/config.js` in the `ANIM_CONFIG` object:

```javascript
const ANIM_CONFIG = {
  waveform_duration: 3000,        // Background waveform speed (ms)
  pcb_trace_speed: 4000,          // PCB signal flow speed (ms)
  glitch_probability: 0.02,       // Glitch frequency (0-1)
  scanline_speed: 8000            // Scanline animation speed (ms)
};
```

### Modifying Organization Info

Edit `assets/js/config.js` in the `ORGANIZATION_IDENTITY` object:

```javascript
const ORGANIZATION_IDENTITY = {
  name_ja: '未完成成果物研究所',
  name_en: 'Incomplete-Outputs-Lab',
  tagline_en: 'Independent R&D Team / Broadcast production tooling',
  // ... other fields
};
```

## Deployment

### GitHub Pages

1. Push your changes to the `main` branch:
```bash
git add .
git commit -m "Update landing page"
git push origin main
```

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: `main` / root directory
   - Save

3. Your site will be live at: `https://incomplete-outputs-lab.github.io/`

### Custom Domain (Optional)

1. Add a `CNAME` file with your domain:
```bash
echo "yourdomain.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push origin main
```

2. Configure DNS records at your domain registrar:
   - Type: A
   - Host: @
   - Value: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153

## Performance Optimization

- **GPU Acceleration**: All animations use `transform` and `opacity` for hardware acceleration
- **Debounced Resize**: Window resize events are debounced to 250ms
- **Efficient SVG**: Path complexity limited to 50-100 points
- **Animation Limits**: Maximum 5 background paths, 3 project visualizations
- **Font Loading**: Uses `font-display: swap` for web fonts

## Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 111+ |
| Safari | 16.4+ |
| Firefox | 128+ |
| Edge | 111+ |
| Mobile Safari | iOS 16.4+ |
| Chrome Mobile | Android 111+ |

## Accessibility

- **Semantic HTML**: Proper use of `<header>`, `<section>`, `<article>`, `<footer>`
- **Heading Hierarchy**: Logical h1 → h2 → h3 structure
- **Color Contrast**: WCAG AA compliant (15.3:1 ratio for green on black)
- **Reduced Motion**: Respects `prefers-reduced-motion` system preference
- **Keyboard Navigation**: All interactive elements are keyboard accessible

## CDN Resources

External dependencies loaded via CDN:

```html
<!-- Tailwind CSS v4 Play CDN -->
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

<!-- anime.js -->
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js"></script>

<!-- IBM Plex Mono Font -->
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

## Troubleshooting

### Animations not working
- Check browser console for errors
- Verify anime.js CDN is loading correctly
- Ensure JavaScript is enabled in browser

### Layout issues on mobile
- Clear browser cache
- Test in multiple browsers
- Check viewport meta tag is present

### Performance issues
- Enable hardware acceleration in browser settings
- Reduce `ANIM_CONFIG.background_paths` in config.js
- Disable background animations by commenting out `createBackgroundWaveforms()`

## Contributing

This is a showcase landing page for Incomplete-Outputs-Lab. For project-specific contributions, please refer to individual project repositories.

## License

This landing page is maintained by 未完成成果物研究所 (Incomplete-Outputs-Lab).

## Organization Identity

**未完成成果物研究所 (Incomplete-Outputs-Lab)**
- Independent R&D Team
- Active Professionals' Guild
- Not a company organization
- All members maintain primary employment while contributing to research

---

**System Status**: OPERATIONAL
**Signal Integrity**: NOMINAL

未完成成果物研究所は会社組織ではありません。
全メンバーが本業を持つ兼業技術者集団です。
