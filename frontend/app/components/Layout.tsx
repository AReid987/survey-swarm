'use client'

import { motion } from 'framer-motion'
import { APP_CONFIG } from '@/constants'
import { cn } from '@/utils'
import Link from 'next/link'
import { Activity, Cpu, Globe, FileText, BarChart3, Settings, Home, Bot } from 'lucide-react'

// Navigation component
const Navigation = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home, label: '📊' },
    { name: 'Agents', path: '/agents', icon: Bot, label: '🤖' },
    { name: 'Surveys', path: '/surveys', icon: FileText, label: '📝' },
    { name: 'Analytics', path: '/analytics', icon: BarChart3, label: '📈' },
    { name: 'Settings', path: '/settings', icon: Settings, label: '⚙️' },
  ]

  return (
    <nav className="glass-heavy border-b border-neon-blue/20 relative overflow-hidden">
      {/* Animated scan line effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent animate-cyber-scan h-0.5 top-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.h1
              className="text-xl font-bold gradient-text-neon mr-8 text-cyber"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {APP_CONFIG.NAME}
            </motion.h1>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.path}
                      className={cn(
                        'group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                        'text-gray-300 hover:text-white',
                        'hover:bg-glass-medium hover:border-neon-blue/30',
                        'border border-transparent hover:border-neon-blue/20',
                        'backdrop-blur-sm',
                        'flex items-center gap-2'
                      )}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <item.icon className="w-4 h-4 relative z-10 group-hover:text-neon-blue transition-colors duration-300" />
                      <span className="relative z-10 hidden lg:inline">{item.name}</span>
                      <span className="relative z-10 lg:hidden text-xs">{item.label}</span>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 rounded-lg neon-glow-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <motion.div
              className="flex items-center space-x-3 glass-heavy px-4 py-2 rounded-lg border border-neon-green/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-neon-green rounded-full animate-ping"></div>
              </div>
              <span className="text-sm font-medium text-neon-green">System Active</span>
            </motion.div>

            {/* System status indicators */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs">
                <Cpu className="w-4 h-4 text-neon-blue" />
                <span className="text-gray-400">CPU: 23%</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <Activity className="w-4 h-4 text-neon-purple" />
                <span className="text-gray-400">5 Agents</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Layout component
interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 particle-field">
      <Navigation />
      <main className="container mx-auto px-4 py-8 relative">
        {/* Background particle effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-neon-blue/20 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-neon-purple/20 rounded-full filter blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-neon-green/20 rounded-full filter blur-3xl animate-float"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full relative z-10"
        >
          {children}
        </motion.div>
      </main>

      {/* Cyber grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-30 cyber-grid"></div>
    </div>
  )
}