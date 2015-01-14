    'use strict';

    describe('Controller: MainCtrl', function () {

      // load the controller's module
      beforeEach(module('testingNotesApp'));

      var MainCtrl,
        scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
          $scope: scope
        });
      }));

      it('should attach a list of notes to the scope', function () {
        expect(scope.notes.length).toBe(3);
      });

      it('should create new note', function() {
        expect(scope.notes.length).toBe(3);
        scope.newNote = {title: 'new note', description: 'note description'};
        scope.createNote();
        expect(scope.notes.length).toBe(4);
      });

      it('should hide note creating/editing form by default', function() {
        expect(scope.isCreatingNote).toBe(false);
        expect(scope.isEditingNote).toBe(false);
      });

      it('should hide/show note creating form', function() {
        expect(scope.isCreatingNote).toBe(false);
        scope.showCreatingForm();
        expect(scope.isCreatingNote).toBe(true);
        scope.hideCreatingForm();
        expect(scope.isCreatingNote).toBe(false);
      });

      it('should hide/show note editing form', function() {
        expect(scope.isEditingNote).toBe(false);
        scope.showEditingForm();
        expect(scope.isEditingNote).toBe(true);
        scope.hideEditingForm();
        expect(scope.isEditingNote).toBe(false);
      });

      it('should remove a note', function() {
        expect(scope.notes.length).toBe(3);
        scope.removeNote(0);
        expect(scope.notes.length).toBe(2);
      });

      it('should update a note', function() {
        expect(scope.notes[0].title).toBe('My First Note');
        expect(scope.notes[0].description).toBe('This is the description of my first note');


        scope.currentEditingNote = scope.notes[0];
        scope.currentEditingNote.title = 'My First Note Modified';
        scope.currentEditingNote.description = 'Modified description';
        scope.updateNote(0);

        expect(scope.notes[0].title).toBe('My First Note Modified');
        expect(scope.notes[0].description).toBe('Modified description');
      });

      it('should show the editing form when editing a note', function() {
        expect(scope.isEditingNote).toBe(false);
        scope.editNote(0);
        expect(scope.isEditingNote).toBe(true);
      });
    });
