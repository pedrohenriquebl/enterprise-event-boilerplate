"use client";

import { useAuthContext } from "@/context/AuthContext";
import { authService } from "@/lib/auth/auth-service";
import { useEffect } from "react";
import { User } from "@/@types/user";
import { useTranslations } from "next-intl";

export function useAuth() {
  const { user, setUser } = useAuthContext();
  const t = useTranslations("LoginPage");
  const tf = useTranslations("ForgotPasswordPage");
  const ts = useTranslations("PasswordResetPage");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const login = async (email: string, password: string) => {
    try {
      const result = await authService.loginUser(email, password);
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

  const forgotPassword = async (email: string) => {
    try {
      const result = await authService.forgotPassword(email);

      if (result.success) {
        return { success: true };
      }

      return { success: false };
    } catch (error: unknown) {
      const backendMessage = error instanceof Error ? error.message : undefined;
      return {
        success: false,
        message: backendMessage ? tf(backendMessage) : tf("WrongCredentials"),
      };
    }
  };

  const resetPassword = async (
    token: string,
    email: string,
    newPassword: string
  ) => {
    try {
      const result = await authService.resetPassword(token, email, newPassword);

      if (result.success) {
        return { success: true };
      }

      return { success: false };
    } catch (error: unknown) {
      const backendMessage = error instanceof Error ? error.message : undefined;
      return {
        success: false,
        message: backendMessage ? ts(backendMessage) : ts("InvalidToken"),
      };
    }
  };

  return { user, login, logout, forgotPassword, resetPassword };
}
