# Tailwind CSS 4 Cyberpunk Design System

## Overview

This document outlines the comprehensive Tailwind CSS 4 cyberpunk design system implemented for the Survey Swarm project. The system features an enhanced neon color palette, glass morphism effects, advanced animations, and cyberpunk-themed components.

## 🚀 Features

### Enhanced Color Palette

#### Neon Colors
- **Primary Neon**: `--neon-blue` (#00d4ff), `--neon-cyan` (#00ffff)
- **Accent Neon**: `--neon-pink` (#ff00ff), `--neon-magenta` (#ff0080)
- **Success Neon**: `--neon-green` (#00ff88), `--neon-lime` (#7fff00)
- **Warning Neon**: `--neon-yellow` (#ffeb3b), `--neon-amber` (#ffc107)
- **Purple Neon**: `--neon-purple` (#b388ff), `--neon-violet` (#8a2be2)
- **Danger Neon**: `--neon-orange` (#ff6b35), `--neon-red` (#ff1744)

#### Dark Theme Colors
- **950**: #000000 (Pure black)
- **900**: #050505 (Near black)
- **800**: #0a0a0a (Dark primary)
- **700**: #1a1a1a (Dark secondary)
- **600**: #2a2a2a (Dark tertiary)
- **500-100**: Progressive light grays

#### Glass Morphism Colors
- **White**: rgba(255, 255, 255, 0.05)
- **Light**: rgba(255, 255, 255, 0.1)
- **Medium**: rgba(255, 255, 255, 0.15)
- **Heavy**: rgba(255, 255, 255, 0.2)

### Typography System

#### Font Families
- **Display**: 'Inter Display', 'Inter', system-ui
- **Body**: 'Inter', -apple-system, BlinkMacSystemFont
- **Mono**: 'JetBrains Mono', 'Fira Code', 'Courier New'
- **Cyber**: 'Orbitron', 'Rajdhani', 'Inter'

#### Text Utilities
- **Neon Text**: All neon colors with glow effects
- **Gradient Text**: Cyberpunk, Neon, Matrix, Sunset gradients
- **Cyber Effects**: Holographic, matrix rain effects

### Component System

#### Cards
```html
<!-- Standard Neon Card -->
<div class="card-neon">
  <h3 class="text-neon-blue">Neon Card</h3>
  <p>Cyberpunk content here</p>
</div>

<!-- Cyber Card -->
<div class="card-cyber">
  <h3 class="text-gradient-neon">Cyber Card</h3>
  <p>Advanced glass morphism</p>
</div>

<!-- Matrix Card -->
<div class="card-matrix">
  <h3 class="text-neon-green">Matrix Card</h3>
  <p>Terminal-style design</p>
</div>
```

#### Buttons
```html
<!-- Primary Button -->
<button class="btn-primary">
  <span>Primary Action</span>
</button>

<!-- Cyber Button -->
<button class="btn-cyber">
  <span>Cyber Action</span>
</button>

<!-- Terminal Button -->
<button class="btn-terminal">
  <span>&gt; Execute</span>
</button>
```

#### Inputs
```html
<!-- Dark Input -->
<input class="input-dark" placeholder="Enter data..." />

<!-- Cyber Input -->
<input class="input-cyber" placeholder="Cyber input..." />

<!-- Terminal Input -->
<input class="input-terminal" placeholder="&gt;" />
```

#### Status Indicators
```html
<!-- Active Status -->
<span class="status-indicator status-active">
  <span class="pulse-dot-green"></span>
  Active
</span>

<!-- Error Status -->
<span class="status-indicator status-error">
  <span class="pulse-dot-red"></span>
  Error
</span>

<!-- Cyber Status -->
<span class="status-indicator status-cyber">
  <span class="pulse-ring"></span>
  Cyber Mode
</span>
```

### Animation System

#### Glow Effects
- `animate-glow`: Standard neon glow
- `animate-glow-intense`: Intense glow effect
- `animate-neon-flicker`: Flickering neon effect
- `animate-neon-buzz`: Buzzing text effect
- `animate-neon-pulse`: Pulsing neon effect

#### Movement Effects
- `animate-float`: Gentle floating animation
- `animate-float-slow`: Slow multi-directional float
- `animate-slide-in`: Slide in from left
- `animate-fade-in`: Fade in with upward motion

#### Cyber Effects
- `animate-cyber-scan`: Scanning line effect
- `animate-cyber-glitch`: Glitch distortion effect
- `animate-cyber-rain`: Matrix rain effect
- `holographic`: Shifting holographic gradient

### Glass Morphism

#### Utilities
```html
<!-- Standard Glass -->
<div class="glass-morphism">
  <p>Standard glass effect</p>
</div>

<!-- Heavy Glass -->
<div class="glass-morphism-heavy">
  <p>Heavy glass effect</p>
</div>

<!-- Cyber Glass -->
<div class="glass-morphism-cyber">
  <p>Cyber glass with neon border</p>
</div>

<!-- Neon Glass -->
<div class="glass-morphism-neon">
  <p>Neon glass with gradient</p>
</div>
```

### Navigation Components

#### Horizontal Navigation
```html
<nav class="nav-horizontal-cyber">
  <div class="nav-item-cyber">Dashboard</div>
  <div class="nav-item-active-cyber">Agents</div>
  <div class="nav-item-cyber">Settings</div>
</nav>
```

#### Sidebar Navigation
```html
<aside class="sidebar-cyber">
  <div class="sidebar-header">
    <h2 class="header-title">Survey Swarm</h2>
  </div>
  <div class="sidebar-item-active">
    <span>🎯 Dashboard</span>
  </div>
  <div class="sidebar-item">
    <span>🤖 Agents</span>
  </div>
</aside>
```

### Browser Viewer Component

```html
<div class="browser-viewer-cyber">
  <div class="browser-header-cyber">
    <div class="browser-controls">
      <div class="browser-dot-red"></div>
      <div class="browser-dot-yellow"></div>
      <div class="browser-dot-green"></div>
    </div>
    <input class="browser-url" value="https://survey-swarm.dev" />
  </div>
  <div class="browser-content">
    <!-- Browser content here -->
  </div>
</div>
```

### Metrics Display

```html
<div class="metric-card-cyber">
  <div class="metric-value text-neon-blue">42</div>
  <div class="metric-label">Active Agents</div>
  <div class="metric-change-up">+12%</div>
</div>
```

## 🎨 Usage Guidelines

### Color Hierarchy
1. **Primary**: Use `neon-blue` and `neon-cyan` for primary actions and highlights
2. **Secondary**: Use `neon-pink` and `neon-magenta` for accents and secondary elements
3. **Success**: Use `neon-green` and `neon-lime` for success states and positive feedback
4. **Warning**: Use `neon-yellow` and `neon-amber` for warnings and caution states
5. **Danger**: Use `neon-orange` and `neon-red` for errors and destructive actions
6. **Purple**: Use `neon-purple` and `neon-violet` for special features and premium elements

### Animation Best Practices
- Use subtle animations (`animate-float`, `animate-pulse-neon`) for regular content
- Reserve intense animations (`animate-cyber-glitch`, `animate-neon-flicker`) for special states
- Combine animations with transitions for smooth interactions
- Use `hover:scale-105` and `hover:scale-95` for interactive feedback

### Glass Morphism Guidelines
- Use `glass-morphism` for subtle overlays
- Use `glass-morphism-heavy` for prominent panels
- Use `glass-morphism-cyber` for main UI sections
- Use `glass-morphism-neon` for highlighted areas

### Typography Hierarchy
- **Headers**: Use `font-display` with neon colors or gradients
- **Body**: Use standard `Inter` font with appropriate sizing
- **Code/Terminal**: Use `font-mono` with neon-green for authentic feel
- **Cyber Elements**: Use `font-cyber` for futuristic headers

## 🔧 Technical Implementation

### File Structure
```
src/styles/
├── globals.css          # Main design system file
├── design-system.css    # Legacy design tokens
├── streaming.css        # Streaming effects
├── dashboard.css        # Dashboard-specific styles
├── advanced-architecture.css  # Architecture components
└── implementation-guide.css   # Implementation helpers
```

### Configuration Files
```
tailwind.config.js       # Tailwind CSS 4 configuration
postcss.config.js        # PostCSS processing configuration
vite.config.ts          # Vite configuration with CSS optimization
```

### Custom Properties
All colors and effects are available as CSS custom properties for easy theming and dynamic updates.

## 🚀 Performance Optimizations

1. **CSS Purging**: Tailwind automatically purges unused classes
2. **Animation Performance**: Hardware-accelerated transforms and opacity
3. **Backdrop Blur**: Efficient blur effects with proper fallbacks
4. **Gradient Optimization**: Efficient gradient rendering
5. **Font Loading**: Optimized font loading with proper fallbacks

## 🎯 Browser Compatibility

- **Modern Browsers**: Full support for all features
- **Fallbacks**: Graceful degradation for older browsers
- **Performance**: Optimized for smooth 60fps animations
- **Mobile**: Responsive design with touch-friendly interactions

## 🔮 Future Enhancements

1. **Dark/Light Mode**: Enhanced theme switching
2. **Custom Themes**: Dynamic theme generation
3. **Advanced Effects**: Particle systems and WebGL effects
4. **Accessibility**: Enhanced contrast and reduced motion support
5. **Component Library**: React/Vue component library

## 📚 Reference

### Quick Reference Classes

**Text Colors**: `.text-neon-blue`, `.text-neon-pink`, `.text-neon-green`, etc.
**Background Colors**: `.bg-dark-900`, `.bg-glass-heavy`, etc.
**Borders**: `.border-neon-blue`, `.border-neon-pink`, etc.
**Animations**: `.animate-glow`, `.animate-float`, `.animate-cyber-glitch`, etc.
**Cards**: `.card`, `.card-cyber`, `.card-neon`, `.card-matrix`
**Buttons**: `.btn-primary`, `.btn-cyber`, `.btn-terminal`
**Inputs**: `.input-dark`, `.input-cyber`, `.input-terminal`
**Status**: `.status-active`, `.status-error`, `.status-cyber`

This design system provides a comprehensive foundation for building modern cyberpunk-themed interfaces with Tailwind CSS 4.