import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-neon-blue text-dark-primary shadow-lg shadow-neon-blue/25",
        secondary:
          "border-transparent bg-gray-700 text-gray-300 hover:bg-gray-600",
        destructive:
          "border-transparent bg-red-600 text-white shadow-lg shadow-red-600/25",
        outline: "text-gray-300 border-gray-600 bg-glass-medium",
        success:
          "border-transparent bg-neon-green text-dark-primary shadow-lg shadow-neon-green/25",
        warning:
          "border-transparent bg-neon-yellow text-dark-primary shadow-lg shadow-neon-yellow/25",
        neon:
          "border-neon-blue bg-transparent text-neon-blue shadow-lg shadow-neon-blue/20 animate-pulse-neon",
        cyber:
          "border-transparent bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue text-white shadow-lg",
        active:
          "border-transparent bg-neon-green text-dark-primary shadow-lg shadow-neon-green/25 animate-pulse",
        inactive:
          "border-transparent bg-gray-600 text-gray-300",
        error:
          "border-transparent bg-red-600/20 text-red-400 border-red-600/30",
        info:
          "border-transparent bg-neon-blue/20 text-neon-blue border-neon-blue/30",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }