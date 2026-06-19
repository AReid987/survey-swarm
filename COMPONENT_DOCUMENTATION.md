# Survey Swarm UI Component System

A comprehensive, accessible cyberpunk-themed UI component library built with Radix 3.0.0 and Tailwind CSS 4 for the Survey Swarm dashboard.

## 🎨 Design System

### Theme Configuration
- **Base Colors**: Dark backgrounds with neon accents (cyan, magenta, green, yellow, purple)
- **Glass Morphism**: Multi-level transparency effects with backdrop blur
- **Animations**: Glow effects, neon flickers, cyberpunk scan lines, holographic shifts
- **Typography**: Cyber fonts with gradient text effects
- **Accessibility**: High contrast support, reduced motion, screen reader announcements

### Color Palette
```css
/* Neon Colors */
neon-blue: #00d4ff
neon-cyan: #00ffff
neon-pink: #ff00ff
neon-green: #00ff88
neon-yellow: #ffeb3b
neon-purple: #b388ff

/* Dark Theme */
dark-950: #000000
dark-900: #050505
dark-800: #0a0a0a
dark-700: #1a1a1a
dark-600: #2a2a2a

/* Glass Effects */
glass-light: rgba(255, 255, 255, 0.05)
glass-medium: rgba(255, 255, 255, 0.1)
glass-heavy: rgba(255, 255, 255, 0.15)
```

## 🧩 Component Library

### Base Components

#### Button
```tsx
import { Button } from '@/components/ui'

<Button variant="default" size="md">
  Click me
</Button>
```

**Variants:**
- `default` - Primary neon blue button
- `secondary` - Dark secondary button
- `outline` - Outlined button
- `ghost` - Ghost button
- `link` - Link-style button
- `neon` - Neon border with glow
- `cyber` - Gradient cyberpunk style
- `success` - Green success button
- `warning` - Yellow warning button
- `destructive` - Red destructive button

**Sizes:**
- `xs` - Extra small
- `sm` - Small
- `default` - Default
- `lg` - Large
- `xl` - Extra large
- `icon` - Square icon button

#### Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content here
  </CardContent>
</Card>
```

Features glass morphism styling with hover effects and cyberpunk accent lines.

#### Badge
```tsx
import { Badge } from '@/components/ui'

<Badge variant="success">Success</Badge>
```

**Variants:** default, secondary, destructive, outline, success, warning, neon, cyber, active, inactive, error, info

#### Progress
```tsx
import { Progress } from '@/components/ui'

<Progress value={65} />
```

Animated progress bar with gradient fill and neon glow effects.

#### Switch
```tsx
import { Switch } from '@/components/ui'

<Switch checked={true} onCheckedChange={setChecked} />
```

Cyber-styled toggle with neon blue active state.

### Navigation Components

#### Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="agents">Agents</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    Overview content
  </TabsContent>
</Tabs>
```

#### Select
```tsx
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui'

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

### Overlay Components

#### Dialog
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui'

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

Modal dialogs with glass morphism backdrop and cyberpunk styling.

#### Tooltip
```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>Tooltip content</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Specialized Dashboard Components

#### StatusIndicator
```tsx
import { StatusIndicator } from '@/components/ui'

<StatusIndicator status="online" showLabel={true} size="default" />
```

Real-time status indicators with animations for agent states.

**Status Types:** online, offline, active, idle, error, warning, success, connecting, browsing, surveying, paused

#### MetricCard
```tsx
import { MetricCard } from '@/components/ui'

<MetricCard
  title="Active Agents"
  value="12"
  change={{ value: 8, trend: 'up', label: 'from last hour' }}
  icon={<Users className="w-5 h-5" />}
/>
```

Data visualization cards with trend indicators and icons.

#### AgentCard
```tsx
import { AgentCard } from '@/components/ui'

<AgentCard
  agent={agentData}
  onSelect={handleAgentSelect}
  onControl={handleAgentControl}
  compact={false}
/>
```

Comprehensive agent management cards with controls, metrics, and status displays.

#### ActivityFeed
```tsx
import { ActivityFeed } from '@/components/ui'

<ActivityFeed
  activities={activityData}
  maxItems={10}
  showTimestamp={true}
  showSeverity={true}
/>
```

Real-time activity monitoring with categorized events and severity indicators.

#### DashboardGrid
```tsx
import { DashboardGrid } from '@/components/ui'

<DashboardGrid columns={3} gap="md" responsive={true}>
  <div>Grid item 1</div>
  <div>Grid item 2</div>
  <div>Grid item 3</div>
</DashboardGrid>
```

Responsive grid system optimized for dashboard layouts.

#### Chart
```tsx
import { Chart } from '@/components/ui'

<Chart
  title="Performance Metrics"
  data={chartData}
  variant="bar"
  size="default"
  showGrid={true}
  showLegend={true}
/>
```

Data visualization component with multiple chart types and cyberpunk styling.

#### BrowserViewer
```tsx
import { BrowserViewer } from '@/components/ui'

<BrowserViewer
  session={browserSession}
  onControl={handleBrowserControl}
  fullscreen={false}
  showControls={true}
/>
```

Live browser session monitoring with controls and screenshot display.

