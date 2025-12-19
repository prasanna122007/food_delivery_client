module.exports = {
  // Use explicit require to ensure PostCSS loads the correct plugin instance and order
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
}
