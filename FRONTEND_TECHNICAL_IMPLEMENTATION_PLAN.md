# Survey Swarm Frontend Redesign - Technical Implementation Plan

## Executive Summary

As the Frontend Implementation Lead in the hive, I've analyzed the current Survey Swarm architecture and the printernet-dash aesthetic requirements to create a comprehensive technical implementation plan. This document outlines the complete frontend architecture for transforming the backend-only survey automation system into a full-stack application with a sophisticated real-time monitoring dashboard.

**Key Insight**: The Survey Swarm system is a sophisticated multi-agent automation platform with no existing frontend. The "redesign" actually involves building a complete frontend interface from scratch while maintaining 100% backend functionality.

## Current System Analysis

### Backend Architecture Overview
- **Multi-agent system** with specialized agents: BrowserController, QuestionAnalyzer, AnswerGenerator, ProfileManager, ConsensusValidator
- **Core Technologies**: Node.js, Playwright, Puppeteer, custom Hive Mind framework
- **Key Components**: Browser automation, survey platform integration, anti-detection measures, consensus building
- **Communication**: Message bus system for inter-agent coordination

### Integration Points
1. **Browser Controller API**: Real-time browser session monitoring
2. **Agent Status APIs**: Live agent state and performance metrics
3. **Survey Database**: Historical data and analytics
4. **Configuration Management**: System settings and agent parameters
5. **Message Bus**: Real-time event streaming

## 1. Technology Stack Selection

### Core Framework
**React 18.2+ with TypeScript**
- **Rationale**: Component-based architecture matches the multi-agent system design
- **Benefits**: Strong TypeScript support, excellent ecosystem, performance optimizations
- **Concurrent Features**: Essential for real-time dashboard updates

### Build Tooling
**Vite 5.0+**
- **Performance**: Lightning-fast HMR for dashboard development
- **Optimization**: Automatic code splitting and tree shaking
- **TypeScript**: Native support with excellent DX

### Styling Architecture
**Tailwind CSS + Headless UI + Framer Motion**
- **Tailwind CSS**: Utility-first approach for rapid dashboard UI development
- **Headless UI**: Accessible component primitives for complex interactions
- **CSS-in-JS**: Emotion for dynamic styling and theme management
- **Framer Motion**: Production-ready animations for micro-interactions

### State Management
**Zustand + React Query**
- **Zustand**: Lightweight state management for agent status and dashboard state
- **React Query**: Server state management for API calls and real-time data
- **Context API**: Theme and user preferences

### Data Visualization
**D3.js + Recharts + Vis.js**
- **D3.js**: Custom network graphs for agent relationships
- **Recharts**: Standard charts for metrics and analytics
- **Vis.js**: Real-time network topology visualization
- **Three.js**: 3D visualization elements for advanced features

### Real-time Communication
**Socket.IO + WebRTC**
- **Socket.IO**: Real-time agent status updates and system events
- **WebRTC**: Browser session streaming for live monitoring
- **Server-Sent Events**: Fallback for one-way data streaming

## 2. Component Architecture

