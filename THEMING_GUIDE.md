# TechnoGenco - Material Theming Guide

## Overview
This document explains how Angular Material theming is configured in the TechnoGenco project.

## Theme Architecture

### Color Palette Structure
The project uses custom color palettes defined in `src/styles/_variables.scss`:

- **Primary Palette**: Blue Steel shades (50-900)
- **Accent/Tertiary Palette**: Green shades (50-900)
- **Warn Palette**: Orange shades (based on technical orange)

### Theme Configuration File
Location: `src/styles/_mat-theme.scss`

#### Key Components:

1. **Custom Palette Maps**
   - Maps SCSS shade variables to Material palette structure
   - Includes contrast colors for accessibility
   - Uses proper Material palette format with 50-900 shades

2. **Material M2 API Usage**
   - Uses `mat.m2-define-palette()` for palette definition
   - Uses `mat.m2-define-light-theme()` for theme creation
   - Imports from `@angular/material` with M2 prefix

3. **Theme Application**
   ```scss
   @include mat.core();
   @include mat.all-component-themes($techno-theme);
   ```

4. **CSS Variables Export**
   - Exports all palette shades as CSS custom properties
   - Enables Tailwind CSS integration
   - Provides runtime theme access

## Integration Points

### Angular Material Components
All Material components automatically use the custom theme colors:
- Buttons, cards, forms inherit primary/accent/warn colors
- Typography follows Material design guidelines
- Proper contrast ratios maintained for accessibility

### Tailwind CSS
Tailwind config (`tailwind.config.js`) maps to CSS variables:
```javascript
colors: {
  primary: {
    DEFAULT: 'var(--color-primary)',
    50: 'var(--color-primary-50)',
    // ... 100-900
  }
}
```

### Icon Module
- Material icons use `MatIconModule`
- Local SVG icons registered in `AppComponent`
- HTTP client provided for SVG loading

## Modifying the Theme

### Change Primary Color
1. Edit shade values in `src/styles/_variables.scss`
2. Update `$primary-50` through `$primary-900`
3. Theme automatically updates on rebuild

### Change Accent Color
1. Edit `$tertiary-*` variables in `_variables.scss`
2. Accent uses tertiary palette by default
3. Rebuild to see changes

### Add Dark Theme Support
To add dark theme (future enhancement):
1. Create second palette map with dark colors
2. Use `m2-define-dark-theme()`
3. Apply theme conditionally based on class (e.g., `.dark`)

## Build Verification

### Production Build
```bash
npm run build
```
Output: `dist/techno_genco/`

### Development Server
```bash
npm start
```
Server: `http://localhost:4200/`

### Size Impact
Material theming adds ~72KB to styles bundle (from ~27KB to ~99KB)
- This is expected for full Material component theming
- Can be optimized by including only needed component themes

## Troubleshooting

### Build Errors with Material Imports
- Use M2 API: `mat.m2-define-palette()`
- Import from: `@use '@angular/material' as mat;`
- Don't use internal paths like `@angular/material/core/theming`

### Icons Not Loading
- Verify `provideHttpClient()` in `src/app/app.config.ts`
- Check SVG paths in icon registry
- Ensure `MatIconModule` imported in components using icons

### Theme Not Applied
- Verify `mat.core()` included once
- Check `mat.all-component-themes()` called
- Ensure styles imported in `angular.json`

## References
- [Angular Material Theming Guide](https://material.angular.io/guide/theming)
- [Material Design Color System](https://m2.material.io/design/color/)
- [Tailwind CSS Configuration](https://tailwindcss.com/docs/configuration)

## Maintenance Notes
- Material v19 uses M2 API for backward compatibility
- M3 (Material You) will require migration in future
- CSS variables approach ensures flexibility
- Theme is centralized in `_mat-theme.scss`
