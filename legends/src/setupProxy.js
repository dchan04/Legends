const { createProxyMiddleware } = require("http-proxy-middleware");

const context = ["/legends"];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: "https://legendstrackerbackend20221109185207.azurewebsites.net",
    secure: false,
  });

  app.use(appProxy);
};
