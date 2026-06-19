import * as React from "react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  StatusIndicator,
  MetricCard,
  AgentCard,
  ActivityFeed,
  DashboardGrid,
  Chart,
  BrowserViewer,
  CommandCenter,
  AccessibleButton
} from './index'
import {
  Activity,
  Users,
  Monitor,
  Settings,
  BarChart3,
  Home,
  Play,
  Pause,
  Square,
  TrendingUp,
  Globe,
  FileText,
  DollarSign,
  AlertTriangle
} from 'lucide-react'

// Sample data for demonstrations
const sampleAgents = [
  {
    id: '1',
    name: 'Agent Alpha',
    status: 'browsing' as const,
    currentTask: 'Searching for available surveys',
    platform: 'Survey Junkie',
    progress: 65,
    earnings: 12.50,
    surveysCompleted: 8,
    lastActivity: '2 minutes ago',
    metrics: {
      cpuUsage: 45.2,
      memoryUsage: 62.8,
      successRate: 94.5
    }
  },
  {
    id: '2',
    name: 'Agent Beta',
    status: 'surveying' as const,
    currentTask: 'Completing demographic survey',
    platform: 'Swagbucks',
    progress: 35,
    earnings: 8.75,
    surveysCompleted: 5,
    lastActivity: '5 minutes ago',
    metrics: {
      cpuUsage: 38.7,
      memoryUsage: 55.3,
      successRate: 91.2
    }
  },
  {
    id: '3',
    name: 'Agent Gamma',
    status: 'paused' as const,
    currentTask: 'Waiting for new tasks',
    platform: 'Amazon MTurk',
    progress: 0,
    earnings: 0,
    surveysCompleted: 0,
    lastActivity: '15 minutes ago',
    metrics: {
      cpuUsage: 12.1,
      memoryUsage: 28.4,
      successRate: 88.9
    }
  }
]

const sampleActivities = [
  {
    id: '1',
    type: 'survey_completed' as const,
    agentName: 'Agent Alpha',
    platform: 'Survey Junkie',
    message: 'Completed survey about consumer habits',
    amount: 2.50,
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    severity: 'low' as const
  },
  {
    id: '2',
    type: 'error' as const,
    agentName: 'Agent Beta',
    message: 'Survey platform timeout occurred',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    severity: 'high' as const
  },
  {
    id: '3',
    type: 'earning' as const,
    agentName: 'Agent Alpha',
    platform: 'Survey Junkie',
    message: 'Survey completed successfully',
    amount: 2.50,
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    severity: 'low' as const
  }
]

const sampleBrowserSession = {
  id: '1',
  url: 'https://www.surveyjunkie.com/dashboard',
  title: 'Survey Junkie Dashboard',
  status: 'active' as const,
  agentName: 'Agent Alpha',
  platform: 'Survey Junkie',
  lastActivity: new Date()
}

