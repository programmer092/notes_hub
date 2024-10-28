import { useContext, useEffect } from "react";
import { ShowNoteProps } from "../types";
import { NoteContext } from "../context/notecontext";
import { NoteContextType } from "../types";
export default function ShowNote({ note }: ShowNoteProps) {
  const { isModalOpen, setisModalOpen } = useContext(
    NoteContext,
  ) as NoteContextType;
  useEffect(() => {
    const modal = document.getElementById("showNoteModal") as HTMLDialogElement;
    if (modal) {
      if (isModalOpen) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [isModalOpen]);

  return (
    <>
      <dialog id="showNoteModal" className="modal">
        <div className="modal-box border-2 border-solid border-green-600">
          <form method="dialog">
            <button
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
              onClick={() => setisModalOpen(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold text-blue-600">{note.title}</h3>
          <p className="py-4">{note.content}</p>
        </div>
      </dialog>
    </>
  );
}