### 2.1 Application Structure
```
src/
├── components/
│   ├── ui/                    # Base UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Card/
│   │   ├── Badge/
│   │   └── LoadingSpinner/
│   ├── dashboard/             # Dashboard-specific components
│   │   ├── DashboardLayout/
│   │   ├── Sidebar/
│   │   ├── Header/
│   │   ├── MetricCard/
│   │   └── StatusPanel/
│   ├── agents/               # Agent monitoring components
│   │   ├── AgentCard/
│   │   ├── AgentStatus/
│   │   ├── AgentControl/
│   │   └── SwarmVisualization/
│   ├── browser/              # Browser session components
│   │   ├── BrowserView/
│   │   ├── SessionControl/
│   │   ├── ScreenshotViewer/
│   │   └── NavigationControl/
│   ├── analytics/            # Analytics and reporting
│   │   ├── PerformanceChart/
│   │   ├── SurveyMetrics/
│   │   ├── FinancialTracker/
│   │   └── TrendAnalysis/
│   ├── configuration/        # System configuration
│   │   ├── ConfigPanel/
│   │   ├── ProfileManager/
│   │   ├── SettingsForm/
│   │   └── ScheduleManager/
│   └── alerts/              # Alert system
│       ├── AlertPanel/
│       ├── NotificationToast/
│       └── AlertConfiguration/
├── hooks/                   # Custom React hooks
│   ├── useAgentStatus.ts
│   ├── useRealtimeData.ts
│   ├── useBrowserStream.ts
│   ├── useSystemMetrics.ts
│   └── useNotifications.ts
├── stores/                  # Zustand stores
│   ├── agentStore.ts
│   ├── dashboardStore.ts
│   ├── configStore.ts
│   └── alertStore.ts
├── services/                # API and WebSocket services
│   ├── api/
│   │   ├── agents.ts
│   │   ├── surveys.ts
│   │   ├── metrics.ts
│   │   └── configuration.ts
│   ├── websocket/
│   │   ├── socket.ts
│   │   ├── browserStream.ts
│   │   └── eventHandlers.ts
│   └── webrtc/
│       ├── browserViewer.ts
│       └── streamManager.ts
├── utils/                   # Utility functions
│   ├── formatters.ts
│   ├── validators.ts
│   ├── calculations.ts
│   └── constants.ts
├── styles/                  # Global styles and themes
│   ├── globals.css
│   ├── theme.css
│   └── components.css
└── types/                   # TypeScript type definitions
    ├── agent.ts
    ├── survey.ts
    ├── metrics.ts
    └── api.ts
```

### 2.2 Core Component Specifications

#### DashboardLayout Component
```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebarCollapsed = false,
  onSidebarToggle
}) => {
  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <Header onSidebarToggle={onSidebarToggle} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
```

