import { createContext, useEffect, useState } from "react";
import { NoteContextType, NoteProviderProps, Note } from "../types";

const NoteContext = createContext<NoteContextType | null>(null);

const NoteContextProvider = ({ children }: NoteProviderProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [editModalOpen, seteditModalOpen] = useState(false);

  useEffect(() => {
    const allnotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(allnotes);
  }, []);

  const values = {
    notes,
    setNotes,
    isModalOpen,
    setisModalOpen,
    editModalOpen,
    seteditModalOpen,
  };

  return <NoteContext.Provider value={values}>{children}</NoteContext.Provider>;
};

export { NoteContextProvider, NoteContext };
