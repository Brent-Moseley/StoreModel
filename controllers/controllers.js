// Create a new object that just contains the passed in value as a member variable
function TableRow (text) {
  this.content = text
  this.showMe = function () {
    return '|*' + this.content + '*|'
  }
}

var module = angular.module('module', [])

.controller('Controller1', ['$scope', function ($scope) {
     $scope.items = [
       {name: 'Nexus 6', description: 'A decent phone by Google', price: 599},
       {name: 'iPhone 6', description: 'Trying to play catch-up', price: 699},
       {name: 'iPhone 6 plus', description: 'sub-standard hardware & overpriced', price: 1250},
       {name: 'Galaxy S5', description: 'Pretty awesome phone', price: 499},
       {name: 'Galaxy Note 4', description: 'Premium, amazing, incredible phone!', price: 599}
     ];
    //console.log ($scope.bread.content)
}])
.controller('Controller2', ['$scope', function ($scope) {
    $scope.butter = "Test Two!"
    $scope.cream = 'Cherry Cream'
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

    $scope.messageMe = function (message) {
      alert (message);
    }

    $scope.$watch('butter', function(value, old) {
      console.log ('watch triggered with new value: ' + value)
    })
}])

.controller('Controller3', ['$scope', function ($scope) {
    $scope.butter = "I am a third level dream."
    $scope.pepper = 99
    $scope.info = 'I am the parent scope content, I am good!!'
    $scope.checkBoxes = []
    $scope.cards = [
      {
        face: 'Jack',
        filter: ''
      }, 
      {
        face: '125.2200',
        filter: 'currency'
      },
      {
        face: '03/15/2013',
        filter: 'date'
      },
      {
        face: '144.780000',
        filter: 'reverse'
      },
      {
        face: 'The War is Over!!',
        filter: 'capitalize'
      }                           
    ]
    $scope.lastCard = 'If you can Read me, it did not work.';

    $scope.inputBoxFocus = function () {
      console.log ('input box focus')
      $scope.openInput()
    }

    $scope.focusOnMonths = false
    $scope.openInput = function () {
      console.log ('open 2')
      $scope.focusOnMonths = true
    };

    $scope.closeInput = function () {
      console.log ('close')
      $scope.focusOnMonths = false
      // http://plnkr.co/edit/ts3EMoaqMhjxmbD13Jcz?p=preview
    };    
}])

