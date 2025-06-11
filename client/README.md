# Style Scribe Templates - Frontend

This is the frontend application for Style Scribe Templates, a React application built with Vite, TypeScript, and Tailwind CSS.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16.x or later recommended)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to set up and run the frontend project locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd style-scribe-templates
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

This will start the development server on [http://localhost:5173](http://localhost:5173) (the default Vite port).

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run build:dev` - Builds the app for development environment
- `npm run preview` - Locally preview the production build
- `npm run lint` - Runs ESLint to check code quality

## Project Structure

```
style-scribe-templates/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries and configuration
│   ├── pages/         # Page components
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global styles
├── index.html         # HTML entry point
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## Technologies Used

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool and development server
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component collection
- [React Router](https://reactrouter.com/) - Routing
- [React Query](https://tanstack.com/query/latest) - Data fetching and state management

## Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Additional Information

- The application uses Tailwind CSS for styling
- UI components are built with shadcn/ui and Radix UI primitives
- State management is handled with React Query
- Routing is managed by React Router

## Connecting to Backend

The frontend is configured to connect to the backend API. If you need to adjust the API endpoint, look for API configuration in the codebase or create a `.env` file with the appropriate variables. 