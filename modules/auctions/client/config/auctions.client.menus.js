(function () {
  'use strict';

  angular
    .module('auctions')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Auctions',
      state: 'auctions',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'auctions', {
      title: 'List Auctions',
      state: 'auctions.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'auctions', {
      title: 'Create Auction',
      state: 'auctions.create',
      roles: ['user']
    });
  }
}());
