module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-extra-parens': 2, // https: //eslint.org/docs/rules/no-extra-parens
    curly: 2, // https: //eslint.org/docs/rules/curly
    eqeqeq: 2, // https: //eslint.org/docs/rules/eqeqeq
    'comma-dangle': ['error', 'always-multiline'],
    'vue/max-attributes-per-line': 0, // https: //eslint.vuejs.org/rules/max-attributes-per-line.html
    'vue/attribute-hyphenation': 0, // https: //eslint.vuejs.org/rules/attribute-hyphenation.html
  },
}
