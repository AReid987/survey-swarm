# Survey Swarm Design System
## Printernet-Dash Aesthetic Implementation

### Executive Summary

The Survey Swarm Design System implements a cyberpunk/hacker aesthetic inspired by printernet-dash visuals, featuring dark backgrounds with neon accents, glass morphism effects, and real-time data visualization patterns. This design system supports the complex multi-agent monitoring dashboard while maintaining technical feasibility and performance requirements.

---

## 1. Color System

### 1.1 Primary Color Palette

#### Dark Base Colors
```css
:root {
  /* Primary Dark Backgrounds */
  --color-background-primary: #0a0a0f;
  --color-background-secondary: #13131a;
  --color-background-tertiary: #1a1a24;
  --color-background-card: rgba(26, 26, 36, 0.8);
  --color-background-glass: rgba(19, 19, 26, 0.6);

  /* Surface Colors */
  --color-surface-elevated: #21212e;
  --color-surface-hover: rgba(33, 33, 46, 0.9);
  --color-surface-active: rgba(40, 40, 56, 0.95);

  /* Text Colors */
  --color-text-primary: #e4e4e7;
  --color-text-secondary: #a1a1aa;
  --color-text-tertiary: #71717a;
  --color-text-inverse: #0a0a0f;

  /* Border Colors */
  --color-border-subtle: rgba(255, 255, 255, 0.05);
  --color-border-medium: rgba(255, 255, 255, 0.1);
  --color-border-strong: rgba(255, 255, 255, 0.2);
}
```

#### Neon Accent Colors
```css
:root {
  /* Primary Neon - Cyan */
  --color-neon-primary: #00ffff;
  --color-neon-primary-rgb: 0, 255, 255;
  --color-neon-primary-glow: rgba(0, 255, 255, 0.5);
  --color-neon-primary-subtle: rgba(0, 255, 255, 0.1);

  /* Secondary Neon - Magenta */
  --color-neon-secondary: #ff00ff;
  --color-neon-secondary-rgb: 255, 0, 255;
  --color-neon-secondary-glow: rgba(255, 0, 255, 0.5);
  --color-neon-secondary-subtle: rgba(255, 0, 255, 0.1);

  /* Tertiary Neon - Electric Green */
  --color-neon-success: #00ff88;
  --color-neon-success-rgb: 0, 255, 136;
  --color-neon-success-glow: rgba(0, 255, 136, 0.5);

  /* Warning Neon - Amber */
  --color-neon-warning: #ffaa00;
  --color-neon-warning-rgb: 255, 170, 0;
  --color-neon-warning-glow: rgba(255, 170, 0, 0.5);

  /* Error Neon - Red */
  --color-neon-error: #ff0055;
  --color-neon-error-rgb: 255, 0, 85;
  --color-neon-error-glow: rgba(255, 0, 85, 0.5);

  /* Info Neon - Blue */
  --color-neon-info: #0088ff;
  --color-neon-info-rgb: 0, 136, 255;
  --color-neon-info-glow: rgba(0, 136, 255, 0.5);
}
```

#### Status Colors
```css
:root {
  /* Agent Status Colors */
  --color-status-active: var(--color-neon-success);
  --color-status-idle: var(--color-text-tertiary);
  --color-status-busy: var(--color-neon-warning);
  --color-status-error: var(--color-neon-error);
  --color-status-offline: #4a4a5a;

  /* Performance Indicator Colors */
  --color-performance-excellent: var(--color-neon-success);
  --color-performance-good: #00cc66;
  --color-performance-average: var(--color-neon-warning);
  --color-performance-poor: var(--color-neon-error);
}
```

