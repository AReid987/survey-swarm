import React, { useState } from 'react';
import { Menu, X, Activity, Users, Monitor, Settings, BarChart3, Home } from 'lucide-react';
import { DashboardLayoutProps } from '@/types';
import '../styles/globals.css';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarCollapsed = false,
  onSidebarToggle,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(sidebarCollapsed);

  const handleSidebarToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onSidebarToggle?.();
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home, href: '/' },
    { id: 'agents', label: 'Agents', icon: Users, href: '/agents' },
    { id: 'browser', label: 'Browser Sessions', icon: Monitor, href: '/browser' },
    { id: 'metrics', label: 'Metrics', icon: BarChart3, href: '/metrics' },
    { id: 'activity', label: 'Activity', icon: Activity, href: '/activity' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-dark-primary">
      {/* Sidebar */}
      <aside
        className={`
          sidebar transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-16' : 'w-64'}
          fixed md:relative h-full z-40
          ${isCollapsed ? 'sidebar-mobile-closed' : ''}
          md:transform-none
        `}
      >
        {/* Sidebar Header */}
        <div className="header p-4 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neon-blue rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-dark-primary" />
              </div>
              <h1 className="text-xl font-bold text-neon-blue">Survey Swarm</h1>
            </div>
          )}

          <button
            onClick={handleSidebarToggle}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle sidebar"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`
                sidebar-item group
                ${isCollapsed ? 'justify-center px-2' : ''}
              `}
            >
              <item.icon className={`
                w-5 h-5 flex-shrink-0
                ${isCollapsed ? '' : 'text-gray-400 group-hover:text-neon-blue'}
              `} />
              {!isCollapsed && (
                <span className="truncate">{item.label}</span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="
                  absolute left-full ml-2 px-2 py-1 bg-dark-tertiary border border-gray-700 rounded
                  text-sm text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  transition-all duration-200 pointer-events-none z-50 whitespace-nowrap
                ">
                  {item.label}
                </div>
              )}
            </a>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {!isCollapsed && (
            <div className="glass-morphism rounded-lg p-3 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">System Status</span>
              </div>
              <div className="text-xs text-gray-500">
                All systems operational
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={handleSidebarToggle}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="header px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleSidebarToggle}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-white">Dashboard</h2>
              <div className="flex items-center gap-2 px-2 py-1 bg-neon-green/10 border border-neon-green/30 rounded-full">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-xs text-neon-green">Live</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Stats */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="text-center">
                <div className="text-lg font-bold text-neon-blue">12</div>
                <div className="text-xs text-gray-400">Active</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-neon-green">$247.50</div>
                <div className="text-xs text-gray-400">Today</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-neon-yellow">98.5%</div>
                <div className="text-xs text-gray-400">Success</div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <button className="btn-secondary text-sm">
                Export
              </button>
              <button className="btn-primary text-sm">
                New Agent
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;