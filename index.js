const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

// Create Express Server
const app = express();

// Configuration
const PORT = 3001;
const HOST = "localhost";
const API_SERVICE_URL = "URL";

app.use(cors());
app.options("*", cors());

// Logging
app.use(morgan("dev"));

app.get("/account", (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization !== "Bearer null"
  ) {
    res.send({
      fullName: "Jane Foster",
      email: "jane@example.com",
    });
  } else {
    res.sendStatus(403);
  }
});

// Proxy endpoints
app.use(
  "/",
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/`]: "",
    },
  })
);

// Start Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
