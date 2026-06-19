'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { AgentCard } from '../../../components/ui/agent-card'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Bot, Plus, Search, Filter, Download, RefreshCw, Settings } from 'lucide-react'

// Enhanced mock agent data
const mockAgents = [
  {
    id: 'agent-001',
    name: 'SurveyBot Alpha',
    status: 'active' as const,
    currentTask: 'Processing demographic survey on Survey Junkie',
    platform: 'Survey Junkie',
    progress: 67,
    earnings: 145.75,
    surveysCompleted: 42,
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
    currentTask: 'Searching for high-value surveys on Swagbucks',
    platform: 'Swagbucks',
    progress: 23,
    earnings: 98.30,
    surveysCompleted: 31,
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
    currentTask: 'Paused - waiting for email verification',
    platform: 'Amazon Mechanical Turk',
    progress: 89,
    earnings: 234.20,
    surveysCompleted: 58,
    lastActivity: '15 min ago',
    metrics: {
      cpuUsage: 5.2,
      memoryUsage: 22.4,
      successRate: 94.1
    }
  },
  {
    id: 'agent-004',
    name: 'SurveyBot Delta',
    status: 'idle' as const,
    currentTask: 'Ready for new assignments',
    platform: 'Pinecone Research',
    progress: 0,
    earnings: 67.50,
    surveysCompleted: 19,
    lastActivity: '1 hour ago',
    metrics: {
      cpuUsage: 2.1,
      memoryUsage: 15.8,
      successRate: 89.7
    }
  },
  {
    id: 'agent-005',
    name: 'DataCollector Epsilon',
    status: 'error' as const,
    currentTask: 'Connection timeout - retry in 5 min',
    platform: 'Survey Junkie',
    progress: 45,
    earnings: 23.10,
    surveysCompleted: 7,
    lastActivity: '30 min ago',
    metrics: {
      cpuUsage: 18.7,
      memoryUsage: 42.3,
      successRate: 78.2
    }
  }
]

// Enhanced Agents component
const Agents = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')

  const handleAgentControl = (agentId: string, action: string) => {
    console.log(`Agent ${agentId} - Action: ${action}`)
    // Handle agent control logic here
  }

  const handleAgentSelect = (agent: any) => {
    console.log('Selected agent:', agent)
    // Handle agent selection logic here
  }

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.platform.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter
    const matchesPlatform = platformFilter === 'all' || agent.platform === platformFilter
    return matchesSearch && matchesStatus && matchesPlatform
  })

  const statusCounts = {
    all: mockAgents.length,
    active: mockAgents.filter(a => a.status === 'active').length,
    idle: mockAgents.filter(a => a.status === 'idle').length,
    paused: mockAgents.filter(a => a.status === 'paused').length,
    error: mockAgents.filter(a => a.status === 'error').length,
    browsing: mockAgents.filter(a => a.status === 'browsing').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold gradient-text-neon text-cyber mb-2">
            Agent Control Center
          </h1>
          <p className="text-gray-400">
            Monitor and control your automated survey completion agents
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Deploy Agent
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {Object.entries({
          'All': statusCounts.all,
          'Active': statusCounts.active,
          'Browsing': statusCounts.browsing,
          'Idle': statusCounts.idle,
          'Paused': statusCounts.paused,
          'Error': statusCounts.error
        }).map(([status, count], index) => (
          <motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="cyber-card cursor-pointer" onClick={() => setStatusFilter(status.toLowerCase())}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{count}</div>
                <div className="text-xs text-gray-400">{status}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 cyber-card bg-transparent border-neon-blue/20 focus:border-neon-blue/40 text-white placeholder-gray-400"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="cyber-card bg-transparent border-neon-blue/20 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="cyber-card border-neon-blue/20">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="browsing">Browsing</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        <Select value={platformFilter} onValueChange={setPlatformFilter}>
          <SelectTrigger className="cyber-card bg-transparent border-neon-blue/20 text-white">
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent className="cyber-card border-neon-blue/20">
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="Survey Junkie">Survey Junkie</SelectItem>
            <SelectItem value="Swagbucks">Swagbucks</SelectItem>
            <SelectItem value="Amazon Mechanical Turk">Amazon Mechanical Turk</SelectItem>
            <SelectItem value="Pinecone Research">Pinecone Research</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </motion.div>

      {/* Agents Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {filteredAgents.map((agent, index) => (
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
              className="cyber-card"
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredAgents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Bot className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No agents found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  )
}

export default function AgentsPage() {
  return (
    <Layout>
      <Agents />
    </Layout>
  )
}