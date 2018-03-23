'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /twitterTarget when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/twitterTarget");
  });


  describe('twitterTarget', function() {

    beforeEach(function() {
      browser.get('index.html#!/twitterTarget');
    });


    it('should render twitterTarget when user navigates to /twitterTarget', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('twitterTarget', function() {

    beforeEach(function() {
      browser.get('index.html#!/twitterTarget');
    });


    it('should render twitterTarget when user navigates to /twitterTarget', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
