module.exports = {
  extends: ["airbnb", "plugin:jest/recommended", "plugin:react-redux/recommended"],
  plugins: ["react", "react-redux", "jest"],
  parser: "babel-eslint",
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    strict: 0
  }
};
