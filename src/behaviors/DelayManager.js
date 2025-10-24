import { config } from '../utils/Config.js';
import { Logger } from '../utils/Logger.js';

/**
 * Delay Manager - Manages human-like delays and timing
 * Implements various delay strategies to simulate human behavior
 */
export class DelayManager {
  constructor() {
    this.logger = new Logger('DelayManager');
    this.minDelay = config.get('MIN_DELAY', 500);
    this.maxDelay = config.get('MAX_DELAY', 3000);
  }

  /**
   * Generate random delay between min and max values
   */
  getRandomDelay(min = this.minDelay, max = this.maxDelay) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Sleep for specified milliseconds
   */
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Random delay - most commonly used
   */
  async randomDelay(min = null, max = null) {
    const delay = this.getRandomDelay(min || this.minDelay, max || this.maxDelay);
    this.logger.debug(`Delaying for ${delay}ms`);
    await this.sleep(delay);
  }

  /**
   * Small delay - for quick interactions
   */
  async smallDelay() {
    const delay = this.getRandomDelay(100, 500);
    this.logger.debug(`Small delay: ${delay}ms`);
    await this.sleep(delay);
  }

  /**
   * Medium delay - for page interactions
   */
  async mediumDelay() {
    const delay = this.getRandomDelay(800, 2000);
    this.logger.debug(`Medium delay: ${delay}ms`);
    await this.sleep(delay);
  }

  /**
   * Large delay - for significant actions
   */
  async largeDelay() {
    const delay = this.getRandomDelay(3000, 8000);
    this.logger.debug(`Large delay: ${delay}ms`);
    await this.sleep(delay);
  }

  /**
   * Thinking delay - simulates user thinking
   */
  async thinkingDelay() {
    const delay = this.getRandomDelay(1500, 4000);
    this.logger.debug(`Thinking delay: ${delay}ms`);
    await this.sleep(delay);
  }

  /**
   * Reading delay - simulates reading text
   */
  async readingDelay(wordCount = 50) {
    // Average reading speed: 200-300 words per minute
    const wordsPerMinute = 250;
    const readingTimeMs = (wordCount / wordsPerMinute) * 60 * 1000;
    const variance = readingTimeMs * 0.3; // 30% variance
    const delay = readingTimeMs + (Math.random() - 0.5) * variance * 2;

    this.logger.debug(`Reading delay: ${Math.round(delay)}ms for ${wordCount} words`);
    await this.sleep(Math.max(500, Math.round(delay)));
  }

  /**
   * Typing delay - simulates typing speed
   */
  async typingDelay(charCount = 1) {
    const minCharsPerSecond = config.get('TYPING_SPEED_MIN', 50);
    const maxCharsPerSecond = config.get('TYPING_SPEED_MAX', 150);

    const charsPerSecond = this.getRandomDelay(minCharsPerSecond, maxCharsPerSecond);
    const delay = (charCount / charsPerSecond) * 1000;

    this.logger.debug(`Typing delay: ${Math.round(delay)}ms for ${charCount} chars`);
    await this.sleep(Math.max(50, Math.round(delay)));
  }

  /**
   * Form submission delay - simulates review before submit
   */
  async submissionDelay() {
    const delay = this.getRandomDelay(2000, 5000);
    this.logger.debug(`Submission delay: ${delay}ms`);
    await this.sleep(delay);
  }

  /**
   * Navigation delay - simulates page load waiting
   */
  async navigationDelay() {
    const delay = this.getRandomDelay(1000, 3000);
    this.logger.debug(`Navigation delay: ${delay}ms`);
    await this.sleep(delay);
  }

  /**
   * Error recovery delay - for retry scenarios
   */
  async errorDelay(attempt = 1) {
    // Exponential backoff with jitter
    const baseDelay = 2000;
    const exponentialDelay = baseDelay * Math.pow(2, attempt - 1);
    const jitter = Math.random() * 1000;
    const delay = Math.min(exponentialDelay + jitter, 30000); // Cap at 30 seconds

    this.logger.debug(`Error recovery delay: ${Math.round(delay)}ms (attempt ${attempt})`);
    await this.sleep(Math.round(delay));
  }

  /**
   * Natural delay - combination of various delays for realistic behavior
   */
  async naturalDelay(action = 'generic') {
    switch (action) {
      case 'click':
        await this.smallDelay();
        break;
      case 'type':
        await this.typingDelay();
        break;
      case 'scroll':
        await this.smallDelay();
        break;
      case 'read':
        await this.readingDelay();
        break;
      case 'think':
        await this.thinkingDelay();
        break;
      case 'submit':
        await this.submissionDelay();
        break;
      case 'navigate':
        await this.navigationDelay();
        break;
      default:
        await this.randomDelay();
        break;
    }
  }

  /**
   * Progressive delay - increases with consecutive actions
   */
  async progressiveDelay(actionCount = 1) {
    const baseDelay = this.minDelay;
    const increment = 200; // Increase by 200ms per action
    const delay = baseDelay + (actionCount * increment);

    this.logger.debug(`Progressive delay: ${delay}ms (action ${actionCount})`);
    await this.sleep(Math.min(delay, this.maxDelay * 2));
  }

  /**
   * Get delay statistics for monitoring
   */
  getStats() {
    return {
      minDelay: this.minDelay,
      maxDelay: this.maxDelay,
      averageDelay: (this.minDelay + this.maxDelay) / 2
    };
  }
}