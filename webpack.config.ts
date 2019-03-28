import fs from 'fs'
import path from 'path'
import webpack, {Configuration, Plugin} from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import WebpackBar from 'webpackbar'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import InlineChunkHtmlPlugin from 'react-dev-utils/InlineChunkHtmlPlugin'
import ModuleNotFoundPlugin from 'react-dev-utils/ModuleNotFoundPlugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import WatchMissingNodeModulesPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'

import babelConfig from './babel.config'

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const isDev = process.env.NODE_ENV === 'development'
const protocol = process.env.PROTOCOL || 'http'
const host = process.env.HOST || 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000
const analyzeBundle = !!process.env.ANALYZE_BUNDLE

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  bail: !isDev,
  devtool: isDev && 'cheap-module-source-map',

  entry: [
    // Include the hot dev client in development
    isDev && require.resolve('razzle-dev-utils/webpackHotDevClient'),
    resolveApp('src/Client.tsx'),
  ].filter(Boolean) as string[],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  module: {
    // Make missing exports an error instead of warning
    strictExportPresence: true,

    rules: [
      // TypeScript loader
      {
        test: /\.tsx?$/,
        include: [resolveApp('src'), resolveApp('../core')],
        use: [{
          loader: 'babel-loader',
          options: {
            ...babelConfig,
            cacheDirectory: isDev,
          }
        }],
      },

      // File loader
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx|mjs)$/,
          /\.(ts|tsx)$/,
          /\.(vue)$/,
          /\.(less)$/,
          /\.(re)$/,
          /\.(s?css|sass)$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
          emitFile: true,
        },
      },

      // URL loader
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
          emitFile: true,
        },
      },

      // CSS loader
      {
        test: /\.css$/,
        use: isDev
          ? [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
          ]
          : [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: false,
                minimize: true,
              },
            },
          ],
      },
    ]
  },

  output: {
    path: resolveApp('build/public'),
    publicPath: isDev ? `${protocol}://${host}:${port + 1}/` : '/',
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: isDev,
    filename: isDev
      ? 'static/js/bundle.js'
      : 'static/js/[name].[contenthash:8].js',
    chunkFilename: isDev
      ? 'static/js/[name].chunk.js'
      : 'static/js/[name].[contenthash:8].chunk.js',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: isDev
      ? info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')
      : info => path.relative(resolveApp('src'), info.absoluteResourcePath).replace(/\\/g, '/')
  },

  performance: {
    hints: false,
  },

  // Use the TerserPlugin in production builds
  optimization: isDev ? undefined : {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            // @ts-ignore - this appears to be an issue with the types
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],

    // Automatically split vendor and commons
    splitChunks: isDev
      ? {
        chunks: 'all',
        name: false,
      }
      : {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
      },
    // Keep the runtime chunk separated to enable long term caching
    runtimeChunk: true,
  },

  plugins: [
    new CleanWebpackPlugin(),

    // Generates an `document.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'document.html',
      template: resolveApp('static/document.html'),

      // Only include the following options in the production build
      ...(isDev ? {} : {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }),
    }),

    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(resolveApp('.')),

    // Moment.js bundles large locale files by default. This is a requires the user to opt into
    // importing specific locales.
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // Show a nice progress bar in development
    isDev && new WebpackBar(),

    isDev && new webpack.HotModuleReplacementPlugin(),

    // Throw an error if you mistype casing in a path in development
    isDev && new CaseSensitivePathsPlugin(),

    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    isDev && new WatchMissingNodeModulesPlugin(resolveApp('node_modules')),

    // Define build-time environment variables
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      'process.browser': true,
    }),

    new webpack.NormalModuleReplacementPlugin(
      /moment-timezone\/data\/packed\/latest\.json/,
      require.resolve(`${__dirname}/assets/moment-timezones.json`)
    ),

    analyzeBundle && new BundleAnalyzerPlugin(),

    // Inline the webpack runtime script in production
    !isDev && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),

    // Extract our CSS into files
    !isDev && new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),

    // More production optimizations
    !isDev && new webpack.HashedModuleIdsPlugin(),
    !isDev && new webpack.optimize.AggressiveMergingPlugin(),
  ].filter(Boolean) as Plugin[],
}

export default config
