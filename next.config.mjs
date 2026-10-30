import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Instante do build: a página inicial escolhe a tabela de preços com ele no
  // HTML estático (servidor e navegador veem o mesmo número → sem erro de
  // hidratação) e troca pra hora de agora depois de montar.
  env: { AGORA_DO_BUILD: String(Date.now()) },
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
