(function (app) {
  'use strict';

  app.registerModule('auctions', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('auctions.services');
  app.registerModule('auctions.routes', ['ui.router', 'core.routes', 'auctions.services']);
}(ApplicationConfiguration));
