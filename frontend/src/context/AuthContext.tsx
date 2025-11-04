import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { app } from "../../../DB/firebase"; // 👈 asegúrate de apuntar correctamente a tu config
import { loginWithGoogle, logout } from "../../../DB/fireauth"; // 👈 tus funciones
import { addDocument, getDogsByOwner } from "../../../DB/firestoreService"; // helper para escribir en Firestore

// Crear el contexto
const AuthContext = createContext<{
  user: User | null;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  publishDog: (dogData: any) => Promise<string | void>;
  publishedDogs: any[];
}>( {
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  publishDog: async () => {},
  publishedDogs: []
});

// Hook para usar el contexto más fácilmente
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [publishedDogs, setPublishedDogs] = useState<any[]>([]);
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

  // Publicar un perro en Firestore usando el helper compartido en /DB
  const publishDog = async (dogData: any): Promise<string | void> => {
    try {
      // Attach owner info (email, uid, displayName) and creation timestamp
      const ownerEmail = user?.email ?? null;
      //const ownerId = user?.uid ?? null;
      //const ownerName = (user as any)?.displayName ?? null;

      const dogWithOwner = {
        ...dogData,
        ownerEmail/*,
        ownerId,
        ownerName,
        createdAt: new Date().toISOString()*/
      };

      // Asegurarse de que la colección coincida con el resto del proyecto ("Perro")
      const id = await addDocument("Perro", dogWithOwner);
      console.log("Perro publicado con id:", id);
      // Update local publishedDogs cache optimistically
      try {
        setPublishedDogs(prev => [...prev, { ...dogWithOwner, id }]);
      } catch (e) {
        // ignore
      }
      return id;
    } catch (error) {
      console.error("Error publicando perro:", error);
    }
  };

  // Load published dogs for the authenticated user
  useEffect(() => {
    let mounted = true;
    const loadPublished = async () => {
      if (!user) {
        if (mounted) setPublishedDogs([]);
        return;
      }
      try {
        const list = await getDogsByOwner(user.email ?? undefined);
        if (!mounted) return;
        setPublishedDogs(list);
      } catch (err) {
        console.error('Error loading published dogs for user:', err);
        if (mounted) setPublishedDogs([]);
      }
    };
    loadPublished();
    return () => { mounted = false; };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        setUser,
        loginWithGoogle: handleLogin,
        logout: handleLogout,
        publishDog,
        publishedDogs
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
