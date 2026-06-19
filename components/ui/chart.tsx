import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const chartVariants = cva(
  "relative h-full w-full",
  {
    variants: {
      variant: {
        line: "",
        bar: "",
        area: "",
        pie: "",
        doughnut: "",
        radar: "",
      },
      size: {
        sm: "h-32",
        default: "h-64",
        lg: "h-80",
        xl: "h-96",
        full: "h-full",
      },
    },
    defaultVariants: {
      variant: "line",
      size: "default",
    },
  }
)

interface ChartProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chartVariants> {
  data: any[]
  title?: string
  description?: string
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  colors?: string[]
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ className, variant, size, data, title, description, showGrid = true, showLegend = true, showTooltip = true, colors = ["neon-blue", "neon-pink", "neon-green", "neon-yellow", "neon-purple"], ...props }, ref) => {
    const generateRandomData = () => {
      return Array.from({ length: 12 }, (_, i) => ({
        name: `Point ${i + 1}`,
        value: Math.floor(Math.random() * 100) + 20,
        secondary: Math.floor(Math.random() * 80) + 10,
      }))
    }

    const chartData = data.length > 0 ? data : generateRandomData()

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {(title || description) && (
          <div className="space-y-2">
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {description && <p className="text-sm text-gray-400">{description}</p>}
          </div>
        )}

        <div className={cn(chartVariants({ variant, size }), "glass-morphism-heavy rounded-lg p-4 border border-gray-700/50")}>
          {/* Simplified chart visualization */}
          <div className="relative h-full flex items-end justify-center gap-2">
            {chartData.map((item, index) => (
              <div
                key={index}
                className="flex-1 max-w-12 group relative"
                style={{
                  height: `${(item.value / 120) * 100}%`,
                }}
              >
                <div
                  className={cn(
                    "w-full h-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer",
                    `bg-gradient-to-t from-${colors[index % colors.length]} to-${colors[index % colors.length]}/60`,
                    "shadow-lg",
                    index % colors.length === 0 && "from-neon-blue to-neon-blue/60",
                    index % colors.length === 1 && "from-neon-pink to-neon-pink/60",
                    index % colors.length === 2 && "from-neon-green to-neon-green/60",
                    index % colors.length === 3 && "from-neon-yellow to-neon-yellow/60",
                    index % colors.length === 4 && "from-neon-purple to-neon-purple/60"
                  )}
                />

                {showTooltip && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-dark-secondary border border-gray-700 rounded px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.value}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Grid lines */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none">
              {[0, 25, 50, 75, 100].map((line) => (
                <div
                  key={line}
                  className="absolute w-full border-t border-gray-700/30"
                  style={{ bottom: `${line}%` }}
                />
              ))}
            </div>
          )}
        </div>

        {showLegend && (
          <div className="flex flex-wrap gap-4 justify-center">
            {colors.slice(0, Math.min(5, chartData.length)).map((color, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    index === 0 && "bg-neon-blue",
                    index === 1 && "bg-neon-pink",
                    index === 2 && "bg-neon-green",
                    index === 3 && "bg-neon-yellow",
                    index === 4 && "bg-neon-purple"
                  )}
                />
                <span className="text-xs text-gray-400">
                  {chartData[index]?.name || `Series ${index + 1}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)
Chart.displayName = "Chart"

export { Chart, chartVariants }