#### AgentCard Component
```typescript
interface AgentCardProps {
  agent: Agent;
  onControl: (agentId: string, action: AgentAction) => void;
  onViewDetails: (agentId: string) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onControl, onViewDetails }) => {
  const statusColor = {
    active: 'bg-green-500',
    idle: 'bg-yellow-500',
    error: 'bg-red-500',
    offline: 'bg-gray-500'
  }[agent.status];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-900 border border-gray-800 rounded-lg p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${statusColor} animate-pulse`} />
          <h3 className="font-semibold text-gray-100">{agent.type}</h3>
        </div>
        <span className="text-sm text-gray-400">{agent.id}</span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Status:</span>
          <span className="text-gray-200">{agent.status}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Tasks:</span>
          <span className="text-gray-200">{agent.taskCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Uptime:</span>
          <span className="text-gray-200">{formatUptime(agent.uptime)}</span>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onViewDetails(agent.id)}
        >
          Details
        </Button>
        <Button
          size="sm"
          onClick={() => onControl(agent.id, 'restart')}
        >
          Restart
        </Button>
      </div>
    </motion.div>
  );
};
```

## 3. Data Visualization Implementation

### 3.1 Agent Network Visualization
```typescript
const SwarmVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const { agents, connections } = useAgentNetwork();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // Create force simulation
    const simulation = d3.forceSimulation(agents)
      .force('link', d3.forceLink(connections).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = svg.append('g')
      .selectAll('line')
      .data(connections)
      .enter().append('line')
      .attr('stroke', '#4B5563')
      .attr('stroke-width', 2);

    // Create nodes
    const node = svg.append('g')
      .selectAll('circle')
      .data(agents)
      .enter().append('circle')
      .attr('r', 20)
      .attr('fill', d => getAgentColor(d.type))
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    return () => {
      simulation.stop();
    };
  }, [agents, connections]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <svg ref={svgRef} width={800} height={600} />
    </div>
  );
};
```

### 3.2 Performance Metrics Charts
```typescript
const PerformanceChart: React.FC = () => {
  const { metrics } = useSystemMetrics();

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">
        System Performance
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={metrics}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="timestamp"
            stroke="#9CA3AF"
            tickFormatter={formatTime}
          />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#10B981"
            strokeWidth={2}
            dot={false}
            name="CPU %"
          />
          <Line
            type="monotone"
            dataKey="memory"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            name="Memory %"
          />
          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#F59E0B"
            strokeWidth={2}
            dot={false}
            name="Active Tasks"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
```

### 3.3 Financial Tracking Dashboard
```typescript
const FinancialTracker: React.FC = () => {
  const { earnings, platforms } = useFinancialData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">
          Earnings Overview
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Today's Earnings:</span>
            <span className="text-2xl font-bold text-green-400">
              ${earnings.today.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">This Week:</span>
            <span className="text-xl font-semibold text-gray-200">
              ${earnings.week.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">This Month:</span>
            <span className="text-xl font-semibold text-gray-200">
              ${earnings.month.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">
          Platform Performance
        </h3>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={platforms}
              dataKey="earnings"
              nameKey="platform"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ platform, earnings }) => `${platform}: $${earnings.toFixed(2)}`}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
```

## 4. Animation Framework and Micro-interactions

### 4.1 Animation System Architecture
```typescript
// Animation configuration using Framer Motion
const animationConfig = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeInOut" }
  },

  // Card hover effects
  cardHover: {
    whileHover: {
      scale: 1.02,
      boxShadow: "0 10px 40px rgba(0,0,0,0.3)"
    },
    transition: { type: "spring", stiffness: 300 }
  },

  // Status indicators
  statusPulse: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },

  // Loading states
  loadingSkeleton: {
    initial: { opacity: 0.7 },
    animate: { opacity: 1 },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

// Animated status indicator component
const StatusIndicator: React.FC<{ status: AgentStatus }> = ({ status }) => {
  const statusColors = {
    active: '#10B981',
    idle: '#F59E0B',
    error: '#EF4444',
    offline: '#6B7280'
  };

  return (
    <motion.div
      className="w-3 h-3 rounded-full"
      style={{ backgroundColor: statusColors[status] }}
      {...animationConfig.statusPulse}
    />
  );
};
```

### 4.2 Real-time Data Animation
```typescript
// Animated number counter
const AnimatedCounter: React.FC<{
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}> = ({ value, duration = 1000, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValue = useRef(value);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = prevValue.current;
    const change = value - startValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (change * easeOutQuart);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValue.current = value;
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span>
      {prefix}{displayValue.toFixed(2)}{suffix}
    </span>
  );
};
```

## 5. Responsive Strategy

### 5.1 Mobile-First Design System
```typescript
// Responsive breakpoints using Tailwind CSS
const breakpoints = {
  mobile: '640px',   // sm
  tablet: '768px',   // md
  laptop: '1024px',  // lg
  desktop: '1280px', // xl
  wide: '1536px'     // 2xl
};

// Responsive dashboard layout
const ResponsiveDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Mobile: Stack layout */}
      <div className="lg:hidden">
        <MobileHeader />
        <MobileNavigation />
        <main className="pb-20">
          <MobileDashboardContent />
        </main>
      </div>

      {/* Desktop: Sidebar layout */}
      <div className="hidden lg:flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-6">
            <DesktopDashboardContent />
          </main>
        </div>
      </div>
    </div>
  );
};
```

### 5.2 Adaptive Component Sizing
```typescript
// Adaptive grid layout for agent cards
const AgentGrid: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  return (
    <div className="grid gap-4
                    grid-cols-1        // Mobile: 1 column
                    sm:grid-cols-2    // Small tablet: 2 columns
                    lg:grid-cols-3    // Desktop: 3 columns
                    xl:grid-cols-4    // Large desktop: 4 columns
                    2xl:grid-cols-5"> // Ultra-wide: 5 columns
      {agents.map(agent => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
};

// Responsive chart component
const ResponsiveChart: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({
          width,
          height: Math.min(400, width * 0.6) // Maintain aspect ratio
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {dimensions.width > 0 && (
        <ResponsiveContainer width={dimensions.width} height={dimensions.height}>
          <LineChart /* chart config */ />
        </ResponsiveContainer>
      )}
    </div>
  );
};
```

## 6. Backend Integration Strategy

### 6.1 API Integration Layer
```typescript
// API service configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Agent API service
export const agentApi = {
  // Get all agents with status
  getAgents: async (): Promise<Agent[]> => {
    const response = await apiClient.get('/api/agents');
    return response.data;
  },

  // Get agent details
  getAgent: async (id: string): Promise<Agent> => {
    const response = await apiClient.get(`/api/agents/${id}`);
    return response.data;
  },

  // Control agent actions
  controlAgent: async (id: string, action: AgentAction): Promise<void> => {
    await apiClient.post(`/api/agents/${id}/control`, { action });
  },

  // Get agent metrics
  getAgentMetrics: async (id: string): Promise<AgentMetrics> => {
    const response = await apiClient.get(`/api/agents/${id}/metrics`);
    return response.data;
  }
};

// Survey API service
export const surveyApi = {
  getActiveSurveys: async (): Promise<Survey[]> => {
    const response = await apiClient.get('/api/surveys/active');
    return response.data;
  },

  getSurveyHistory: async (filters?: SurveyFilters): Promise<Survey[]> => {
    const response = await apiClient.get('/api/surveys/history', { params: filters });
    return response.data;
  },

  getSurveyAnalytics: async (): Promise<SurveyAnalytics> => {
    const response = await apiClient.get('/api/surveys/analytics');
    return response.data;
  }
};
```

### 6.2 WebSocket Integration
```typescript
// WebSocket service for real-time updates
class WebSocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect() {
    this.socket = io(process.env.REACT_APP_WS_URL || 'ws://localhost:3001');

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    // Set up event handlers
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    if (!this.socket) return;

    // Agent status updates
    this.socket.on('agent:status', (data: AgentStatusUpdate) => {
      this.emit('agent-status-update', data);
    });

    // System metrics
    this.socket.on('system:metrics', (data: SystemMetrics) => {
      this.emit('system-metrics-update', data);
    });

    // Browser session updates
    this.socket.on('browser:session', (data: BrowserSessionUpdate) => {
      this.emit('browser-session-update', data);
    });

    // Alerts and notifications
    this.socket.on('alert', (data: Alert) => {
      this.emit('alert', data);
    });
  }

  // Subscribe to events
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  // Unsubscribe from events
  off(event: string, callback: Function) {
    this.listeners.get(event)?.delete(callback);
  }

  // Emit events to listeners
  private emit(event: string, data: any) {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

// Global WebSocket service instance
export const wsService = new WebSocketService();
```

### 6.3 React Query Integration
```typescript
// Custom hooks using React Query
export const useAgents = () => {
  return useQuery({
    queryKey: ['agents'],
    queryFn: agentApi.getAgents,
    refetchInterval: 5000, // Refresh every 5 seconds
    staleTime: 1000,
  });
};

export const useAgent = (id: string) => {
  return useQuery({
    queryKey: ['agent', id],
    queryFn: () => agentApi.getAgent(id),
    enabled: !!id,
  });
};

export const useAgentMetrics = (id: string) => {
  return useQuery({
    queryKey: ['agent-metrics', id],
    queryFn: () => agentApi.getAgentMetrics(id),
    enabled: !!id,
    refetchInterval: 2000, // High refresh rate for metrics
  });
};

export const useSurveys = (filters?: SurveyFilters) => {
  return useQuery({
    queryKey: ['surveys', filters],
    queryFn: () => surveyApi.getActiveSurveys(),
    refetchInterval: 10000,
  });
};
```

## 7. Performance Optimization Strategy

### 7.1 Code Splitting and Lazy Loading
```typescript
// Route-based code splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Agents = lazy(() => import('./pages/Agents'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Configuration = lazy(() => import('./pages/Configuration'));

// Component-based lazy loading
const NetworkVisualization = lazy(() => import('./components/NetworkVisualization'));
const BrowserViewer = lazy(() => import('./components/BrowserViewer'));

// Suspense wrapper for loading states
const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
);
```

### 7.2 Virtual Scrolling for Large Data Sets
```typescript
// Virtualized agent list for performance with many agents
import { FixedSizeList as List } from 'react-window';

const VirtualizedAgentList: React.FC<{ agents: Agent[] }> = ({ agents }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <AgentCard agent={agents[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={agents.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

### 7.3 Caching Strategy
```typescript
// Service Worker for caching
const cacheName = 'survey-swarm-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/api/agents',
  '/api/system/metrics'
];

// Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Network-first strategy for API calls
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request);
        })
    );
  }
});
```

## 8. Security Considerations

### 8.1 Authentication and Authorization
```typescript
// JWT token management
const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('auth-token')
  );

  const login = async (credentials: LoginCredentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    const { token } = response.data;

    localStorage.setItem('auth-token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setToken(null);
  };

  // Add token to all requests
  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }, [token]);

  return { token, login, logout };
};

// Role-based access control
const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission: string) => {
    return user?.permissions?.includes(permission) || false;
  };

  return { hasPermission };
};
```

### 8.2 Data Protection
```typescript
// Sensitive data handling
const secureStorage = {
  set: (key: string, value: any) => {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      process.env.REACT_APP_ENCRYPTION_KEY!
    ).toString();
    localStorage.setItem(key, encrypted);
  },

  get: (key: string) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    const decrypted = CryptoJS.AES.decrypt(
      encrypted,
      process.env.REACT_APP_ENCRYPTION_KEY!
    ).toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  }
};

// CSRF protection
apiClient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
```

## 9. Testing Strategy

### 9.1 Component Testing with React Testing Library
```typescript
// AgentCard component test
describe('AgentCard', () => {
  const mockAgent: Agent = {
    id: 'agent-1',
    type: 'browser-controller',
    status: 'active',
    taskCount: 5,
    uptime: 3600
  };

  it('renders agent information correctly', () => {
    render(<AgentCard agent={mockAgent} onControl={jest.fn()} onViewDetails={jest.fn()} />);

    expect(screen.getByText('browser-controller')).toBeInTheDocument();
    expect(screen.getByText('active')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onControl when restart button is clicked', () => {
    const mockControl = jest.fn();
    render(<AgentCard agent={mockAgent} onControl={mockControl} onViewDetails={jest.fn()} />);

    fireEvent.click(screen.getByText('Restart'));
    expect(mockControl).toHaveBeenCalledWith('agent-1', 'restart');
  });
});
```

### 9.2 Integration Testing
```typescript
// Dashboard integration test
describe('Dashboard Integration', () => {
  it('displays real-time agent updates', async () => {
    const mockWsService = {
      on: jest.fn(),
      emit: jest.fn()
    };

    render(<Dashboard />);

    // Simulate WebSocket message
    act(() => {
      mockWsService.emit('agent-status-update', {
        agentId: 'agent-1',
        status: 'active',
        taskCount: 10
      });
    });

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });
});
```

## 10. Implementation Timeline

### Phase 1: Foundation (Week 1-2)
- **Week 1**: Setup build environment, create basic component library
- **Week 2**: Implement dashboard layout, agent status components, WebSocket integration

### Phase 2: Core Features (Week 3-4)
- **Week 3**: Browser session viewing, agent control interface
- **Week 4**: Performance metrics visualization, real-time updates

### Phase 3: Advanced Features (Week 5-6)
- **Week 5**: Network visualization, financial tracking
- **Week 6**: Advanced configuration, alert system

### Phase 4: Polish and Optimization (Week 7-8)
- **Week 7**: Mobile responsiveness, performance optimization
- **Week 8**: Testing, documentation, deployment preparation

## Conclusion

This technical implementation plan provides a comprehensive roadmap for building a sophisticated frontend interface for the Survey Swarm system. The architecture emphasizes:

1. **Real-time Performance**: WebSocket and WebRTC for live monitoring
2. **Scalability**: Component-based architecture with efficient state management
3. **User Experience**: Smooth animations and responsive design
4. **Maintainability**: Clean code structure with TypeScript and comprehensive testing
5. **Security**: Proper authentication and data protection measures

The implementation will transform the Survey Swarm from a backend-only system into a full-featured monitoring and control platform while maintaining 100% of the existing backend functionality.

---

**Document created by**: Frontend Implementation Lead, Hive Mind Swarm
**Date**: October 24, 2025
**Next Steps**: Review with Design System Architect and Backend Integration Lead