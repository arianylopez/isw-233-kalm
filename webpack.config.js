const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    clean: true,
  },
  devtool: isProduction ? false : 'source-map',
  devServer: {
    static: './dist',
    hot: true,
    open: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(html|hbs)$/,
        loader: 'handlebars-loader',
        options: {
          partialDirs: [path.resolve(__dirname, 'src/partials')], 
        }
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: 'images/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: isProduction ? {
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
      } : false,
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'public', 
          to: '.', 
          noErrorOnMissing: true 
        },
        { 
          from: 'src/data', 
          to: 'data', 
          noErrorOnMissing: true 
        }
      ]
    }),
    ...(isProduction ? [new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false })] : [])
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [
      `...`, 
      new CssMinimizerPlugin(), 
    ],
    splitChunks: {
      chunks: 'all', 
    },
  },
};