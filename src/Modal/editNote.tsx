import { ShowNoteProps } from "../types";
import { useEffect, useContext, useState } from "react";
import { NoteContext } from "../context/notecontext";
import { NoteContextType } from "../types";
import NotesStorage from "../storage/localstorage";
import toast from "react-hot-toast";

export default function EditNote({ note }: ShowNoteProps) {
  const [title, settitle] = useState(note.title);
  const [content, setcontent] = useState(note.content);
  const { editModalOpen, seteditModalOpen, setNotes } = useContext(
    NoteContext,
  ) as NoteContextType;
  useEffect(() => {
    const modal = document.getElementById("editNoteModal") as HTMLDialogElement;
    if (modal) {
      if (editModalOpen) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [editModalOpen]);

  const handleUpdate = (e: React.MouseEvent) => {
    e.preventDefault();
    const updatednote = {
      id: note.id,
      title,
      content,
    };

    NotesStorage.editNote(updatednote);
    settitle("");
    setcontent("");
    seteditModalOpen(false);
    setNotes(NotesStorage.getNotes());
    toast.success("Note updated successfully");
  };

  return (
    <>
      <dialog id="editNoteModal" className="modal sm:modal-middle">
        <div className="modal-box">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full max-w-xs"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <textarea
            className="textarea textarea-primary mt-2 w-full max-w-xs"
            placeholder="Content"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          />
          <div className="modal-action">
            <button
              className="rounded-md bg-blue-500 px-4 text-black"
              onClick={(e) => handleUpdate(e)}
            >
              Update
            </button>
            <form method="dialog">
              <button
                className="btn"
                onClick={() => {
                  settitle("");
                  setcontent("");
                  seteditModalOpen(false);
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
