import { RequestHandler } from "express";
import createHttpError from "http-errors";
import NoteModel from "../models/note";
import mongoose from "mongoose";

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
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid note id");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "note not found");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;
  try {
    if (!title) {
      throw createHttpError(400, "Note must have title");
    }
    const newNotes = await NoteModel.create({
      title: title,
      text: text,
    });
    res.status(201).json(newNotes);
  } catch (error) {
    next(error);
  }
};

interface UpdateNotes {
  noteId: string;
}

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNotes,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title: newTitle, text: newText } = req.body;
  const { noteId } = req.params;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid note id");
    }

    if (!newTitle) {
      throw createHttpError(400, "Note must have title");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "note not found");
    }
    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid note id");
    }

    const note = await NoteModel.findByIdAndRemove(noteId).exec();
    if (!note) {
      throw createHttpError(404, "note not found");
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
