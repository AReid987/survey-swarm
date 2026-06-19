# Survey Swarm Frontend

A sophisticated real-time monitoring dashboard for the Survey Swarm automation system, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Real-time Monitoring**: Live agent status and survey session tracking
- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion animations
- **Type-Safe**: Full TypeScript implementation with comprehensive type definitions
- **Scalable Architecture**: Organized component structure with state management
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Built-in theme support with system preference detection
- **Performance Optimized**: Code splitting and lazy loading for optimal performance

## 🛠️ Technology Stack

### Core Framework
- **React 18.3+** with TypeScript
- **Vite 7+** for lightning-fast development and builds
- **React Router** for client-side routing

### Styling & UI
- **Tailwind CSS** with custom design system
- **Headless UI** for accessible component primitives
- **Framer Motion** for smooth animations
- **Heroicons** for consistent iconography

### State Management
- **Zustand** for lightweight client state
- **React Query (TanStack Query)** for server state management
- **React Hook Form** with Zod validation

### Data Visualization
- **D3.js** for advanced data visualizations
- **Recharts** for responsive chart components
- **Custom SVG components** for hive visualizations

### Development Tools
- **ESLint** with TypeScript support
- **Prettier** with Tailwind plugin
- **TypeScript** for type safety
- **PostCSS** for CSS processing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Card, etc.)
│   ├── layout/         # Layout components (Navigation, Layout)
│   ├── charts/         # Chart and visualization components
│   ├── forms/          # Form components
│   └── features/       # Feature-specific components
├── pages/              # Page-level components
│   ├── dashboard/      # Dashboard overview
│   ├── agents/         # Agent management
│   ├── surveys/        # Survey management
│   ├── analytics/      # Analytics and reporting
│   └── settings/       # Application settings
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions
├── store/              # State management (Zustand stores)
├── api/                # API layer and services
├── assets/             # Static assets (images, fonts)
├── styles/             # Global styles and theme configuration
├── lib/                # Third-party library configurations
└── constants/          # Application constants and configuration
```

## 🎨 Design System

The application uses a custom design system built on Tailwind CSS:

### Color Palette
- **Primary**: Blue scale for primary actions and branding
- **Secondary**: Green scale for success states
- **Hive Amber**: Custom amber scale for hive-specific elements
- **Semantic Colors**: Success, warning, error, and info scales
- **Neutral**: Slate scale for text and backgrounds

### Typography
- **Primary**: Inter font family
- **Display**: Inter Display for headlines
- **Mono**: JetBrains Mono for code and data

### Components
- Pre-built button variants (primary, secondary, outline, ghost)
- Card components with consistent styling
- Form inputs with validation states
- Status badges and indicators
- Loading states and spinners

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd survey-swarm/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment configuration:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=10000

# WebSocket Configuration
VITE_WS_URL=ws://localhost:8000

# Application Configuration
VITE_APP_NAME=Survey Swarm
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ERROR_REPORTING=false
VITE_ENABLE_PERFORMANCE_MONITORING=true
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🔧 Configuration

### Tailwind CSS

The Tailwind configuration is extended with:
- Custom color palettes
- Extended spacing and sizing
- Custom animations and keyframes
- Component classes for consistent styling

### TypeScript

TypeScript is configured with:
- Strict type checking
- Path aliases for clean imports
- Comprehensive type definitions
- Linting integration

### Vite

Vite is configured with:
- Path aliases matching TypeScript configuration
- Development server with proxy configuration
- Build optimizations with code splitting
- Plugin configurations for React and TypeScript

## 🧪 Development

### Code Style

The project uses:
- **ESLint** for code linting with TypeScript rules
- **Prettier** for code formatting with Tailwind plugin
- **Conventional commits** for commit messages

### Component Development

When creating new components:
1. Use TypeScript interfaces for props
2. Follow the established component structure
3. Include proper accessibility attributes
4. Add responsive design considerations
5. Document complex logic with comments

### State Management

- Use **Zustand** for client-side state
- Use **React Query** for server state
- Keep state close to where it's used
- Avoid prop drilling when possible

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist` directory.

### Environment Configuration

Configure the appropriate environment variables for your deployment target.

### Static Hosting

The build output can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 🤝 Contributing

1. Follow the established code style
2. Write meaningful commit messages
3. Add type definitions for new features
4. Test thoroughly before submitting
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built by the Hive Mind Swarm - Coder Agent team as part of the Survey Swarm automation system.