#### CommandCenter
```tsx
import { CommandCenter } from '@/components/ui'

<CommandCenter
  agents={agents}
  globalStatus="running"
  onGlobalAction={handleGlobalAction}
  onAgentAction={handleAgentAction}
  systemMetrics={systemMetrics}
/>
```

Central command interface for managing multiple agents and system settings.

## ♿ Accessibility Features

### Keyboard Navigation
- Full keyboard support for all interactive components
- Tab order management
- Arrow key navigation for menus and lists
- Escape key handling for overlays

### Screen Reader Support
- ARIA labels and descriptions
- Live regions for dynamic content
- Semantic HTML structure
- Focus management

### Visual Accessibility
- High contrast mode support
- Reduced motion preferences
- Focus indicators
- Sufficient color contrast ratios

### Accessibility Hooks
```tsx
import { useKeyboardNavigation, useFocusManagement, useAnnouncer } from '@/hooks/use-accessibility'

const announce = useAnnouncer()
const { trapFocus, restoreFocus } = useFocusManagement()
const focusedIndex = useKeyboardNavigation(items, onSelect)
```

## 🎯 Component Variants

### Agent Monitoring Variants
- **Compact Agent Cards**: Minimal agent display for lists
- **Detailed Agent Cards**: Full agent information with controls
- **Status Panels**: Real-time status indicators
- **Control Panels**: Agent action controls

### Dashboard Control Variants
- **Command Center**: Global system control
- **Quick Actions**: Rapid access controls
- **Settings Panels**: Configuration interfaces
- **Metric Displays**: Data visualization components

### Data Visualization Variants
- **Charts**: Multiple chart types with cyberpunk styling
- **Progress Indicators**: Animated progress displays
- **Status Indicators**: Real-time status displays
- **Activity Feeds**: Event timeline displays

## 🔧 Usage Examples

### Dashboard Layout
```tsx
import { DashboardLayout } from '@/components'
import { AgentCard, MetricCard, ActivityFeed, BrowserViewer } from '@/components/ui'

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard title="Active Agents" value="12" />
          <MetricCard title="Success Rate" value="94.5%" />
          <MetricCard title="Earnings" value="$247.50" />
          <MetricCard title="CPU Usage" value="45%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AgentCard agent={agent} />
          </div>
          <div>
            <BrowserViewer session={session} />
          </div>
        </div>

        <ActivityFeed activities={activities} />
      </div>
    </DashboardLayout>
  )
}
```

### Agent Management
```tsx
const AgentManagement = () => {
  const [agents, setAgents] = useState([])
  const [selectedAgent, setSelectedAgent] = useState(null)

  const handleAgentControl = (agentId, action) => {
    // Handle agent control logic
  }

  return (
    <div className="space-y-6">
      <CommandCenter
        agents={agents}
        globalStatus="running"
        onGlobalAction={handleGlobalAction}
        onAgentAction={handleAgentControl}
        systemMetrics={systemMetrics}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onSelect={setSelectedAgent}
            onControl={handleAgentControl}
          />
        ))}
      </div>
    </div>
  )
}
```

## 🚀 Getting Started

### Installation
```bash
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-collapsible @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toast @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-icons tailwindcss-animate
```

### Setup
1. Import global styles in your app:
```tsx
import '@/styles/globals.css'
```

2. Configure Tailwind CSS (already included in tailwind.config.js)

3. Import components as needed:
```tsx
import { Button, Card, Badge } from '@/components/ui'
```

### Customization
The theme is fully customizable through Tailwind CSS configuration. Modify colors, animations, and styles in `tailwind.config.js`.

## 📱 Responsive Design

All components are fully responsive with:
- Mobile-first design approach
- Adaptive layouts for different screen sizes
- Touch-friendly interaction targets
- Optimized performance for all devices

## 🎭 Animations & Effects

### Built-in Animations
- `glow` - Pulsing glow effect
- `pulse-neon` - Neon pulsing
- `float` - Floating animation
- `cyber-scan` - Scan line effect
- `neon-flicker` - Neon flickering
- `hologram` - Holographic shift
- `cyber-glitch` - Glitch effect

### Usage
```tsx
<div className="animate-glow">
  Glowing element
</div>

<div className="animate-cyber-scan">
  Scanning effect
</div>
```

## 🔍 Accessibility Testing

All components are tested with:
- Screen readers (NVDA, VoiceOver, JAWS)
- Keyboard navigation
- High contrast mode
- Reduced motion preferences
- Color contrast analysis

## 📚 API Reference

### Component Props

Detailed prop documentation is available in the component files. All components support:
- `className` for custom styling
- Proper TypeScript types
- Accessibility attributes
- Event handlers
- Custom theming

### Hook Documentation

Accessibility hooks provide:
- `useKeyboardNavigation` - Keyboard navigation management
- `useFocusManagement` - Focus trapping and restoration
- `useAnnouncer` - Screen reader announcements
- `useReducedMotion` - Motion preference detection
- `useHighContrast` - Contrast preference detection

## 🤝 Contributing

When adding new components:
1. Follow the established design system
2. Ensure full accessibility support
3. Add proper TypeScript types
4. Include comprehensive documentation
5. Test across all interaction methods
6. Maintain cyberpunk aesthetic consistency

## 📄 License

MIT License - feel free to use in your projects!