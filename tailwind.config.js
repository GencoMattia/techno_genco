module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-600': 'var(--color-primary-600)',
        'primary-200': 'var(--color-primary-200)',

        secondary: 'var(--color-secondary)',
        'secondary-500': 'var(--color-secondary-500)',
        'secondary-100': 'var(--color-secondary-100)',

        tertiary: 'var(--color-tertiary)',
        'tertiary-400': 'var(--color-tertiary-400)',

        accent: 'var(--color-accent)',
        warn: 'var(--color-warn)',

        surface: 'var(--color-surface)',
        bg: 'var(--color-bg)',
        'on-surface': 'var(--color-on-surface)'
      }
    },
  },
  plugins: [],
}
