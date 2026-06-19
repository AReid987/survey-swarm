import * as React from "react"
import { Globe, FileText, DollarSign, AlertTriangle, CheckCircle, Clock, Play, Pause, Square } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface ActivityItem {
  id: string
  type: 'survey_completed' | 'survey_started' | 'agent_started' | 'agent_paused' | 'agent_stopped' | 'error' | 'warning' | 'earning' | 'platform_connected' | 'platform_disconnected'
  agentName?: string
  platform?: string
  message: string
  amount?: number
  timestamp: Date
  severity?: 'low' | 'medium' | 'high'
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  className?: string
  maxItems?: number
  showTimestamp?: boolean
  showSeverity?: boolean
}

const ActivityFeed = React.forwardRef<HTMLDivElement, ActivityFeedProps>(
  ({ activities, className, maxItems = 10, showTimestamp = true, showSeverity = true, ...props }, ref) => {
    const getActivityIcon = (type: ActivityItem['type']) => {
      switch (type) {
        case 'survey_completed':
          return <CheckCircle className="w-4 h-4 text-neon-green" />
        case 'survey_started':
          return <FileText className="w-4 h-4 text-neon-blue" />
        case 'agent_started':
          return <Play className="w-4 h-4 text-neon-green" />
        case 'agent_paused':
          return <Pause className="w-4 h-4 text-neon-yellow" />
        case 'agent_stopped':
          return <Square className="w-4 h-4 text-red-400" />
        case 'error':
          return <AlertTriangle className="w-4 h-4 text-red-400" />
        case 'warning':
          return <AlertTriangle className="w-4 h-4 text-neon-yellow" />
        case 'earning':
          return <DollarSign className="w-4 h-4 text-neon-green" />
        case 'platform_connected':
          return <Globe className="w-4 h-4 text-neon-blue" />
        case 'platform_disconnected':
          return <Globe className="w-4 h-4 text-gray-400" />
        default:
          return <Clock className="w-4 h-4 text-gray-400" />
      }
    }

    const getActivityColor = (type: ActivityItem['type']) => {
      switch (type) {
        case 'survey_completed':
        case 'agent_started':
        case 'earning':
        case 'platform_connected':
          return 'border-neon-green/30 bg-neon-green/10'
        case 'survey_started':
          return 'border-neon-blue/30 bg-neon-blue/10'
        case 'agent_paused':
        case 'warning':
          return 'border-neon-yellow/30 bg-neon-yellow/10'
        case 'error':
        case 'agent_stopped':
        case 'platform_disconnected':
          return 'border-red-600/30 bg-red-600/10'
        default:
          return 'border-gray-700/30 bg-gray-700/10'
      }
    }

    const formatTimestamp = (date: Date) => {
      const now = new Date()
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

      if (diffInMinutes < 1) return 'Just now'
      if (diffInMinutes < 60) return `${diffInMinutes}m ago`

      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) return `${diffInHours}h ago`

      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }

    const getSeverityColor = (severity?: 'low' | 'medium' | 'high') => {
      switch (severity) {
        case 'high':
          return 'bg-red-600/20 text-red-400 border-red-600/30'
        case 'medium':
          return 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/30'
        case 'low':
          return 'bg-neon-blue/20 text-neon-blue border-neon-blue/30'
        default:
          return ''
      }
    }

    const displayActivities = activities.slice(0, maxItems)

    return (
      <Card ref={ref} className={cn("h-full", className)} {...props}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-neon-blue" />
            Activity Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
            {displayActivities.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No recent activity</p>
              </div>
            ) : (
              displayActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 hover:bg-glass-light",
                    getActivityColor(activity.type)
                  )}
                >
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm text-gray-300 break-words">
                          {activity.agentName && (
                            <span className="font-medium text-white">{activity.agentName}: </span>
                          )}
                          {activity.message}
                        </p>
                        {activity.amount && (
                          <p className="text-sm font-medium text-neon-green mt-1">
                            +${activity.amount.toFixed(2)}
                          </p>
                        )}
                        {activity.platform && (
                          <Badge variant="outline" size="sm" className="mt-1">
                            {activity.platform}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {showTimestamp && (
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {formatTimestamp(activity.timestamp)}
                          </span>
                        )}
                        {showSeverity && activity.severity && (
                          <Badge
                            variant="outline"
                            size="sm"
                            className={getSeverityColor(activity.severity)}
                          >
                            {activity.severity}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)
ActivityFeed.displayName = "ActivityFeed"

export { ActivityFeed }