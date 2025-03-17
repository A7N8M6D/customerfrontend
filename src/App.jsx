import { useState } from "react";
import "./App.css";
import Path from "./routes/Path";
import { BrowserRouter as Router } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Path />
      </Router>
    </>
  );
}

export default App;
