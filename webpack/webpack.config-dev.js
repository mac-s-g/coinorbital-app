const path = require("path")
const webpack = require("webpack")
const wds_port = 3700

const PATHS = {
  src: path.join(__dirname, "..", "src"),
  js: path.join(__dirname, "..", "src", "js"),
  images: path.join(__dirname, "..", "src", "images"),
  build: path.join(__dirname, "..", "dev-server", "dist"),
  devServer: path.join(__dirname, "..", "dev-server")
}

console.log(process.env.API_ENV)

const config = {
  entry: [path.join(PATHS.devServer, "js", "entry.js")],
  externals: {},
  devServer: {
    host: "localhost",
    port: wds_port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.build
  },
  output: {
    path: PATHS.build,
    filename: "main.js",
    library: "crypto-portfolio",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      CO_API_HOST: JSON.stringify(
        "https://cw0jabby0h.execute-api.us-east-1.amazonaws.com/staging/"
        // "https://8j1ntd8sie.execute-api.us-east-1.amazonaws.com/production/"
      )
    })
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        include: [PATHS.js, PATHS.devServer]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: "url-loader?limit=100000"
          }
        ]
      }
    ]
  }
}

module.exports = config
