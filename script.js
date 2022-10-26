const app = angular.module('WikiApp', ['ngAnimate']);
app.controller('MainCtrl', ($scope, $http, $timeout) => {
  const form = $('form');
  const close = $('.eks');
  const input = $('input');
  const search = $("#search");
  const help = $("#help");

  $scope.results = [];

  close.on('click', () => {
    form.toggleClass('open');

    if (!form.hasClass('open') && $scope.searchTxt !== '' && typeof $scope.searchTxt !== 'undefined') {
	    search.toggleClass('fullHeight');
      help.toggleClass('hide');
      $scope.searchTxt = '';
    } 
    $scope.results = [];
    $scope.$apply();
  });

  input.on('transitionend webkitTransitionEnd oTransitionEnd', () => {
    if (form.hasClass('open')) {
      input.focus();
    } else {
      return;
    }
  });

  $scope.search = () => {
    $scope.results = [];
    help.addClass('hide');
    search.removeClass('fullHeight');
    const title = input.val();
    const api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    const cb = '&callback=JSON_CALLBACK';
    const page = 'https://en.wikipedia.org/?curid=';

    $http.jsonp(api + title + cb)
    .success(data => {
      const results = data.query.pages;
      angular.forEach(results, (v, k) => {
        $scope.results.push({ title: v.title, body: v.extract, page: page + v.pageid });
      });
    });
  };
});