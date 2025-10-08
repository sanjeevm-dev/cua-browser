# Overview

CUA Browser is a demonstration playground for testing OpenAI's Computer Use Agent with Browserbase. It's a Next.js application that allows users to interact with an AI agent that can autonomously browse the web through a visual interface. The application streams real-time browser sessions, showing users what the AI is doing as it navigates websites, clicks elements, types text, and accomplishes tasks.

# Recent Changes

**October 6, 2025** - Removed Authentication System
- Removed Stack Auth integration to make the platform publicly accessible without login
- Deleted Stack Auth configuration files and handler routes
- Updated TopBar and page components to work without authentication
- Application now runs as an open platform without user authentication requirements

**October 6, 2025** - Initial Setup and Configuration
- Configured Next.js development server workflow running on port 5000
- Added required API credentials as environment variables:
  - OpenAI API (OPENAI_API_KEY) for AI agent functionality
  - Browserbase (BROWSERBASE_API_KEY, BROWSERBASE_PROJECT_ID) for browser automation

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: Next.js 15 with React 19 using the App Router architecture and React Server Components (RSC).

**UI Components**: Built with shadcn/ui component library using the "new-york" style variant. Components are organized under `/app/components` with a dedicated `/app/components/ui` directory for reusable UI primitives.

**Styling**: Tailwind CSS with custom utility classes, CSS variables for theming, and dark mode support. Uses custom fonts (Inter and PP Neue Montreal) for typography.

**Design System**: Premium, minimal black aesthetic with glassmorphism effects inspired by Spotify, Apple, Emergent, and Lovable:
- **Base Color**: Pure black (#000000) background throughout the application
- **Glassmorphism**: Semi-transparent black containers with `backdrop-blur-xl` effects (black/[0.3-0.6] opacity)
- **Borders**: Consistent white/[0.08] borders for all components with rounded corners (rounded-lg, rounded-xl, rounded-2xl)
- **Accents**: Subtle blue highlights (blue-600/20 backgrounds, blue-500/30 borders) for active states and emphasis
- **Typography**: White text with varying opacity levels (white/70-90) for hierarchy and accessibility
- **Contrast**: All interactive elements meet WCAG 4.5:1 contrast ratio requirements (70%+ white opacity on black = 11:1+)
- **Components Updated**: BrowserSessionContainer, SessionControls, BrowserTabs, ChatBlock, ChatFeed

**State Management**: Jotai for global state management, combined with React's built-in hooks (useState, useEffect, useCallback, useRef) for local component state.

**Animations**: Framer Motion (v11) and Motion (v12) for complex UI animations, transitions, and spring-based interactions. Custom animations include curtain reveals, sliding numbers, and pulsing glow effects.

**Key Design Patterns**:
- Client-side components marked with "use client" directive for interactive features
- TypeScript for type safety across the application
- Responsive design with mobile-first approach using Tailwind breakpoints
- Custom hook usage (usehooks-ts library) for common patterns like window size detection

## Backend Architecture

**API Routes**: Next.js API routes under `/app/api` with the following structure:
- `/api/cua/*` - Computer Use Agent endpoints for orchestrating AI browser automation
- `/api/session/*` - Session management endpoints for browser instances

**Agent System**: Custom Computer Use Agent implementation that:
- Interfaces with OpenAI's API using the "computer-use-preview" model
- Controls browser instances through Playwright
- Processes multiple types of tool calls (computer actions and function calls)
- Implements retry logic with axios-retry for resilience
- Maintains conversation history with response chaining

**Browser Automation**: Uses Playwright Core for headless browser control with:
- Custom key mapping for cross-platform compatibility
- Screenshot capture and image processing
- Mouse and keyboard action simulation
- Page navigation and element interaction

**Request Flow**:
1. User submits task through frontend
2. `/api/cua/start` initializes browser session and agent
3. Agent generates actions via `/api/cua/step/generate`
4. Actions executed via `/api/cua/step/execute`
5. Results streamed back to frontend for display

**Configuration**:
- Extended function timeout (300 seconds) for long-running browser operations
- Custom viewport dimensions (1024x768) for consistent rendering
- Regional deployment optimization with timezone-based region selection

## External Dependencies

**OpenAI Integration**:
- **Service**: OpenAI API for the Computer Use Agent model
- **SDK**: `openai` package (v4.86.2) and `@ai-sdk/openai` (v1.1.2)
- **Purpose**: Powers the AI reasoning and decision-making for browser automation
- **Configuration**: Requires `OPENAI_API_KEY` and optional `OPENAI_ORG` environment variables

**Browserbase Platform**:
- **Service**: Browserbase headless browser infrastructure
- **SDK**: `@browserbasehq/sdk` (v2.0.0)
- **Purpose**: Provides remote browser instances with live URL streaming, session recording, and multi-region support
- **Features Used**: Session creation, live debugging, page tracking, proxy support
- **Configuration**: Requires `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` environment variables
- **Regions**: Supports us-west-2, us-east-1, eu-central-1, ap-southeast-1 with automatic region selection based on user timezone

**Playwright**:
- **Package**: `playwright-core` (v1.50.0)
- **Purpose**: Browser automation library for controlling Browserbase sessions
- **Usage**: Chromium-based browser control, screenshot capture, DOM interaction

**Analytics & Monitoring**:
- **Vercel Analytics**: Client-side analytics for deployment metrics
- **PostHog**: Product analytics with session tracking and event monitoring
- **Configuration**: Requires `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables

**HTTP Client**:
- **Library**: axios with axios-retry
- **Purpose**: Resilient API communication with automatic retry logic for failed requests

**Image Processing**:
- **Library**: Sharp (v0.33.5)
- **Purpose**: Server-side image optimization for Next.js Image component

**Deployment**:
- **Platform**: Vercel with custom configuration for extended serverless function timeouts
- **Environment**: Node.js-based with TypeScript compilation