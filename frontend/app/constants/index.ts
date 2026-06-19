// Survey Swarm Application Constants

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    AGENTS: '/api/agents',
    SESSIONS: '/api/sessions',
    METRICS: '/api/metrics',
    SURVEYS: '/api/surveys',
    ANALYTICS: '/api/analytics',
    SETTINGS: '/api/settings',
  },
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// WebSocket Configuration
export const WEBSOCKET_CONFIG = {
  URL: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000',
  EVENTS: {
    AGENT_STATUS: 'agent:status',
    SESSION_UPDATE: 'session:update',
    SYSTEM_METRICS: 'system:metrics',
    SURVEY_COMPLETED: 'survey:completed',
    ERROR: 'error',
  },
  RECONNECT_DELAY: 3000,
  MAX_RECONNECT_ATTEMPTS: 5,
} as const;

// Application Configuration
export const APP_CONFIG = {
  NAME: 'Survey Swarm',
  VERSION: '1.0.0',
  DESCRIPTION: 'Real-time Survey Automation Dashboard',
  AUTHOR: 'Hive Mind Swarm',
} as const;

// UI Configuration
export const UI_CONFIG = {
  THEME: {
    PRIMARY_COLOR: '#3b82f6',
    SECONDARY_COLOR: '#10b981',
    DANGER_COLOR: '#ef4444',
    WARNING_COLOR: '#f59e0b',
    SUCCESS_COLOR: '#22c55e',
    INFO_COLOR: '#06b6d4',
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  ANIMATIONS: {
    DURATION: {
      FAST: 150,
      NORMAL: 300,
      SLOW: 500,
    },
    EASINGS: {
      EASE_IN: 'ease-in',
      EASE_OUT: 'ease-out',
      EASE_IN_OUT: 'ease-in-out',
    },
  },
} as const;

// Survey Platforms
export const SURVEY_PLATFORMS = {
  SURVEY_MONKEY: 'survey-monkey',
  QUALTRICS: 'qualtrics',
  GOOGLE_FORMS: 'google-forms',
  TYPEFORM: 'typeform',
  SURVEY_JUNKIE: 'survey-junkie',
  SWAGBUCKS: 'swagbucks',
  AMAZON_MECHANICAL_TURK: 'amazon-mturk',
} as const;

// Agent Types
export const AGENT_TYPES = {
  BROWSER_CONTROLLER: 'browser-controller',
  QUESTION_ANALYZER: 'question-analyzer',
  ANSWER_GENERATOR: 'answer-generator',
  PROFILE_MANAGER: 'profile-manager',
  CONSENSUS_VALIDATOR: 'consensus-validator',
} as const;

// Session Status
export const SESSION_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

// Agent Status
export const AGENT_STATUS = {
  ACTIVE: 'active',
  IDLE: 'idle',
  ERROR: 'error',
  PROCESSING: 'processing',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'survey-swarm-auth-token',
  USER_PREFERENCES: 'survey-swarm-user-preferences',
  THEME: 'survey-swarm-theme',
  LAST_ACTIVE_SESSION: 'survey-swarm-last-session',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  API_ERROR: 'Server error occurred. Please try again later.',
  AUTHENTICATION_ERROR: 'Authentication failed. Please log in again.',
  VALIDATION_ERROR: 'Invalid input. Please check your data and try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SESSION_STARTED: 'Survey session started successfully.',
  SESSION_COMPLETED: 'Survey session completed successfully.',
  AGENT_CREATED: 'Agent created successfully.',
  SETTINGS_UPDATED: 'Settings updated successfully.',
} as const;