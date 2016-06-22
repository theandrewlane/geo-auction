(function () {
  'use strict';

  angular
    .module('auctions.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('auctions', {
        abstract: true,
        url: '/auctions',
        template: '<ui-view/>'
      })
      .state('auctions.list', {
        url: '',
        templateUrl: 'modules/auctions/client/views/list-auction.client.view.html',
        controller: 'AuctionsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Auctions List'
        }
      })
      .state('auctions.create', {
        url: '/create',
        templateUrl: 'modules/auctions/client/views/form-auction.client.view.html',
        controller: 'AuctionsController',
        controllerAs: 'vm',
        resolve: {
          auctionResolve: newAuction
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Auctions Create'
        }
      })
      .state('auctions.edit', {
        url: '/:auctionId/edit',
        templateUrl: 'modules/auctions/client/views/form-auction.client.view.html',
        controller: 'AuctionsController',
        controllerAs: 'vm',
        resolve: {
          auctionResolve: getAuction
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Auction {{ auctionResolve.title }}'
        }
      })
      .state('auctions.view', {
        url: '/:auctionId',
        templateUrl: 'modules/auctions/client/views/view-auction.client.view.html',
        controller: 'AuctionsController',
        controllerAs: 'vm',
        resolve: {
          auctionResolve: getAuction
        },
        data: {
          pageTitle: 'Auction {{ auctionResolve.title }}'
        }
      });
  }

  getAuction.$inject = ['$stateParams', 'AuctionsService'];

  function getAuction($stateParams, AuctionsService) {
    return AuctionsService.get({
      auctionId: $stateParams.auctionId
    }).$promise;
  }

  newAuction.$inject = ['AuctionsService'];

  function newAuction(AuctionsService) {
    return new AuctionsService();
  }
}());
