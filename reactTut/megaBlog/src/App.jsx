import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";
import { Footer, Header } from "./components";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.getCurrentUser()
      .then((userData) => {
        userData ? dispatch(login(userData)) : dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen m-0 p-0 flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    null
  );
}

export default App;
