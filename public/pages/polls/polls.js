'use strict';

angular.module('Polls', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('polls', {
    url: '/polls',
    templateUrl: '/pages/polls/polls.html',
    controller: 'PollsCtrl as polls'
  });
}])

.controller('PollsCtrl', ['$http',function($http) {

  // variables
  var c = this;
  c.deletePoll = deletePoll;
  c.createPoll = createPoll;

  // initialize
  getPolls();

  // implementation details

  function createPoll(){
    var poll = {
      title: "New Poll",
      choices: [{ title: "Yes" }, { title: "No" } ]
    };
    $http.post('/api/polls', poll).then(
        function (response) {
          c.polls = response.data;
        },
        function (error) {
          c.error = error.data;
        }
    );
  }

  function getPolls(){
    $http.get('/api/polls').then(
        function (response) {
          c.polls = response.data;
        },
        function (error) {
          c.error = error.data;
        }
    );
  }

  function deletePoll(id){
    $http.delete('/api/polls/'+id).then(
        function (response) {
          c.polls = response.data;
        },
        function (error) {
          c.error = error.data;
        }
    );
  }

}]);