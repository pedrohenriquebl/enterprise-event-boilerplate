import { useAuthContext } from "@/context/AuthContext";
import { loginUser } from "@/lib/login/login";
import { useEffect } from "react";
import { User } from "@/@types/user";
import { useTranslations } from "next-intl";

export function useAuth() {
  const { user, setUser } = useAuthContext();
  const t = useTranslations("LoginPage");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const login = async (email: string, password: string) => {
    try {
      const result = await loginUser(email, password);
      setUser(result.user as User);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
      return { success: true, user: result.user as User };
    } catch (error: unknown) {
      const backendMessage = error instanceof Error ? error.message : undefined;
      return {
        success: false,
        message: backendMessage ? t(backendMessage) : t("LoginFailed"),
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return { user, login, logout };
}
