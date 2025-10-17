# TechnoGenco

Modern Angular application for TechnoGenco - technical and industrial solutions company.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.17.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/GencoMattia/techno_genco.git

# Navigate to project directory
cd techno_genco

# Install dependencies
npm install
```

## Development server

To start a local development server, run:

```bash
npm start
# or
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 📁 Project Structure

The application includes the following main pages:

- **Home** (`/`) - Landing page with hero section and company overview
- **About** (`/about`) - Company information and mission
- **Products** (`/products`) - Product catalog with alternating image/text layout
- **Solutions** (`/solutions`) - Technical solutions showcase
- **Resources** (`/resources`) - Team profiles and resources
- **Contact** (`/contact`) - Contact form and information

## 🎨 Theming & Styling

This project uses:
- **Tailwind CSS** - Utility-first CSS framework
- **Angular Material** - Material Design components with custom theme
- **Custom Color Palette** - Technical/industrial color scheme defined in `src/styles/_variables.scss`

### Theme Colors
- Primary: Blue Steel (#0f88d1)
- Accent: Technical Orange (#F7931E)
- Tertiary: Green (#28b24f)

The Material theme is fully integrated and maps custom palette variables to Material components.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
