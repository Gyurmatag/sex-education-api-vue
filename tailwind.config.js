module.exports = {
  future: {},
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        mainbackground: 'var(--color-main-background)'
      }
    },
    fontFamily: {
      display: ['Montserrat'],
      body: ['Montserrat']
    }
  },
  variants: {
    extend: {
      fill: ['hover']
    }
  },
  plugins: []
}
