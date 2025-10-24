import { config } from '../utils/Config.js';
import { Logger } from '../utils/Logger.js';

/**
 * Mouse Simulator - Simulates human-like mouse movements and interactions
 * Implements realistic mouse behavior patterns to avoid detection
 */
export class MouseSimulator {
  constructor() {
    this.logger = new Logger('MouseSimulator');
    this.enabled = config.get('MOUSE_MOVEMENT_ENABLED', true);
  }

  /**
   * Generate random position within viewport
   */
  getRandomPosition(viewport) {
    const margin = 50; // Keep away from edges
    return {
      x: margin + Math.random() * (viewport.width - 2 * margin),
      y: margin + Math.random() * (viewport.height - 2 * margin)
    };
  }

  /**
   * Generate curved path between two points (Bezier curve)
   */
  generateCurvedPath(start, end) {
    const controlPoints = [];
    const steps = 10 + Math.floor(Math.random() * 20); // 10-30 steps

    // Generate control points for natural curve
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;

      // Add some randomness to make it more natural
      const randomOffset = {
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100
      };

      const point = {
        x: start.x + (end.x - start.x) * t + randomOffset.x,
        y: start.y + (end.y - start.y) * t + randomOffset.y
      };

      controlPoints.push(point);
    }

    return controlPoints;
  }

  /**
   * Move mouse along a path with realistic speed variations
   */
  async moveAlongPath(page, points) {
    for (let i = 0; i < points.length - 1; i++) {
      const start = points[i];
      const end = points[i + 1];

      // Calculate distance and speed
      const distance = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
      );

      // Variable speed: slower at start and end, faster in middle
      const progress = i / points.length;
      const speedMultiplier = 0.5 + Math.sin(progress * Math.PI) * 0.5;
      const baseSpeed = 0.5; // ms per pixel
      const duration = distance * baseSpeed / speedMultiplier;

      await page.mouse.move(end.x, end.y, { steps: Math.max(1, Math.floor(duration / 16)) });

      // Small random delay between movements
      if (Math.random() < 0.1) { // 10% chance of pause
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 200));
      }
    }
  }

  /**
   * Move mouse to specific element
   */
  async moveToElement(page, selector) {
    if (!this.enabled) return;

    try {
      const element = await page.$(selector);
      if (!element) {
        this.logger.warn(`Element not found for mouse movement: ${selector}`);
        return;
      }

      const box = await element.boundingBox();
      if (!box) {
        this.logger.warn(`Could not get bounding box for element: ${selector}`);
        return;
      }

      // Get current mouse position
      const currentPosition = await page.evaluate(() => ({
        x: window.mouseX || window.innerWidth / 2,
        y: window.mouseY || window.innerHeight / 2
      }));

      // Target position (center of element with some randomness)
      const target = {
        x: box.x + box.width / 2 + (Math.random() - 0.5) * 20,
        y: box.y + box.height / 2 + (Math.random() - 0.5) * 20
      };

      // Generate curved path and move
      const path = this.generateCurvedPath(currentPosition, target);
      await this.moveAlongPath(page, path);

      this.logger.debug(`Mouse moved to element: ${selector}`);

    } catch (error) {
      this.logger.error(`Error moving mouse to element ${selector}:`, error);
    }
  }

  /**
   * Move mouse to random position
   */
  async randomMovement(page) {
    if (!this.enabled) return;

    try {
      const viewport = page.viewportSize();
      const currentPosition = await page.evaluate(() => ({
        x: window.mouseX || window.innerWidth / 2,
        y: window.mouseY || window.innerHeight / 2
      }));

      const target = this.getRandomPosition(viewport);
      const path = this.generateCurvedPath(currentPosition, target);
      await this.moveAlongPath(page, path);

      this.logger.debug('Random mouse movement completed');

    } catch (error) {
      this.logger.error('Error during random mouse movement:', error);
    }
  }

  /**
   * Simulate mouse hover
   */
  async hover(page, selector, duration = 1000) {
    if (!this.enabled) return;

    try {
      await this.moveToElement(page, selector);

      // Hover for specified duration with small movements
      const hoverTime = duration;
      const interval = 100;
      const iterations = hoverTime / interval;

      for (let i = 0; i < iterations; i++) {
        if (Math.random() < 0.3) { // 30% chance of small movement
          await page.mouse.move(
            await page.evaluate(() => window.mouseX) + (Math.random() - 0.5) * 5,
            await page.evaluate(() => window.mouseY) + (Math.random() - 0.5) * 5
          );
        }
        await new Promise(resolve => setTimeout(resolve, interval));
      }

    } catch (error) {
      this.logger.error(`Error hovering over element ${selector}:`, error);
    }
  }

  /**
   * Simulate realistic click
   */
  async click(page, selector) {
    if (!this.enabled) {
      await page.click(selector);
      return;
    }

    try {
      // Move to element
      await this.moveToElement(page, selector);

      // Small delay before click
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

      // Click with slight delay between down and up
      await page.mouse.down();
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
      await page.mouse.up();

      // Small movement after click
      await page.mouse.move(
        await page.evaluate(() => window.mouseX) + (Math.random() - 0.5) * 10,
        await page.evaluate(() => window.mouseY) + (Math.random() - 0.5) * 10
      );

      this.logger.debug(`Realistic click performed on: ${selector}`);

    } catch (error) {
      this.logger.error(`Error performing realistic click on ${selector}:`, error);
      // Fallback to regular click
      await page.click(selector);
    }
  }

  /**
   * Simulate double click
   */
  async doubleClick(page, selector) {
    if (!this.enabled) {
      await page.dblclick(selector);
      return;
    }

    try {
      await this.moveToElement(page, selector);

      // First click
      await page.mouse.down();
      await new Promise(resolve => setTimeout(resolve, 50));
      await page.mouse.up();

      // Short delay between clicks
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));

      // Second click
      await page.mouse.down();
      await new Promise(resolve => setTimeout(resolve, 50));
      await page.mouse.up();

      this.logger.debug(`Realistic double click performed on: ${selector}`);

    } catch (error) {
      this.logger.error(`Error performing realistic double click on ${selector}:`, error);
      await page.dblclick(selector);
    }
  }

  /**
   * Simulate right click (context menu)
   */
  async rightClick(page, selector) {
    if (!this.enabled) {
      await page.click(selector, { button: 'right' });
      return;
    }

    try {
      await this.moveToElement(page, selector);
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
      await page.click(selector, { button: 'right' });

      this.logger.debug(`Realistic right click performed on: ${selector}`);

    } catch (error) {
      this.logger.error(`Error performing realistic right click on ${selector}:`, error);
      await page.click(selector, { button: 'right' });
    }
  }

  /**
   * Simulate drag and drop
   */
  async dragAndDrop(page, sourceSelector, targetSelector) {
    if (!this.enabled) {
      await page.dragAndDrop(sourceSelector, targetSelector);
      return;
    }

    try {
      // Move to source
      await this.moveToElement(page, sourceSelector);
      await new Promise(resolve => setTimeout(resolve, 200));

      // Start drag
      await page.mouse.down();

      // Move to target with path
      const sourceElement = await page.$(sourceSelector);
      const targetElement = await page.$(targetSelector);

      if (sourceElement && targetElement) {
        const sourceBox = await sourceElement.boundingBox();
        const targetBox = await targetElement.boundingBox();

        if (sourceBox && targetBox) {
          const start = {
            x: sourceBox.x + sourceBox.width / 2,
            y: sourceBox.y + sourceBox.height / 2
          };

          const end = {
            x: targetBox.x + targetBox.width / 2,
            y: targetBox.y + targetBox.height / 2
          };

          const path = this.generateCurvedPath(start, end);
          await this.moveAlongPath(page, path);
        }
      }

      // Drop
      await new Promise(resolve => setTimeout(resolve, 100));
      await page.mouse.up();

      this.logger.debug(`Realistic drag and drop performed: ${sourceSelector} -> ${targetSelector}`);

    } catch (error) {
      this.logger.error(`Error performing realistic drag and drop:`, error);
      await page.dragAndDrop(sourceSelector, targetSelector);
    }
  }

  /**
   * Initialize mouse tracking on page
   */
  async initializeMouseTracking(page) {
    await page.addInitScript(() => {
      window.mouseX = window.innerWidth / 2;
      window.mouseY = window.innerHeight / 2;

      document.addEventListener('mousemove', (e) => {
        window.mouseX = e.clientX;
        window.mouseY = e.clientY;
      });
    });
  }

  /**
   * Get current mouse position
   */
  async getCurrentPosition(page) {
    return await page.evaluate(() => ({
      x: window.mouseX || window.innerWidth / 2,
      y: window.mouseY || window.innerHeight / 2
    }));
  }

  /**
   * Simulate reading behavior (mouse movement while reading)
   */
  async simulateReading(page, duration = 3000) {
    if (!this.enabled) return;

    try {
      const startTime = Date.now();
      const viewport = page.viewportSize();

      while (Date.now() - startTime < duration) {
        // Small random movements to simulate reading
        const currentPos = await this.getCurrentPosition(page);
        const newX = currentPos.x + (Math.random() - 0.5) * 50;
        const newY = currentPos.y + (Math.random() - 0.5) * 20;

        // Keep within viewport
        const boundedX = Math.max(50, Math.min(viewport.width - 50, newX));
        const boundedY = Math.max(50, Math.min(viewport.height - 50, newY));

        await page.mouse.move(boundedX, boundedY);
        await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 400));
      }

    } catch (error) {
      this.logger.error('Error simulating reading behavior:', error);
    }
  }
}