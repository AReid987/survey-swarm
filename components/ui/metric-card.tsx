import * as React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: 'up' | 'down' | 'neutral'
    label?: string
  }
  icon?: React.ReactNode
  description?: string
  variant?: 'default' | 'compact' | 'detailed'
  className?: string
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ title, value, change, icon, description, variant = 'default', className, ...props }, ref) => {
    const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
      switch (trend) {
        case 'up':
          return <TrendingUp className="w-4 h-4 text-neon-green" />
        case 'down':
          return <TrendingDown className="w-4 h-4 text-red-400" />
        case 'neutral':
          return <Minus className="w-4 h-4 text-gray-400" />
      }
    }

    const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
      switch (trend) {
        case 'up':
          return 'text-neon-green'
        case 'down':
          return 'text-red-400'
        case 'neutral':
          return 'text-gray-400'
      }
    }

    if (variant === 'compact') {
      return (
        <Card ref={ref} className={cn("p-4", className)} {...props}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-gray-400 font-medium">{title}</p>
              <p className="text-lg font-bold text-white">{value}</p>
            </div>
            {icon && (
              <div className="text-neon-blue opacity-80">
                {icon}
              </div>
            )}
          </div>
        </Card>
      )
    }

    return (
      <Card ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
            {icon && (
              <div className="text-neon-blue opacity-80">
                {icon}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">{value}</div>

            {change && (
              <div className="flex items-center gap-2">
                {getTrendIcon(change.trend)}
                <span className={cn("text-sm font-medium", getTrendColor(change.trend))}>
                  {change.value > 0 ? '+' : ''}{change.value}%
                </span>
                {change.label && (
                  <span className="text-xs text-gray-500">{change.label}</span>
                )}
              </div>
            )}

            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        </CardContent>

        {/* Cyberpunk accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-60" />
      </Card>
    )
  }
)
MetricCard.displayName = "MetricCard"

export { MetricCard }