import * as React from "react"
import { Play, Pause, Square, RefreshCw, Plus, Settings, Download, Upload, Zap, Shield, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { Progress } from "./progress"
import { Switch } from "./switch"
import { cn } from "@/lib/utils"

interface CommandCenterProps {
  agents: any[]
  globalStatus: 'running' | 'paused' | 'stopped'
  onGlobalAction: (action: string) => void
  onAgentAction: (agentId: string, action: string) => void
  systemMetrics: {
    cpu: number
    memory: number
    network: number
    successRate: number
  }
  className?: string
}

const CommandCenter = React.forwardRef<HTMLDivElement, CommandCenterProps>(
  ({ agents, globalStatus, onGlobalAction, onAgentAction, systemMetrics, className, ...props }, ref) => {
    const [autoRestart, setAutoRestart] = React.useState(true)
    const [stealthMode, setStealthMode] = React.useState(true)
    const [smartRouting, setSmartRouting] = React.useState(true)

    const activeAgents = agents.filter(agent => agent.status === 'active' || agent.status === 'browsing' || agent.status === 'surveying')
    const totalEarnings = agents.reduce((sum, agent) => sum + (agent.earnings || 0), 0)

    const getGlobalStatusIcon = () => {
      switch (globalStatus) {
        case 'running':
          return <Activity className="w-5 h-5 text-neon-green animate-pulse" />
        case 'paused':
          return <Pause className="w-5 h-5 text-neon-yellow" />
        case 'stopped':
          return <Square className="w-5 h-5 text-red-400" />
        default:
          return <Activity className="w-5 h-5 text-gray-400" />
      }
    }

    const getGlobalStatusColor = () => {
      switch (globalStatus) {
        case 'running':
          return 'text-neon-green border-neon-green/30 bg-neon-green/10'
        case 'paused':
          return 'text-neon-yellow border-neon-yellow/30 bg-neon-yellow/10'
        case 'stopped':
          return 'text-red-400 border-red-600/30 bg-red-600/10'
        default:
          return 'text-gray-400 border-gray-700/30 bg-gray-700/10'
      }
    }

    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        {/* Global Status Card */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white flex items-center gap-3">
                {getGlobalStatusIcon()}
                Global Command Center
              </CardTitle>
              <Badge variant="outline" className={getGlobalStatusColor()}>
                {globalStatus.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Global Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant={globalStatus === 'running' ? 'success' : 'default'}
                onClick={() => onGlobalAction('start')}
                disabled={globalStatus === 'running'}
                className="flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start All
              </Button>
              <Button
                variant={globalStatus === 'paused' ? 'warning' : 'secondary'}
                onClick={() => onGlobalAction('pause')}
                disabled={globalStatus !== 'running'}
                className="flex items-center gap-2"
              >
                <Pause className="w-4 h-4" />
                Pause All
              </Button>
              <Button
                variant="destructive"
                onClick={() => onGlobalAction('stop')}
                disabled={globalStatus === 'stopped'}
                className="flex items-center gap-2"
              >
                <Square className="w-4 h-4" />
                Stop All
              </Button>
              <Button
                variant="outline"
                onClick={() => onGlobalAction('restart')}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Restart
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-dark-800/50 rounded-lg border border-gray-700/30">
                <div className="text-2xl font-bold text-neon-blue">{agents.length}</div>
                <div className="text-xs text-gray-400">Total Agents</div>
              </div>
              <div className="text-center p-3 bg-dark-800/50 rounded-lg border border-gray-700/30">
                <div className="text-2xl font-bold text-neon-green">{activeAgents.length}</div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
              <div className="text-center p-3 bg-dark-800/50 rounded-lg border border-gray-700/30">
                <div className="text-2xl font-bold text-neon-yellow">${totalEarnings.toFixed(2)}</div>
                <div className="text-xs text-gray-400">Total Earnings</div>
              </div>
              <div className="text-center p-3 bg-dark-800/50 rounded-lg border border-gray-700/30">
                <div className="text-2xl font-bold text-neon-purple">{systemMetrics.successRate.toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Success Rate</div>
              </div>
            </div>

            {/* System Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">CPU Usage</span>
                <span className="text-sm font-medium text-white">{systemMetrics.cpu}%</span>
              </div>
              <Progress value={systemMetrics.cpu} />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Memory Usage</span>
                <span className="text-sm font-medium text-white">{systemMetrics.memory}%</span>
              </div>
              <Progress value={systemMetrics.memory} />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Network Activity</span>
                <span className="text-sm font-medium text-white">{systemMetrics.network}%</span>
              </div>
              <Progress value={systemMetrics.network} />
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white">Advanced Settings</h4>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-neon-blue" />
                  <span className="text-sm text-gray-300">Auto Restart Failed Agents</span>
                </div>
                <Switch
                  checked={autoRestart}
                  onCheckedChange={setAutoRestart}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-neon-yellow" />
                  <span className="text-sm text-gray-300">Stealth Mode</span>
                </div>
                <Switch
                  checked={stealthMode}
                  onCheckedChange={setStealthMode}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-neon-purple" />
                  <span className="text-sm text-gray-300">Smart Routing</span>
                </div>
                <Switch
                  checked={smartRouting}
                  onCheckedChange={setSmartRouting}
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Agent
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Data
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import Config
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Advanced
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agent Quick Actions */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Agent Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.slice(0, 6).map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg border border-gray-700/30"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      agent.status === 'active' ? "bg-neon-green animate-pulse" :
                      agent.status === 'paused' ? "bg-neon-yellow" :
                      "bg-gray-400"
                    )} />
                    <div>
                      <p className="text-sm font-medium text-white">{agent.name}</p>
                      <p className="text-xs text-gray-500">{agent.platform || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {agent.status === 'active' ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onAgentAction(agent.id, 'pause')}
                        className="h-6 w-6 p-0"
                      >
                        <Pause className="w-3 h-3" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onAgentAction(agent.id, 'start')}
                        className="h-6 w-6 p-0"
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
)
CommandCenter.displayName = "CommandCenter"

export { CommandCenter }