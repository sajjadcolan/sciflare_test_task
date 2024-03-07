const cors_proxy = require("cors-anywhere");

// Define the port for the proxy server
const PORT = process.env.PORT || 8080;

// Start the CORS Anywhere server
cors_proxy
  .createServer({
    originWhitelist: [], // Allow all origins
  })
  .listen(PORT, () => {
    console.log(`CORS Anywhere server is running on port ${PORT}`);
  });
