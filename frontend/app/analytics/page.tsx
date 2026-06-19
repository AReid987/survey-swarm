'use client'

import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { BarChart3, TrendingUp, DollarSign, Users, Activity, Download, Calendar, Filter } from 'lucide-react'

const Analytics = () => {
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
          <h1 className="text-4xl font-bold gradient-text-sunset text-cyber mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400">
            Comprehensive performance metrics and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="default" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
                <DollarSign className="w-6 h-6 text-neon-blue" />
              </div>
              <span className="text-xs text-neon-green font-medium">+12.5%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">$1,247.50</div>
            <div className="text-sm text-gray-400">Total Earnings</div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-neon-purple/10 border border-neon-purple/20">
                <Users className="w-6 h-6 text-neon-purple" />
              </div>
              <span className="text-xs text-neon-green font-medium">+8.3%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">1,842</div>
            <div className="text-sm text-gray-400">Total Surveys</div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-neon-green/10 border border-neon-green/20">
                <TrendingUp className="w-6 h-6 text-neon-green" />
              </div>
              <span className="text-xs text-neon-green font-medium">+5.7%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">94.2%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-neon-pink/10 border border-neon-pink/20">
                <Activity className="w-6 h-6 text-neon-pink" />
              </div>
              <span className="text-xs text-red-400 font-medium">-2.1%</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">8.3 min</div>
            <div className="text-sm text-gray-400">Avg. Completion Time</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="cyber-card h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-neon-blue" />
                Earnings Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Chart visualization will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="cyber-card h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-neon-purple" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Trend analysis will be implemented here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="text-white">Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Activity className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Detailed analytics dashboard</p>
                <p className="text-sm mt-2">Platform-specific metrics and comparative analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <Layout>
      <Analytics />
    </Layout>
  )
}