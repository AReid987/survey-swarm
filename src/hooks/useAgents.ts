import { useState, useEffect, useCallback } from 'react';
import { Agent, AgentStatus, UseAgentsReturn, CreateAgentConfig, AgentControlAction } from '@/types';

// Mock data for development - replace with actual API calls
const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Survey Bot Alpha',
    status: 'browsing',
    browserSession: {
      id: 'session-001',
      url: 'https://surveyjunkie.com/surveys/12345',
      title: 'Consumer Behavior Survey - Page 3',
      isStreaming: true,
      lastUpdated: new Date(),
      platform: 'surveyjunkie',
      surveyProgress: {
        currentStep: 3,
        totalSteps: 10,
        estimatedTimeRemaining: 420,
        completionPercentage: 30,
      },
    },
    metrics: {
      surveysCompleted: 47,
      totalEarnings: 23.50,
      averageCompletionTime: 8.5,
      successRate: 96.2,
      activeTime: 245,
      errorCount: 2,
      lastEarning: 0.75,
    },
    lastActivity: new Date(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
  },
  {
    id: 'agent-002',
    name: 'Swagbucks Hunter',
    status: 'surveying',
    browserSession: {
      id: 'session-002',
      url: 'https://swagbucks.com/poll/67890',
      title: 'Daily Poll - Quick Opinion',
      isStreaming: true,
      lastUpdated: new Date(),
      platform: 'swagbucks',
      surveyProgress: {
        currentStep: 1,
        totalSteps: 3,
        estimatedTimeRemaining: 120,
        completionPercentage: 33,
      },
    },
    metrics: {
      surveysCompleted: 156,
      totalEarnings: 87.25,
      averageCompletionTime: 6.2,
      successRate: 94.8,
      activeTime: 512,
      errorCount: 5,
      lastEarning: 0.50,
    },
    lastActivity: new Date(),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
  },
  {
    id: 'agent-003',
    name: 'Toluna Explorer',
    status: 'idle',
    metrics: {
      surveysCompleted: 23,
      totalEarnings: 11.75,
      averageCompletionTime: 12.3,
      successRate: 89.1,
      activeTime: 156,
      errorCount: 3,
    },
    lastActivity: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: 'agent-004',
    name: 'InboxDollars Pro',
    status: 'error',
    browserSession: {
      id: 'session-004',
      url: 'https://inboxdollars.com/surveys/error',
      title: 'Connection Failed',
      isStreaming: false,
      lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
      platform: 'inboxdollars',
    },
    metrics: {
      surveysCompleted: 89,
      totalEarnings: 45.60,
      averageCompletionTime: 7.8,
      successRate: 91.5,
      activeTime: 387,
      errorCount: 8,
    },
    lastActivity: new Date(Date.now() - 5 * 60 * 1000),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  },
];

export const useAgents = (): UseAgentsReturn => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with mock data
  useEffect(() => {
    const initializeAgents = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAgents(mockAgents);
      } catch (err) {
        setError('Failed to load agents');
        console.error('Failed to initialize agents:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeAgents();
  }, []);

  const createAgent = useCallback(async (config: CreateAgentConfig): Promise<Agent> => {
    try {
      const newAgent: Agent = {
        id: `agent-${Date.now()}`,
        name: config.name,
        status: 'idle',
        metrics: {
          surveysCompleted: 0,
          totalEarnings: 0,
          averageCompletionTime: 0,
          successRate: 100,
          activeTime: 0,
          errorCount: 0,
        },
        lastActivity: new Date(),
        createdAt: new Date(),
      };

      setAgents(prev => [...prev, newAgent]);
      return newAgent;
    } catch (err) {
      setError('Failed to create agent');
      throw err;
    }
  }, []);

  const updateAgent = useCallback(async (id: string, updates: Partial<Agent>): Promise<void> => {
    try {
      setAgents(prev => prev.map(agent =>
        agent.id === id ? { ...agent, ...updates } : agent
      ));
    } catch (err) {
      setError('Failed to update agent');
      throw err;
    }
  }, []);

  const deleteAgent = useCallback(async (id: string): Promise<void> => {
    try {
      setAgents(prev => prev.filter(agent => agent.id !== id));
    } catch (err) {
      setError('Failed to delete agent');
      throw err;
    }
  }, []);

  const controlAgent = useCallback(async (id: string, action: AgentControlAction): Promise<void> => {
    try {
      setAgents(prev => prev.map(agent => {
        if (agent.id !== id) return agent;

        switch (action) {
          case 'start':
            return { ...agent, status: 'connecting' as AgentStatus, lastActivity: new Date() };
          case 'pause':
            return { ...agent, status: 'paused' as AgentStatus, lastActivity: new Date() };
          case 'stop':
            return {
              ...agent,
              status: 'idle' as AgentStatus,
              browserSession: undefined,
              lastActivity: new Date()
            };
          case 'restart':
            return {
              ...agent,
              status: 'connecting' as AgentStatus,
              lastActivity: new Date()
            };
          default:
            return agent;
        }
      }));

      // Simulate state changes for demo purposes
      setTimeout(() => {
        setAgents(prev => prev.map(agent => {
          if (agent.id !== id) return agent;

          const currentStatus = agent.status;
          if (currentStatus === 'connecting') {
            return { ...agent, status: 'browsing' as AgentStatus };
          }
          return agent;
        }));
      }, 2000);

    } catch (err) {
      setError('Failed to control agent');
      throw err;
    }
  }, []);

  // Utility function to get agents by status
  const getAgentsByStatus = useCallback((status: AgentStatus): Agent[] => {
    return agents.filter(agent => agent.status === status);
  }, [agents]);

  // Utility function to get active agents
  const getActiveAgents = useCallback((): Agent[] => {
    return agents.filter(agent =>
      ['connecting', 'browsing', 'surveying', 'paused'].includes(agent.status)
    );
  }, [agents]);

  // Utility function to calculate total metrics
  const getTotalMetrics = useCallback(() => {
    return agents.reduce(
      (acc, agent) => ({
        totalEarnings: acc.totalEarnings + agent.metrics.totalEarnings,
        totalSurveys: acc.totalSurveys + agent.metrics.surveysCompleted,
        totalErrors: acc.totalErrors + agent.metrics.errorCount,
        averageSuccessRate: agents.length > 0
          ? (acc.averageSuccessRate + agent.metrics.successRate) / agents.length
          : 0,
      }),
      { totalEarnings: 0, totalSurveys: 0, totalErrors: 0, averageSuccessRate: 0 }
    );
  }, [agents]);

  return {
    agents,
    loading,
    error,
    createAgent,
    updateAgent,
    deleteAgent,
    controlAgent,
    // Additional utility functions
    getAgentsByStatus,
    getActiveAgents,
    getTotalMetrics,
  };
};

export default useAgents;