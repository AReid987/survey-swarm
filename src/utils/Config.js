import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Configuration Manager - Centralized configuration management
 * Handles environment variables and default values
 */
export class Config {
  static get(key, defaultValue = null) {
    const value = process.env[key];

    if (value === undefined) {
      return defaultValue;
    }

    // Convert string values to appropriate types
    if (typeof defaultValue === 'boolean') {
      return value.toLowerCase() === 'true';
    }

    if (typeof defaultValue === 'number') {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? defaultValue : parsed;
    }

    return value;
  }

  static getAll() {
    return process.env;
  }

  static set(key, value) {
    process.env[key] = String(value);
  }

  static isDevelopment() {
    return this.get('NODE_ENV', 'development') === 'development';
  }

  static isProduction() {
    return this.get('NODE_ENV', 'development') === 'production';
  }

  static isTest() {
    return this.get('NODE_ENV', 'development') === 'test';
  }
}

// Export singleton instance
export const config = new Config();