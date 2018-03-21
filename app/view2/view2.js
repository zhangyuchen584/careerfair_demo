//import {Http, Response} from '@angular/http'
//angular.module('myApp.view2', ['ngRoute', 'http'])

angular.module('myApp.view2', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])
    .controller('View2Ctrl', View2Ctrl);

View2Ctrl.$inject = ['$rootScope', '$scope', '$http','$sce'];


function View2Ctrl($rootScope, $scope, $http,$sce) {
    // $scope.html = '<ul><li>render me please</li></ul>';
    $scope.trustedHtml = $sce.trustAsHtml();

    $scope.demos = {
        'SMRT Signalling Fault' : {target:"Topic: Due to a track signalling fault, pls add 30mins train travel time btwn #ChangiAirport and #TanahMerah. Free regular bus are available between #Tanah Merah and #Changi Airport.",
        comments : "Please explain why such faults occur again after the recent two full Sundays of train system closures? It is implied that nothing is still being done to rectify the new signaling system ?\tsystem\nFirst fault 2018.\tfault\nNew year. same shit\tsame"},
        'Apology for Traffic Issue' : {target:"Topic: We are sorry that your journey will be affected during this period. Thank you for your patience and understanding.",
        comments : "London has tube breakdowns everyday. You're actually lucky you don't get more distribution in Singapore this is much worse and more normal in other countries\tcountries\nIn London the vechicle prices are not so high and people can easily own a car !!! Here people relay only on public transport.\tpublic"},
        'Floor Collapsed Accident' : {target:"Topic: Video emerges online showing the moment a Jakarta stock exchange floor collapsed under a group of visiting students http://cna.asia/2FDAL0H",
        comments : "Video emerges online showing the moment a Jakarta stock exchange floor collapsed under a group of visiting students http://cna.asia/2FDAL0H\tstudents\nThe design is very bad . Cantilever floor slab should have been designed for such scenarios.\tdesigned\n75 injured. Nil deaths reported.\tdeaths"},
    }

    // $scope.textToSearchThrough = 'yuchen, hello word'
    // $scope.searchText = 'hello'


    $scope.TwitterComments = function(text) {
        // console.log(1)
        // console.log(text)
        // text = 'Due to a track signalling fault, pls add 30mins train travel time btwn #ChangiAirport and #TanahMerah.\nFree regular bus are available between #Tanah Merah and #Changi Airport.\nPlease explain why such faults occur again after the recent two full Sundays of train system closures?\nIt is implied that nothing is still being done to rectify the new signaling system ?\nFirst fault 2018.\nNew year. \nsame shit\nwhat a joke... already 30 mins from novena to raffles and still stuck...no announcement nothing...pathetic.\nWhat\'s wrong with redline. 1000\'s waiting at Bishan station\nU clearly need a new year\'s resolution. \nOr are you the kind of person that has one, and that gives up on it a day later. \nAhhh, that must be it! I\'m like that too, but 5 million ppl\'s lives does not depend on my efficiency. \nActually, zero ppl depend on me.\nFirst day of school.. Luckily it\'s only those heading to airport affected. \nCan\'t image first day of school late due to "competency" of transport company\nSMRT needs to buck up. \nWhat happened to the most reliable MRT system? Slacking.\nPerfect way to ring in the new year, breaking the resolution about fewer faults\nThey are only human... it\'s still THE best system I\'ve ever experienced.\n@LTAsg @PAPSingapore TA DA! And there you have it. Warm welcome to tourists and coming home Singaporeans! Did khaw say something like "good job smrt" somewhere and not published? LOL!\nDue to signalling fault, I\'m adding another day off from school\nOH FFS! Enuff already! Its bloody 2018!!'
        text = text
        // console.log(text)
        var destinationURL = 'http://127.0.0.1:1230';
        var config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        $scope.textArray = text.split("\n", (text.split("\n")).length)
        TemArray = []
        for (i = 0; i < $scope.textArray.length; i++) {
            console.log($scope.textArray[i])
            // console.log(config)
            $http.post(destinationURL, $scope.textArray[i], config).then($scope.TwitterOutPut, $scope.errorOutput); //$scope.TargetCategoryData,
        }
    }


    $scope.TwitterOutPut = function(twitter) {
        TemArray.push(twitter.data);

        if (TemArray[$scope.textArray.length - 1] != null) {
            $scope.outPut = TemArray
            console.log('--')

            var TemArray1 = [];
            $scope.Classification = []
            TemArray1['Positive'] = []
            TemArray1['Negative'] = []
            TemArray1['Neutral'] = []

            for (var item in $scope.outPut) {
                TemArray1[$scope.outPut[item].polaType].push($scope.outPut[item]);
                // console.log(TemArray1)
            }
            for (term in TemArray1){
                $scope.Classification.push(TemArray1[term])
                // console.log($scope.Classification)
            }
            console.log($scope.Classification)

        // console.log(TemArray)

        }

    }
            
    // $scope.showPolarity = false;
    $scope.analysis = function(text,target) {
        // console.log(2)
        $scope.showPolarity = false;
        var destinationURL = 'http://127.0.0.1:1230';
        var config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }
        // $scope.inputArea = text.split("\n", (text.split("\n")).length)
        
        $scope.inputArea  = text + '\t' +target

        console.log($scope.inputArea)
        TemArray1 = []
        
        $http.post(destinationURL, $scope.inputArea, config).then($scope.analyInput, $scope.errorOutput); //$scope.TargetCategoryData,
        

    }

    


    $scope.analyInput = function(twitter) {
        $scope.showPolarity = true;
        $scope.inputResult = twitter;

        console.log(twitter)
        // TemArray1.push(twitter.data);
        // if (TemArray1[$scope.inputArea.length - 1] != null) {
        //     $scope.inputResult = TemArray1
            

        // }

        // $scope.showPolarity = false;
    }


    $scope.errorOutput = function() {
        console.log("errooooooooooor");
    }

    $scope.updateSelected = function(){
        twitter = $scope.selectDemo.comments
        $scope.TwitterComments(twitter)
        // console.log($scope.selectDemo.target)
    }


    $scope.highlight = function(text, search) {
    if (!search) {
        return $sce.trustAsHtml(text);
    }
    return $sce.trustAsHtml(text.replace(new RegExp(search, 'gi'), '<span class="highlightedText">$&</span>'));
    };



}
