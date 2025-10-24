import fs from 'fs';
import path from 'path';
import { config } from './Config.js';

/**
 * Logger - Centralized logging system with file and console output
 * Supports different log levels and structured logging
 */
export class Logger {
  constructor(module = 'App') {
    this.module = module;
    this.logLevel = config.get('LOG_LEVEL', 'info').toLowerCase();
    this.logToFile = config.get('LOG_TO_FILE', true);
    this.logDir = 'logs';

    // Ensure log directory exists
    if (this.logToFile) {
      this.ensureLogDirectory();
    }
  }

  /**
   * Ensure log directory exists
   */
  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  /**
   * Get log file path
   */
  getLogFilePath() {
    const today = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `survey-swarm-${today}.log`);
  }

  /**
   * Format log message
   */
  formatMessage(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const baseMessage = `[${timestamp}] [${level.toUpperCase()}] [${this.module}] ${message}`;

    if (data) {
      return `${baseMessage} ${this.formatData(data)}`;
    }

    return baseMessage;
  }

  /**
   * Format additional data
   */
  formatData(data) {
    try {
      if (data instanceof Error) {
        return JSON.stringify({
          name: data.name,
          message: data.message,
          stack: data.stack
        });
      }
      return JSON.stringify(data);
    } catch (error) {
      return `[Unserializable data: ${typeof data}]`;
    }
  }

  /**
   * Write to file if enabled
   */
  writeToFile(formattedMessage) {
    if (this.logToFile) {
      try {
        fs.appendFileSync(this.getLogFilePath(), formattedMessage + '\n');
      } catch (error) {
        console.error('Failed to write to log file:', error);
      }
    }
  }

  /**
   * Check if log level should be printed
   */
  shouldLog(level) {
    const levels = ['error', 'warn', 'info', 'debug'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);

    return messageLevelIndex <= currentLevelIndex;
  }

  /**
   * Log message with level
   */
  log(level, message, data = null) {
    if (!this.shouldLog(level)) {
      return;
    }

    const formattedMessage = this.formatMessage(level, message, data);

    // Write to file
    this.writeToFile(formattedMessage);

    // Console output with colors
    const colorCodes = {
      error: '\x1b[31m', // Red
      warn: '\x1b[33m',  // Yellow
      info: '\x1b[36m',  // Cyan
      debug: '\x1b[37m'  // White
    };

    const resetCode = '\x1b[0m';
    const coloredMessage = `${colorCodes[level]}${formattedMessage}${resetCode}`;

    switch (level) {
      case 'error':
        console.error(coloredMessage);
        break;
      case 'warn':
        console.warn(coloredMessage);
        break;
      case 'info':
        console.info(coloredMessage);
        break;
      case 'debug':
        console.debug(coloredMessage);
        break;
      default:
        console.log(coloredMessage);
    }
  }

  /**
   * Convenience methods
   */
  error(message, data = null) {
    this.log('error', message, data);
  }

  warn(message, data = null) {
    this.log('warn', message, data);
  }

  info(message, data = null) {
    this.log('info', message, data);
  }

  debug(message, data = null) {
    this.log('debug', message, data);
  }

  /**
   * Log performance metrics
   */
  performance(operation, duration, metadata = {}) {
    this.info(`Performance: ${operation} completed in ${duration}ms`, metadata);
  }

  /**
   * Log survey completion
   */
  surveyCompleted(surveyUrl, questionsAnswered, duration) {
    this.info('Survey completed successfully', {
      url: surveyUrl,
      questionsAnswered,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log survey error
   */
  surveyError(surveyUrl, error, stage = 'unknown') {
    this.error('Survey completion failed', {
      url: surveyUrl,
      stage,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Log browser action
   */
  browserAction(action, url, metadata = {}) {
    this.debug(`Browser action: ${action}`, {
      url,
      ...metadata
    });
  }

  /**
   * Log detection avoidance
   */
  detectionAvoidance(measure, success, metadata = {}) {
    this.info(`Detection avoidance: ${measure}`, {
      success,
      ...metadata
    });
  }
}