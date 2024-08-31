import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://shopeasy-server-94rv.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    "process.env": process.env,
  },
});
