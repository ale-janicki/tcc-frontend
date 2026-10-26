import { checkToken } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Private = ({ children }: any) => {
  const nav = useRouter();

  useEffect(() => {
    checkToken().catch(() => {
      nav.push("/login");
    });
  }, []);

  return children;
};
