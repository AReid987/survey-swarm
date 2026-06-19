import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const accessibleButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-neon-blue text-dark-primary hover:bg-neon-blue/90 shadow-lg shadow-neon-blue/25 hover:shadow-neon-blue/40 focus-visible:ring-neon-blue border border-neon-blue/20",
        destructive: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 focus-visible:ring-red-600 border border-red-600/20",
        outline: "border border-gray-700 bg-transparent text-gray-300 hover:bg-glass-medium hover:text-white hover:border-gray-600 focus-visible:ring-gray-400",
        secondary: "bg-dark-secondary text-gray-300 hover:bg-dark-tertiary hover:text-white border border-gray-700/50 hover:border-gray-600 focus-visible:ring-gray-400",
        ghost: "hover:bg-glass-medium hover:text-white text-gray-400 focus-visible:ring-gray-400",
        link: "text-neon-blue hover:text-neon-blue/80 underline-offset-4 hover:underline focus-visible:ring-neon-blue",
        neon: "bg-transparent text-neon-blue border-2 border-neon-blue hover:bg-neon-blue hover:text-dark-primary shadow-lg shadow-neon-blue/30 hover:shadow-neon-blue/60 focus-visible:ring-neon-blue",
        cyber: "bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue text-white hover:from-neon-purple/90 hover:via-neon-pink/90 hover:to-neon-blue/90 shadow-lg hover:shadow-xl focus-visible:ring-neon-purple border border-transparent",
        success: "bg-neon-green text-dark-primary hover:bg-neon-green/90 shadow-lg shadow-neon-green/25 hover:shadow-neon-green/40 focus-visible:ring-neon-green border border-neon-green/20",
        warning: "bg-neon-yellow text-dark-primary hover:bg-neon-yellow/90 shadow-lg shadow-neon-yellow/25 hover:shadow-neon-yellow/40 focus-visible:ring-neon-yellow border border-neon-yellow/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xs: "h-8 rounded px-2 text-xs",
        xl: "h-12 rounded-lg px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accessibleButtonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  ariaLabel?: string
  ariaDescribedBy?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({
    className,
    variant,
    size,
    asChild = false,
    loading = false,
    loadingText = "Loading...",
    disabled,
    children,
    ariaLabel,
    ariaDescribedBy,
    onClick,
    ...props
  }, ref) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const [isPressed, setIsPressed] = React.useState(false)

    // Handle keyboard interactions
    const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setIsPressed(true)
      }
    }, [])

    const handleKeyUp = React.useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setIsPressed(false)
        if (onClick) {
          onClick(event as any)
        }
      }
    }, [onClick])

    const handleMouseDown = React.useCallback(() => {
      setIsPressed(true)
    }, [])

    const handleMouseUp = React.useCallback(() => {
      setIsPressed(false)
    }, [])

    // Announce loading state to screen readers
    React.useEffect(() => {
      if (loading && buttonRef.current) {
        const announcement = loadingText || "Loading"
        buttonRef.current.setAttribute('aria-busy', 'true')

        // Create live region announcement
        const liveRegion = document.createElement('div')
        liveRegion.setAttribute('aria-live', 'polite')
        liveRegion.setAttribute('aria-atomic', 'true')
        liveRegion.className = 'sr-only'
        liveRegion.textContent = announcement
        document.body.appendChild(liveRegion)

        return () => {
          if (buttonRef.current) {
            buttonRef.current.removeAttribute('aria-busy')
          }
          if (document.body.contains(liveRegion)) {
            document.body.removeChild(liveRegion)
          }
        }
      }
    }, [loading, loadingText])

    const isDisabled = disabled || loading

    return (
      <button
        className={cn(
          accessibleButtonVariants({ variant, size }),
          isDisabled && "opacity-50 cursor-not-allowed",
          isPressed && "scale-95",
          loading && "relative",
          className
        )}
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          buttonRef.current = node
        }}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-busy={loading}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={!loading ? onClick : undefined}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={cn(loading && "opacity-0")}>
          {children}
        </span>
      </button>
    )
  }
)
AccessibleButton.displayName = "AccessibleButton"

export { AccessibleButton, accessibleButtonVariants }