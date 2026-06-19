import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Progress,
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
} from '@/components/ui';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAgents, useSystemMetrics } from '@/hooks';
import { Agent } from '@/types';
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
  RefreshCw,
  Plus,
  Download,
  Upload,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  FileText,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import '../styles/globals.css';

// Sample data for demonstration
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
];

const sampleBrowserSession = {
  id: '1',
  url: 'https://www.surveyjunkie.com/dashboard',
  title: 'Survey Junkie Dashboard',
  status: 'active' as const,
  agentName: 'Agent Alpha',
  platform: 'Survey Junkie',
  lastActivity: new Date()
};

const AppEnhanced: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { agents, loading: agentsLoading, controlAgent } = useAgents();
  const { metrics, loading: metricsLoading, refreshMetrics } = useSystemMetrics();

  // Sample system metrics for demonstration
  const systemMetrics = {
    cpu: 45,
    memory: 62,
    network: 78,
    successRate: 94.5
  };

  useEffect(() => {
    // Auto-select the first active agent if none is selected
    if (!selectedAgent && agents && agents.length > 0) {
      const activeAgent = agents.find(agent =>
        ['browsing', 'surveying', 'connecting'].includes(agent.status)
      );
      if (activeAgent) {
        setSelectedAgent(activeAgent);
      }
    }
  }, [agents, selectedAgent]);

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleAgentControl = async (agentId: string, action: string) => {
    await controlAgent(agentId, action);
  };

  const handleGlobalAction = (action: string) => {
    console.log('Global action:', action);
    // Implement global control logic
  };

  const handleBrowserControl = (action: string) => {
    console.log('Browser control action:', action);
    // Implement browser control logic
  };

  const activeAgents = agents?.filter(agent =>
    ['browsing', 'surveying', 'connecting', 'paused'].includes(agent.status)
  ) || [];

  const idleAgents = agents?.filter(agent => agent.status === 'idle') || [];
  const errorAgents = agents?.filter(agent => agent.status === 'error' || agent.status === 'offline') || [];

  return (
    <TooltipProvider>
      <DashboardLayout
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
        <div className="space-y-6">
          {/* Header with System Metrics */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2 text-gradient-neon">
                Survey Swarm Dashboard
              </h1>
              <p className="text-gray-400">
                Monitor and control your automated survey completion agents
              </p>
            </div>
            <div className="flex items-center gap-4">
              <StatusIndicator status="online" size="lg" animated showLabel />
              <Tooltip>
                <TooltipTrigger asChild>
                  <AccessibleButton
                    onClick={refreshMetrics}
                    disabled={metricsLoading}
                    loading={metricsLoading}
                    ariaLabel="Refresh system metrics"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {metricsLoading ? 'Refreshing...' : 'Refresh'}
                  </AccessibleButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh all system metrics and agent data</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* System Overview Metrics */}
          <DashboardGrid columns={4} gap="md">
            <MetricCard
              title="Active Agents"
              value={activeAgents.length}
              change={{
                value: 8,
                trend: 'up',
                label: 'from last hour'
              }}
              icon={<Users className="w-5 h-5" />}
            />
            <MetricCard
              title="Success Rate"
              value={`${systemMetrics.successRate.toFixed(1)}%`}
              change={{
                value: 2.1,
                trend: 'up',
                label: 'improvement'
              }}
              icon={<TrendingUp className="w-5 h-5" />}
            />
            <MetricCard
              title="Total Earnings"
              value="$247.50"
              change={{
                value: 15,
                trend: 'up',
                label: 'today'
              }}
              icon={<DollarSign className="w-5 h-5" />}
            />
            <MetricCard
              title="CPU Usage"
              value={`${systemMetrics.cpu}%`}
              change={{
                value: 5,
                trend: 'down',
                label: 'optimization'
              }}
              icon={<Activity className="w-5 h-5" />}
            />
          </DashboardGrid>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="browser">Browser Sessions</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              {/* Command Center */}
              <CommandCenter
                agents={agents || []}
                globalStatus="running"
                onGlobalAction={handleGlobalAction}
                onAgentAction={handleAgentControl}
                systemMetrics={systemMetrics}
              />

              {/* Activity Feed and Quick Stats */}
              <DashboardGrid columns={3} gap="md">
                <div className="lg:col-span-2">
                  <ActivityFeed
                    activities={sampleActivities}
                    maxItems={8}
                    showTimestamp={true}
                    showSeverity={true}
                  />
                </div>
                <div className="space-y-4">
                  <Card className="glass-morphism-heavy border-gray-700/50">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Active</span>
                        <Badge variant="success">{activeAgents.length}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Idle</span>
                        <Badge variant="secondary">{idleAgents.length}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Errors</span>
                        <Badge variant="destructive">{errorAgents.length}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Total</span>
                        <Badge variant="outline">{agents?.length || 0}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-morphism-heavy border-gray-700/50">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">System Health</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">CPU</span>
                          <span className="text-xs text-neon-blue">{systemMetrics.cpu}%</span>
                        </div>
                        <Progress value={systemMetrics.cpu} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Memory</span>
                          <span className="text-xs text-neon-green">{systemMetrics.memory}%</span>
                        </div>
                        <Progress value={systemMetrics.memory} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-400">Network</span>
                          <span className="text-xs text-neon-purple">{systemMetrics.network}%</span>
                        </div>
                        <Progress value={systemMetrics.network} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </DashboardGrid>
            </TabsContent>

            <TabsContent value="agents" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Agent Management</h2>
                  <p className="text-gray-400">
                    Monitor and control individual agents
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {activeAgents.length} active, {idleAgents.length} idle
                  </span>
                  {errorAgents.length > 0 && (
                    <span className="text-sm text-red-400">
                      {errorAgents.length} errors
                    </span>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        New Agent
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-morphism-heavy border-gray-700/50">
                      <DialogHeader>
                        <DialogTitle className="text-white">Create New Agent</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Configure a new automated survey completion agent
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-gray-300">
                          Agent creation form would go here...
                        </p>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Create Agent</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {agentsLoading ? (
                <Card className="glass-morphism-heavy border-gray-700/50">
                  <CardContent className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <div className="loading-spinner w-8 h-8 mx-auto mb-4" />
                      <p className="text-gray-400">Loading agents...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <DashboardGrid columns={2} gap="md">
                  {agents?.map((agent) => (
                    <AgentCard
                      key={agent.id}
                      agent={agent}
                      onSelect={handleAgentSelect}
                      onControl={handleAgentControl}
                      compact={false}
                    />
                  ))}
                </DashboardGrid>
              )}
            </TabsContent>

            <TabsContent value="browser" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Browser Sessions</h2>
                  <p className="text-gray-400">
                    Live monitoring of agent browser activities
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </div>

              <DashboardGrid columns={2} gap="md">
                <BrowserViewer
                  session={selectedAgent?.browserSession || sampleBrowserSession}
                  onControl={handleBrowserControl}
                  fullscreen={false}
                  showControls={true}
                />

                {selectedAgent && (
                  <Card className="glass-morphism-heavy border-gray-700/50">
                    <CardHeader>
                      <CardTitle className="text-white">
                        {selectedAgent.name} - Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Status</span>
                          <StatusIndicator
                            status={selectedAgent.status === 'browsing' ? 'active' : selectedAgent.status}
                            size="sm"
                          />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Platform</span>
                          <Badge variant="outline" size="sm">
                            {selectedAgent.platform || 'Unknown'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Earnings</span>
                          <span className="text-sm font-medium text-neon-green">
                            ${(selectedAgent.earnings || 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Completed</span>
                          <span className="text-sm font-medium text-white">
                            {selectedAgent.surveysCompleted || 0}
                          </span>
                        </div>
                      </div>

                      {selectedAgent.metrics && (
                        <div className="space-y-3 pt-3 border-t border-gray-700/50">
                          <h4 className="text-sm font-medium text-white">Performance</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-400">CPU Usage</span>
                              <span className="text-xs text-neon-blue">
                                {selectedAgent.metrics.cpuUsage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-400">Memory Usage</span>
                              <span className="text-xs text-neon-green">
                                {selectedAgent.metrics.memoryUsage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-400">Success Rate</span>
                              <span className="text-xs text-neon-yellow">
                                {selectedAgent.metrics.successRate.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </DashboardGrid>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Analytics Dashboard</h2>
                  <p className="text-gray-400">
                    Performance metrics and insights
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>

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
                <Chart
                  title="Earnings Trend"
                  description="Daily earnings over the past week"
                  variant="area"
                  size="default"
                  data={[]}
                />
                <Chart
                  title="Platform Distribution"
                  description="Survey completion by platform"
                  variant="pie"
                  size="default"
                  data={[]}
                />
              </DashboardGrid>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </TooltipProvider>
  );
};

export default AppEnhanced;