import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
function App() {
  return (
    <Router>
      {" "}
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Layout />
      </div>
    </Router>
  );
}

export default App;
