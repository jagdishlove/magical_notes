import { RequestHandler } from "express";
import NoteModel from "../models/note";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const note = await NoteModel.findById(noteId).exec();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNotes: RequestHandler = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    const newNotes = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNotes);
  } catch (error) {
    next(error);
  }
};
