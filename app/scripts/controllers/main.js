'use strict';

/**
 * @ngdoc function
 * @name testingNotesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the testingNotesApp
 */
angular.module('testingNotesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.notes = [
    	{title: 'My First Note', description: 'This is the description of my first note'},
    	{title: 'My Second Note', description: 'This is the description of my second note'},
    	{title: 'My Third Note', description: 'This is the description of my third note'}
    ];

    var prepareNewNote = function () {
    	return {title: '', description: ''};
    };

    $scope.newNote = prepareNewNote();
    
    $scope.isCreatingNote = false;
    $scope.isEditingNote = false;

    $scope.createNote = function() {
    	$scope.notes.push($scope.newNote);
    	$scope.hideCreatingForm();
	    $scope.newNote = prepareNewNote();
    };

    $scope.removeNote = function(index) {
    	$scope.notes.splice(index, 1);
    };

    $scope.editNote = function(index) {
    	var note = $scope.notes[index];
    	$scope.currentEditingNote = {title: note.title, description: note.description};
    	$scope.currentEditingNote.index = index;
    	$scope.showEditingForm();
    };

    $scope.updateNote = function(index) {
    	$scope.notes[index] = $scope.currentEditingNote;
    	$scope.hideEditingForm();
    };

    $scope.showCreatingForm = function() {
    	$scope.isCreatingNote = true;
    	$scope.hideEditingForm();
    };

    $scope.hideCreatingForm = function() {
    	$scope.isCreatingNote = false;
    };

    $scope.showEditingForm = function() {
    	$scope.isEditingNote = true;
    	$scope.hideCreatingForm();
    };

    $scope.hideEditingForm = function() {
    	$scope.isEditingNote = false;
    };
 
});
