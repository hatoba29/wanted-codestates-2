import { resolve } from "path"
import { Configuration } from "webpack"
import HtmlWebPackPlugin from "html-webpack-plugin"
import Dotenv from "dotenv-webpack"
import "webpack-dev-server"

const config: Configuration = {
  mode: "development",
  entry: {
    app: resolve(__dirname, "pages", "index.tsx"),
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
    proxy: {
      "/api": {
        target: "https://api.nexon.co.kr/kart/v1.0",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  resolve: {
    extensions: [".tsx", ".js"],
    alias: {
      "~": resolve(__dirname),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
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
    new Dotenv({
      path: "./.env.local",
    }),
  ],
}

export default config
