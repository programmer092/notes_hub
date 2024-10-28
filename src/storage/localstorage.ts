import { Note } from "../types";

const NotesStorage = {
  getNotes: (): Note[] => {
    return JSON.parse(localStorage.getItem("notes") || "[]");
  },
  setNote: (note: Note) => {
    const notes = NotesStorage.getNotes();
    localStorage.setItem("notes", JSON.stringify([...notes, note]));
  },
  removeNote: (noteId: string) => {
    const notes = NotesStorage.getNotes();
    const updatedNotes = notes.filter((note: Note) => note.id !== noteId);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  },
  editNote: (note: Note) => {
    const notes = NotesStorage.getNotes();
    const updatedNotes = notes.map((n: Note) => (n.id === note.id ? note : n));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  },
  compareTitle(title: string): boolean {
    const notes = NotesStorage.getNotes();
    const Matched = notes.filter((note: Note) => note.title === title);
    if (Matched.length > 0) {
      return true;
    }
    return false;
  },

  searchNote(title: string): Note[] {
    const notes = NotesStorage.getNotes();
    const Matched = notes.filter((note: Note) => note.title === title);
    return Matched;
  },
};

export default NotesStorage;
