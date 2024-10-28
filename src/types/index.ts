export type Note = {
  id: string;
  title: string;
  content: string;
};

export interface NoteContextType {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  isModalOpen: boolean;
  setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editModalOpen: boolean;
  seteditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NoteProviderProps {
  children: React.ReactNode;
}

export type ShowNoteProps = {
  note: Note;
};
