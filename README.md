# ProFeel Nexus Frontend

A modern, scalable Next.js application for the ProFeel Nexus e-learning platform built with TypeScript, Tailwind CSS, and Zustand for state management.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **State Management**: Zustand with persistence and devtools
- **Authentication**: JWT-based authentication with refresh tokens
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript support with strict type checking
- **Component Library**: Reusable UI components with consistent design
- **API Integration**: Axios-based API client with interceptors
- **Form Handling**: Validated forms with error handling
- **Code Quality**: ESLint, Prettier, and TypeScript strict mode

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd profeel-nexus-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_APP_NAME=ProFeel Nexus
   NEXT_PUBLIC_APP_VERSION=1.0.0
   
   # Authentication
   NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-key
   
   # External Services (Optional)
   NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Modal, etc.)
│   ├── layout/         # Layout components (Header, Footer, Layout)
│   └── forms/          # Form components (LoginForm, RegisterForm)
├── context/            # React Context providers
│   └── auth.context.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useCourses.ts
│   └── useLocalStorage.ts
├── services/           # API services and external integrations
│   ├── api.ts          # Axios instance and configuration
│   ├── auth.service.ts # Authentication API calls
│   └── course.service.ts # Course-related API calls
├── store/              # Zustand state management
│   ├── auth.store.ts   # Authentication state
│   └── course.store.ts # Course state
├── styles/             # Global styles and Tailwind config
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Utility functions
    └── index.ts
```

## 🎨 UI Components

The project includes a comprehensive set of reusable UI components:

### Basic Components
- **Button**: Configurable button with variants (primary, secondary, outline, ghost)
- **Input**: Form input with label, error handling, and validation
- **Modal**: Accessible modal with backdrop and keyboard navigation
- **Card**: Flexible card component with customizable padding and shadows
- **Loading**: Loading spinner with different sizes

### Layout Components
- **Header**: Navigation header with user menu and authentication
- **Footer**: Site footer with links and company information
- **Layout**: Main layout wrapper combining header and footer

### Form Components
- **LoginForm**: Complete login form with validation
- **RegisterForm**: User registration form with password confirmation

## 🔧 State Management

The application uses Zustand for state management with the following stores:

### Auth Store (`src/store/auth.store.ts`)
- User authentication state
- Login/logout functionality
- Token management with persistence
- User profile management

### Course Store (`src/store/course.store.ts`)
- Course catalog management
- Search and filtering
- Enrollment tracking
- Categories and featured courses

## 🌐 API Integration

API services are organized in the `src/services/` directory:

- **api.ts**: Base Axios configuration with interceptors
- **auth.service.ts**: Authentication endpoints
- **course.service.ts**: Course-related endpoints

### API Configuration
The API client includes:
- Automatic token attachment
- Request/response interceptors
- Error handling
- Token refresh logic

## 🎯 Custom Hooks

Custom hooks provide reusable logic:

- **useAuth**: Authentication state and methods
- **useCourses**: Course management functionality
- **useLocalStorage**: Persistent local storage with TypeScript

## 🚦 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript compiler check

# Formatting
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🔒 Authentication Flow

1. **Login**: User submits credentials → API validates → JWT token returned
2. **Token Storage**: Token stored in localStorage with Zustand persistence
3. **API Requests**: Token automatically attached to requests via interceptors
4. **Token Refresh**: Automatic token refresh on expiration
5. **Logout**: Token removed from storage and API calls

## 🎨 Styling Guidelines

### Tailwind CSS
- Use utility-first approach
- Consistent spacing with Tailwind's scale
- Responsive design with mobile-first breakpoints
- Custom color palette for brand consistency

### Component Styling
- Use `cn()` utility for conditional classes
- Maintain consistent component APIs
- Follow accessibility best practices
- Use semantic HTML elements

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

Key responsive features:
- Collapsible navigation menu
- Flexible grid layouts
- Optimized touch targets
- Readable typography scales

## 🧪 Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Component Development
- Create reusable, composable components
- Use TypeScript interfaces for props
- Implement proper error boundaries
- Follow React best practices

### State Management
- Keep state as local as possible
- Use Zustand for global state
- Implement proper loading and error states
- Use TypeScript for type safety

## 🔧 Configuration Files

- **next.config.ts**: Next.js configuration with environment variables
- **tsconfig.json**: TypeScript configuration with path mapping
- **tailwind.config.ts**: Tailwind CSS customization
- **eslint.config.mjs**: ESLint rules and plugins
- **.prettierrc**: Code formatting rules

## 🚀 Deployment

### Build Process
```bash
npm run build
npm run start
```

### Environment Variables
Ensure all required environment variables are set in your deployment environment.

### Performance Optimization
- Next.js automatic code splitting
- Image optimization with next/image
- Bundle analysis with webpack-bundle-analyzer
- Lazy loading for non-critical components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Components are tested and accessible
- [ ] Code follows project conventions
- [ ] Documentation is updated
- [ ] No console errors or warnings

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Axios Documentation](https://axios-http.com/docs/intro)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation and FAQ

---

**Happy coding! 🎉**
# profeelnexus-client
