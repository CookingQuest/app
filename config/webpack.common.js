const webpack = require('webpack');
const helpers = require('./helpers');
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ngcWebpack = require('ngc-webpack');

const HMR = helpers.hasProcessFlag('hot');
const AOT = helpers.hasNpmFlag('aot');
const METADATA = {
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer(),
  title: 'CookingQuest'
};

module.exports = function (options) {
  var isProd = options.env === 'production';
  return {

    entry: {
      'polyfills': './src/polyfills.browser.ts',
      'main':      AOT ? './src/main.browser.aot.ts' :
        './src/main.browser.ts'
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [helpers.root('src'), helpers.root('node_modules')]
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: '@angularclass/hmr-loader',
              options: {
                pretty: !isProd,
                prod: isProd
              }
            },
            { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
              loader: 'ng-router-loader',
              options: {
                loader: 'async-import',
                genDir: 'compiled',
                aot: AOT
              }
            },
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: 'tsconfig.webpack.json'
              }
            },
            {
              loader: 'angular2-template-loader'
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },

        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.css$/,
          use: ['to-string-loader',
                {loader: 'css-loader', query: { importLoaders: 1 }},
                'postcss-loader'],
          exclude: [helpers.root('src', 'styles')]
        },

        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: Object.assign({root: helpers.root('src')}, isProd ? {
              minimize: true,
              removeAttributeQuotes: false,
              keepClosingSlash: true,
              caseSensitive: true,
              conservativeCollapse: true
            } : {})}]
        },

        {
          test: /\.(jpg|png|gif|webp)$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'img/[name].[ext]'
          }
        },

        {
          test: /\.svg$/,
          use: [{
            loader: 'svg-url-loader',
            options: {noquotes: true}
          }]
        },

        {
          test: /\.(eot|woff2?|ttf)$/,
          use: 'file-loader'
        }

      ],

    },

    plugins: [

      new AssetsPlugin({
        path: helpers.root('dist'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),
      new CheckerPlugin(),
      new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),
      // This enables tree shaking of the vendor modules
      new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules/.test(module.resource)
      }),
      // Specify the correct order the scripts will be injected in
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

      new ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('src'), // location of your src
        {
          // your Angular Async Route paths relative to this root directory
        }
      ),

      new CopyWebpackPlugin([
        { from: 'src/assets/favicon', to: 'assets/favicon' },
        { from: 'src/meta'}
      ]),

      new HtmlWebpackPlugin({
        template: 'src/index.marko',
        minify: isProd ? {collapseWhitespace: true} : false,
        alwaysWriteToDisk: true,
        filename: '../koa/templates/index.marko',
        chunksSortMode: 'dependency',
        metadata: METADATA,
        baseUrl: '/',
        inject: 'head'
      }),
      new HtmlWebpackHarddiskPlugin(),

      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
      }),

      new LoaderOptionsPlugin({
        debug: !isProd,
        minimize: isProd
      }),

      // Fix Angular 2
      new NormalModuleReplacementPlugin(
          /facade(\\|\/)async/,
        helpers.root('node_modules/@angular/core/src/facade/async.js')
      ),
      new NormalModuleReplacementPlugin(
          /facade(\\|\/)collection/,
        helpers.root('node_modules/@angular/core/src/facade/collection.js')
      ),
      new NormalModuleReplacementPlugin(
          /facade(\\|\/)errors/,
        helpers.root('node_modules/@angular/core/src/facade/errors.js')
      ),
      new NormalModuleReplacementPlugin(
          /facade(\\|\/)lang/,
        helpers.root('node_modules/@angular/core/src/facade/lang.js')
      ),
      new NormalModuleReplacementPlugin(
          /facade(\\|\/)math/,
        helpers.root('node_modules/@angular/core/src/facade/math.js')
      ),

      new ngcWebpack.NgcWebpackPlugin({
        disabled: !AOT,
        tsConfig: helpers.root('tsconfig.webpack.json'),
        resourceOverride: helpers.root('config/resource-override.js')
      })

    ],

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
};
