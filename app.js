var myapp = angular.module('angularAuthentication',['ngRoute','ngStorage']);

myapp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
         controller: 'LoginCtrl',
        templateUrl: 'html/login.html',
    })
        .when('/signUp', {
            controller: 'signUpController',
            templateUrl: 'html/signUp.html'
        })
        .when('/loginSubmit',{
        
            controller: 'homeCtrl', 
            templateUrl: 'html/home.html'    
    })
    .when('/logout',{
           redirectTo:'/'
    })
        .otherwise({ redirectTo:'/' });
}])

myapp.run(function (){
    console.log("run method");

});

myapp.controller('LoginCtrl',['$scope','$location','$http','$localStorage',function($scope,$location,$http,$localStorage){
   
    $scope.pagename='welcome to login page';
    $scope.userId = {};
    $scope.login = function()
    {
         
    console.log($scope.userId);
        $http({
                url: 'http://192.168.1.112:8090/Jsery1.9/user/login',
                method: "POST",
                data: $scope.userId,
                headers: {'Content-Type': 'application/json'}
              }).success(function(data){
        
                    console.log(data.id);
                    window.localStorage['userDetails'] = angular.toJson($scope.userId);
                    $location.path('/loginSubmit');
        }).
        error(function(data){
            console.log(data);
        });
        console.log("Redirected"); 
    };
    $scope.signup= function() {
     $location.path('/signUp');
        console.log("Redirected Sign Up page");
    };
    console.log("Login Controller called");
}])
myapp.controller('signUpController',['$scope','$localStorage','$http','$location' ,function($scope,$localStorage,$http,$location){
    console.log("signUp controller44444444444444444");
    
    $scope.pagename='welcome to signUp page';
    $scope.fields= [{
                        name : 'First Name',
                        type : 'text',
                        modelname: 'firstName',
                        placeholder: 'First name'
                    },
                    {
                        name : 'Last name',
                        type : 'text',
                        modelname: 'lastName',
                        placeholder: 'Last name'
                    },
                   {
                        name : 'Email Id',
                        type : 'email',
                        modelname: 'email',
                        placeholder: 'EmailId'
                    },
                   {
                        name : 'Password',
                        type : 'password',
                        modelname: 'password',
                        placeholder: 'password'
                    },
                    {
                        name : 'Phone No.',
                        type : 'number',
                        modelname: 'phoneNumber',
                        placeholder: 'phone no.'
                    },
                   {
                        name : 'City',
                        type : 'text',
                        modelname: 'city',
                        placeholder: 'city'
                    },
                   {
                        name : 'State',
                        type : 'text',
                        modelname: 'state',
                        placeholder: 'State'
                    }];
    
    $scope.data ={};
    var records=$scope.data;
    console.log("records",records);
    $scope.save = function(){
        $localStorage.records =records;
        $scope.records=records;
         $http({
                url: 'http://192.168.1.112:8090/Jsery1.9/user/signup',
                method: "POST",
                data: $scope.records,
                headers: {'Content-Type': 'application/json'}
              }).success(function(data){
        
             /*if (result !== undefined && result === "success")*/
             if (data == "signup success"){
                 localStorage.setItem("appUser", data);
        //  localStorage.setItem("userName", data.userName);
                console.log("login successfully");
                    console.log(data);
                 $location.path('/logout');
             }
             else{
                console.log(data);
             }
        });
    
    };
   
}])
myapp.controller('homeCtrl',['$scope','$location',function($scope,$location){
    
    $scope.pagename='welcome to Home page';
     console.log("Redirected Home Page");
    $scope.loginData= function(){
        var accessData = window.localStorage['userDetails'];
        console.log("email:",JSON.parse(accessData).email);
         console.log("password:",JSON.parse(accessData).password);
    };
    $scope.logout= function(){
     $location.path('/logout');
        console.log("logout Sucessfully");
    };
    
    console.log("Home ctrl called");
}])
/*------Multilanguage function------ */

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en'
  }, 'google_translate_element');
    console.log("googlescript");
}