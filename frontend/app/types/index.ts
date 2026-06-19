// Survey Swarm Application Types

export interface Agent {
  id: string;
  name: string;
  type: 'browser-controller' | 'question-analyzer' | 'answer-generator' | 'profile-manager' | 'consensus-validator';
  status: 'active' | 'idle' | 'error' | 'processing';
  lastActivity: Date;
  performance: AgentPerformance;
}

export interface AgentPerformance {
  surveysCompleted: number;
  successRate: number;
  averageTimePerSurvey: number;
  errorCount: number;
}

export interface SurveySession {
  id: string;
  platform: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  agentId: string;
  responses: SurveyResponse[];
}

export interface SurveyResponse {
  questionId: string;
  answer: string | string[] | number | boolean;
  confidence: number;
  timeTaken: number;
}

export interface SystemMetrics {
  totalAgents: number;
  activeAgents: number;
  totalSurveysCompleted: number;
  systemUptime: number;
  averageResponseTime: number;
}

export interface DashboardState {
  agents: Agent[];
  sessions: SurveySession[];
  metrics: SystemMetrics;
  loading: boolean;
  error: string | null;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ChartProps extends BaseComponentProps {
  data: any[];
  width?: number;
  height?: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}