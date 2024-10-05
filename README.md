# T3-Flow Project

## Project Overview

A full-stack web application ideologically inspired by Trello, developed using Next.js for the frontend and Nest.js for the backend. The project provides a convenient platform for individual task and project management, enabling users to create, organize, and efficiently track their work.

## Table of Contents

1. [Requirements](#requirements)
2. [Dependencies](#dependencies)
3. [Project Structure](#project-structure)
4. [Installation](#installation)
5. [Running the Project](#running-the-project)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Updating Dependencies](#updating-dependencies)
9. [Contributing](#contributing)
10. [License](#license)

## Requirements

- **Node.js**: v14 or higher
- **pnpm**: for package management

## Dependencies

### Frontend Dependencies Overview

- **[Next.js](https://nextjs.org/)**: Core framework for server-side rendering, routing, and frontend logic.
- **[React](https://react.dev/)**: UI library for building interactive components.
- **[Material UI](https://mui.com/material-ui/getting-started/overview/)**: Pre-built components for responsive, accessible design.
- **[React Query](https://tanstack.com/query/latest/)**: Data fetching and state management with server synchronization.
- **[Axios](https://axios-http.com/)**: HTTP client for making API requests.
- **[Dnd Kit](https://dndkit.com/)**: Drag-and-drop library for task reordering and sorting.
- **[Lexorank](https://github.com/rhys-vdw/lexorank)**: Implemented for dynamic task ranking and smooth reordering within lists.
- **[Emotion](https://emotion.sh/docs/introduction)**: CSS-in-JS library for styling React components.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for efficient UI design.
- **[React Hook Form](https://react-hook-form.com/)**: Library for managing form state and validation.

These technologies handle the essential aspects of routing, UI, data fetching, and task management for the frontend.

### Backend Dependencies Overview

- **[Nest.js](https://nestjs.com/)**: Framework for building scalable, server-side applications with TypeScript.
- **[Prisma](https://www.prisma.io/)**: ORM for database management and querying, used for interacting with the database.
- **[JWT](https://www.npmjs.com/package/@nestjs/jwt)**: JSON Web Token library for authentication and authorization.
- **[Passport](https://www.passportjs.org/)**: Middleware for managing authentication strategies, integrated with JWT.
- **[Argon2](https://www.npmjs.com/package/argon2)**: Library for password hashing to ensure secure user authentication.
- **[RxJS](https://rxjs.dev/)**: Reactive programming library for managing asynchronous data streams.
- **[Class Validator & Class Transformer](https://github.com/typestack/class-validator)**: Libraries for validating and transforming data transfer objects (DTOs).
- **[Cookie Parser](https://www.npmjs.com/package/cookie-parser)**: Middleware for parsing cookies in requests.

These dependencies form the backend architecture for handling authentication, database interactions, and business logic.

## Project Structure

```
t3-flow/
│
├── back-end/               # Nest.js backend
│   ├── ...
│
└── front-end/              # Next.js frontend
    ├── ...
```

## Installation

To set up the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone git@github.com:Rewwoken/t3-flow.git
   cd t3-flow
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd back-end
   pnpm install
   cd ../front-end
   pnpm install
   ```

## Running the Project

### Frontend (Next.js)

1. **Run the Development Server**:
   ```bash
   pnpm dev
   ```

2. **Build the Project for Production**:
   ```bash
   pnpm build
   ```

3. **Start the Production Server**:
   ```bash
   pnpm start
   ```

### Backend (Nest.js)

1. **Run the Development Server**:
   ```bash
   pnpm start:dev
   ```

2. **Build the Project for Production**:
   ```bash
   pnpm build
   ```

3. **Start the Production Server**:
   ```bash
   pnpm start:prod
   ```

### Root `package.json` Scripts

In the root directory, you can use the following scripts to manage both the client and server:

- **Run Development for Both Server and Client**:
   ```bash
   pnpm run dev
   ```
   This command runs the server and client concurrently.

- **Build Both Server and Client**:
   ```bash
   pnpm run build
   ```
   This command builds both parts of the application for production.

- **Start Production for Both Server and Client**:
   ```bash
   pnpm run start:prod
   ```
   This command starts the production server and client concurrently.

- **Format Code for Both Server and Client**:
   ```bash
   pnpm run format
   ```
   This command formats the code for both parts of the application.

## Testing

To run tests, use:
```bash
pnpm test
```

## Deployment

Instructions for deploying the project will depend on your hosting provider. Generally, you will need to:

1. Build the application using the build scripts.
2. Upload the built files to your server.
3. Configure your server to serve the frontend and connect to the backend.

## Updating Dependencies

To update dependencies, run:
```bash
pnpm update
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request or raise an issue.

## License

This project is licensed under the MIT License.