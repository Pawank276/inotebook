import { Router } from 'express';
const router = Router();
import { body, validationResult } from 'express-validator';
import fetchuser from '../Middleware/fetchuser.js';
import Note from "../Models/Note.js";

//Route 1 :- fetch all notes using GET:/api/notes/fetchallnotes , Login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        //check errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route 2 :- add a new note using POST:/api/notes/addnote , Login required.
router.post('/addnote', fetchuser, [
    body('title', 'Please enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must contain 5 characters').isLength({ min: 5 }),
],
    async (req, res) => {
        try {
            //check errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, tag } = req.body;
            const note = new Note({
                title, description, tag, user: req.user.id
            });
            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal Server Error")
        }
    })

//Route 3 :- update existing note using PUT:/api/notes/updatenote , Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not Found!!")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!!")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route 4 :- Delete existing note using DELETE:/api/notes/deletenote , Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let success = false;
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not Found!!") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!!")
        }
        success = true;
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "success": "Note has been deleted", success });
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})


//Route :4:- fetch a note with id GET:/api/notes/:id , Login required.
router.get('/fetchnote/:id', fetchuser, async (req, res) => {
    try {

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not Found!!") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed!!")
        }
        res.json(note)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
});
export default router