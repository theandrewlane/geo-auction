'use strict';

describe('Auctions E2E Tests:', function () {
  describe('Test auctions page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/auctions');
      expect(element.all(by.repeater('auction in auctions')).count()).toEqual(0);
    });
  });
});
