// require few files
const { createServer } = require("http");
const next = require("next");

// setting value of dev as per the NODE_ENV variable
// next behaviour changes if it is on production
const app = next({
  dev: process.env.NODE_ENV !== "production",
});

// Setting fucntionalities of routes file in 'routes' variable
const routes = require("./routes");
// Setting the handle variable
const handler = routes.getRequestHandler(app);

// Setting up the server
app.prepare().then(() => {
  createServer(handler).listen(3000, (err) => {
    if (err) throw err;
    console.log("Ready on localhost:3000");
  });
});