### 1.2 Semantic Color Mapping
```css
:root {
  /* Agent Types */
  --color-agent-browser-controller: var(--color-neon-primary);
  --color-agent-question-analyzer: var(--color-neon-secondary);
  --color-agent-answer-generator: var(--color-neon-info);
  --color-agent-profile-manager: var(--color-neon-success);
  --color-agent-consensus-validator: var(--color-neon-warning);

  /* Data Visualization */
  --color-chart-line-1: var(--color-neon-primary);
  --color-chart-line-2: var(--color-neon-secondary);
  --color-chart-line-3: var(--color-neon-success);
  --color-chart-line-4: var(--color-neon-info);
  --color-chart-line-5: var(--color-neon-warning);
}
```

---

## 2. Typography System

### 2.1 Font Families
```css
:root {
  /* Primary Font - Monospace for tech aesthetic */
  --font-family-primary: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;

  /* Secondary Font - Sans-serif for UI elements */
  --font-family-secondary: 'Inter', 'Roboto', 'Helvetica Neue', sans-serif;

  /* Display Font - For headers and special elements */
  --font-family-display: 'Space Grotesk', 'Rajdhani', sans-serif;

  /* Code Font - For code blocks and technical displays */
  --font-family-code: 'Fira Code', 'Source Code Pro', monospace;
}
```

### 2.2 Font Sizes and Weights
```css
:root {
  /* Font Sizes - Based on 1rem = 16px */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-md: 1.125rem;   /* 18px */
  --font-size-lg: 1.25rem;    /* 20px */
  --font-size-xl: 1.5rem;     /* 24px */
  --font-size-2xl: 1.875rem;  /* 30px */
  --font-size-3xl: 2.25rem;   /* 36px */
  --font-size-4xl: 3rem;      /* 48px */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
}
```

### 2.3 Typography Classes
```css
/* Headings */
.typography-h1 {
  font-family: var(--font-family-display);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-wider);
  color: var(--color-text-primary);
  text-transform: uppercase;
}

.typography-h2 {
  font-family: var(--font-family-display);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-primary);
  text-transform: uppercase;
}

.typography-h3 {
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
}

/* Body Text */
.typography-body {
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  color: var(--color-text-primary);
}

.typography-caption {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  color: var(--color-text-secondary);
  letter-spacing: var(--letter-spacing-wide);
}

/* Monospace Text */
.typography-code {
  font-family: var(--font-family-code);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  color: var(--color-neon-primary);
  background: var(--color-background-tertiary);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}

.typography-data {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-neon-primary);
  letter-spacing: var(--letter-spacing-wide);
}
```

---

## 3. Spacing & Layout System

### 3.1 Spacing Scale
```css
:root {
  /* Spacing Scale - Based on 0.25rem = 4px */
  --space-0: 0;
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-20: 5rem;    /* 80px */
  --space-24: 6rem;    /* 96px */
}
```

### 3.2 Grid System
```css
:root {
  /* Grid Configuration */
  --grid-columns: 12;
  --grid-gap: var(--space-6);
  --grid-gap-sm: var(--space-4);
  --grid-gap-lg: var(--space-8);

  /* Container Max Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}

/* Grid Container */
.grid-container {
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Grid System */
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

/* Responsive Grid */
@media (max-width: 768px) {
  .grid-cols-sm-1 { grid-template-columns: repeat(1, 1fr); }
  .grid-cols-sm-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid-cols-lg-4 { grid-template-columns: repeat(4, 1fr); }
  .grid-cols-lg-6 { grid-template-columns: repeat(6, 1fr); }
}
```

### 3.3 Layout Patterns
```css
/* Dashboard Layout */
.layout-dashboard {
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  background: var(--color-background-primary);
}

.layout-header {
  grid-column: 1 / -1;
  background: var(--color-background-glass);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border-subtle);
}

.layout-sidebar {
  background: var(--color-background-secondary);
  border-right: 1px solid var(--color-border-subtle);
  overflow-y: auto;
}

.layout-main {
  background: var(--color-background-primary);
  overflow: hidden;
}

.layout-footer {
  grid-column: 1 / -1;
  background: var(--color-background-glass);
  border-top: 1px solid var(--color-border-subtle);
}

/* Flexbox Utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
```

