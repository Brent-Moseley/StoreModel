var module = angular.module('module', [])
.controller('Controller1', ['$scope', function ($scope) {
    $scope.butter = "Test Me!!"
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
  return {
    anotherDir: "=",
    scope: {        // isolate scope
      val: "=anotherDir" // this binds different scope based on the info attribute
    },
    link:function(scope, element, attributes) {
      console.log('I ran once');

      scope.val = attributes.anotherDir
    },
    template: "{{val}}"
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
