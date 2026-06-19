'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
import { Badge } from '../../../components/ui/badge'
import { Input } from '../../../components/ui/input'
import { Switch } from '../../../components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import {
  Settings,
  Bot,
  Globe,
  Shield,
  Bell,
  Database,
  Key,
  Monitor,
  Smartphone,
  Moon,
  Sun,
  Zap,
  Save,
  RotateCcw
} from 'lucide-react'

const SettingsComponent = () => {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [autoStart, setAutoStart] = useState(false)
  const [logLevel, setLogLevel] = useState('info')

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
          <h1 className="text-4xl font-bold text-cyber mb-2" style={{
            backgroundImage: 'linear-gradient(135deg, #ff6b35, #ff1744)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            System Settings
          </h1>
          <p className="text-gray-400">
            Configure your Survey Swarm environment
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Defaults
          </Button>
          <Button variant="default" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="glass-heavy border border-neon-blue/20 w-full justify-start">
            <TabsTrigger value="general" className="data-[state=active]:text-neon-blue">
              <Settings className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:text-neon-green">
              <Bot className="w-4 h-4 mr-2" />
              Agents
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:text-neon-purple">
              <Globe className="w-4 h-4 mr-2" />
              Platforms
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:text-neon-pink">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:text-neon-yellow">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <Monitor className="w-5 h-5 text-neon-blue" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Dark Mode</div>
                      <div className="text-sm text-gray-400">Use dark theme across the application</div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Compact View</div>
                      <div className="text-sm text-gray-400">Reduce spacing and padding</div>
                    </div>
                    <Switch />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white font-medium">Language</label>
                    <Select defaultValue="en">
                      <SelectTrigger className="cyber-card bg-transparent border-neon-blue/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="cyber-card border-neon-blue/20">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="cyber-card">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <Database className="w-5 h-5 text-neon-purple" />
                    Data & Storage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Auto-Cleanup</div>
                      <div className="text-sm text-gray-400">Remove old data automatically</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Local Backup</div>
                      <div className="text-sm text-gray-400">Create local data backups</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white font-medium">Log Level</label>
                    <Select value={logLevel} onValueChange={setLogLevel}>
                      <SelectTrigger className="cyber-card bg-transparent border-neon-blue/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="cyber-card border-neon-blue/20">
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6 mt-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Bot className="w-5 h-5 text-neon-green" />
                  Agent Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Auto-Start Agents</div>
                        <div className="text-sm text-gray-400">Start agents on system boot</div>
                      </div>
                      <Switch checked={autoStart} onCheckedChange={setAutoStart} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Smart Scheduling</div>
                        <div className="text-sm text-gray-400">Optimize agent timing automatically</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium">Error Recovery</div>
                        <div className="text-sm text-gray-400">Auto-retry failed surveys</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-white font-medium">Max Concurrent Agents</label>
                      <Input type="number" defaultValue="5" className="cyber-card bg-transparent border-neon-blue/20 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium">Default Timeout (minutes)</label>
                      <Input type="number" defaultValue="30" className="cyber-card bg-transparent border-neon-blue/20 text-white" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-white font-medium">Retry Attempts</label>
                      <Input type="number" defaultValue="3" className="cyber-card bg-transparent border-neon-blue/20 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6 mt-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Globe className="w-5 h-5 text-neon-purple" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Platform Configuration</h3>
                  <p>Manage survey platform integrations and credentials</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 mt-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Shield className="w-5 h-5 text-neon-pink" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <Shield className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Security Configuration</h3>
                  <p>Manage authentication, encryption, and access controls</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <Bell className="w-5 h-5 text-neon-yellow" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Enable Notifications</div>
                    <div className="text-sm text-gray-400">Receive system notifications</div>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Email Alerts</div>
                    <div className="text-sm text-gray-400">Send critical alerts via email</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Sound Effects</div>
                    <div className="text-sm text-gray-400">Play sounds for important events</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Layout>
      <SettingsComponent />
    </Layout>
  )
}