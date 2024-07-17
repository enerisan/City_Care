import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import fetchAuth from "./lib/auth";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    fetchAuth().then((response) => setCurrentUser(response));
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      {currentUser ? (
        <p className="hello">Bonjour {currentUser.firstname} !</p>
      ) : (
        ""
      )}
      <Outlet context={{ currentUser, setCurrentUser }} />
    </>
  );
}

export default App;
