var app = angular.module('app', []);

app.controller('contactController', function($scope, $http) {
	$scope.formData = {};
	$scope.msg = "";

	// Submit email
	$scope.sendEmail = function () {
		$http.post('/api/contact', $scope.formData)
			.success(function(data){
				// console.log("Message sent succesfully to server with data: ", $scope.formData);
				$scope.formData = {};
				$scope.msg = "Message sent successfully. Thank you!";
				$scope.sentMessage.$setPristine()

			})
			.error(function(data) {
				console.log("Error: " + data);
		});
	};

	// Hide the confirmation message when the user clicks on the form again
	$scope.hideMsg = function() {
		$scope.msg = "";
	};

});
