const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    tailwindcss("./tailwind.js"), //since we have a config file for tailwind
    require("autoprefixer"),
    // require("postcss-import"),
  ],
};
