import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { app } from "../../../DB/firebase"; // 👈 asegúrate de apuntar correctamente a tu config
import { loginWithGoogle, logout } from "../../../DB/fireauth"; // 👈 tus funciones

// Crear el contexto
const AuthContext = createContext<{
  user: User | null;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  loginWithGoogle: async () => {},
  logout: async () => {}
});

// Hook para usar el contexto más fácilmente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

  // Detectar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Usuario autenticado:", currentUser.displayName);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Funciones conectadas a Firebase
  const handleLogin = async () => {
    try {
      const loggedUser = await loginWithGoogle();
      setUser(loggedUser);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
        loginWithGoogle: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
