var path =require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
//入口
  entry: {
    bundle: path.join(__dirname, "js/app/index.js"),
  },
//导出
  output: {
    path: path.resolve(__dirname, '../public/js'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader"],
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/main.css'),
    new UglifyJSPlugin()
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: [
    //       autoprefixer(),
    //     ]
    //   }
    // })
  ],
  resolve: {
    alias: {
      less: path.join(__dirname, "less")
    }
  }
}