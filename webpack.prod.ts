import { resolve } from "path"
import { Configuration } from "webpack"
import HtmlWebPackPlugin from "html-webpack-plugin"
import "webpack-dev-server"

const config: Configuration = {
  mode: "production",
  entry: {
    app: resolve(__dirname, "pages", "index.tsx"),
  },
  output: {
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "~": resolve(__dirname),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(svg|png)$/,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.png",
    }),
  ],
}

export default config
