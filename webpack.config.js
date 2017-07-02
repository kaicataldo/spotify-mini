const path = require("path");

module.exports = {
  target: "electron",
  entry: ["./src/index.js"],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [path.resolve(__dirname, "src")]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".vue"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  }
};
