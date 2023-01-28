import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { app } from "./fb";

const App = () => {
  // captura el usuario logeado
  const [usuario, setUsuario] = useState(null);
  const [loadingUser, setLoadingUser] = useState();
  const navigate = useNavigate();

  const usuarioLogin = () => {
    app.auth().onAuthStateChanged((user) => {
      setUsuario(user);
      setLoadingUser(false);
    });
  };

  useEffect(() => {
    usuarioLogin();
    setLoadingUser(true);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            usuario={usuario}
            loadingUser={loadingUser}
            navigate={navigate}
          />
        }
      />
      <Route path="/login" element={<Login navigate={navigate} />} />
      <Route path="*" element={<p>Error: Not Found</p>} />
    </Routes>
  );
};

export default App;
