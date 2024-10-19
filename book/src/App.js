
import Page1 from './Component/Page1';
import GetReport from "./Component/GetReport"
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div >
    <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/get-report" element={<GetReport />} />
      </Routes>
    </div>
  );
}

export default App;
