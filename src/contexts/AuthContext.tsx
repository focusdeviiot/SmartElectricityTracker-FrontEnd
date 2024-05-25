import React, { createContext, useEffect, useState, ReactNode } from "react";
import { checkToken } from "../api/auth";
import Loading from "../pages/Loading/Loading";

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setRole: (role: string | null) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sss, setSss] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      const valid = await checkToken();
      setIsAuthenticated(valid);
      if (valid) {
        const userRole = localStorage.getItem("user_role");
        setRole(userRole);
      }

      // setSss(false);
      setTimeout(() => {
        setSss(false);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }, 500);
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, setIsAuthenticated, setRole }}
    >
      <div className="">
        <div
          className={`transition-opacity duration-200 ${
            sss ? "opacity-100" : "opacity-0"
          }`}
        >
          {loading ? <Loading /> : null}
        </div>
        <div
          className={`transition-opacity duration-500 ${
            !loading ? "opacity-100" : "opacity-0"
          }`}
        >
          {!loading ? children : null}
        </div>
      </div>
    </AuthContext.Provider>
  );
};