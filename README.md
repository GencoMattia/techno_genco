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

## ✅ Automatic deployment to GitHub Pages

This repository is configured to automatically build the Angular app and publish the production build to the `gh-pages` branch whenever a push to `master` occurs.

What I added:
- A GitHub Actions workflow at `.github/workflows/deploy.yml` which builds the app and publishes `dist/techno_genco` to the `gh-pages` branch using `peaceiris/actions-gh-pages`.
- An npm script `build:prod` which runs a production build.

Repository setup notes:
- No extra secrets are required; the workflow uses the built-in `GITHUB_TOKEN` to push the `gh-pages` branch.
- After the first deployment you may need to enable GitHub Pages for the repository and set the source to the `gh-pages` branch (Repository Settings → Pages).

How to test locally:

```powershell
# install deps
npm install

# build prod locally
npm run build:prod

# verify the output is in dist/techno_genco
dir .\dist\techno_genco
```

If you want the site to be served at a custom path or organization site, let me know and I can adjust the workflow accordingly.
