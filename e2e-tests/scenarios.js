'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/index");
  });


  describe('index', function() {

    beforeEach(function() {
      browser.get('#/index');
    });


    it('should render index when user navigates to /index', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/index pagina/);
    });

  });


  describe('besteld', function() {

    beforeEach(function() {
      browser.get('#/besteld');
    });


    it('should render besteld when user navigates to /besteld', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/Bestelde pizza's/);
    });

  });
});
