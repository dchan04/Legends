const { createProxyMiddleware } = require("http-proxy-middleware");
const context = ["/legends"];
const port = 7150;
const azurePort =
  "https://legendstrackerbackend20221109185207.azurewebsites.net";

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: `https://localhost:${port}/`,
    headers: {
      accept: "application/json",
      method: "GET",
    },
    changeOrigin: true,
  });

  app.use(appProxy);
};
