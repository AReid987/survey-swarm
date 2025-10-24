/**
 * Comprehensive test configuration for Survey Swarm
 * Centralizes all test settings, mock data, and utilities
 */

import { config } from '../../src/config/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const testConfig = {
  // Test environment settings
  environment: {
    testMode: process.env.NODE_ENV === 'test' || true,
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.TEST_SLOWMO) || 0,
    timeout: {
      default: 30000,
      navigation: 60000,
      element: 10000,
      survey: 120000,
      api: 5000
    }
  },

  // Test data directory paths
  paths: {
    fixtures: join(__dirname, '../fixtures'),
    mocks: join(__dirname, '../mocks'),
    testData: join(__dirname, '../../test-data'),
    screenshots: join(__dirname, '../../test-data/screenshots'),
    videos: join(__dirname, '../../test-data/videos'),
    reports: join(__dirname, '../../test-data/reports')
  },

  // Survey platform configurations for testing
  surveyPlatforms: {
    // Mock survey sites for safe testing
    mockSurveySites: [
      {
        name: 'Basic Form Survey',
        url: 'http://localhost:3000/mock-surveys/basic',
        type: 'form',
        difficulty: 'easy',
        expectedTime: '2-5 min',
        fields: ['name', 'email', 'age', 'gender', 'satisfaction']
      },
      {
        name: 'Complex Multi-Page Survey',
        url: 'http://localhost:3000/mock-surveys/multi-page',
        type: 'multi-page',
        difficulty: 'medium',
        expectedTime: '5-10 min',
        pages: 3,
        fields: ['demographics', 'preferences', 'feedback']
      },
      {
        name: 'Interactive Survey',
        url: 'http://localhost:3000/mock-surveys/interactive',
        type: 'interactive',
        difficulty: 'hard',
        expectedTime: '10-15 min',
        features: ['drag-drop', 'image-selection', 'rating-scale']
      }
    ],

    // Real survey platform test URLs (use with caution)
    realPlatforms: {
      surveyMonkey: {
        testUrl: 'https://www.surveymonkey.com/r/TEST123',
        credentials: {
          // Add test credentials if available
        }
      },
      googleForms: {
        testUrl: 'https://forms.gle/test123',
        credentials: {
          // Add test credentials if available
        }
      },
      qualtrics: {
        testUrl: 'https://survey.qualtrics.com/test',
        credentials: {
          // Add test credentials if available
        }
      }
    }
  },

  // Browser and user agent configurations
  browserConfig: {
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    userAgents: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ],
    locales: ['en-US', 'en-GB', 'en-CA'],
    timezones: ['America/New_York', 'Europe/London', 'Asia/Tokyo']
  },

  // Anti-detection testing parameters
  antiDetectionTests: {
    stealthPlugins: ['fingerprint-randomization', 'behavior-mimicking', 'timing-variation'],
    detectionTriggers: [
      'webdriver-property',
      'automation-ids',
      'mouse-movement-patterns',
      'keystroke-timing',
      'navigator-properties'
    ],
    evasionMetrics: [
      'fingerprint-uniqueness',
      'behavior-naturalness',
      'timing-randomness',
      'request-patterns'
    ]
  },

  // Performance testing thresholds
  performanceThresholds: {
    surveyCompletion: {
      maxTime: 300000, // 5 minutes
      minTime: 10000   // 10 seconds (too fast is suspicious)
    },
    resourceUsage: {
      maxMemoryUsage: 512 * 1024 * 1024, // 512MB
      maxCpuUsage: 80, // percentage
      maxNetworkRequests: 100
    },
    concurrency: {
      maxConcurrentAgents: 10,
      maxConcurrentSurveys: 50,
      failureRate: 0.05 // 5% max failure rate
    }
  },

  // Security testing configurations
  securityTests: {
    vulnerabilityScans: [
      'xss-detection',
      'csrf-protection',
      'sql-injection',
      'data-exfiltration'
    ],
    privacyTests: [
      'data-encryption',
      'cookie-handling',
      'local-storage-cleanup',
      'history-cleanup'
    ],
    authenticationTests: [
      'credential-handling',
      'session-management',
      'token-rotation'
    ]
  },

  // Mock data generators
  mockData: {
    userProfiles: {
      ageRange: [18, 65],
      genders: ['male', 'female', 'non-binary', 'prefer-not-to-say'],
      locations: ['US', 'CA', 'UK', 'AU', 'DE'],
      incomeRanges: ['0-25k', '25-50k', '50-75k', '75-100k', '100k+'],
      educationLevels: ['high-school', 'some-college', 'bachelor', 'master', 'phd']
    },
    surveyResponses: {
      ratingScales: [1, 2, 3, 4, 5],
      booleanOptions: [true, false],
      textLengths: {
        short: { min: 5, max: 20 },
        medium: { min: 20, max: 100 },
        long: { min: 100, max: 500 }
      }
    }
  },

  // Test reporting configuration
  reporting: {
    formats: ['json', 'html', 'junit'],
    includeScreenshots: true,
    includeVideos: process.env.INCLUDE_VIDEOS === 'true',
    coverageThreshold: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80
    }
  },

  // CI/CD specific settings
  ci: {
    parallel: true,
    maxWorkers: 4,
    retries: 2,
    artifactRetention: {
      screenshots: 7, // days
      videos: 3,     // days
      reports: 30    // days
    }
  }
};

// Environment-specific overrides
if (process.env.CI === 'true') {
  testConfig.environment.headless = true;
  testConfig.environment.slowMo = 0;
  testConfig.reporting.includeScreenshots = false;
  testConfig.reporting.includeVideos = false;
}

export default testConfig;