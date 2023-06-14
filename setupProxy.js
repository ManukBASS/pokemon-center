const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pokeapi.co',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v2/type/',
      },
    })
  );
};