import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Clock, Users, Zap, AlertCircle, CheckCircle } from 'lucide-react';
import { MetricsDisplayProps } from '@/types';
import { Card } from './Container';
import '../styles/globals.css';

const MetricsDisplay: React.FC<MetricsDisplayProps> = ({
  metrics,
  type,
  variant = 'detailed',
  timeRange = '24h',
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getTrendIcon = (current: number, previous?: number) => {
    if (!previous) return null;
    const change = ((current - previous) / previous) * 100;

    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-neon-green" />;
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-400" />;
    }
    return null;
  };

  const getTrendColor = (current: number, previous?: number) => {
    if (!previous) return 'text-gray-400';
    const change = ((current - previous) / previous) * 100;

    if (change > 0) return 'text-neon-green';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  if (type === 'system') {
    const systemMetrics = metrics as any;

    if (variant === 'compact') {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            icon={Users}
            label="Active Agents"
            value={systemMetrics.activeAgents}
            color="neon-blue"
          />
          <MetricCard
            icon={DollarSign}
            label="Total Earnings"
            value={formatCurrency(systemMetrics.totalEarnings)}
            color="neon-green"
          />
          <MetricCard
            icon={CheckCircle}
            label="Surveys Today"
            value={systemMetrics.surveysCompletedToday}
            color="neon-yellow"
          />
          <MetricCard
            icon={Activity}
            label="Success Rate"
            value={formatPercentage(systemMetrics.averageResponseTime)}
            color="neon-purple"
          />
        </div>
      );
    }

    if (variant === 'chart') {
      return (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">System Metrics</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">System Load</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-neon-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${systemMetrics.systemLoad}%` }}
                  />
                </div>
                <span className="text-sm text-neon-blue min-w-12">
                  {systemMetrics.systemLoad.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Memory Usage</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-neon-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${systemMetrics.memoryUsage}%` }}
                  />
                </div>
                <span className="text-sm text-neon-green min-w-12">
                  {systemMetrics.memoryUsage.toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">CPU Usage</span>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-neon-yellow h-2 rounded-full transition-all duration-300"
                    style={{ width: `${systemMetrics.cpuUsage}%` }}
                  />
                </div>
                <span className="text-sm text-neon-yellow min-w-12">
                  {systemMetrics.cpuUsage.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-6 h-6 text-neon-blue" />
            <span className="text-xs text-gray-500">{timeRange}</span>
          </div>
          <div className="metric-value">{systemMetrics.totalAgents}</div>
          <div className="metric-label">Total Agents</div>
          <div className="mt-2 text-sm text-gray-400">
            {systemMetrics.activeAgents} active
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6 text-neon-green" />
            <span className="text-xs text-gray-500">{timeRange}</span>
          </div>
          <div className="metric-value">{formatCurrency(systemMetrics.totalEarnings)}</div>
          <div className="metric-label">Total Earnings</div>
          <div className="mt-2 text-sm text-gray-400">
            Today: {formatCurrency(systemMetrics.totalEarnings * 0.3)}
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-6 h-6 text-neon-yellow" />
            <span className="text-xs text-gray-500">{timeRange}</span>
          </div>
          <div className="metric-value">{systemMetrics.surveysCompletedToday}</div>
          <div className="metric-label">Surveys Completed</div>
          <div className="mt-2 text-sm text-gray-400">
            Success: {formatPercentage(systemMetrics.averageResponseTime)}
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-6 h-6 text-neon-purple" />
            <span className="text-xs text-gray-500">Current</span>
          </div>
          <div className="metric-value">{systemMetrics.systemLoad.toFixed(0)}%</div>
          <div className="metric-label">System Load</div>
          <div className="mt-2 text-sm text-gray-400">
            CPU: {systemMetrics.cpuUsage.toFixed(0)}% • RAM: {systemMetrics.memoryUsage.toFixed(0)}%
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-6 h-6 text-neon-blue" />
            <span className="text-xs text-gray-500">Average</span>
          </div>
          <div className="metric-value">{systemMetrics.averageResponseTime.toFixed(0)}ms</div>
          <div className="metric-label">Response Time</div>
          <div className="mt-2 text-sm text-gray-400">
            Last 5 min: Excellent
          </div>
        </Card>

        <Card className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <span className="text-xs text-gray-500">24h</span>
          </div>
          <div className="metric-value text-red-400">2</div>
          <div className="metric-label">Errors</div>
          <div className="mt-2 text-sm text-gray-400">
            All resolved
          </div>
        </Card>
      </div>
    );
  }

  // Agent-specific metrics
  const agentMetrics = metrics as any;

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-neon-green" />
          <span className="text-white">{formatCurrency(agentMetrics.totalEarnings)}</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-neon-blue" />
          <span className="text-white">{agentMetrics.surveysCompleted}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-neon-yellow" />
          <span className="text-white">{formatDuration(agentMetrics.averageCompletionTime)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-neon-purple" />
          <span className="text-white">{formatPercentage(agentMetrics.successRate)}</span>
        </div>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-dark-tertiary/50 rounded-lg border border-gray-700">
          <DollarSign className="w-8 h-8 text-neon-green mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-green mb-1">
            {formatCurrency(agentMetrics.totalEarnings)}
          </div>
          <div className="text-sm text-gray-400">Total Earnings</div>
          {agentMetrics.lastEarning && (
            <div className="text-xs text-gray-500 mt-1">
              Last: {formatCurrency(agentMetrics.lastEarning)}
            </div>
          )}
        </div>

        <div className="text-center p-4 bg-dark-tertiary/50 rounded-lg border border-gray-700">
          <CheckCircle className="w-8 h-8 text-neon-blue mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-blue mb-1">
            {agentMetrics.surveysCompleted}
          </div>
          <div className="text-sm text-gray-400">Surveys Completed</div>
        </div>

        <div className="text-center p-4 bg-dark-tertiary/50 rounded-lg border border-gray-700">
          <Clock className="w-8 h-8 text-neon-yellow mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-yellow mb-1">
            {formatDuration(agentMetrics.averageCompletionTime)}
          </div>
          <div className="text-sm text-gray-400">Average Time</div>
        </div>

        <div className="text-center p-4 bg-dark-tertiary/50 rounded-lg border border-gray-700">
          <Activity className="w-8 h-8 text-neon-purple mx-auto mb-2" />
          <div className="text-2xl font-bold text-neon-purple mb-1">
            {formatPercentage(agentMetrics.successRate)}
          </div>
          <div className="text-sm text-gray-400">Success Rate</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Active Time:</span>
            <span className="text-white">{formatDuration(agentMetrics.activeTime)}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Errors:</span>
            <span className={`${
              agentMetrics.errorCount > 0 ? 'text-red-400' : 'text-neon-green'
            }`}>
              {agentMetrics.errorCount}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Helper component for individual metric cards
const MetricCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  trend?: number;
}> = ({ icon: Icon, label, value, color, trend }) => {
  const colorClasses: Record<string, string> = {
    'neon-blue': 'text-neon-blue',
    'neon-green': 'text-neon-green',
    'neon-yellow': 'text-neon-yellow',
    'neon-purple': 'text-neon-purple',
    'neon-pink': 'text-neon-pink',
  };

  return (
    <Card className="metric-card p-4">
      <Icon className={`w-6 h-6 ${colorClasses[color]} mb-2`} />
      <div className={`text-xl font-bold ${colorClasses[color]} mb-1`}>
        {value}
      </div>
      <div className="text-xs text-gray-400 uppercase tracking-wider">
        {label}
      </div>
      {trend !== undefined && (
        <div className="mt-2 text-xs">
          {trend > 0 ? (
            <span className="text-neon-green">+{trend}%</span>
          ) : trend < 0 ? (
            <span className="text-red-400">{trend}%</span>
          ) : (
            <span className="text-gray-400">0%</span>
          )}
        </div>
      )}
    </Card>
  );
};

export default MetricsDisplay;