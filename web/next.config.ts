import path from "path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

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

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
