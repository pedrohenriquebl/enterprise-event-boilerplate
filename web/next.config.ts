import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Corrige o aviso de múltiplos lockfiles
  outputFileTracingRoot: path.join(__dirname, "../.."),

  // Configurações experimentais seguras e compatíveis
  // Dependências que devem ser tratadas como externas no servidor.
  // `serverComponentsExternalPackages` foi movido para `serverExternalPackages`.
  serverExternalPackages: [],

  // Evita tentativa de gerar rotas estáticas automáticas
  output: "standalone",
};

export default nextConfig;
