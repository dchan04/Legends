const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/legends",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7150',
        secure: false
    });

    app.use(appProxy);
};
