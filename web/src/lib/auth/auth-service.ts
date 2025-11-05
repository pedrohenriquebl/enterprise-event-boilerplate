export const authService = {
  loginUser: async (email: string, password: string) => {
    //     try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email, password }),
    //     });

    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       throw new Error(errorData.message || "Login failed");
    //     }

    //     // Retorna o token JWT e outros dados do usuário, se houver
    //     return response.json(); // ex: { token: string, user: {...} }
    //   } catch (err) {
    //     throw err;
    //   }

    if (email === "pedro@test.com" && password === "123456") {
      return {
        token: "fake-jwt-token",
        user: { id: "1", name: "Pedro", age: 27, email },
      };
    }

    throw new Error("InvalidCredentials");
  },

  forgotPassword: async (email: string) => {
    // Implementar lógica de recuperação de senha aqui
    if (email === "pedro@test.com") {
      return {
        success: true,
      };
    }

    throw new Error("WrongCredentials");
  },

  resetPassword: async (token: string, email: string, newPassword: string) => {
    if (token === "valid-token") {
      console.log("Password: ", newPassword);
      return {
        success: true,
      };
    }

    throw new Error("InvalidToken");
  },
};
