import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusIndicatorVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
  {
    variants: {
      status: {
        online: "bg-neon-green/20 text-neon-green border border-neon-green/30 animate-pulse-neon",
        offline: "bg-gray-700/50 text-gray-400 border border-gray-600/50",
        active: "bg-neon-blue/20 text-neon-blue border border-neon-blue/30",
        idle: "bg-gray-600/30 text-gray-400 border border-gray-500/50",
        error: "bg-red-600/20 text-red-400 border border-red-600/30 animate-pulse",
        warning: "bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30",
        success: "bg-neon-green/20 text-neon-green border border-neon-green/30",
        connecting: "bg-neon-purple/20 text-neon-purple border border-neon-purple/30 animate-pulse",
        browsing: "bg-neon-blue/20 text-neon-blue border border-neon-blue/30",
        surveying: "bg-neon-pink/20 text-neon-pink border border-neon-pink/30",
        paused: "bg-gray-600/30 text-gray-400 border border-gray-500/50",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
      animated: {
        true: "",
        false: "",
      }
    },
    defaultVariants: {
      status: "online",
      size: "default",
      animated: true,
    },
  }
)

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusIndicatorVariants> {
  showLabel?: boolean
  label?: string
  showDot?: boolean
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ className, status, size, animated = true, showLabel = true, label, showDot = true, ...props }, ref) => {
    const defaultLabels = {
      online: "Online",
      offline: "Offline",
      active: "Active",
      idle: "Idle",
      error: "Error",
      warning: "Warning",
      success: "Success",
      connecting: "Connecting",
      browsing: "Browsing",
      surveying: "Surveying",
      paused: "Paused",
    }

    const displayLabel = label || defaultLabels[status as keyof typeof defaultLabels] || status

    return (
      <div
        ref={ref}
        className={cn(
          statusIndicatorVariants({ status, size, animated }),
          "inline-flex items-center gap-2",
          className
        )}
        {...props}
      >
        {showDot && (
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              status === "online" && "bg-neon-green animate-pulse",
              status === "active" && "bg-neon-blue animate-pulse-neon",
              status === "error" && "bg-red-400 animate-pulse",
              status === "warning" && "bg-neon-yellow animate-pulse",
              status === "connecting" && "bg-neon-purple animate-pulse",
              status === "browsing" && "bg-neon-blue animate-pulse-neon",
              status === "surveying" && "bg-neon-pink animate-pulse-neon",
              status === "success" && "bg-neon-green",
              status === "idle" && "bg-gray-400",
              status === "paused" && "bg-gray-400",
              status === "offline" && "bg-gray-500"
            )}
          />
        )}
        {showLabel && <span>{displayLabel}</span>}
      </div>
    )
  }
)
StatusIndicator.displayName = "StatusIndicator"

export { StatusIndicator, statusIndicatorVariants }