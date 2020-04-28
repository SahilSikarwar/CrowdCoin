const routes = require("next-routes")();

// defining different routes as per the requirement of the project
routes
  .add("/campaign/new", "/campaign/new")
  .add("/campaign/:address", "/campaign/show")
  .add("/campaign/:address/requests", "/campaign/requests/index")
  .add("/campaign/:address/requests/new", "/campaign/requests/new");

module.exports = routes;
