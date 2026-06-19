# Survey Swarm CSS Architecture Guide

## Overview

The Survey Swarm CSS architecture is a comprehensive design system built on CSS custom properties, providing a cohesive printernet-dash aesthetic with dark backgrounds, neon accents, and sophisticated visual effects.

## Architecture Structure

### Core Files
- `src/styles/design-system.css` - Base design system with custom properties, typography, and core components
- `src/styles/dashboard.css` - Dashboard-specific layout and component styles
- `src/styles/streaming.css` - Browser session streaming interface styles
- `src/styles/implementation-guide.css` - Utility classes and additional components
- `src/styles/advanced-architecture.css` - Advanced layout patterns, animations, and sophisticated effects

## Design System Principles

### 1. CSS Custom Properties First
All design tokens are defined as CSS custom properties for:
- Easy theming and customization
- Runtime modifications
- Component-level overrides
- Consistent spacing and colors

### 2. Mobile-First Responsive Design
All components are designed mobile-first with progressive enhancement for larger screens.

### 3. Accessibility Built-In
- Focus indicators with high contrast
- Screen reader utilities
- Reduced motion support
- High contrast theme variants

### 4. Performance Optimized
- GPU-accelerated animations
- Reduced motion fallbacks
- Performance mode for low-power devices
- Efficient CSS selectors

## Color System

### Base Colors
```css
--color-background-primary: #0a0a0f    /* Main background */
--color-background-secondary: #13131a  /* Secondary surfaces */
--color-background-tertiary: #1a1a24   /* Tertiary surfaces */
--color-text-primary: #e4e4e7          /* Main text */
--color-text-secondary: #a1a1aa        /* Secondary text */
--color-text-tertiary: #71717a         /* Muted text */
```

### Neon Accent Colors
```css
--color-neon-primary: #00ffff          /* Cyan primary */
--color-neon-secondary: #ff00ff       /* Magenta secondary */
--color-neon-success: #00ff88         /* Green success */
--color-neon-warning: #ffaa00         /* Orange warning */
--color-neon-error: #ff0055           /* Red error */
--color-neon-info: #0088ff            /* Blue info */
```

### Status Colors
```css
--color-status-active: var(--color-neon-success)
--color-status-idle: var(--color-text-tertiary)
--color-status-busy: var(--color-neon-warning)
--color-status-error: var(--color-neon-error)
```

## Typography System

### Font Families
```css
--font-family-primary: 'JetBrains Mono', 'Fira Code', monospace
--font-family-secondary: 'Inter', 'Roboto', sans-serif
--font-family-display: 'Space Grotesk', 'Rajdhani', sans-serif
--font-family-code: 'Fira Code', 'Source Code Pro', monospace
```

### Typography Scale
```css
--font-size-xs: 0.75rem
--font-size-sm: 0.875rem
--font-size-base: 1rem
--font-size-md: 1.125rem
--font-size-lg: 1.25rem
--font-size-xl: 1.5rem
--font-size-2xl: 1.875rem
--font-size-3xl: 2.25rem
--font-size-4xl: 3rem
```

### Typography Classes
- `.typography-h1` - Main headings with display font
- `.typography-h2` - Section headings
- `.typography-h3` - Subsection headings
- `.typography-body` - Body text
- `.typography-caption` - Small labels and metadata
- `.typography-code` - Code snippets
- `.typography-data` - Metrics and numeric values

## Spacing System

### Modular Scale
Based on a 0.25rem unit with consistent spacing throughout:
```css
--space-0: 0
--space-1: 0.25rem
--space-2: 0.5rem
--space-3: 0.75rem
--space-4: 1rem
--space-5: 1.25rem
--space-6: 1.5rem
--space-8: 2rem
--space-10: 2.5rem
--space-12: 3rem
--space-16: 4rem
--space-20: 5rem
--space-24: 6rem
```

## Layout System

### CSS Grid
12-column grid system with flexible layouts:
```css
.grid {
  display: grid;
  gap: var(--grid-gap);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
.grid-cols-6 { grid-template-columns: repeat(6, 1fr); }
.grid-cols-12 { grid-template-columns: repeat(12, 1fr); }
```

### Advanced Layout Patterns
- `.grid-sidebar` - Fixed sidebar with main content area
- `.grid-holy-grail` - Classic holy grail layout
- `.grid-masonry` - Pinterest-style masonry layout
- `.grid-card-layout` - Responsive card grid

### Flexbox Utilities
```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
```

## Component System

### Cards
```css
.card {
  background: var(--color-background-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-normal);
}
```

### Buttons
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  border: 1px solid;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
}

.button--primary {
  background: var(--color-neon-primary);
  border-color: var(--color-neon-primary);
  color: var(--color-background-primary);
}
```

### Status Indicators
```css
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  font-family: var(--font-family-primary);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
}

.status-indicator--active {
  color: var(--color-status-active);
  background: var(--color-neon-success-subtle);
}
```

## Visual Effects

### Glass Morphism
```css
.glass {
  background: var(--color-background-glass);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--color-border-subtle);
}
```

Variants:
- `.glass-light` - 20% opacity, 5px blur
- `.glass-medium` - 40% opacity, 10px blur
- `.glass-heavy` - 60% opacity, 15px blur
- `.glass-frosted` - Saturated blur effect

### Neon Glow Effects
```css
.neon-glow {
  box-shadow:
    0 0 5px var(--color-neon-primary),
    0 0 10px var(--color-neon-primary),
    0 0 15px var(--color-neon-primary),
    0 0 20px var(--color-neon-primary-glow);
}
```

Variants:
- `.neon-glow-primary` - Cyan glow
- `.neon-glow-secondary` - Magenta glow
- `.neon-glow-success` - Green glow
- `.neon-text-pulse` - Animated text glow

## Animations

### Keyframe Animations
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes neon-border-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes grid-move {
  0% { background-position: 0 0; }
  100% { background-position: 20px 20px; }
}
```

