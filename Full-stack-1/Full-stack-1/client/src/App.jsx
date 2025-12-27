import { Route, Routes } from "react-router";
import AllTask from "./pages/AllTask";
import Navbar from "./components/Navbar";
import ImportantTask from "./pages/ImportantTask";
import CompletedTask from "./pages/CompletedTask";
import Directoires from "./pages/Directoires";
import UncompletedTask from "./pages/UncompletedTask";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<AllTask />} />
          <Route path="/ImportantTask" element={<ImportantTask />} />
          <Route path="/CompletedTask" element={<CompletedTask />} />
          <Route path="/UncompletedTask" element={<UncompletedTask />} />
          <Route path="/:directoiryName" element={<Directoires />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
