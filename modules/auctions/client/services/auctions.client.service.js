(function () {
  'use strict';

  angular
    .module('auctions.services')
    .factory('AuctionsService', AuctionsService);

  AuctionsService.$inject = ['$resource'];

  function AuctionsService($resource) {
    return $resource('api/auctions/:auctionId', {
      auctionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