### Loading States
- `.loading-skeleton` - Animated skeleton loading
- `.loading-spinner` - Rotating spinner
- `.stream-buffering` - Buffering dots animation

### Interactive Effects
- `.hover-reveal` - Content reveals on hover
- `.magnetic-button` - Magnetic cursor effect
- `.ripple` - Ripple effect on click

## Responsive Design

### Breakpoints
```css
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
--breakpoint-2xl: 1536px
```

### Responsive Utilities
```css
@media (max-width: 768px) {
  .mobile-hidden { display: none !important; }
  .mobile-full-width { width: 100% !important; }
  .mobile-stack { flex-direction: column !important; }
}
```

## Utility Classes

### Spacing
```css
.p-4 { padding: var(--space-4); }
.px-6 { padding-left: var(--space-6); padding-right: var(--space-6); }
.m-3 { margin: var(--space-3); }
.my-6 { margin-top: var(--space-6); margin-bottom: var(--space-6); }
```

### Colors
```css
.text-primary { color: var(--color-text-primary); }
.text-neon-primary { color: var(--color-neon-primary); }
.bg-glass { background-color: var(--color-background-glass); }
```

### Borders
```css
.border { border: 1px solid var(--color-border-subtle); }
.border-neon { border-color: var(--color-neon-primary); }
.rounded-lg { border-radius: var(--radius-lg); }
```

## Accessibility

### Focus Management
```css
.focus-ring:focus-visible {
  outline: 2px solid var(--color-neon-primary);
  outline-offset: 2px;
}
```

### Screen Reader Support
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Theme System

### Theme Variants
- Default theme - Full animations and effects
- High contrast theme - Enhanced visibility
- Reduced motion theme - Minimal animations
- Performance mode - Optimized for speed

### Theme Implementation
```html
<body class="theme-high-contrast">
  <!-- High contrast styles automatically applied -->
</body>
```

## Best Practices

### 1. Use CSS Custom Properties
Always reference design tokens rather than hardcoding values:
```css
/* Good */
.component {
  background: var(--color-background-card);
  padding: var(--space-4);
}

/* Bad */
.component {
  background: rgba(26, 26, 36, 0.8);
  padding: 1rem;
}
```

### 2. Mobile-First Development
Start with mobile styles, then enhance for larger screens:
```css
.component {
  /* Mobile styles */
  padding: var(--space-4);
}

@media (min-width: 768px) {
  .component {
    /* Tablet and desktop enhancements */
    padding: var(--space-6);
  }
}
```

### 3. Component-First Thinking
Build reusable components with variation classes:
```css
.button {
  /* Base button styles */
}

.button--primary {
  /* Primary variation */
}

.button--large {
  /* Size variation */
}
```

### 4. Performance Considerations
- Use `transform` and `opacity` for animations
- Avoid animating layout properties
- Use `will-change` sparingly
- Provide reduced motion alternatives

## Implementation Examples

### Dashboard Layout
```html
<div class="grid-sidebar">
  <aside class="sidebar">
    <!-- Navigation -->
  </aside>
  <header class="header">
    <!-- Header content -->
  </header>
  <main class="main">
    <!-- Main content -->
  </main>
  <footer class="footer">
    <!-- Footer content -->
  </footer>
</div>
```

### Agent Status Card
```html
<div class="agent-card agent-card--browser-controller">
  <div class="agent-header">
    <h4 class="agent-name">Browser Controller</h4>
    <span class="status-indicator status-indicator--active">Active</span>
  </div>
  <div class="agent-metrics">
    <div class="agent-metric">
      <div class="agent-metric-value">5</div>
      <div class="agent-metric-label">Sessions</div>
    </div>
  </div>
</div>
```

### Glass Morphism Panel
```html
<div class="glass glass-medium rounded-lg p-6">
  <h3 class="typography-h3 mb-4">Glass Panel</h3>
  <p class="typography-body">Content with glass morphism effect</p>
</div>
```

## Customization Guide

### Adding New Colors
1. Define the color in `:root`:
```css
:root {
  --color-neon-purple: #9d4edd;
  --color-neon-purple-rgb: 157, 78, 221;
  --color-neon-purple-glow: rgba(157, 78, 221, 0.5);
}
```

2. Create utility classes:
```css
.text-neon-purple { color: var(--color-neon-purple); }
.bg-neon-purple { background-color: var(--color-neon-purple); }
.neon-glow-purple { box-shadow: 0 0 20px var(--color-neon-purple-glow); }
```

### Creating New Components
1. Start with base structure
2. Use existing design tokens
3. Add hover and focus states
4. Include responsive variants
5. Add accessibility features

### Extending Animations
1. Define keyframes
2. Create animation classes
3. Add performance optimizations
4. Include reduced motion fallbacks

This architecture provides a solid foundation for building sophisticated, accessible, and performant interfaces with the distinctive printernet-dash aesthetic.