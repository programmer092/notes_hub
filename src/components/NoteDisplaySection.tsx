import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { NoteContext } from "../context/notecontext";
import { useContext } from "react";
import { Note, NoteContextType } from "../types";
import NotesStorage from "../storage/localstorage";
import ShowNote from "../Modal/showNote";
import { useState } from "react";
import EditNote from "../Modal/editNote";
import { BsFilePlus } from "react-icons/bs";
import toast from "react-hot-toast";

export default function ContentArea() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const {
    notes,
    setNotes,
    isModalOpen,
    setisModalOpen,
    seteditModalOpen,
    editModalOpen,
  } = useContext(NoteContext) as NoteContextType;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    NotesStorage.removeNote(id);
    setNotes(NotesStorage.getNotes());
    toast.success("Note deleted successfully");
  };

  const handleEdit = (note: Note, e: React.MouseEvent) => {
    e.stopPropagation();
    seteditModalOpen(true);
    setSelectedNote(note);
  };

  const showNoteDetail = (note: Note) => {
    setSelectedNote(note);
    setisModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-center pb-3 text-3xl text-white sm:pb-5">
        <h1>Notes</h1>
      </div>
      {notes.length === 0 && (
        <div className="flex flex-grow items-center justify-center">
          Click on the '<BsFilePlus size={28} />' to add notes.
        </div>
      )}

      <div className="m-2 grid grid-cols-1 items-center justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {notes.length > 0 &&
          notes.map((note) => (
            <div
              className="card flex min-h-[190px] w-full min-w-[300px] flex-col bg-base-100 shadow-xl"
              key={note.id}
              onClick={() => showNoteDetail(note)}
            >
              <div className="card-body">
                <h2 className="card-title text-blue-700">{note.title}</h2>
                <p>
                  {note.content.length > 60
                    ? note.content.substring(0, 60) + "  ..."
                    : note.content}
                </p>
                <div className="card-actions items-end justify-end">
                  <div
                    className="badge badge-outline"
                    onClick={(e) => handleEdit(note, e)}
                  >
                    <MdEdit />
                  </div>
                  <div
                    className="badge badge-outline"
                    onClick={(e) => handleDelete(note.id, e)}
                  >
                    <MdDelete />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {selectedNote && isModalOpen && <ShowNote note={selectedNote} />}
      {selectedNote && editModalOpen && <EditNote note={selectedNote} />}
    </>
  );
}
