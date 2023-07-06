const { render } = require("@testing-library/react");
const { createProxyMiddleware } = require("http-proxy-middleware");
const context = ["/legends"];

const targetPort = "https://tftappbackend.onrender.com";

module.exports = function (app) {
	const appProxy = createProxyMiddleware(context, {
		target: targetPort,
		headers: {
			accept: "application/json",
			method: "GET",
		},
		changeOrigin: true,
	});

	app.use(appProxy);
};
