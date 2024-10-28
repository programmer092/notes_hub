import { FiMenu } from "react-icons/fi";
import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import NotesStorage from "../storage/localstorage";
import { NoteContext } from "../context/notecontext";
import { NoteContextType } from "../types";
import { Note } from "../types";
import ShowNote from "../Modal/showNote";
import toast from "react-hot-toast";

export default function SearchBar() {
  const [title, settitle] = useState("");
  const [found, setfound] = useState(false);
  const [searchedNote, setsearchedNote] = useState<Note[]>([]);
  const { setisModalOpen } = useContext(NoteContext) as NoteContextType;

  const handleSearch = () => {
    if (title === "") {
      return toast.error("Please enter a title to search");
    }
    const searchNote = NotesStorage.searchNote(title);
    if (searchNote.length > 0) {
      setfound(true);
      setsearchedNote(searchNote);
      setisModalOpen(true);
      settitle("");
      toast.success("Note found !!!");
    } else {
      settitle("");
      toast.error("Note not found !!!");
    }
  };
  return (
    <>
      <div className="flex w-screen items-center justify-center">
        <div className="relative m-2 flex w-full items-center justify-center gap-2 rounded-3xl bg-gray-800 sm:m-4 sm:w-1/2">
          <span className="m-1 sm:m-2">
            <FiMenu size={24} color="white" />
          </span>
          <input
            type="text"
            placeholder="Search notes by title..."
            className="m-2 w-full rounded-3xl bg-gray-700 px-4 py-2 text-gray-300 placeholder-gray-500"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <div className="absolute right-4 p-2" onClick={handleSearch}>
            <FaSearch size={16} />
          </div>
        </div>
      </div>
      {found && <ShowNote note={searchedNote[0]} />}
    </>
  );
}
