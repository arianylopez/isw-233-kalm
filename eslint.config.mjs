export default [
  {
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { document: "readonly", window: "readonly", HTMLElement: "readonly", customElements: "readonly", fetch: "readonly", history: "readonly", console: "readonly" }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];