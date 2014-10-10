// Create a new object that just contains the passed in value as a member variable
function TableRow (text) {
  this.content = text
}

var module = angular.module('module', [])

.controller('Controller1', ['$scope', function ($scope) {
    $scope.butter = "Test Me!!"
    $scope.bread = new TableRow('bread')
    //console.log ($scope.bread.content)
}])
.controller('Controller2', ['$scope', function ($scope) {
    $scope.butter = "Test Two!"
    $scope.items = ['Ferrari', 'Sunglasses', 'Badge']
    $scope.greenLettuce = {name: 'Green Lettuce', calories: 25}
    $scope.darkerGreenLettuce = {name: 'Darker Green Lettuce', calories: 35}
    
    $scope.submit = function () {
      $scope.items.push($scope.newItem)
      $scope.newItem = '';
    }
    $scope.remove = function (index) {
      $scope.items.splice (index, 1)
    }  

    $scope.$watch('butter', function(value, old) {
      console.log ('watch triggered with new value: ' + value)
    })
}])

.controller('Controller3', ['$scope', function ($scope) {
    $scope.butter = "I am a third level dream."
    $scope.pepper = 99
    $scope.checkBoxes = []

    $scope.messageMe = function (message) {
      alert (message);
    }
}])

.directive('testDirective', function () {
    // Just a very simple directive to use for scope example
    return {
        restrict: 'E',     // restrict to only match on element names
        scope: {           // isolate scope
          lettuce: "=info" // this binds different scope based on the info attribute
        },
        template: "<br>Directive: {{lettuce.name}} has {{lettuce.calories}} calories."   // Normally, this would be in an
                  // external file, but don't know how to do this in JSFiddle.
    }
})
.directive('anotherDir', function() {
  //   https://docs.angularjs.org/guide/directive
  //   http://stackoverflow.com/questions/20018507/angularjs-what-is-the-need-of-the-directives-link-function-when-we-already-had
  //   http://jasonmore.net/angular-js-directives-difference-controller-link/
  return {
    restrict: 'A',     // restrict to only attribute directives
    template: "I see this: {{val}} and have this object: {{bread.content}}",
    scope: {          // isolate scope
    },    
    link: function(scope, element, attrs) {
      console.log('link ran')
      //console.log (attrs)

      scope.val = attrs.anotherDir
      scope.bread = new TableRow('bread absorbs ' + scope.val)

    }
  }
})
.directive('callOut', function () {
    // Just a very simple directive to use for scope example
    return {
        scope: {           // isolate scope
          call: "&" // this binds different scope based on the info attribute
        },
        template: '<button ng-click="call()">Call Out {{name}}</button>',   // Normally, this would be in an
                  // external file, but don't know how to do this in JSFiddle.
        link: function (scope, element, attrs) {
          scope.name = attrs.name
        }
    }
})
