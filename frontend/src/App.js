import { RouterProvider } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import router from "./routes";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const authContext = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  return (
    <div className="App">
      <AuthContext.Provider value={authContext}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
