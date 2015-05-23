// public/core.js

angular.module('todoApp.todo')
.controller('todoController', ['$scope', 'Todos', function todoController($scope, Todos) {

    $scope.pageClass = 'page-todo';
	$scope.formData = {};

    // when landing on the page, get all todos and show them
    Todos.get()
    .success(function(data) {
        $scope.todos = data;
    });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        if(!$scope.todoForm.$valid) {
            return;
        }
        Todos.create($scope.formData)
        .success(function(data) {
            $scope.formData = {}; // clear the form so our user is ready to enter another
            $scope.todos = data;
        });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        Todos.delete(id)
        .success(function(data) {
            $scope.todos = data;
        });
    };

    // when submitting the add form, send the text to the node API
    $scope.saveTodo = function(todo) {
        Todos.update(todo)
        .success(function(data) {
            $scope.editedTodo = {};
        });
    };

    $scope.editedTodo = {};

    $scope.editTodo = function(todo) {
        $scope.editedTodo = todo;
    }

    $scope.revertTodo = function() {
        $scope.editedTodo = {};
    }

}]).directive('todoFocus', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            scope.$watch(attrs.todoFocus, function(newVal) {
                if(newVal) {
                    $timeout(function(){
                        element[0].focus();
                    }, 0, false)
                }
            });
        }
    }
}]);