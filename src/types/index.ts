// Core agent and system types
export interface Agent {
  id: string;
  name: string;
  status: AgentStatus;
  browserSession?: BrowserSession;
  metrics: AgentMetrics;
  lastActivity: Date;
  createdAt: Date;
}

export type AgentStatus =
  | 'idle'
  | 'connecting'
  | 'browsing'
  | 'surveying'
  | 'completed'
  | 'error'
  | 'offline'
  | 'paused';

export interface BrowserSession {
  id: string;
  url: string;
  title: string;
  screenshot?: string;
  isStreaming: boolean;
  lastUpdated: Date;
  platform?: SurveyPlatform;
  surveyProgress?: SurveyProgress;
}

export interface SurveyProgress {
  currentStep: number;
  totalSteps: number;
  estimatedTimeRemaining: number;
  completionPercentage: number;
}

export type SurveyPlatform =
  | 'surveyjunkie'
  | 'swagbucks'
  | 'inboxdollars'
  | 'toluna'
  | 'yougov'
  | 'other';

// Metrics types
export interface AgentMetrics {
  surveysCompleted: number;
  totalEarnings: number;
  averageCompletionTime: number;
  successRate: number;
  activeTime: number;
  errorCount: number;
  lastEarning?: number;
}

export interface SystemMetrics {
  totalAgents: number;
  activeAgents: number;
  totalEarnings: number;
  surveysCompletedToday: number;
  averageResponseTime: number;
  systemLoad: number;
  memoryUsage: number;
  cpuUsage: number;
}

export interface PerformanceMetrics {
  throughput: number;
  latency: number;
  errorRate: number;
  uptime: number;
  requestsPerSecond: number;
}

// WebSocket and real-time data types
export interface WebSocketMessage {
  type: WebSocketMessageType;
  data: any;
  timestamp: Date;
  agentId?: string;
}

export type WebSocketMessageType =
  | 'agent_status_update'
  | 'browser_screenshot'
  | 'metrics_update'
  | 'system_alert'
  | 'survey_progress'
  | 'error_occurred'
  | 'connection_established'
  | 'connection_lost';

// UI Component Props
export interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

export interface AgentCardProps {
  agent: Agent;
  onSelect?: (agent: Agent) => void;
  onControl?: (agentId: string, action: AgentControlAction) => void;
  compact?: boolean;
}

export type AgentControlAction =
  | 'start'
  | 'pause'
  | 'stop'
  | 'restart'
  | 'view_browser';

export interface BrowserViewerProps {
  session: BrowserSession | null;
  onControl?: (action: BrowserControlAction) => void;
  fullscreen?: boolean;
}

export type BrowserControlAction =
  | 'refresh'
  | 'back'
  | 'forward'
  | 'navigate'
  | 'screenshot'
  | 'toggle_stream';

export interface MetricsDisplayProps {
  metrics: SystemMetrics | AgentMetrics;
  type: 'system' | 'agent';
  variant?: 'compact' | 'detailed' | 'chart';
  timeRange?: TimeRange;
}

export type TimeRange =
  | '1h'
  | '24h'
  | '7d'
  | '30d'
  | 'all';

export interface StatusIndicatorProps {
  status: AgentStatus | 'online' | 'offline' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showLabel?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
  orientation?: 'horizontal' | 'vertical';
}

export interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  href?: string;
  children?: NavigationItem[];
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export interface GridContainerProps {
  children: React.ReactNode;
  cols?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number | string;
  className?: string;
}

// Hook types
export interface UseWebSocketReturn {
  isConnected: boolean;
  lastMessage: WebSocketMessage | null;
  send: (message: WebSocketMessage) => void;
  reconnect: () => void;
  error: string | null;
}

export interface UseAgentsReturn {
  agents: Agent[];
  loading: boolean;
  error: string | null;
  createAgent: (config: CreateAgentConfig) => Promise<Agent>;
  updateAgent: (id: string, updates: Partial<Agent>) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  controlAgent: (id: string, action: AgentControlAction) => Promise<void>;
}

export interface CreateAgentConfig {
  name: string;
  platform?: SurveyPlatform;
  proxy?: ProxyConfig;
  userAgent?: string;
}

export interface ProxyConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
}

// Form types
export interface AgentFormData {
  name: string;
  platform: SurveyPlatform;
  proxy?: ProxyConfig;
  userAgent?: string;
  maxSurveys?: number;
  earningsGoal?: number;
}

// Chart and visualization types
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

// Alert and notification types
export interface Alert {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  agentId?: string;
  autoClose?: boolean;
  duration?: number;
}

// Filter and search types
export interface AgentFilters {
  status?: AgentStatus[];
  platform?: SurveyPlatform[];
  earningsRange?: [number, number];
  lastActivityRange?: [Date, Date];
  search?: string;
}

export interface SortConfig {
  key: keyof Agent;
  direction: 'asc' | 'desc';
}