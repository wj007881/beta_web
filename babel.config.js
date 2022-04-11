module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset',
      '@babel/preset-env',
      'vue-app'
    ],
    plugins: ["@babel/plugin-transform-runtime","transform-vue-jsx", [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]],
  }
  