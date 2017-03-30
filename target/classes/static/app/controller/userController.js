'use strict';
(function() {
	var UserController = function($scope, $http) {
		$scope.users = [],
		$scope.user = {
			gender : 'M'
		},
		$scope.error = false;
		var me = this;

		self.doGetUsers = function() {
			$http.get('/user/list').then(function(response) {
				$scope.users = response.data;
				$scope.error = false;
			});
		}

		$scope.doDeleteUser = function(id) {
			$http({
				method : 'POST',
				url : '/user/delete',
				data : {
					id : id
				},
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				self.doGetUsers();
			}).error(function (response) {
				$scope.error = true;
	        });
		}

		$scope.doEditUser = function(user) {
			$scope.user = user;
		}

		self.createUser = function() {
			$http({
				method : 'POST',
				url : '/user/create',
				data : $scope.user,
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				self.doGetUsers();
			}).error(function (response) {
				$scope.error = true;
	        });
		}

		self.updateUser = function() {
			$http({
				method : 'POST',
				url : '/user/update',
				data : $scope.user,
				headers : {
					'Content-type' : 'application/json;charset=utf-8'
				}
			}).success(function(response) {
				self.doGetUsers();
			}).error(function (response) {
				$scope.error = true;
	        });
		}

		$scope.doSubmit = function() {
			if (angular.isDefined($scope.user.id)) {
				self.updateUser();
			} else {
				self.createUser();
			}
		}

		$scope.reset = function() {
			$scope.user = {
				gender : 'M'
			};
			$scope.userForm.$setPristine();
		}

		function init() {
			self.doGetUsers();
		}
		init();

	};

	angularApp.controllers.controller('UserController', [ '$scope', '$http', UserController ]);
})();