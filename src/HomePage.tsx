import ContentArea from "./components/NoteDisplaySection";
import SearchBar from "./components/SearchBar";
import CreateNote from "./components/AddNote";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-10 bg-black">
        <SearchBar />
      </div>
      <div className="flex-grow overflow-y-auto">
        <ContentArea />
      </div>
      <CreateNote />
    </div>
  );
}
