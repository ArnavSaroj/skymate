import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import SignUpPage from "./pages/Signup.jsx";
import { useState } from "react";
import { AuthContext } from "./context/AuthContext.jsx";


function App() {

const [User,setUser]=useState(null)
  return (
    <Router>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <AuthContext.Provider value={{User,setUser}}>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/search-flights" element={<Layout />} />
          <Route path="/signup" element={<SignUpPage />} />
          </Routes>
          </AuthContext.Provider>
      </div>
    </Router>
  );
}

export default App;