.directive('testDirective', function () {
    // Just a very simple directive to use for scope example
    // Returns the Directive Definition Object
    return {
        restrict: 'E',     // restrict to only match on element names
        scope: {           // Isolate scope
          lettuce: "=info" // this binds different scope based on the info attribute
                           // In this way, you can pass in models to a 
                           // directive that is using the isolate scope.
                           // Best Practice: Use the scope option to create 
                           // isolate scopes when making components that you 
                           // want to reuse throughout your app.
                           // This way, they will not interfere with each other.
                           // See here: 
                           // https://umur.io/angularjs-directives-using-isolated-scope-with-attributes/
        },
        // lettuce below actually refers to the passed-in model name, ie
        // greenLettuce or darkerGreenLettuce in the controller.
        template: "<br>Directive: {{lettuce.name}} has {{lettuce.calories}} calories."   
                  // Normally, this would be in an
                  // external file, but this is small so will keep it here.
    }
})
.directive('anotherDir', function() {
  // Demonstrates an attribute type directive that passes in a string as the value
  // of the directive and then uses a link function for some processing.
  //   https://docs.angularjs.org/guide/directive
  //   http://stackoverflow.com/questions/20018507/angularjs-what-is-the-need-of-the-directives-link-function-when-we-already-had
  //   http://jasonmore.net/angular-js-directives-difference-controller-link/
  return {
    restrict: 'A',     // restrict to only attribute directives
    template: "I see this: {{val}} and have this object: {{bread.showMe()}}",  
                                          // could also be {{bread.content}}
    scope: {          // isolate scope, pulls in nothing from the parent 
                      //  scope when empty.
    },    
    link: function(scope, element, attrs) {
      console.log('link ran, attrs:')
      console.log (attrs)

      scope.val = attrs.anotherDir  // get the value of this directive
      scope.bread = new TableRow('bread absorbs ' + scope.val)  // Create an
                           // object that 'polishes' the data in some way.

    }
  }
})
.directive('callOut', function () {
    // Create a more elaborate directive that takes an Angular expression as
    // an attribute and then invokes that expression based on an event. 
    return {
        scope: {           // isolate scope
          call: "&" // The & binding allows a directive to trigger evaluation 
                    //of an expression in the context of the parent scope, at 
                    // a specific time.
                    // The angular expression that this attribute is bound to
                    // will be evaluated in the context of the parent scope.
                    // (Controller 2, and will be messageMe)
                    // This is shorthand notation for call: "&call"
                    // If two way binding is used (=) this gets executed on
                    // every link cycle.
        },
        template: '<button ng-click="call()">Call Out {{name}}</button>',   
        link: function (scope, element, attrs) {
          scope.name = attrs.name  // set a var on local scope based on attr value
        }
    }
})
.directive('aDialog', function() {
  return {
    restrict: 'E',
    transclude: true,  // The transclude option changes the way scopes are nested. 
                       // It makes it so that the contents of a transcluded 
                       // directive have whatever scope is outside the directive, 
                       // rather than whatever scope is on the inside. In doing so, 
                       // it gives the contents access to the outside scope.
                       // Best Practice: only use transclude: true when you want 
                       // to create a directive that wraps arbitrary content.
    scope: {},        // Note isolate scope, remove this and you do not get
                      // transclude, info shows up from link function.
    template: '<div class="alert" ng-transclude></div>',
    // controller: function($scope){
    //   $scope.info = 'Should not be seeing this!'
    // }
    link: function (scope, element, attrs) {
      scope.info = 'Should not be seeing this!'
    }
  };
})
.directive('focusMe', function($timeout) {
  // based on demo:   http://plnkr.co/edit/LbHRBB?p=preview
  // This directive controls focus of another element entirely through a link
  // function.  The attribute that is passed in becomes the model to watch for
  // changes.  
  return {
    link: function(scope, element, attrs) {
      var model = attrs.focusMe;
      scope.$watch(model, function(value) {    // Will set a watch on focusOnMonths
        console.log ('watch tr ' + value)
         if(value === true) {
          console.log ('setting timeout')
           $timeout(function() {
             element[0].focus(); 
           } )
         }
         if (value === false) {
           console.log ('was false')
            $timeout(function() {
              console.log ('setting false timeout')
              scope.focusOnMonths = false;
              element[0].blur();
            }, 100 )   // BUG FIX:  Temp patch to fix repeated state shifting noted below
         }
      });
      element.bind('blur', function() {   // Catch user action blur
        // BUG FIX:  Repeated state shifting / events when user unchecks the box.
        console.log ('blur')
        scope.focusOnMonths = false;
        scope.$apply()
        //scope.closeInput()
      })
      element.bind('focus', function() {  // Catch user action focus
        console.log ('focus 1')
        scope.focusOnMonths = true;
        scope.$apply()
        //scope.closeInput()
      })      
    }
  };
})
.filter('namedFilter', function($filter) {
  // return a function that accepts a value and a filter name, see return below for details.
  // This works because pipe takes an Angular expression, as in this format:
  //  someValue | rsFilter:item.type.filter      where item.type.filter is 'currency' or 'date', etc.
  // $filter above is a dependency that gets injected
  return function(value, filterName) {
    if (filterName.length == 0) return value;
    return $filter(filterName)(value);   // invokes the named filter function on the value and returns it
  };
})
.filter('reverse', function() {
  // a custom filter to reverse a string
  return function(input) {
    input = input || '';
    var out = "";
    for (var i = 0; i < input.length; i++) {
      out = input.charAt(i) + out;
    }
    return out;
  };
})
.filter ('capitalize', function() {
  // Simple custom filter to capitalize something
  return function (input) {
    return input.toUpperCase();
  }
})

// https://github.com/angular/angular.js/wiki/Understanding-Directives
// http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
// http://www.sitepoint.com/understanding-angulars-apply-digest/
// http://plnkr.co/edit/ts3EMoaqMhjxmbD13Jcz?p=preview
// http://jsfiddle.net/31qgzfvk/1/

