import React from 'react';
import { Play, Pause, Square, RefreshCw, Eye, Monitor, DollarSign, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { AgentCardProps } from '@/types';
import StatusIndicator from './StatusIndicator';
import { Card } from './Container';
import '../styles/globals.css';

const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onSelect,
  onControl,
  compact = false,
}) => {
  const handleControl = (action: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onControl?.(agent.id, action as any);
  };

  const handleSelect = () => {
    onSelect?.(agent);
  };

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  const getControlButtons = () => {
    switch (agent.status) {
      case 'idle':
      case 'completed':
      case 'error':
        return (
          <button
            onClick={(e) => handleControl('start', e)}
            className="btn-primary text-xs px-2 py-1"
            title="Start Agent"
          >
            <Play className="w-3 h-3" />
          </button>
        );
      case 'connecting':
      case 'browsing':
      case 'surveying':
        return (
          <>
            <button
              onClick={(e) => handleControl('pause', e)}
              className="btn-secondary text-xs px-2 py-1"
              title="Pause Agent"
            >
              <Pause className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => handleControl('stop', e)}
              className="btn-danger text-xs px-2 py-1"
              title="Stop Agent"
            >
              <Square className="w-3 h-3" />
            </button>
          </>
        );
      case 'paused':
        return (
          <>
            <button
              onClick={(e) => handleControl('start', e)}
              className="btn-primary text-xs px-2 py-1"
              title="Resume Agent"
            >
              <Play className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => handleControl('stop', e)}
              className="btn-danger text-xs px-2 py-1"
              title="Stop Agent"
            >
              <Square className="w-3 h-3" />
            </button>
          </>
        );
      default:
        return (
          <button
            onClick={(e) => handleControl('restart', e)}
            className="btn-secondary text-xs px-2 py-1"
            title="Restart Agent"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        );
    }
  };

  const getCardVariant = () => {
    if (agent.status === 'error' || agent.status === 'offline') {
      return 'agent-card-error';
    }
    if (agent.status === 'browsing' || agent.status === 'surveying') {
      return 'agent-card-active';
    }
    return 'agent-card';
  };

  if (compact) {
    return (
      <div
        className={`
          ${getCardVariant()}
          p-4 cursor-pointer transition-all duration-300
        `}
        onClick={handleSelect}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusIndicator status={agent.status} size="sm" />
            <div>
              <h3 className="font-medium text-white truncate">{agent.name}</h3>
              <p className="text-xs text-gray-400">
                {formatCurrency(agent.metrics.totalEarnings)} • {agent.metrics.surveysCompleted} surveys
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {agent.browserSession && (
              <button
                onClick={(e) => handleControl('view_browser', e)}
                className="text-gray-400 hover:text-neon-blue transition-colors"
                title="View Browser"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
            {getControlButtons()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card
      className={`
        ${getCardVariant()}
        cursor-pointer
        ${agent.status === 'browsing' || agent.status === 'surveying' ? 'animate-glow' : ''}
      `}
      onClick={handleSelect}
      padding="md"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <StatusIndicator status={agent.status} size="md" showLabel />
          <div>
            <h3 className="font-semibold text-white text-lg">{agent.name}</h3>
            <p className="text-xs text-gray-400">ID: {agent.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {agent.browserSession && (
            <button
              onClick={(e) => handleControl('view_browser', e)}
              className="btn-secondary text-xs"
              title="View Browser Session"
            >
              <Monitor className="w-3 h-3 mr-1" />
              View
            </button>
          )}
          {getControlButtons()}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-dark-tertiary/50 rounded-lg border border-gray-700">
          <div className="flex items-center justify-center gap-2 text-neon-green mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-lg font-bold">
              {formatCurrency(agent.metrics.totalEarnings)}
            </span>
          </div>
          <div className="text-xs text-gray-400">Total Earnings</div>
        </div>

        <div className="text-center p-3 bg-dark-tertiary/50 rounded-lg border border-gray-700">
          <div className="flex items-center justify-center gap-2 text-neon-blue mb-1">
            <CheckCircle className="w-4 h-4" />
            <span className="text-lg font-bold">{agent.metrics.surveysCompleted}</span>
          </div>
          <div className="text-xs text-gray-400">Completed</div>
        </div>

        <div className="text-center p-3 bg-dark-tertiary/50 rounded-lg border border-gray-700">
          <div className="flex items-center justify-center gap-2 text-neon-yellow mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-lg font-bold">
              {formatDuration(agent.metrics.averageCompletionTime)}
            </span>
          </div>
          <div className="text-xs text-gray-400">Avg Time</div>
        </div>

        <div className="text-center p-3 bg-dark-tertiary/50 rounded-lg border border-gray-700">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className={`
              text-lg font-bold
              ${agent.metrics.successRate >= 95 ? 'text-neon-green' :
                agent.metrics.successRate >= 80 ? 'text-neon-yellow' :
                'text-red-400'}
            `}>
              {agent.metrics.successRate.toFixed(1)}%
            </div>
          </div>
          <div className="text-xs text-gray-400">Success Rate</div>
        </div>
      </div>

      {/* Browser Session Info */}
      {agent.browserSession && (
        <div className="mb-4 p-3 bg-dark-tertiary/30 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Current Session</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                agent.browserSession.isStreaming ? 'bg-neon-green animate-pulse' : 'bg-gray-500'
              }`} />
              <span className="text-xs text-gray-400">
                {agent.browserSession.isStreaming ? 'Streaming' : 'Idle'}
              </span>
            </div>
          </div>
          <div className="text-sm text-white truncate mb-1">
            {agent.browserSession.title || 'No title'}
          </div>
          <div className="text-xs text-gray-400 truncate">
            {agent.browserSession.url}
          </div>
          {agent.browserSession.surveyProgress && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400">Progress</span>
                <span className="text-neon-blue">
                  {agent.browserSession.surveyProgress.completionPercentage.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-neon-blue h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${agent.browserSession.surveyProgress.completionPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer with Status and Timestamp */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">
            Last active: {formatDate(agent.lastActivity)}
          </span>
          {agent.metrics.errorCount > 0 && (
            <div className="flex items-center gap-1 text-red-400">
              <AlertTriangle className="w-3 h-3" />
              <span className="text-xs">{agent.metrics.errorCount} errors</span>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500">
          Created: {formatDate(agent.createdAt)}
        </div>
      </div>
    </Card>
  );
};

export default AgentCard;