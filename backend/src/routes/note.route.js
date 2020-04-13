const express = require('express');
const router = express.Router();
const cNotes = require('../controllers/note.controller');

router.get('/', cNotes.getAllNotes);
router.get('/:id', cNotes.getOneNote);
router.post('/', cNotes.createNote);
router.put('/:id', cNotes.updateNote);
router.delete('/:id', cNotes.deleteNote);

module.exports = router;