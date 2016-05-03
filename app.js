var app = angular.module('tagsApp', []);

app.controller('tagController', ['$scope', function($scope) {
	$scope.inputTags = [];
	
	$scope.addTag = function() {
		if ($scope.tagText.length == 0) {
			return;
		}
		$scope.inputTags.push({name: $scope.tagText});
		$scope.tagText = '';
	}

	$scope.deleteTag = function(key) {
		if(key == undefined && $scope.inputTags.length > 0 && $scope.tagText.length == 0) {
			$scope.inputTags.pop();
		} else if (key != undefined && $scope.inputTags.length > 0) {
			$scope.inputTags.splice(key, 1)	
		}
		
	}
}]);

app.directive('tagInput', function() {
	return {
		restrict: 'EA',
		//templateUrl: 'pages/input.html',
		template: '<div class="tag-input-ctn">'+
    '<div ng-repeat="(key, tag) in inputTags" class="input-tag">' +
        '{{ tag.name }}'+
    '<div class="delete-tag" ng-click="deleteTag(key)">&times;</div>'+
    '</div>	'+
    
    '<input type="text" ng-model="tagText" >'+
'</div>',
		link: function(scope, elem, attr) {
			scope.inputWidth = 30;
			// look for changes in ng-model value
			scope.$watch("tagText", function(value) {
				if (value != undefined) {
					scope.inputWidth = scope.inputWidth + value.length + 5;
				}
				
			});

			elem.bind('keydown', function(e) {
				// prevent default behavior of going to next tab when tab is clicked
				if (e.which == 9) {
					e.preventDefault();
				}
				// backspace is keyeddown
				if (e.which == 8) {
					scope.$apply(attr.deleteTag)
				}
			});

			elem.bind('keyup', function(e) {
				// tab or enter pressed
				var key = e.which;
				if(key == 9 || key == 13) {
					e.preventDefault();
					scope.$apply(attr.newTag);
				}

			})
		}
	}
})


