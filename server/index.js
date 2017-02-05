const webpack = require('webpack');
const webpackMiddleware = require('koa-webpack');
const webpackConfig = require('../config/webpack.dev.js')({env: 'development'});
const Server = require('../../koa/dist/devServer.js').DevServer;

const compiler = webpack(webpackConfig);
new webpack.ProgressPlugin({profile: true}).apply(compiler);

let server = new Server(compiler, webpackMiddleware({
  compiler, config: webpackConfig, dev: {
    noInfo: true,
    publicPath: webpackConfig.output.path,
    stats: { colors: true, chunks: false },
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    index: 'notInUse',
    serverSideRender: true
  }
}));

server.start();
