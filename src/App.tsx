import React, { useState, useEffect } from 'react';
import { DashboardLayout, AgentCard, BrowserViewer, MetricsDisplay, StatusIndicator } from '@/components';
import { useAgents, useSystemMetrics } from '@/hooks';
import { Agent } from '@/types';
import '../styles/globals.css';

const App: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { agents, loading: agentsLoading, controlAgent } = useAgents();
  const { metrics, loading: metricsLoading, refreshMetrics } = useSystemMetrics();

  useEffect(() => {
    // Auto-select the first active agent if none is selected
    if (!selectedAgent && agents.length > 0) {
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

  const handleAgentControl = async (agentId: string, action: any) => {
    await controlAgent(agentId, action);
  };

  const handleBrowserControl = (action: any) => {
    console.log('Browser control action:', action);
    // Implement browser control logic here
  };

  const activeAgents = agents.filter(agent =>
    ['browsing', 'surveying', 'connecting', 'paused'].includes(agent.status)
  );

  const idleAgents = agents.filter(agent => agent.status === 'idle');
  const errorAgents = agents.filter(agent => agent.status === 'error' || agent.status === 'offline');

  return (
    <DashboardLayout
      sidebarCollapsed={sidebarCollapsed}
      onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
    >
      <div className="space-y-6">
        {/* Header with System Metrics */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Survey Swarm Dashboard</h1>
            <p className="text-gray-400">
              Monitor and control your automated survey completion agents
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator status="online" size="lg" animated showLabel />
            <button
              onClick={refreshMetrics}
              className="btn-secondary"
              disabled={metricsLoading}
            >
              {metricsLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* System Overview Metrics */}
        <MetricsDisplay
          metrics={metrics}
          type="system"
          variant="compact"
        />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Agents</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  {activeAgents.length} active, {idleAgents.length} idle
                </span>
                {errorAgents.length > 0 && (
                  <span className="text-sm text-red-400">
                    {errorAgents.length} errors
                  </span>
                )}
              </div>
            </div>

            {agentsLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="loading-spinner w-8 h-8 mx-auto mb-4" />
                  <p className="text-gray-400">Loading agents...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {agents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onSelect={handleAgentSelect}
                    onControl={handleAgentControl}
                    compact={false}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Browser Viewer */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Browser Session</h2>
            <BrowserViewer
              session={selectedAgent?.browserSession || null}
              onControl={handleBrowserControl}
              fullscreen={false}
            />

            {/* Selected Agent Details */}
            {selectedAgent && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {selectedAgent.name} - Details
                </h3>
                <MetricsDisplay
                  metrics={selectedAgent.metrics}
                  type="agent"
                  variant="detailed"
                />
              </div>
            )}
          </div>
        </div>

        {/* System Status Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricsDisplay
              metrics={metrics}
              type="system"
              variant="chart"
            />
            <div className="glass-morphism-heavy rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                  <span className="text-gray-300">Agent completed survey</span>
                  <span className="text-gray-500 ml-auto">2m ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                  <span className="text-gray-300">New agent started</span>
                  <span className="text-gray-500 ml-auto">5m ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Survey platform timeout</span>
                  <span className="text-gray-500 ml-auto">12m ago</span>
                </div>
              </div>
            </div>
            <div className="glass-morphism-heavy rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">CPU Usage</span>
                  <span className="text-neon-yellow text-sm font-medium">
                    {metrics.cpuUsage.toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Memory Usage</span>
                  <span className="text-neon-blue text-sm font-medium">
                    {metrics.memoryUsage.toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">System Load</span>
                  <span className="text-neon-green text-sm font-medium">
                    {metrics.systemLoad.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default App;