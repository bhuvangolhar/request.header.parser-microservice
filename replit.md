@# Header Parser API

# # Over view

This is a full-stack web application that provides an HTTP header parsing service. The application analyzes incoming HTTP requests and extracts detailed 
information a bout the c lient's IP address, browser, operating system, device, and language preferences. It features a modern React frontend with shadcn/ui 
components and an Express.js backend with TypeScript.

## User Preferences

Preferred communication style: Simple and everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework using TypeScript
- **API Design**: RESTful endpoints with JSON responses
- **Request Processing**: Custom middleware for logging and header parsing
- **Error Handling**: Centralized error handling middleware
- **Development**: Vite integration for hot module replacement in development

### Data Storage Solutions
- **Primary Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL
- **In-Memory Storage**: Fallback MemStorage implementation for development/testing
- **Schema Management**: Drizzle Kit for migrations and schema management

### Authentication and Authorization
- **User Model**: Simple username/password authentication schema
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Password Storage**: Plain text storage (development setup)

### Key Features
- **IP Address Detection**: Multi-source IP resolution with proxy header support (X-Forwarded-For, X-Real-IP, CF-Connecting-IP)
- **User Agent Parsing**: Comprehensive browser, OS, and device information extraction
- **Language Detection**: Accept-Language header parsing with quality score ranking
- **Real-time Testing**: Interactive API testing interface with custom header support
- **Response Display**: Formatted JSON response viewer with copy functionality
- **Documentation**: Built-in API documentation with code examples

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web application framework
- **react**: Frontend UI library
- **@tanstack/react-query**: Server state management

### UI and Styling
- **@radix-ui/**: Complete suite of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for Node.js
- **esbuild**: JavaScript bundler for production builds

### Utility Libraries
- **zod**: Schema validation
- **date-fns**: Date manipulation utilities
- **nanoid**: Unique ID generation
- **wouter**: Lightweight routing
