'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import {
  FileText,
  Plus,
  Search,
  Filter,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  BarChart3,
  Target,
  Zap
} from 'lucide-react'

// Mock survey data
const mockSurveys = [
  {
    id: 'survey-001',
    title: 'Consumer Technology Preferences',
    platform: 'Survey Junkie',
    status: 'active' as const,
    reward: 3.50,
    estimatedTime: 12,
    completionRate: 87,
    participants: 245,
    questions: 25,
    category: 'Technology',
    difficulty: 'Medium',
    description: 'Share your thoughts on the latest consumer technology trends and preferences.'
  },
  {
    id: 'survey-002',
    title: 'Lifestyle and Wellness Survey',
    platform: 'Swagbucks',
    status: 'completed' as const,
    reward: 2.25,
    estimatedTime: 8,
    completionRate: 92,
    participants: 189,
    questions: 18,
    category: 'Health',
    difficulty: 'Easy',
    description: 'Help us understand modern lifestyle choices and wellness habits.'
  },
  {
    id: 'survey-003',
    title: 'Financial Habits Research',
    platform: 'Amazon Mechanical Turk',
    status: 'pending' as const,
    reward: 5.75,
    estimatedTime: 20,
    completionRate: 78,
    participants: 156,
    questions: 35,
    category: 'Finance',
    difficulty: 'Hard',
    description: 'Comprehensive study on personal financial management and investment preferences.'
  },
  {
    id: 'survey-004',
    title: 'Media Consumption Patterns',
    platform: 'Pinecone Research',
    status: 'active' as const,
    reward: 4.20,
    estimatedTime: 15,
    completionRate: 83,
    participants: 201,
    questions: 28,
    category: 'Entertainment',
    difficulty: 'Medium',
    description: 'Study on how people consume media content across different platforms.'
  },
  {
    id: 'survey-005',
    title: 'Shopping Behavior Analysis',
    platform: 'Survey Junkie',
    status: 'failed' as const,
    reward: 2.80,
    estimatedTime: 10,
    completionRate: 45,
    participants: 89,
    questions: 20,
    category: 'Retail',
    difficulty: 'Easy',
    description: 'Understanding modern shopping preferences and decision-making processes.'
  }
]

const Surveys = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('available')

  const filteredSurveys = mockSurveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || survey.status === statusFilter
    const matchesPlatform = platformFilter === 'all' || survey.platform === platformFilter
    return matchesSearch && matchesStatus && matchesPlatform
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4 text-neon-green" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-neon-blue" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-neon-green/30 text-neon-green bg-neon-green/10'
      case 'completed':
        return 'border-neon-blue/30 text-neon-blue bg-neon-blue/10'
      case 'failed':
        return 'border-red-500/30 text-red-400 bg-red-500/10'
      default:
        return 'border-gray-600/30 text-gray-400 bg-gray-600/10'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'border-neon-green/30 text-neon-green'
      case 'Medium':
        return 'border-neon-yellow/30 text-neon-yellow'
      case 'Hard':
        return 'border-red-400/30 text-red-400'
      default:
        return 'border-gray-600/30 text-gray-400'
    }
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
          <h1 className="text-4xl font-bold gradient-text-matrix text-cyber mb-2">
            Survey Management
          </h1>
          <p className="text-gray-400">
            Monitor and manage automated survey completion tasks
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Target className="w-4 h-4 mr-2" />
            Target Settings
          </Button>
          <Button variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Survey
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Active Surveys</p>
                <p className="text-2xl font-bold text-neon-green">2</p>
              </div>
              <Play className="w-8 h-8 text-neon-green opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Total Rewards</p>
                <p className="text-2xl font-bold text-neon-blue">$18.50</p>
              </div>
              <DollarSign className="w-8 h-8 text-neon-blue opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Completion Rate</p>
                <p className="text-2xl font-bold text-neon-purple">81%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-neon-purple opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="cyber-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Participants</p>
                <p className="text-2xl font-bold text-neon-pink">880</p>
              </div>
              <BarChart3 className="w-8 h-8 text-neon-pink opacity-20" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glass-heavy border border-neon-blue/20 w-full justify-start">
            <TabsTrigger value="available" className="data-[state=active]:text-neon-blue">
              Available Surveys
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:text-neon-green">
              In Progress
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:text-neon-purple">
              Completed
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:text-neon-pink">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4 mt-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search surveys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 cyber-card bg-transparent border-neon-blue/20"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="cyber-card bg-transparent border-neon-blue/20 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="cyber-card border-neon-blue/20">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="cyber-card bg-transparent border-neon-blue/20 text-white">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent className="cyber-card border-neon-blue/20">
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Survey Junkie">Survey Junkie</SelectItem>
                  <SelectItem value="Swagbucks">Swagbucks</SelectItem>
                  <SelectItem value="Amazon Mechanical Turk">Amazon Mechanical Turk</SelectItem>
                  <SelectItem value="Pinecone Research">Pinecone Research</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Surveys Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSurveys.map((survey, index) => (
                <motion.div
                  key={survey.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="cyber-card hover:border-neon-blue/40 transition-all duration-300 cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-white mb-2 line-clamp-2">
                            {survey.title}
                          </CardTitle>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                            {survey.description}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className="border-neon-blue/30 text-neon-blue bg-neon-blue/10">
                              {survey.platform}
                            </Badge>
                            <Badge className={getStatusColor(survey.status)}>
                              {getStatusIcon(survey.status)}
                              <span className="ml-1">{survey.status}</span>
                            </Badge>
                            <Badge className={getDifficultyColor(survey.difficulty)}>
                              {survey.difficulty}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-neon-green">${survey.reward}</div>
                          <div className="text-xs text-gray-500">{survey.estimatedTime} min</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400 block">Questions</span>
                          <span className="text-white font-medium">{survey.questions}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Completion</span>
                          <span className="text-neon-blue font-medium">{survey.completionRate}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Participants</span>
                          <span className="text-white font-medium">{survey.participants}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="default" className="flex-1">
                          <Zap className="w-4 h-4 mr-2" />
                          Start Survey
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <Card className="cyber-card">
              <CardContent className="p-8 text-center">
                <div className="text-gray-400">
                  <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Active Survey Progress</h3>
                  <p>Real-time monitoring of ongoing survey completions</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <Card className="cyber-card">
              <CardContent className="p-8 text-center">
                <div className="text-gray-400">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Completed Surveys</h3>
                  <p>History and analysis of completed survey tasks</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card className="cyber-card">
              <CardContent className="p-8 text-center">
                <div className="text-gray-400">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Survey Analytics</h3>
                  <p>Performance metrics and earnings analysis</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

export default function SurveysPage() {
  return (
    <Layout>
      <Surveys />
    </Layout>
  )
}