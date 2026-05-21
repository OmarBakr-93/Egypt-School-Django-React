import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    if (token) {
      fetch("http://127.0.0.1:8000/profiles/", {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setRole(data[0].role);
            localStorage.setItem("role", data[0].role);
          }
        })

        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [token]);

  const login = (token, role) => {
    setToken(token);
    setRole(role);
    localStorage.setItem("token", token);
    if (role) localStorage.setItem("role", role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
