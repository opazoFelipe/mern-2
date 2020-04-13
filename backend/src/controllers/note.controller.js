const controller = {};

const Note = require('../models/Note.model');

controller.getAllNotes = async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
};

controller.getOneNote = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        res.json(note);
    } catch (error) {
        res.status(400).json({status: 'No existe la nota solicitada'});
    } 
};

controller.createNote = async (req, res) => {
    const { title, content, author, date } = req.body;
    try {
        const newNote = new Note({ title, content, date, author });
        await newNote.save();
        return res.status(200).json({state: `Nota Guardada`});
    } catch (error) {
        return res.status(500).json({
            status: `${error}`
        }); 
    }
};

controller.updateNote = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        await Note.findOneAndUpdate({_id: req.params.id}, { title, content, author });
        res.json({status: "Nota Actualizada"});
    } catch (error) {
        res.status(400).json({status: 'No existe la nota solicitada'});
    }
};

controller.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(400).json({status: 'No existe la nota solicitada'});
        else {
            await Note.findByIdAndDelete(req.params.id);
            res.json({status: "Nota eliminada"});
        }
    } catch (error) {
        res.status(400).json({status: 'No existe la nota solicitada'});
    }
};

module.exports = controller;