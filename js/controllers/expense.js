myApp.controller('ExpensesController',
['$scope', '$rootScope', '$location', '$routeParams', '$firebaseArray', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', function($scope, $rootScope, $location, $routeParams, $firebaseArray, $firebaseAuth, $firebaseObject,  FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	auth.$onAuth(function(authUser){
		if(authUser) {

			var ExpensesRef = new Firebase(FIREBASE_URL + 'expenses/');
			var expensesList = $firebaseArray(ExpensesRef);
			$scope.expenses = expensesList;

			expensesList.$loaded().then(function(data){
				$rootScope.howManyExpenses = expensesList.length;
			})
			var expenseInfo = $firebaseArray(ExpensesRef);

			$scope.addExpense = function () {
				var expData = {
					amount: $scope.amount,
					description: $scope.description,
					expenseDate: $scope.date,
					category: $scope.category,
					tags: $scope.tags,
					date: Firebase.ServerValue.TIMESTAMP
				};

				expenseInfo.$add(expData).then(function () {
					$scope.amount = '';
					$scope.description = '';
					$scope.date = '';
					$scope.category = '';
					$scope.tags = '';
				});
			}// end of addExpense

			$scope.deleteExpense = function(key){
				expenseInfo.$remove(key);
			}
		}
	});
}]);
