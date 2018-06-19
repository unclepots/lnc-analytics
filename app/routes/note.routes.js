module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new notes
    app.post('/notes', notes.create);

    // Get all notes
    app.get('/notes', notes.findAll);

    // Get a note by ID
    app.get('/notes/:noteId', notes.findOne);

    // Update a note by ID
    app.put('/notes/:noteId', notes.update);

    // Delete a note by ID
    app.delete('/notes/:noteId', notes.delete);
}