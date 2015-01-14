describe('Notes Scenario', function() {
	var notesList = {};
	beforeEach(function() {
		browser.get('http://localhost:9000');
		notesList.titles = element.all(by.repeater('note in notes').column('title'));
		notesList.descriptions = element.all(by.repeater('note in notes').column('description'));
	});

	it('should search notes', function() {
		element(by.model('searchQuery')).sendKeys('First');
		var notes = element.all(by.repeater('note in notes'));
		expect(notes.count()).toBe(1);
	});

	it('should create new note', function() {
		expect(element(by.css('.create-note-section')).getCssValue('display')).toBe('none');
		element(by.css('.create-note-btn')).click();
		expect(element(by.css('.create-note-section')).getCssValue('display')).toBe('block');
		element(by.model('newNote.title')).sendKeys('New Note');
		element(by.model('newNote.description')).sendKeys('Note description');
		element(by.buttonText('Create')).click();
		expect(notesList.titles.last().getText()).toEqual('New Note');
		expect(notesList.descriptions.last().getText()).toEqual('Note description');
	});

	it('should remove a note', function() {
		var notes = element.all(by.repeater('note in notes'));
		expect(notes.count()).toBe(3);
		element.all(by.css('.remove-note-btn')).first().click();
		expect(notes.count()).toBe(2);
	});

	it('should update a note', function() {
		expect(notesList.titles.first().getText()).toBe('My First Note');
		expect(notesList.descriptions.first().getText()).toBe('This is the description of my first note');

		expect(element(by.css('.edit-note-section')).getCssValue('display')).toBe('none');
		element(by.css('.note:first-child .edit-note-btn')).click();
		expect(element(by.css('.edit-note-section')).getCssValue('display')).toBe('block');

		element(by.model('currentEditingNote.title')).sendKeys(' modified');
		element(by.model('currentEditingNote.description')).sendKeys(' modified');
		element(by.buttonText('Update')).click();

		expect(notesList.titles.first().getText()).toBe('My First Note modified');
		expect(notesList.descriptions.first().getText()).toBe('This is the description of my first note modified');
	});

	it('should hide note create/edit section by clicking on close button', function() {
		// Create Note Section
		expect(element(by.css('.create-note-section')).getCssValue('display')).toBe('none');
		element(by.css('.create-note-btn')).click();
		expect(element(by.css('.create-note-section')).getCssValue('display')).toBe('block');
		element(by.css('.create-note-section .close')).click();
		expect(element(by.css('.create-note-section')).getCssValue('display')).toBe('none');

		// Edit Note Section
		expect(element(by.css('.edit-note-section')).getCssValue('display')).toBe('none');
		element(by.css('.note:first-child .edit-note-btn')).click();
		expect(element(by.css('.edit-note-section')).getCssValue('display')).toBe('block');
		element(by.css('.edit-note-section .close')).click();
		expect(element(by.css('.edit-note-section')).getCssValue('display')).toBe('none');
	});
});
