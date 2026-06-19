// Base UI Components
export { Button, buttonVariants } from './button'
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
export { Badge, badgeVariants } from './badge'
export { Progress } from './progress'
export { Switch } from './switch'

// Navigation Components
export { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue } from './select'

// Overlay Components
export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from './dialog'
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

// Specialized Dashboard Components
export { StatusIndicator, statusIndicatorVariants } from './status-indicator'
export { MetricCard } from './metric-card'
export { AgentCard } from './agent-card'
export { ActivityFeed } from './activity-feed'
export { DashboardGrid } from './dashboard-grid'
export { Chart, chartVariants } from './chart'
export { BrowserViewer } from './browser-viewer'
export { CommandCenter } from './command-center'

// Re-export types for TypeScript users
export type { ButtonProps } from './button'
export type { BadgeProps } from './badge'
export type { StatusIndicatorProps } from './status-indicator'
export type { MetricCardProps } from './metric-card'
export type { AgentCardProps } from './agent-card'
export type { ActivityFeedProps } from './activity-feed'
export type { DashboardGridProps } from './dashboard-grid'
export type { ChartProps } from './chart'
export type { BrowserViewerProps } from './browser-viewer'
export type { CommandCenterProps } from './command-center'

// Utility functions
export { cn } from '@/lib/utils'