'use client'

import { motion } from 'framer-motion'
import Layout from './components/Layout'
import { MetricCard } from '../../../components/ui/metric-card'
import { AgentCard } from '../../../components/ui/agent-card'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Activity, TrendingUp, Users, DollarSign, Globe, Bot, BarChart3, Cpu, AlertTriangle, Zap } from 'lucide-react'

// Mock data for demonstration
const mockMetrics = [
  {
    title: 'Active Agents',
    value: 5,
    change: { value: 2, trend: 'up' as const, label: 'from last hour' },
    icon: <Bot className="w-5 h-5" />
  },
  {
    title: 'Total Earnings',
    value: '$247.50',
    change: { value: 15.3, trend: 'up' as const, label: 'from yesterday' },
    icon: <DollarSign className="w-5 h-5" />
  },
  {
    title: 'Surveys Completed',
    value: 142,
    change: { value: 8.7, trend: 'up' as const, label: 'from last week' },
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    title: 'Success Rate',
    value: '94.2%',
    change: { value: 2.1, trend: 'up' as const, label: 'from last week' },
    icon: <TrendingUp className="w-5 h-5" />
  }
]

const mockAgents = [
  {
    id: 'agent-001',
    name: 'SurveyBot Alpha',
    status: 'active' as const,
    currentTask: 'Processing survey on Survey Junkie',
    platform: 'Survey Junkie',
    progress: 67,
    earnings: 45.75,
    surveysCompleted: 12,
    lastActivity: '2 min ago',
    metrics: {
      cpuUsage: 12.3,
      memoryUsage: 34.7,
      successRate: 96.8
    }
  },
  {
    id: 'agent-002',
    name: 'DataCollector Beta',
    status: 'browsing' as const,
    currentTask: 'Searching for available surveys',
    platform: 'Swagbucks',
    progress: 23,
    earnings: 28.30,
    surveysCompleted: 8,
    lastActivity: '5 min ago',
    metrics: {
      cpuUsage: 8.9,
      memoryUsage: 28.1,
      successRate: 92.3
    }
  },
  {
    id: 'agent-003',
    name: 'AutoFill Gamma',
    status: 'paused' as const,
    currentTask: 'Paused - waiting for verification',
    platform: 'Amazon Mechanical Turk',
    progress: 89,
    earnings: 67.20,
    surveysCompleted: 18,
    lastActivity: '15 min ago',
    metrics: {
      cpuUsage: 5.2,
      memoryUsage: 22.4,
      successRate: 94.1
    }
  }
]

// Enhanced Dashboard component
const Dashboard = () => {
  const handleAgentControl = (agentId: string, action: string) => {
    console.log(`Agent ${agentId} - Action: ${action}`)
    // Handle agent control logic here
  }

  const handleAgentSelect = (agent: any) => {
    console.log('Selected agent:', agent)
    // Handle agent selection logic here
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold gradient-text-neon text-cyber mb-4">
          Survey Swarm Command Center
        </h1>
        <p className="text-gray-400 text-lg">
          Real-time monitoring and control of your automated survey completion network
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {mockMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <MetricCard {...metric} className="cyber-card" />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Agents Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card className="cyber-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
                <Users className="w-6 h-6 text-neon-blue" />
                Active Agents
              </CardTitle>
              <Badge variant="outline" className="border-neon-blue/30 text-neon-blue">
                {mockAgents.length} Online
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                >
                  <AgentCard
                    agent={agent}
                    onSelect={handleAgentSelect}
                    onControl={handleAgentControl}
                    compact={true}
                    className="cyber-card"
                  />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* System Status & Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          {/* System Status */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-3">
                <Cpu className="w-5 h-5 text-neon-purple" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">CPU Usage</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-neon-blue to-neon-purple" style={{ width: '23%' }}></div>
                  </div>
                  <span className="text-sm text-neon-blue font-medium">23%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Memory</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-neon-green to-neon-blue" style={{ width: '67%' }}></div>
                  </div>
                  <span className="text-sm text-neon-green font-medium">67%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Network</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="text-sm text-neon-green font-medium">Optimal</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-3">
                <Zap className="w-5 h-5 text-neon-yellow" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default" size="sm">
                <Bot className="w-4 h-4 mr-2" />
                Deploy New Agent
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full" variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                System Settings
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-3">
                <Activity className="w-5 h-5 text-neon-pink" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-400">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                  <span>SurveyBot Alpha completed survey</span>
                </div>
                <div className="text-xs text-gray-500 ml-4">2 minutes ago</div>
              </div>
              <div className="text-sm text-gray-400">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-neon-blue rounded-full"></div>
                  <span>DataCollector Beta started new task</span>
                </div>
                <div className="text-xs text-gray-500 ml-4">5 minutes ago</div>
              </div>
              <div className="text-sm text-gray-400">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-neon-yellow rounded-full"></div>
                  <span>AutoFill Gamma paused</span>
                </div>
                <div className="text-xs text-gray-500 ml-4">15 minutes ago</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}