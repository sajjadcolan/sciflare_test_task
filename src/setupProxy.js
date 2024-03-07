const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://crudcrud.com/api/b1214a26aed141f4bc6180cd6e9a8314",
      changeOrigin: true,
    })
  );
};