export const ComponentShowcase: React.FC = () => {
  const [switchStates, setSwitchStates] = React.useState({
    autoRestart: true,
    stealthMode: true,
    smartRouting: false
  })

  const [selectedAgent, setSelectedAgent] = React.useState(sampleAgents[0])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-dark-primary p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gradient-neon">Survey Swarm UI Components</h1>
          <p className="text-xl text-gray-400">Cyberpunk-themed accessible component library</p>
        </div>

        {/* Buttons Showcase */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Button Variants</CardTitle>
            <CardDescription>Complete button system with cyberpunk styling</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="neon">Neon</Button>
              <Button variant="cyber">Cyber</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="destructive">Destructive</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <AccessibleButton loading>Loading</AccessibleButton>
              <AccessibleButton disabled>Disabled</AccessibleButton>
              <AccessibleButton ariaLabel="Sample accessible button">Accessible</AccessibleButton>
            </div>
          </CardContent>
        </Card>

        {/* Status Indicators */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Status Indicators</CardTitle>
            <CardDescription>Real-time status display with animations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <StatusIndicator status="online" />
              <StatusIndicator status="offline" />
              <StatusIndicator status="active" />
              <StatusIndicator status="idle" />
              <StatusIndicator status="error" />
              <StatusIndicator status="warning" />
              <StatusIndicator status="success" />
              <StatusIndicator status="connecting" />
              <StatusIndicator status="browsing" />
              <StatusIndicator status="surveying" />
              <StatusIndicator status="paused" />
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Badges</CardTitle>
            <CardDescription>Status and information badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="neon">Neon</Badge>
              <Badge variant="cyber">Cyber</Badge>
              <Badge variant="active">Active</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Cards */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Metric Cards</CardTitle>
            <CardDescription>Data visualization components</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardGrid columns={4} gap="md">
              <MetricCard
                title="Active Agents"
                value="12"
                change={{ value: 8, trend: 'up', label: 'from last hour' }}
                icon={<Users className="w-5 h-5" />}
              />
              <MetricCard
                title="Success Rate"
                value="94.5%"
                change={{ value: 2.1, trend: 'up', label: 'improvement' }}
                icon={<TrendingUp className="w-5 h-5" />}
              />
              <MetricCard
                title="Total Earnings"
                value="$247.50"
                change={{ value: 15, trend: 'up', label: 'today' }}
                icon={<DollarSign className="w-5 h-5" />}
              />
              <MetricCard
                title="CPU Usage"
                value="45%"
                change={{ value: 5, trend: 'down', label: 'optimization' }}
                icon={<Activity className="w-5 h-5" />}
              />
            </DashboardGrid>
          </CardContent>
        </Card>

        {/* Progress Bars */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Progress Bars</CardTitle>
            <CardDescription>Animated progress indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Survey Completion</span>
                <span className="text-sm text-neon-blue">65%</span>
              </div>
              <Progress value={65} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">System Resources</span>
                <span className="text-sm text-neon-green">82%</span>
              </div>
              <Progress value={82} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-400">Daily Goal</span>
                <span className="text-sm text-neon-yellow">35%</span>
              </div>
              <Progress value={35} />
            </div>
          </CardContent>
        </Card>

        {/* Switches */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Toggle Switches</CardTitle>
            <CardDescription>Interactive toggle controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Auto Restart Failed Agents</span>
              <Switch
                checked={switchStates.autoRestart}
                onCheckedChange={(checked) =>
                  setSwitchStates(prev => ({ ...prev, autoRestart: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Stealth Mode</span>
              <Switch
                checked={switchStates.stealthMode}
                onCheckedChange={(checked) =>
                  setSwitchStates(prev => ({ ...prev, stealthMode: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Smart Routing</span>
              <Switch
                checked={switchStates.smartRouting}
                onCheckedChange={(checked) =>
                  setSwitchStates(prev => ({ ...prev, smartRouting: checked }))
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Agent Cards */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Agent Cards</CardTitle>
            <CardDescription>Agent management interface</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardGrid columns={3} gap="md">
              {sampleAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onSelect={setSelectedAgent}
                  onControl={(agentId, action) => console.log(`Agent ${agentId}: ${action}`)}
                />
              ))}
            </DashboardGrid>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Tabs</CardTitle>
            <CardDescription>Navigation tabs system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="agents">Agents</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <p className="text-gray-300">Overview content with system metrics and status.</p>
              </TabsContent>
              <TabsContent value="agents" className="mt-4">
                <p className="text-gray-300">Agent management and monitoring interface.</p>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <p className="text-gray-300">Analytics dashboard with charts and insights.</p>
              </TabsContent>
              <TabsContent value="settings" className="mt-4">
                <p className="text-gray-300">System configuration and preferences.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Charts */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Charts</CardTitle>
            <CardDescription>Data visualization components</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardGrid columns={2} gap="md">
              <Chart
                title="Performance Metrics"
                description="Agent performance over time"
                variant="bar"
                size="default"
                data={[]}
              />
              <Chart
                title="Success Rate"
                description="Survey completion success rate"
                variant="line"
                size="default"
                data={[]}
              />
            </DashboardGrid>
          </CardContent>
        </Card>

        {/* Dialog Example */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Dialog</CardTitle>
            <CardDescription>Modal dialogs with overlays</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="glass-morphism-heavy border-gray-700/50">
                <DialogHeader>
                  <DialogTitle className="text-white">Agent Configuration</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Configure agent settings and preferences
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    This is a sample dialog with cyberpunk styling and glass morphism effects.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Activity Feed</CardTitle>
            <CardDescription>Real-time activity monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <ActivityFeed
              activities={sampleActivities}
              maxItems={5}
              showTimestamp={true}
              showSeverity={true}
            />
          </CardContent>
        </Card>

        {/* Tooltip Example */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Tooltips</CardTitle>
            <CardDescription>Contextual help and information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Info className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Additional information about this feature</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configure system settings and preferences</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        {/* Browser Viewer */}
        <Card className="glass-morphism-heavy border-gray-700/50">
          <CardHeader>
            <CardTitle className="text-white">Browser Viewer</CardTitle>
            <CardDescription>Live browser session monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <BrowserViewer
              session={sampleBrowserSession}
              onControl={(action) => console.log(`Browser control: ${action}`)}
              fullscreen={false}
              showControls={true}
            />
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}

// Additional icon import
const Info = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)