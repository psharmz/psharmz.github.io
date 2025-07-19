# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Parul Sharma's personal portfolio website repository with multiple portfolio implementations:

- **Main React App** (root level): A React 18 application with React Router for navigation between portfolio pages
- **Gatsby Portfolio** (new-portfolio/): A Gatsby-based portfolio using the "Jodie" starter template for designers/photographers
- **Static HTML Versions** (v1/, v2/): Legacy static HTML portfolio versions with custom CSS and JavaScript

## Development Commands

### React App (Main)
```bash
npm start          # Start development server
npm run dev        # Alternative start command
npm run build      # Build for production
npm run test       # Run tests
```

### Gatsby Portfolio (new-portfolio/)
```bash
cd new-portfolio
npm run develop    # Start Gatsby development server
npm run build      # Build Gatsby site
```

## Architecture

### Main React App Structure
- `src/App.js`: Main app component with React Router setup
- `src/components/`: Individual page components (HomePage, WorkPage, EnterprisePage, HealthcarePage, RasaPage, TeamsPage, PasswordProtectedPage)
- `src/index.js`: Entry point with React 18 root rendering
- `public/`: Static assets and images organized by project
- `css/`: Modular CSS files for different sections

### Gatsby Portfolio Structure
- `config/`: Site configuration and theme settings
- `content/projects/`: Project data in YAML format with associated images
- `src/pages/`: Gatsby page components
- `src/components/`: Reusable React components with TypeScript
- `src/templates/`: Template components for dynamic pages

### Static Assets
- `img/` and `public/img/`: Comprehensive image assets organized by project (enterprise, healthcare, rasa, microsoft, etc.)
- `unitegallery/`: Third-party gallery plugin for image displays
- Multiple HTML files at root level for direct access to specific portfolio sections

## Key Features

### Main React App
- Single Page Application with client-side routing
- Modular component architecture
- Responsive design with Bootstrap CSS
- Project-specific pages for different case studies

### Gatsby Portfolio
- Static site generation with TypeScript support
- Instagram integration capability
- SEO optimization with metadata
- CSS-Grid layout with sidebar navigation
- Image optimization and responsive images
- End-to-end testing with Cypress

## Development Notes

- The repository contains multiple portfolio implementations serving different purposes
- Main React app uses traditional React patterns with CSS modules
- Gatsby implementation follows modern JAMstack architecture
- Static versions provide fallback compatibility
- No existing CLAUDE.md, README.md, or development rule files found in main directory