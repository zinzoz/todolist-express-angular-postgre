var app = angular.module('TaskManager', []);

//controllers
app.controller('taskController', function($scope) {
    $scope.today = new Date();
    $scope.saved = localStorage.getItem('realItems');
    $scope.taskItem = (localStorage.getItem('taskItems')!==null) ?
    JSON.parse($scope.saved) : [ {description: "ทำไมคุณยังไม่เพิ่มงาน?", date: $scope.today, complete: false}];
    localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));

    $scope.realItem = (localStorage.getItem('realItems')!==null) ?
    JSON.parse($scope.saved) : [ {description: "ทำไมคุณยังไม่เพิ่มงาน?", date: $scope.today, complete: false}];
    localStorage.setItem('realItems', JSON.stringify($scope.taskItem));



    $scope.newTask = null;
    $scope.newTaskDate = null;
    $scope.categories = [
        {name: 'Work'},
        {name: 'Design'},
        {name: 'Buy'},
        {name: 'Other'}
    ];
    $scope.newTaskCategory = $scope.categories;
    $scope.addNew = function () {
        if ($scope.newTaskDate == null || $scope.newTaskDate == '') {
            $scope.taskItem.push({
                description: $scope.newTask,
                date: "No deadline",
                complete: false,
                category: $scope.newTaskCategory.name
            });
            $scope.realItem.push({
                description: $scope.newTask,
                date: "No deadline",
                complete: false,
                category: $scope.newTaskCategory.name
            })
        } else {
            $scope.taskItem.push({
                description: $scope.newTask,
                date: $scope.newTaskDate,
                complete: false,
                category: $scope.newTaskCategory.name
            });

            $scope.realItem.push({
                description: $scope.newTask,
                date: $scope.newTaskDate,
                complete: false,
                category: $scope.newTaskCategory.name
            })
        };
        $scope.newTask = '';
        $scope.newTaskDate = '';
        $scope.newTaskCategory = $scope.categories;
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
        localStorage.setItem('realItems', JSON.stringify($scope.realItem));
    };
    $scope.deleteTask = function () {
        var completedTask = $scope.realItem;
        $scope.taskItem = [];
        angular.forEach(completedTask, function (taskItem) {
            if (!taskItem.complete) {
                $scope.taskItem.push(taskItem);
            }
        });
        localStorage.setItem('realItems', JSON.stringify($scope.taskItem));


    };



    $scope.save = function () {
        localStorage.setItem('realItems', JSON.stringify($scope.realItem));
        //localStorage.setItem('realItems', JSON.stringify($scope.realItem));

    }


    $scope.allTask = function () {
        var allTask = $scope.realItem;


        localStorage.setItem('taskItems', JSON.stringify(allTask));
        localStorage.setItem('realItems', JSON.stringify(allTask));
    };

    $scope.incompletedTask = function () {
        var incompletedTask = $scope.realItem;
        $scope.taskItem = [];
        angular.forEach(incompletedTask, function (taskItem) {
            if (!taskItem.complete) {
                $scope.taskItem.push(taskItem);
            }
        });
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };

    $scope.completedTask = function () {
        var completedTask = $scope.realItem;
        $scope.taskItem = [];
        angular.forEach(completedTask, function (taskItem) {
            if (taskItem.complete) {
                $scope.taskItem.push(taskItem);
            }
        });
        localStorage.setItem('taskItems', JSON.stringify($scope.taskItem));
    };



});


// app.filter('taskYet', function() {
//    return function( item, complete) {
//     var filtered = [];
//
//    console.log(complete);
//
//     if(complete == false ) {
//        filtered.push(item);
//      }
//
//
//
//     // angular.forEach(items, function(item) {
//     //    if(types.complete == false ) {
//     //       filtered.push(item);
//     //     }
//     //
//     // });
//
//     return filtered;
//   };
});
