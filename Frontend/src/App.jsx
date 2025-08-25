import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import SignUpPage from "./pages/Signup.jsx";

function App() {
  return (
    <Router>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/search-flights" element={<Layout />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
