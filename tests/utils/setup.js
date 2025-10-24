/**
 * Global test setup and utilities
 * Provides common testing helpers and configurations
 */

import { chromium, firefox, webkit } from 'playwright';
import { testConfig } from '../config/test-config.js';
import { randomBytes } from 'crypto';

// Global test state
global.testState = {
  browsers: new Map(),
  contexts: new Map(),
  pages: new Map(),
  mockServers: new Map(),
  testResults: []
};

// Test utilities
export const TestUtils = {
  /**
   * Create a browser instance with stealth configuration
   */
  async createBrowser(browserType = 'chromium', options = {}) {
    const browserName = `${browserType}-${Date.now()}`;

    const launchOptions = {
      headless: testConfig.environment.headless,
      slowMo: testConfig.environment.slowMo,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-blink-features=AutomationControlled'
      ],
      ...options
    };

    let browser;
    switch (browserType) {
      case 'firefox':
        browser = await firefox.launch(launchOptions);
        break;
      case 'webkit':
        browser = await webkit.launch(launchOptions);
        break;
      default:
        browser = await chromium.launch(launchOptions);
    }

    global.testState.browsers.set(browserName, browser);
    return browser;
  },

  /**
   * Create browser context with anti-detection measures
   */
  async createContext(browser, userAgent = null) {
    const userAgentString = userAgent ||
      testConfig.browserConfig.userAgents[
        Math.floor(Math.random() * testConfig.browserConfig.userAgents.length)
      ];

    const contextOptions = {
      userAgent: userAgentString,
      viewport: testConfig.browserConfig.defaultViewport,
      locale: testConfig.browserConfig.locales[
        Math.floor(Math.random() * testConfig.browserConfig.locales.length)
      ],
      timezoneId: testConfig.browserConfig.timezones[
        Math.floor(Math.random() * testConfig.browserConfig.timezones.length)
      ],
      permissions: ['geolocation', 'camera', 'microphone'],
      ignoreHTTPSErrors: true,
      acceptDownloads: true
    };

    const context = await browser.newContext(contextOptions);

    // Add stealth scripts
    await context.addInitScript(() => {
      // Remove webdriver traces
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });

      // Override permissions API
      const originalQuery = window.navigator.permissions.query;
      window.navigator.permissions.query = (parameters) => (
        parameters.name === 'notifications' ?
          Promise.resolve({ state: Notification.permission }) :
          originalQuery(parameters)
      );

      // Mock chrome runtime
      window.chrome = {
        runtime: {
          onConnect: undefined,
          onMessage: undefined
        }
      };

      // Override plugins
      Object.defineProperty(navigator, 'plugins', {
        get: () => [
          {
            0: {type: "application/x-google-chrome-pdf", suffixes: "pdf", description: "Portable Document Format"},
            description: "Portable Document Format",
            filename: "internal-pdf-viewer",
            length: 1,
            name: "Chrome PDF Plugin"
          }
        ],
      });
    });

    const contextId = `context-${Date.now()}`;
    global.testState.contexts.set(contextId, context);
    return context;
  },

  /**
   * Create a new page with stealth measures
   */
  async createPage(context) {
    const page = await context.newPage();

    // Set up anti-detection measures
    await page.evaluateOnNewDocument(() => {
      // Randomize timing
      const originalSetTimeout = window.setTimeout;
      window.setTimeout = (callback, delay, ...args) => {
        const jitter = Math.random() * 100 - 50; // ±50ms jitter
        return originalSetTimeout(callback, delay + jitter, ...args);
      };

      // Randomize mouse movements
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'mousemove') {
          const wrappedListener = (event) => {
            // Add small random movement to seem more human
            event.clientX += (Math.random() - 0.5) * 2;
            event.clientY += (Math.random() - 0.5) * 2;
            return listener(event);
          };
          return originalAddEventListener.call(this, type, wrappedListener, options);
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    });

    const pageId = `page-${Date.now()}`;
    global.testState.pages.set(pageId, page);
    return page;
  },

  /**
   * Generate realistic test data
   */
  generateTestData(type, options = {}) {
    const mockData = testConfig.mockData;

    switch (type) {
      case 'userProfile':
        return {
          name: `Test User ${Math.floor(Math.random() * 10000)}`,
          email: `test${randomBytes(8).toString('hex')}@example.com`,
          age: Math.floor(Math.random() * (mockData.userProfiles.ageRange[1] - mockData.userProfiles.ageRange[0])) + mockData.userProfiles.ageRange[0],
          gender: mockData.userProfiles.genders[Math.floor(Math.random() * mockData.userProfiles.genders.length)],
          location: mockData.userProfiles.locations[Math.floor(Math.random() * mockData.userProfiles.locations.length)],
          income: mockData.userProfiles.incomeRanges[Math.floor(Math.random() * mockData.userProfiles.incomeRanges.length)],
          education: mockData.userProfiles.educationLevels[Math.floor(Math.random() * mockData.userProfiles.educationLevels.length)]
        };

      case 'surveyResponse':
        const response = {
          rating: mockData.surveyResponses.ratingScales[Math.floor(Math.random() * mockData.surveyResponses.ratingScales.length)],
          boolean: mockData.surveyResponses.booleanOptions[Math.floor(Math.random() * mockData.surveyResponses.booleanOptions.length)]
        };

        if (options.includeText) {
          const length = options.textLength || 'medium';
          const { min, max } = mockData.surveyResponses.textLengths[length];
          response.text = this.generateRandomText(min, max);
        }

        return response;

      default:
        return {};
    }
  },

  /**
   * Generate random text for form inputs
   */
  generateRandomText(minLength, maxLength) {
    const words = ['test', 'sample', 'example', 'data', 'input', 'value', 'response', 'answer', 'feedback', 'opinion'];
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const wordCount = Math.ceil(length / 6);

    return Array.from({ length: wordCount }, () =>
      words[Math.floor(Math.random() * words.length)]
    ).join(' ').substring(0, length);
  },

  /**
   * Wait for a random amount of time to simulate human behavior
   */
  async randomWait(minMs = 100, maxMs = 1000) {
    const delay = Math.random() * (maxMs - minMs) + minMs;
    return new Promise(resolve => setTimeout(resolve, delay));
  },

  /**
   * Take screenshot with automatic naming
   */
  async takeScreenshot(page, testName, step) {
    if (!testConfig.reporting.includeScreenshots) return null;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${testName}-${step}-${timestamp}.png`;
    const path = `${testConfig.paths.screenshots}/${filename}`;

    try {
      await page.screenshot({ path, fullPage: true });
      return path;
    } catch (error) {
      console.warn(`Failed to take screenshot: ${error.message}`);
      return null;
    }
  },

  /**
   * Clean up test resources
   */
  async cleanup() {
    // Close all pages
    for (const [id, page] of global.testState.pages) {
      try {
        await page.close();
      } catch (error) {
        console.warn(`Failed to close page ${id}: ${error.message}`);
      }
    }

    // Close all contexts
    for (const [id, context] of global.testState.contexts) {
      try {
        await context.close();
      } catch (error) {
        console.warn(`Failed to close context ${id}: ${error.message}`);
      }
    }

    // Close all browsers
    for (const [id, browser] of global.testState.browsers) {
      try {
        await browser.close();
      } catch (error) {
        console.warn(`Failed to close browser ${id}: ${error.message}`);
      }
    }

    // Clear global state
    global.testState.browsers.clear();
    global.testState.contexts.clear();
    global.testState.pages.clear();
    global.testState.mockServers.clear();
  }
};

// Global test hooks
export const globalHooks = {
  async beforeAll() {
    // Create test directories if they don't exist
    const fs = await import('fs/promises');
    const path = await import('path');

    for (const dirPath of Object.values(testConfig.paths)) {
      try {
        await fs.mkdir(dirPath, { recursive: true });
      } catch (error) {
        if (error.code !== 'EEXIST') {
          console.warn(`Failed to create directory ${dirPath}: ${error.message}`);
        }
      }
    }
  },

  async afterAll() {
    await TestUtils.cleanup();
  },

  async beforeEach() {
    // Reset test state before each test
    global.testState.testResults = [];
  },

  async afterEach() {
    // Clean up after each test
    await TestUtils.cleanup();
  }
};

// Export for use in test files
export { globalHooks };