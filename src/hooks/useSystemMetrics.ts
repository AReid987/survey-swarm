import { useState, useEffect, useCallback } from 'react';
import { SystemMetrics, PerformanceMetrics } from '@/types';

// Mock system metrics data - replace with actual API calls
const generateMockMetrics = (): SystemMetrics => ({
  totalAgents: Math.floor(Math.random() * 5) + 10,
  activeAgents: Math.floor(Math.random() * 8) + 3,
  totalEarnings: Math.random() * 500 + 1000,
  surveysCompletedToday: Math.floor(Math.random() * 50) + 100,
  averageResponseTime: Math.random() * 50 + 150,
  systemLoad: Math.random() * 30 + 20,
  memoryUsage: Math.random() * 40 + 30,
  cpuUsage: Math.random() * 50 + 25,
});

const generateMockPerformanceMetrics = (): PerformanceMetrics => ({
  throughput: Math.random() * 1000 + 500,
  latency: Math.random() * 100 + 50,
  errorRate: Math.random() * 5,
  uptime: 99.9,
  requestsPerSecond: Math.random() * 50 + 20,
});

export const useSystemMetrics = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>(generateMockMetrics());
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>(generateMockPerformanceMetrics());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const refreshMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setMetrics(generateMockMetrics());
      setPerformanceMetrics(generateMockPerformanceMetrics());
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to refresh metrics');
      console.error('Failed to refresh metrics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-refresh metrics every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshMetrics();
    }, 30000);

    // Initial load
    refreshMetrics();

    return () => clearInterval(interval);
  }, [refreshMetrics]);

  const getEarningsTrend = useCallback(() => {
    // Simulate trend calculation - in real app, this would compare with historical data
    const trend = Math.random() * 20 - 10; // -10% to +10%
    return {
      value: trend,
      period: '24h',
    };
  }, []);

  const getSystemHealth = useCallback(() => {
    const { systemLoad, memoryUsage, cpuUsage } = metrics;

    if (systemLoad > 80 || memoryUsage > 90 || cpuUsage > 90) {
      return 'critical';
    } else if (systemLoad > 60 || memoryUsage > 70 || cpuUsage > 70) {
      return 'warning';
    }
    return 'healthy';
  }, [metrics]);

  const getActiveAlerts = useCallback(() => {
    const alerts = [];
    const health = getSystemHealth();

    if (health === 'critical') {
      alerts.push({
        id: 'system-critical',
        type: 'error' as const,
        title: 'System Resources Critical',
        message: 'System load or resource usage is critically high',
        timestamp: new Date(),
        severity: 'high' as const,
      });
    } else if (health === 'warning') {
      alerts.push({
        id: 'system-warning',
        type: 'warning' as const,
        title: 'High Resource Usage',
        message: 'System resources are running high',
        timestamp: new Date(),
        severity: 'medium' as const,
      });
    }

    return alerts;
  }, [getSystemHealth]);

  return {
    metrics,
    performanceMetrics,
    loading,
    error,
    lastUpdated,
    refreshMetrics,
    getEarningsTrend,
    getSystemHealth,
    getActiveAlerts,
  };
};

export default useSystemMetrics;