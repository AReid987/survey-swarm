import * as React from "react"
import { Monitor, Pause, Play, Square, Settings, Activity, Globe, FileText, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import { StatusIndicator } from "./status-indicator"
import { Button } from "./button"
import { Progress } from "./progress"
import { cn } from "@/lib/utils"

interface Agent {
  id: string
  name: string
  status: 'online' | 'offline' | 'active' | 'idle' | 'error' | 'connecting' | 'browsing' | 'surveying' | 'paused'
  currentTask?: string
  platform?: string
  progress?: number
  earnings?: number
  surveysCompleted?: number
  lastActivity?: string
  metrics?: {
    cpuUsage: number
    memoryUsage: number
    successRate: number
  }
}

interface AgentCardProps {
  agent: Agent
  onSelect?: (agent: Agent) => void
  onControl?: (agentId: string, action: string) => void
  compact?: boolean
  className?: string
}

const AgentCard = React.forwardRef<HTMLDivElement, AgentCardProps>(
  ({ agent, onSelect, onControl, compact = false, className, ...props }, ref) => {
    const getStatusIcon = (status: Agent['status']) => {
      switch (status) {
        case 'browsing':
          return <Globe className="w-4 h-4" />
        case 'surveying':
          return <FileText className="w-4 h-4" />
        case 'error':
          return <AlertTriangle className="w-4 h-4" />
        case 'connecting':
          return <Activity className="w-4 h-4" />
        default:
          return <Monitor className="w-4 h-4" />
      }
    }

    const getPlatformIcon = (platform?: string) => {
      switch (platform?.toLowerCase()) {
        case 'survey junkie':
          return <Badge variant="info" size="sm">SJ</Badge>
        case 'swagbucks':
          return <Badge variant="warning" size="sm">SB</Badge>
        case 'amazon mechanical turk':
          return <Badge variant="secondary" size="sm">MTurk</Badge>
        default:
          return platform ? <Badge variant="outline" size="sm">{platform.slice(0, 2).toUpperCase()}</Badge> : null
      }
    }

    const getControlButton = (status: Agent['status']) => {
      switch (status) {
        case 'paused':
          return (
            <Button
              size="sm"
              variant="success"
              onClick={() => onControl?.(agent.id, 'resume')}
            >
              <Play className="w-4 h-4" />
            </Button>
          )
        case 'active':
        case 'browsing':
        case 'surveying':
          return (
            <Button
              size="sm"
              variant="warning"
              onClick={() => onControl?.(agent.id, 'pause')}
            >
              <Pause className="w-4 h-4" />
            </Button>
          )
        case 'idle':
          return (
            <Button
              size="sm"
              variant="default"
              onClick={() => onControl?.(agent.id, 'start')}
            >
              <Play className="w-4 h-4" />
            </Button>
          )
        default:
          return (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onControl?.(agent.id, 'restart')}
            >
              <Activity className="w-4 h-4" />
            </Button>
          )
      }
    }

    if (compact) {
      return (
        <Card
          ref={ref}
          className={cn(
            "cursor-pointer hover:border-neon-blue/50 transition-all duration-200",
            className
          )}
          onClick={() => onSelect?.(agent)}
          {...props}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(agent.status)}
                <div>
                  <p className="font-medium text-white">{agent.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusIndicator status={agent.status} size="sm" showLabel={false} />
                    {getPlatformIcon(agent.platform)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-neon-green">${agent.earnings?.toFixed(2) || '0.00'}</p>
                  <p className="text-xs text-gray-500">{agent.surveysCompleted || 0} surveys</p>
                </div>
                {getControlButton(agent.status)}
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "cursor-pointer hover:border-neon-blue/50 transition-all duration-200",
          className
        )}
        onClick={() => onSelect?.(agent)}
        {...props}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-lg border",
                agent.status === 'active' || agent.status === 'browsing' || agent.status === 'surveying'
                  ? "border-neon-blue/30 bg-neon-blue/10"
                  : agent.status === 'error'
                  ? "border-red-600/30 bg-red-600/10"
                  : "border-gray-700/30 bg-gray-700/10"
              )}>
                {getStatusIcon(agent.status)}
              </div>
              <div>
                <CardTitle className="text-base text-white">{agent.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <StatusIndicator status={agent.status} size="sm" />
                  {getPlatformIcon(agent.platform)}
                  <span className="text-xs text-gray-500">{agent.lastActivity}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getControlButton(agent.status)}
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  onControl?.(agent.id, 'settings')
                }}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Current Task */}
          {agent.currentTask && (
            <div>
              <p className="text-xs text-gray-400 mb-1">Current Task</p>
              <p className="text-sm text-gray-300">{agent.currentTask}</p>
            </div>
          )}

          {/* Progress */}
          {agent.progress !== undefined && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-400">Progress</p>
                <p className="text-xs text-neon-blue font-medium">{agent.progress}%</p>
              </div>
              <Progress value={agent.progress} />
            </div>
          )}

          {/* Metrics Grid */}
          {agent.metrics && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">CPU</p>
                <p className="text-sm font-medium text-white">{agent.metrics.cpuUsage.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Memory</p>
                <p className="text-sm font-medium text-white">{agent.metrics.memoryUsage.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Success Rate</p>
                <p className="text-sm font-medium text-neon-green">{agent.metrics.successRate.toFixed(1)}%</p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-gray-400">Earnings</p>
                <p className="text-sm font-medium text-neon-green">${agent.earnings?.toFixed(2) || '0.00'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Completed</p>
                <p className="text-sm font-medium text-white">{agent.surveysCompleted || 0}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
)
AgentCard.displayName = "AgentCard"

export { AgentCard }