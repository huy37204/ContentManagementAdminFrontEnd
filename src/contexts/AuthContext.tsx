import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

interface JwtPayload {
  role: string;
  sub: string;
  exp: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        if (decoded.exp * 1000 > Date.now()) {
          setRole(decoded.role);
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem("access_token");
        }
      } catch {
        sessionStorage.removeItem("access_token");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token: string) => {
    sessionStorage.setItem("access_token", token);
    const decoded = jwtDecode<JwtPayload>(token);
    setRole(decoded.role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
