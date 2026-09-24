/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXTAUTH_URL: "https://dadoftwo.web.id",
    NEXTAUTH_SECRET: "firdyawan_super_secret_key_12345!"
  }
};

export default nextConfig;
