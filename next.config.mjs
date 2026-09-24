/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  serverActions: {
    allowedOrigins: ["dadoftwo.web.id", "*.dadoftwo.web.id", "www.dadoftwo.web.id", "localhost:3000"]
  },
  env: {
    NEXTAUTH_URL: "https://dadoftwo.web.id",
    NEXTAUTH_SECRET: "firdyawan_super_secret_key_12345!"
  }
};

export default nextConfig;
