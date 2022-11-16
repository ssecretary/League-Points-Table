import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LeaguePage from "./components/LeaguePage";
import "antd/dist/antd.css";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/league" element={<LeaguePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