---

## 4. Component Library

### 4.1 Card Component
```css
.card {
  background: var(--color-background-card);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border-subtle);
  border-radius: 0.75rem;
  padding: var(--space-6);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-neon-primary),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover {
  border-color: var(--color-border-medium);
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.1);
}

.card:hover::before {
  opacity: 1;
}

.card-header {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-subtle);
}

.card-title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.card-subtitle {
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}

.card-content {
  color: var(--color-text-primary);
}

.card-footer {
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### 4.2 Status Indicator Component
```css
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: 9999px;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  position: relative;
}

.status-indicator::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  box-shadow: 0 0 6px currentColor;
  animation: pulse 2s infinite;
}

.status-indicator--active {
  color: var(--color-status-active);
  background: var(--color-neon-success-subtle);
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.status-indicator--idle {
  color: var(--color-status-idle);
  background: rgba(113, 113, 122, 0.1);
  border: 1px solid rgba(113, 113, 122, 0.2);
}

.status-indicator--busy {
  color: var(--color-status-busy);
  background: var(--color-neon-warning-subtle);
  border: 1px solid rgba(255, 170, 0, 0.2);
}

.status-indicator--error {
  color: var(--color-status-error);
  background: var(--color-neon-error-subtle);
  border: 1px solid rgba(255, 0, 85, 0.2);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### 4.3 Data Visualization Components
```css
/* Metric Card */
.metric-card {
  background: var(--color-background-glass);
  border: 1px solid var(--color-border-subtle);
  border-radius: 0.75rem;
  padding: var(--space-4);
  position: relative;
  overflow: hidden;
}

.metric-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: radial-gradient(
    circle,
    var(--color-neon-primary-glow) 0%,
    transparent 70%
  );
  opacity: 0.1;
}

.metric-value {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-neon-primary);
  margin-bottom: var(--space-1);
}

.metric-label {
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.metric-change {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-top: var(--space-2);
}

.metric-change--positive {
  color: var(--color-neon-success);
}

.metric-change--negative {
  color: var(--color-neon-error);
}

/* Progress Bar */
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-background-tertiary);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--color-neon-primary),
    var(--color-neon-secondary)
  );
  border-radius: 4px;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px var(--color-neon-primary-glow);
}

.progress-bar--fill-25::before { width: 25%; }
.progress-bar--fill-50::before { width: 50%; }
.progress-bar--fill-75::before { width: 75%; }
.progress-bar--fill-100::before { width: 100%; }
```

### 4.4 Button Components
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border: 1px solid;
  border-radius: 0.5rem;
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  transition: width 0.6s ease, height 0.6s ease;
  transform: translate(-50%, -50%);
}

.button:hover::before {
  width: 300px;
  height: 300px;
}

.button--primary {
  background: var(--color-neon-primary);
  border-color: var(--color-neon-primary);
  color: var(--color-background-primary);
  box-shadow: 0 0 20px var(--color-neon-primary-glow);
}

.button--primary:hover {
  background: var(--color-neon-primary);
  transform: translateY(-2px);
  box-shadow: 0 5px 30px var(--color-neon-primary-glow);
}

.button--secondary {
  background: transparent;
  border-color: var(--color-neon-primary);
  color: var(--color-neon-primary);
}

.button--secondary:hover {
  background: var(--color-neon-primary-subtle);
  box-shadow: 0 0 20px var(--color-neon-primary-glow);
}

.button--ghost {
  background: transparent;
  border-color: var(--color-border-medium);
  color: var(--color-text-primary);
}

.button--ghost:hover {
  background: var(--color-background-glass);
  border-color: var(--color-neon-primary);
  color: var(--color-neon-primary);
}
```

### 4.5 Agent Status Card
```css
.agent-card {
  background: var(--color-background-card);
  border: 1px solid var(--color-border-subtle);
  border-radius: 0.75rem;
  padding: var(--space-4);
  position: relative;
  overflow: hidden;
}

.agent-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-agent-browser-controller);
  opacity: 0.8;
}

