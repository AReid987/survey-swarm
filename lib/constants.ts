export const APP_CONFIG = {
  appName: "Survey Swarm",
  appDescription: "Automated survey completion system with browser automation",
  url: "https://survey-swarm.hive-mind.ai",
  ogImage: "https://survey-swarm.hive-mind.ai/og.jpg",
  links: {
    x: "https://x.com/hivemindai",
    github: "https://github.com/hivemindai/survey-swarm"
  }
}

export const CYBERPUNK_THEME = {
  colors: {
    neon: {
      blue: '#00ffff',
      pink: '#ff00ff',
      green: '#00ff00',
      yellow: '#ffff00',
      purple: '#8b5cf6',
    },
    dark: {
      primary: '#0a0a0a',
      secondary: '#1a1a1a',
      tertiary: '#2a2a2a',
    },
    glass: {
      light: 'rgba(255, 255, 255, 0.05)',
      medium: 'rgba(255, 255, 255, 0.1)',
      heavy: 'rgba(255, 255, 255, 0.15)',
    }
  },
  animations: {
    glow: 'glow 2s ease-in-out infinite alternate',
    pulseNeon: 'pulse-neon 2s ease-in-out infinite',
    float: 'float 3s ease-in-out infinite',
  }
} as const;