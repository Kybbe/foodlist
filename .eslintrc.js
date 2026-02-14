module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'vue/multi-word-component-names': ['error', {
      'ignores': ['default']
    }]
  },
  globals: {
    __APP_VERSION__: 'readonly',
    __BUILD_TIME__: 'readonly'
  }
};
