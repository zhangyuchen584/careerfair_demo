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

View2Ctrl.$inject = ['$rootScope', '$scope', '$http'];


function View2Ctrl($rootScope, $scope, $http) {


        $scope.demos = {
        'SMRT Signalling Fault' : {target:"Topic: Due to a track signalling fault, pls add 30mins train travel time btwn #ChangiAirport and #TanahMerah. Free regular bus are available between #Tanah Merah and #Changi Airport.",
        comments : "Please explain why such faults occur again after the recent two full Sundays of train system closures? It is implied that nothing is still being done to rectify the new signaling system ?\nFirst fault 2018.\nNew year. same shit\nWhat's wrong with redline. 1000's waiting at Bishan station\nU clearly need a new year's resolution. Or are you the kind of person that has one, and that gives up on it a day later. Ahhh, that must be it! I'm like that too, but 5 million ppl's lives does not depend on my efficiency. Actually, zero ppl depend on me.\nFirst day of school.. Luckily it's only those heading to airport affected. Can't image first day of school late due to \"competency\" of transport company\nSMRT needs to buck up. What happened to the most reliable MRT system? Slacking.\nPerfect way to ring in the new year, breaking the resolution about fewer faults\nThey are only human... it's still THE best system I've ever experienced.\nDue to signalling fault, I'm adding another day off from school\nOH FFS! Enuff already! Its bloody 2018!!"},
        'Apology for Traffic Issue' : {target:"Topic: We are sorry that your journey will be affected during this period. Thank you for your patience and understanding.",
        comments : "London has tube breakdowns everyday. You're actually lucky you don't get more distribution in Singapore this is much worse and more normal in other countries\nIn London the vechicle prices are not so high and people can easily own a car !!! Here people relay only on public transport\nTo be very fair, if car prices were low in Singapore, the jams would probably be exponentially worse than it currently is.\nThere no way comparing us and sg\nThat's the only point I am trying to make here in my comments\nthis worst train service also no 1 of it's own.kind\nSorry no cure at this point when it has reached the point of nearly daily disruptions that actually go unannounced...\nGuys you all.get used to funny travel by mrt and.accept it's own fxxng execuses\ntime is needed for issues to be smoothen out for safer and quicker journeys. Most Singaporeans subconsciously understand, or they failed SS\nI hope ur train won't breakdown. I taking from buona vista to boon lay."},
        'Floor Collapsed Accident' : {target:"Topic: Video emerges online showing the moment a Jakarta stock exchange floor collapsed under a group of visiting students http://cna.asia/2FDAL0H",
        comments : "Video emerges online showing the moment a Jakarta stock exchange floor collapsed under a group of visiting students http://cna.asia/2FDAL0H\nThe design is very bad . Cantilever floor slab should have been designed for such scenarios.\n75 injured. Nil deaths reported.\nTragic\nGoogle \"Hyatt Regency Skywalk Collapse \" same thing happened in US in Kansas City MO in 1981\nJakarta stock exchange floor collapsed.\nI hope all are fine\nHoly shit! );\nVery sad horrible.\nOMG! Those poor people!"},
    }




    $scope.TwitterComments = function(text) {
        // console.log(1)
        // console.log(text)
        // text = 'Due to a track signalling fault, pls add 30mins train travel time btwn #ChangiAirport and #TanahMerah.\nFree regular bus are available between #Tanah Merah and #Changi Airport.\nPlease explain why such faults occur again after the recent two full Sundays of train system closures?\nIt is implied that nothing is still being done to rectify the new signaling system ?\nFirst fault 2018.\nNew year. \nsame shit\nwhat a joke... already 30 mins from novena to raffles and still stuck...no announcement nothing...pathetic.\nWhat\'s wrong with redline. 1000\'s waiting at Bishan station\nU clearly need a new year\'s resolution. \nOr are you the kind of person that has one, and that gives up on it a day later. \nAhhh, that must be it! I\'m like that too, but 5 million ppl\'s lives does not depend on my efficiency. \nActually, zero ppl depend on me.\nFirst day of school.. Luckily it\'s only those heading to airport affected. \nCan\'t image first day of school late due to "competency" of transport company\nSMRT needs to buck up. \nWhat happened to the most reliable MRT system? Slacking.\nPerfect way to ring in the new year, breaking the resolution about fewer faults\nThey are only human... it\'s still THE best system I\'ve ever experienced.\n@LTAsg @PAPSingapore TA DA! And there you have it. Warm welcome to tourists and coming home Singaporeans! Did khaw say something like "good job smrt" somewhere and not published? LOL!\nDue to signalling fault, I\'m adding another day off from school\nOH FFS! Enuff already! Its bloody 2018!!'
        text = text
        var destinationURL = 'http://127.0.0.1:1230';
        var config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        $scope.textArray = text.split("\n", (text.split("\n")).length)
        TemArray = []
        for (i = 0; i < $scope.textArray.length; i++) {
            // console.log($scope.textArray[i])
            console.log(config)
            $http.post(destinationURL, $scope.textArray[i], config).then($scope.TwitterOutPut, $scope.errorOutput); //$scope.TargetCategoryData,
        }
    }


    $scope.TwitterOutPut = function(twitter) {
        TemArray.push(twitter.data);
        if (TemArray[$scope.textArray.length - 1] != null) {
            $scope.outPut = TemArray


            var TemArray1 = [];
            $scope.Classification = []
            TemArray1['Positive'] = []
            TemArray1['Negative'] = []
            TemArray1['Neutral'] = []

            for (var item in $scope.outPut) {
                TemArray1[$scope.outPut[item].polaType].push($scope.outPut[item]);
                console.log(TemArray1)
            }
            for (term in TemArray1){
                $scope.Classification.push(TemArray1[term])
                console.log($scope.Classification)
            }


        }

    }

    // $scope.showPolarity = false;
    $scope.analysis = function(text) {
        // console.log(2)
        $scope.showPolarity = false;
        var destinationURL = 'http://127.0.0.1:1230';
        var config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }
        $scope.inputArea = text.split("\n", (text.split("\n")).length)
        TemArray1 = []
        for (var i = 0; i < $scope.inputArea.length; i++) {
            // console.log($scope.inputArea[i].data)
            $http.post(destinationURL, $scope.inputArea[i], config).then($scope.analyInput, $scope.errorOutput); //$scope.TargetCategoryData,
        }
    }


    $scope.analyInput = function(twitter) {
        $scope.showPolarity = true;
        TemArray1.push(twitter.data);
        if (TemArray1[$scope.inputArea.length - 1] != null) {
            $scope.inputResult = TemArray1
            // console.log($scope.inputResult)
        }
        // $scope.showPolarity = false;
    }

    $scope.errorOutput = function() {
        console.log("errooooooooooor");
    }

    $scope.updateSelected = function(){
        twitter = $scope.selectDemo.comments
        $scope.TwitterComments(twitter)
        console.log($scope.selectDemo.target)
    }






}
