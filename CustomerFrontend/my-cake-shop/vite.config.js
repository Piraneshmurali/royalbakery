import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["antd/es", "@ant-design/icons/es"],
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
      
    },
  },

});