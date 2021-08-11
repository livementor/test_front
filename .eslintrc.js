module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'import/no-named-as-default': 0,
    'vue/comment-directive': 0
    /* "no-irregular-whitespace": [
      "error",
      {
        "skipStrings": true,
        "skipComments": true,
        "skipRegExps": true,
        "skipTemplates": true,
        "skipHTMLAttributeValues": true,
        "skipHTMLTextContents": true,
      },
    ], */
  }
}