.agent-card--question-analyzer::before {
  background: var(--color-agent-question-analyzer);
}

.agent-card--answer-generator::before {
  background: var(--color-agent-answer-generator);
}

.agent-card--profile-manager::before {
  background: var(--color-agent-profile-manager);
}

.agent-card--consensus-validator::before {
  background: var(--color-agent-consensus-validator);
}

.agent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}

.agent-name {
  font-family: var(--font-family-display);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.agent-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.agent-metric {
  text-align: center;
}

.agent-metric-value {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-neon-primary);
}

.agent-metric-label {
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-top: var(--space-1);
}
```

---

## 5. Visual Effects System

### 5.1 Glass Morphism
```css
.glass {
  background: rgba(19, 19, 26, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
}

.glass--heavy {
  background: rgba(19, 19, 26, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.glass--light {
  background: rgba(19, 19, 26, 0.4);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
```

### 5.2 Neon Glow Effects
```css
.neon-glow {
  box-shadow:
    0 0 5px var(--color-neon-primary),
    0 0 10px var(--color-neon-primary),
    0 0 15px var(--color-neon-primary),
    0 0 20px var(--color-neon-primary-glow);
}

.neon-glow--intense {
  box-shadow:
    0 0 10px var(--color-neon-primary),
    0 0 20px var(--color-neon-primary),
    0 0 30px var(--color-neon-primary),
    0 0 40px var(--color-neon-primary-glow);
}

.neon-text {
  color: var(--color-neon-primary);
  text-shadow:
    0 0 5px var(--color-neon-primary),
    0 0 10px var(--color-neon-primary),
    0 0 15px var(--color-neon-primary),
    0 0 20px var(--color-neon-primary-glow);
}

.neon-border {
  position: relative;
  background: var(--color-background-card);
  border-radius: 0.75rem;
}

.neon-border::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(
    45deg,
    var(--color-neon-primary),
    var(--color-neon-secondary),
    var(--color-neon-primary)
  );
  border-radius: 0.75rem;
  z-index: -1;
  opacity: 0.8;
  animation: neon-border-rotate 3s linear infinite;
}

@keyframes neon-border-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

### 5.3 Animated Backgrounds
```css
.animated-grid {
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: grid-move 10s linear infinite;
}

@keyframes grid-move {
  0% { background-position: 0 0; }
  100% { background-position: 20px 20px; }
}

.particle-field {
  position: relative;
  overflow: hidden;
}

.particle-field::before,
.particle-field::after {
  content: '';
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--color-neon-primary);
  border-radius: 50%;
  box-shadow:
    0 0 10px var(--color-neon-primary),
    0 0 20px var(--color-neon-primary),
    0 0 30px var(--color-neon-primary);
  animation: particle-float 10s infinite ease-in-out;
}

.particle-field::after {
  animation-delay: -5s;
  left: auto;
  right: 20%;
}

@keyframes particle-float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) translateX(50px);
    opacity: 0;
  }
}
```

### 5.4 Data Stream Effects
```css
.data-stream {
  position: relative;
  overflow: hidden;
}

.data-stream::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-neon-primary-glow),
    transparent
  );
  animation: data-stream-flow 3s infinite;
}

@keyframes data-stream-flow {
  0% { left: -100%; }
  100% { left: 100%; }
}

.scanning-line {
  position: relative;
  overflow: hidden;
}

.scanning-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-neon-primary),
    transparent
  );
  animation: scanning-line-move 2s linear infinite;
}

@keyframes scanning-line-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}
```

---

## 6. Responsive Design System

### 6.1 Breakpoint System
```css
:root {
  /* Breakpoint Values */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Media Queries */
@media (max-width: 768px) {
  .mobile-hidden { display: none !important; }
  .mobile-full-width { width: 100% !important; }
  .mobile-stack { flex-direction: column !important; }
}

@media (min-width: 769px) {
  .desktop-hidden { display: none !important; }
  .desktop-grid { display: grid !important; }
}
```

### 6.2 Mobile Adaptations
```css
/* Mobile Dashboard Layout */
@media (max-width: 768px) {
  .layout-dashboard {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
  }

  .layout-sidebar {
    order: 2;
    border-right: none;
    border-bottom: 1px solid var(--color-border-subtle);
  }

  .layout-main {
    order: 3;
  }

  .grid-container {
    padding: 0 var(--space-4);
  }

  .card {
    padding: var(--space-4);
  }

  .metric-card {
    padding: var(--space-3);
  }

  .agent-metrics {
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
}
```

---

## 7. Implementation Guidelines

### 7.1 CSS Custom Properties Strategy
```css
/* Theme Customization */
:root {
  /* Override these for different themes */
  --theme-primary-neon: var(--color-neon-primary);
  --theme-secondary-neon: var(--color-neon-secondary);
  --theme-background-primary: var(--color-background-primary);
  --theme-background-secondary: var(--color-background-secondary);
}

/* Component-specific properties */
.component-agent-card {
  --agent-card-padding: var(--space-4);
  --agent-card-border-radius: 0.75rem;
  --agent-card-background: var(--color-background-card);
  --agent-card-border: var(--color-border-subtle);
}
```

### 7.2 Performance Considerations
```css
/* GPU-accelerated animations */
.gpu-accelerated {
  transform: translateZ(0);
  will-change: transform;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  :root {
    --color-border-subtle: rgba(255, 255, 255, 0.5);
    --color-border-medium: rgba(255, 255, 255, 0.75);
    --color-text-primary: #ffffff;
    --color-text-secondary: #cccccc;
  }
}
```

### 7.3 Accessibility Considerations
```css
/* Focus indicators */
.focus-visible:focus-visible {
  outline: 2px solid var(--color-neon-primary);
  outline-offset: 2px;
}

/* Screen reader only content */
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

/* High contrast text */
.high-contrast-text {
  color: var(--color-text-primary);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}
```

---

## 8. Integration with Technical Requirements

### 8.1 Real-time Data Visualization
```css
/* Live data indicators */
.live-indicator {
  position: relative;
}

.live-indicator::before {
  content: '';
  position: absolute;
  top: 50%;
  right: 100%;
  width: 8px;
  height: 8px;
  background: var(--color-neon-success);
  border-radius: 50%;
  transform: translateY(-50%);
  animation: pulse 1s infinite;
  margin-right: var(--space-2);
}

/* Real-time chart containers */
.chart-container {
  background: var(--color-background-glass);
  border: 1px solid var(--color-border-subtle);
  border-radius: 0.75rem;
  padding: var(--space-4);
  position: relative;
  min-height: 200px;
}

.chart-grid {
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  position: absolute;
  inset: 0;
  opacity: 0.5;
}
```

### 8.2 Multi-Agent Display System
```css
/* Agent grid layout */
.agent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-4);
  padding: var(--space-4);
}

/* Agent communication visualization */
.communication-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(
    90deg,
    var(--color-neon-primary),
    var(--color-neon-secondary)
  );
  transform-origin: left center;
  animation: communication-pulse 2s infinite;
}

@keyframes communication-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
```

---

## 9. Browser Streaming Interface

### 9.1 Stream Viewer Components
```css
/* Stream container */
.stream-viewer {
  background: var(--color-background-primary);
  border: 2px solid var(--color-neon-primary);
  border-radius: 0.75rem;
  overflow: hidden;
  position: relative;
  aspect-ratio: 16/9;
}

.stream-viewer::before {
  content: 'LIVE';
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  background: var(--color-neon-error);
  color: var(--color-text-inverse);
  padding: var(--space-1) var(--space-3);
  border-radius: 0.25rem;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  z-index: 10;
  animation: pulse 2s infinite;
}

.stream-canvas {
  width: 100%;
  height: 100%;
  background: #000;
}

/* Stream controls */
.stream-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    transparent,
    rgba(10, 10, 15, 0.9)
  );
  padding: var(--space-4);
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.stream-control-button {
  background: var(--color-background-glass);
  border: 1px solid var(--color-border-medium);
  color: var(--color-text-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stream-control-button:hover {
  background: var(--color-neon-primary-subtle);
  border-color: var(--color-neon-primary);
  color: var(--color-neon-primary);
}
```

---

## 10. Component Usage Examples

### 10.1 Complete Agent Dashboard Card
```html
<div class="agent-card agent-card--browser-controller">
  <div class="agent-header">
    <h3 class="agent-name">Browser Controller</h3>
    <div class="status-indicator status-indicator--active">
      Active
    </div>
  </div>

  <div class="agent-metrics">
    <div class="agent-metric">
      <div class="agent-metric-value">5</div>
      <div class="agent-metric-label">Sessions</div>
    </div>
    <div class="agent-metric">
      <div class="agent-metric-value">98%</div>
      <div class="agent-metric-label">Success Rate</div>
    </div>
    <div class="agent-metric">
      <div class="agent-metric-value">2.3s</div>
      <div class="agent-metric-label">Avg Response</div>
    </div>
    <div class="agent-metric">
      <div class="agent-metric-value">42</div>
      <div class="agent-metric-label">Completed</div>
    </div>
  </div>

  <div class="card-footer">
    <div class="progress-bar progress-bar--fill-75"></div>
    <button class="button button--ghost button--sm">
      Configure
    </button>
  </div>
</div>
```

### 10.2 Streaming Dashboard Layout
```html
<div class="layout-dashboard">
  <header class="layout-header">
    <!-- Header content -->
  </header>

  <aside class="layout-sidebar">
    <!-- Navigation and controls -->
  </aside>

  <main class="layout-main">
    <div class="grid-container">
      <div class="grid grid-cols-3">
        <!-- Agent cards -->
        <div class="agent-card">...</div>
        <div class="agent-card">...</div>
        <div class="agent-card">...</div>
      </div>

      <div class="grid grid-cols-2" style="margin-top: var(--space-6);">
        <!-- Stream viewers -->
        <div class="stream-viewer">
          <div class="stream-canvas"></div>
          <div class="stream-controls">
            <button class="stream-control-button">▶</button>
            <button class="stream-control-button">⏸</button>
            <button class="stream-control-button">⏹</button>
          </div>
        </div>

        <!-- Performance charts -->
        <div class="chart-container">
          <div class="chart-grid"></div>
          <!-- Chart content -->
        </div>
      </div>
    </div>
  </main>
</div>
```

---

## Implementation Coordination Notes

### Technical Integration Points

1. **Real-time Data Updates**: Design system supports CSS classes for live indicators and data stream effects that can be toggled via JavaScript based on WebSocket/WebRTC data.

2. **Performance Optimization**: All animations use GPU acceleration and respect `prefers-reduced-motion` for accessibility compliance.

3. **Component Modularity**: CSS classes are designed to be composable and can be applied dynamically as agents come online/offline.

4. **Browser Streaming Interface**: Specialized components for WebRTC streams with glass morphism effects and neon accents.

5. **Responsive Design**: Mobile-first approach with specific adaptations for tablet and desktop viewing of multi-agent dashboards.

### Next Steps for Implementation

1. **Create CSS file structure** with modular organization
2. **Implement JavaScript component classes** for dynamic behavior
3. **Set up build process** for CSS optimization and vendor prefixing
4. **Create documentation site** with live component examples
5. **Test across browsers** for consistent rendering of effects

This design system provides a comprehensive foundation for implementing the Survey Swarm frontend with the printernet-dash aesthetic while maintaining technical feasibility and performance requirements.