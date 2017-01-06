const webpack = require('webpack');
const helpers = require('./helpers');
const AssetsPlugin = require('assets-webpack-plugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlElementsPlugin = require('./html-elements-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const INITIAL_STATE = require('../src/api/mock_state.ts');


const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Angular2 Webpack Starter by @gdi2290 from @AngularClass', 
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = function (options) {
  var isProd = options.env === 'production';
  return {
    
    entry: {
      polyfills: './src/polyfills.browser.ts',
      vendor:    './src/vendor.browser.ts',
      main:      './src/main.browser.ts'      
    },

    resolve: {
      extensions: ['.ts', '.js', '.json'], 
      modules: ['src', 'node_modules']
    },
    
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
            'awesome-typescript-loader',
            'angular2-template-loader',
            'angular-router-loader'
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
                'resolve-url-loader',
                'postcss-loader']
        },
        
        {
          test: /\.woff$/,
          loader: 'url-loader' 
        },
        
        {
          test: /\.(woff2|eot|ttf)$/,
          loader: 'file-loader',
          query: {name: 'fonts/[name].[ext]'}
        },

        {
          test: /\.(svg|png|jpe?g|gif)$/,
          loader: 'file-loader',
          query: {name: 'img/[name].[ext]'}
        },
        
        {
          test: /\.html$/,
          use: 'raw-loader' 
        }
      ]
    },

    plugins: [

      new LoaderOptionsPlugin({
        debug: !isProd,
        minimize: isProd,
        options: {
          context: helpers.root(),
          output: {path: helpers.root()} 
        }
      }),
      
      new AssetsPlugin({
        path: helpers.root('../dist/blog'),
        filename: 'webpack-assets.json',
        prettyPrint: true
      }),
      
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
          /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        helpers.root('src'), // location of your src
        {
          // your Angular Async Route paths relative to this root directory
        }
      ),

      new CopyWebpackPlugin([
        { from: 'src/assets/icon', to: 'icon' },
        { from: 'src/meta'} 
      ]),

      new HtmlWebpackPlugin({
        template: '!!handlebars-loader!src/index.hbs',
        title: METADATA.title,
        minify: isProd ? {collapseWhitespace: true} : false,
        filename: 'index.html',
        chunksSortMode: 'dependency',
        metadata: METADATA,
        baseUrl: isProd ? /blog/ : '/',
        INITIAL_STATE: JSON.stringify(INITIAL_STATE),
        inject: 'head'
      }),
      
      
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),

      
      /*
       * Plugin: HtmlElementsPlugin
       * Description: Generate html tags based on javascript maps.
       *
       * If a publicPath is set in the webpack output configuration, it will be automatically added to
       * href attributes, you can disable that by adding a "=href": false property.
       * You can also enable it to other attribute by settings "=attName": true.
       *
       * The configuration supplied is map between a location (key) and an element definition object (value)
       * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
       *
       * Example:
       *  Adding this plugin configuration
       *  new HtmlElementsPlugin({
       *    headTags: { ... }
       *  })
       *
       *  Means we can use it in the template like this:
       *  <%= webpackConfig.htmlElements.headTags %>
       *
       * Dependencies: HtmlWebpackPlugin
       */
      new HtmlElementsPlugin({
        headTags: require('./head-config.common')
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
