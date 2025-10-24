import { chromium, firefox, webkit } from 'playwright';
import { randomUseragent } from 'random-useragent';
import { config } from '../utils/Config.js';
import { Logger } from '../utils/Logger.js';
import { DelayManager } from '../behaviors/DelayManager.js';
import { MouseSimulator } from '../behaviors/MouseSimulator.js';

/**
 * Browser Controller - Manages browser instances and page navigation
 * Provides core browser automation functionality with anti-detection features
 */
export class BrowserController {
  constructor(options = {}) {
    this.browser = null;
    this.context = null;
    this.page = null;
    this.options = {
      browserType: options.browserType || 'chromium',
      headless: options.headless ?? config.get('HEADLESS_MODE', true),
      timeout: options.timeout || config.get('BROWSER_TIMEOUT', 30000),
      slowMo: options.slowMo || config.get('SLOW_MO', 100),
      stealth: options.stealth ?? config.get('ENABLE_STEALTH_MODE', true),
      ...options
    };

    this.logger = new Logger('BrowserController');
    this.delayManager = new DelayManager();
    this.mouseSimulator = new MouseSimulator();
  }

  /**
   * Initialize browser instance with anti-detection settings
   */
  async initialize() {
    try {
      this.logger.info('Initializing browser...');

      const launchOptions = {
        headless: this.options.headless,
        timeout: this.options.timeout,
        slowMo: this.options.slowMo,
        args: this.getBrowserArguments()
      };

      // Select browser type
      const browserEngine = this.getBrowserEngine();
      this.browser = await browserEngine.launch(launchOptions);

      // Create browser context with custom settings
      this.context = await this.browser.newContext(this.getContextOptions());

      // Create new page
      this.page = await this.context.newPage();

      // Setup event handlers
      this.setupEventHandlers();

      // Apply stealth measures
      if (this.options.stealth) {
        await this.applyStealthMeasures();
      }

      this.logger.info(`Browser initialized successfully (${this.options.browserType})`);
      return true;

    } catch (error) {
      this.logger.error('Failed to initialize browser:', error);
      throw error;
    }
  }

  /**
   * Get browser engine based on type
   */
  getBrowserEngine() {
    switch (this.options.browserType) {
      case 'firefox':
        return firefox;
      case 'webkit':
        return webkit;
      case 'chromium':
      default:
        return chromium;
    }
  }

  /**
   * Get browser arguments for anti-detection
   */
  getBrowserArguments() {
    const args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ];

    if (this.options.stealth) {
      args.push(
        '--disable-blink-features=AutomationControlled',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection'
      );
    }

    return args;
  }

  /**
   * Get context options for browser
   */
  getContextOptions() {
    const options = {
      viewport: { width: 1920, height: 1080 },
      userAgent: this.getRandomUserAgent(),
      locale: 'en-US',
      timezoneId: 'America/New_York',
      permissions: ['geolocation', 'notifications'],
      ignoreHTTPSErrors: true
    };

    // Add proxy if configured
    if (process.env.PROXY_SERVER) {
      options.proxy = {
        server: process.env.PROXY_SERVER,
        username: process.env.PROXY_USERNAME,
        password: process.env.PROXY_PASSWORD
      };
    }

    return options;
  }

  /**
   * Get random user agent
   */
  getRandomUserAgent() {
    if (!config.get('RANDOM_USER_AGENT', true)) {
      return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    }

    return randomUseragent.getRandom((ua) => {
      return ua.browserName === 'Chrome' &&
             parseFloat(ua.browserVersion) >= 110 &&
             !ua.osName.includes('Linux');
    });
  }

  /**
   * Setup event handlers for page events
   */
  setupEventHandlers() {
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        this.logger.warn('Page console error:', msg.text());
      }
    });

    this.page.on('pageerror', (error) => {
      this.logger.error('Page error:', error);
    });

    this.page.on('requestfailed', (request) => {
      this.logger.warn('Request failed:', request.url(), request.failure()?.errorText);
    });
  }

  /**
   * Apply stealth measures to avoid detection
   */
  async applyStealthMeasures() {
    try {
      // Remove webdriver property
      await this.page.addInitScript(() => {
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined,
        });
      });

      // Override permissions API
      await this.page.addInitScript(() => {
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) => (
          parameters.name === 'notifications' ?
            Promise.resolve({ state: Notification.permission }) :
            originalQuery(parameters)
        );
      });

      // Override plugins
      await this.page.addInitScript(() => {
        Object.defineProperty(navigator, 'plugins', {
          get: () => [
            {
              0: {
                type: "application/x-google-chrome-pdf",
                suffixes: "pdf",
                description: "Portable Document Format",
                enabledPlugin: Plugin
              },
              description: "Portable Document Format",
              filename: "internal-pdf-viewer",
              length: 1,
              name: "Chrome PDF Plugin"
            }
          ],
        });
      });

      // Override languages
      await this.page.addInitScript(() => {
        Object.defineProperty(navigator, 'languages', {
          get: () => ['en-US', 'en'],
        });
      });

      this.logger.info('Stealth measures applied');
    } catch (error) {
      this.logger.error('Failed to apply stealth measures:', error);
    }
  }

  /**
   * Navigate to URL with human-like delays
   */
  async navigate(url, options = {}) {
    try {
      this.logger.info(`Navigating to: ${url}`);

      await this.delayManager.randomDelay();

      const response = await this.page.goto(url, {
        waitUntil: options.waitUntil || 'networkidle',
        timeout: options.timeout || this.options.timeout
      });

      // Add small delay after navigation
      await this.delayManager.smallDelay();

      // Simulate mouse movement
      await this.mouseSimulator.randomMovement(this.page);

      this.logger.info(`Navigation completed: ${response?.status()}`);
      return response;

    } catch (error) {
      this.logger.error(`Navigation failed for ${url}:`, error);
      throw error;
    }
  }

  /**
   * Wait for element to appear
   */
  async waitForElement(selector, options = {}) {
    try {
      return await this.page.waitForSelector(selector, {
        timeout: options.timeout || this.options.timeout,
        state: options.state || 'visible'
      });
    } catch (error) {
      this.logger.warn(`Element not found: ${selector}`);
      throw error;
    }
  }

  /**
   * Get page content
   */
  async getContent() {
    return await this.page.content();
  }

  /**
   * Get page URL
   */
  async getUrl() {
    return this.page.url();
  }

  /**
   * Take screenshot
   */
  async screenshot(options = {}) {
    const defaultOptions = {
      fullPage: true,
      type: 'png'
    };

    return await this.page.screenshot({ ...defaultOptions, ...options });
  }

  /**
   * Execute JavaScript in page context
   */
  async evaluate(script, ...args) {
    return await this.page.evaluate(script, ...args);
  }

  /**
   * Get current page instance
   */
  getPage() {
    return this.page;
  }

  /**
   * Close browser
   */
  async close() {
    try {
      if (this.context) {
        await this.context.close();
      }
      if (this.browser) {
        await this.browser.close();
      }
      this.logger.info('Browser closed successfully');
    } catch (error) {
      this.logger.error('Error closing browser:', error);
    }
  }

  /**
   * Check if browser is initialized
   */
  isInitialized() {
    return this.browser !== null && this.page !== null;
  }
}