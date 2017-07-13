const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "electron",
  entry: ["./src/renderer/index.js"],
  output: {
    filename: "renderer/index.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [path.resolve(__dirname, "src/renderer")]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue"],
    modules: [path.resolve(__dirname, "src/renderer"), "node_modules"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "src/assets", to: "assets" },
      { from: "src/main", to: "main" },
      { from: "src/index.html" }
    ])
  ]
};
