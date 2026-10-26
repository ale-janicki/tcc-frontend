"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authLogin, checkToken, isAuthenticated as hasSession } from "@/services/api";

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const nav = useRouter();
  const [token, setToken] = useState<unknown>(null);

  const isAuthenticated = !!token;

  useEffect(() => {
    if (hasSession()) {
      checkToken().then((response) => {
        setToken(response.data);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    authLogin(email, password)
      .then((ress) => {
        const token = ress.data.access_token;
        setToken(token);
        nav.push("/deposit");
      })
      .catch((err) => {});
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
