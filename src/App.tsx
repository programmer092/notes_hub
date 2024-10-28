import { Toaster } from "react-hot-toast";
import HomePage from "./HomePage";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="h-screen w-screen overflow-y-auto">
        <HomePage />
      </div>
    </>
  );
}

export default App;
