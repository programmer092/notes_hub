import { useState } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import NotesStorage from "../storage/localstorage";
import { useContext } from "react";
import { NoteContext } from "../context/notecontext";
import { NoteContextType } from "../types";
import toast from "react-hot-toast";

export default function CreateNote() {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const { setNotes } = useContext(NoteContext) as NoteContextType;

  const handleCreate = () => {
    if (title === "" || content === "") {
      return toast.error("Fields cannot be empty!");
    }
    if (title.length > 20) {
      return toast.error("Title should be less than 20 characters");
    }
    if (content.length > 300) {
      return toast.error("Content should be less than 300 characters");
    }
    if (NotesStorage.compareTitle(title)) {
      return toast.error("Title already exists");
    }
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
    };
    NotesStorage.setNote(newNote);
    setNotes(JSON.parse(localStorage.getItem("notes") || "[]"));
    settitle("");
    setcontent("");
    (document.getElementById("addNoteModal") as HTMLDialogElement)?.close();
    toast.success("Note added successfully");
  };

  return (
    <>
      <div>
        <div
          className="fixed bottom-10 right-10 hidden sm:block"
          onClick={() =>
            (
              document.getElementById("addNoteModal") as HTMLDialogElement
            )?.showModal()
          }
        >
          <AiFillFileAdd size={48} fill="green" />
        </div>

        <div
          className="fixed bottom-10 right-10 block sm:hidden"
          onClick={() =>
            (
              document.getElementById("addNoteModal") as HTMLDialogElement
            )?.showModal()
          }
        >
          <AiFillFileAdd size={32} fill="green" />
        </div>
      </div>
      <dialog id="addNoteModal" className="modal sm:modal-middle">
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
              onClick={handleCreate}
            >
              Add
            </button>
            <form method="dialog">
              <button
                className="btn"
                onClick={() => {
                  settitle("");
                  setcontent("");
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
