'use strict';

angular.module('hashtagblessedApp')


.filter('fromTo', function() {
	return function(input, from, total, lessThan) {
		from = parseInt(from);
		total = parseInt(total);
		for (var i = from; i < from + total && i < lessThan; i++) {
			input.push(i);
		}
		return input;
	}
})
.factory('instagram', ['$http',
	function($http) {
		return {
			fetchPopular: function(callback) {
				var endPoint = "https://api.instagram.com/v1/tags/blessed/media/recent?client_id=642176ece1e7445e99244cec26f4de1f&callback=JSON_CALLBACK";
				$http.jsonp(endPoint).success(function(response) {
					callback(response.data);
				});
			}
		}
	}
	])

.controller("MainCtrl", function($scope, $interval, instagram) {
	$scope.pics = [];
	$scope.have = [];
	$scope.getMore = function() {
		instagram.fetchPopular(function(data) {
			for(var i=0; i<data.length; i++) {
				if (typeof $scope.have[data[i].id]==="undefined") {
					$scope.pics.push(data[i]) ;
					$scope.have[data[i].id] = "1";
				}
			}
		});
	};
	$scope.getMore();
	$scope.tags = [
	  'dogs'
	]
});



