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
}])

.directive('testDirective', function () {
    // Just a very simple directive to use for scope example
    return {
        restrict: 'E',     // restrict to only match on element names
        scope: {        // isolate scope
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
    scope: {
    },    
    link: function(scope, element, attrs) {
      console.log('link ran')
      //console.log (attrs)

      scope.val = attrs.anotherDir
      scope.bread = new TableRow('bread absorbs ' + scope.val)

    }
    
  }

  //       scope.$watch(attrs.anotherDir, function(value) {
  //           console.log ('watch triggered with: ' + value)
  //       })

  //     scope.addBlankRow = function(deleteIcon) {
  //       deleteIcon = deleteIcon ? deleteIcon : false;
  //       var header_new = angular.copy(scope.accountHeaders); // Angularjs makes a DEEP copy.
  //       var editable = angular.forEach(header_new, function (item) {
  //         item.type.field = item.type.field == 'span' ? 'input' : item.type.field
  //         item.editable = true
  //         item['blankRow'] = true
  //       })
  //       scope.paymentData.lineItems.push(new TableRow({}, editable, deleteIcon))
  //     }

  //     scope.deleteRow = function (index){
  //       delete scope.accountsTableAmountValues[index]
  //       delete scope.markedForPay[index];
  //       scope.paymentData.lineItems.splice(index, 1);
  //     }
  //   }
  // }

  // // Create an object for each row by stitching together required, highlighted, or disabled requirments with
  // // each repsectable item in row, plus create the nested object for form submission.
  // function TableRow (row, tableHeaders, deleteIcon) {
  //   this.DocumentId = row.document_id || null;
  //   this.amount = '';
  //   this.consumerAddedRow = _.isEmpty(row) && deleteIcon == true ? true : false;
  //   this.lineItemDetails = row;
  //   this.tableHeaders = convertDataField(tableHeaders);
  // }


})
