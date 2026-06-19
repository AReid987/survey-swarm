import React from 'react';
import { StatusIndicatorProps } from '@/types';
import '../styles/globals.css';

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  animated = true,
  showLabel = false,
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'idle':
        return {
          container: 'status-idle',
          dot: 'bg-gray-500',
          label: 'Idle',
          animation: animated ? 'animate-pulse' : '',
        };
      case 'connecting':
      case 'browsing':
      case 'surveying':
      case 'online':
      case 'active':
        return {
          container: 'status-active',
          dot: 'bg-neon-green neon-glow-green',
          label: status === 'online' ? 'Online' :
                status === 'active' ? 'Active' :
                status === 'browsing' ? 'Browsing' :
                status === 'surveying' ? 'Surveying' : 'Connecting',
          animation: animated ? 'animate-pulse' : '',
        };
      case 'completed':
        return {
          container: 'status-active',
          dot: 'bg-neon-blue neon-glow-blue',
          label: 'Completed',
          animation: '',
        };
      case 'error':
      case 'offline':
        return {
          container: 'status-error',
          dot: 'bg-red-500 neon-glow-red',
          label: status === 'offline' ? 'Offline' : 'Error',
          animation: animated ? 'animate-pulse' : '',
        };
      case 'warning':
      case 'paused':
        return {
          container: 'status-warning',
          dot: 'bg-yellow-500 neon-glow-yellow',
          label: status === 'paused' ? 'Paused' : 'Warning',
          animation: animated ? 'animate-pulse' : '',
        };
      default:
        return {
          container: 'status-idle',
          dot: 'bg-gray-500',
          label: 'Unknown',
          animation: '',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          dot: 'w-2 h-2',
          text: 'text-xs',
          gap: 'gap-1',
          padding: 'px-2 py-1',
        };
      case 'lg':
        return {
          dot: 'w-4 h-4',
          text: 'text-base',
          gap: 'gap-3',
          padding: 'px-4 py-2',
        };
      case 'md':
      default:
        return {
          dot: 'w-3 h-3',
          text: 'text-sm',
          gap: 'gap-2',
          padding: 'px-3 py-1',
        };
    }
  };

  const statusStyles = getStatusStyles();
  const sizeStyles = getSizeStyles();

  return (
    <div className={`
      status-indicator
      ${statusStyles.container}
      ${sizeStyles.padding}
      ${sizeStyles.gap}
    `}>
      <div className={`
        ${sizeStyles.dot}
        ${statusStyles.dot}
        ${statusStyles.animation}
        rounded-full
      `} />

      {showLabel && (
        <span className={sizeStyles.text}>
          {statusStyles.label}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;