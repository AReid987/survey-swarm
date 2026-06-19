import * as React from "react"
import { cn } from "@/lib/utils"

interface DashboardGridProps {
  children: React.ReactNode
  columns?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  responsive?: boolean
}

const DashboardGrid = React.forwardRef<HTMLDivElement, DashboardGridProps>(
  ({ children, columns = 3, gap = 'md', className, responsive = true, ...props }, ref) => {
    const getGridClasses = () => {
      const baseClasses = "grid"

      const gapClasses = {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
        xl: "gap-8"
      }

      const columnClasses = {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        6: "grid-cols-6",
        12: "grid-cols-12"
      }

      const responsiveColumnClasses = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
        12: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6"
      }

      return cn(
        baseClasses,
        responsive ? responsiveColumnClasses[columns] : columnClasses[columns],
        gapClasses[gap],
        className
      )
    }

    return (
      <div ref={ref} className={getGridClasses()} {...props}>
        {children}
      </div>
    )
  }
)
DashboardGrid.displayName = "DashboardGrid"

export { DashboardGrid }