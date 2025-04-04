import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "transform-img-src",
      transform(code, id) {
        // Target hanya file JSX / TSX (React)
        if (!id.endsWith(".jsx") && !id.endsWith(".tsx")) return null;

        // Cari tag <img> yang punya src="/..."
        const updatedCode = code.replace(
          /<img([^>]*?)src="\/([^"]+)"([^>]*?)\/?>/g,
          (before, path, after) => {
            // Tambahkan prefix react-strapi-blog/
            return `<img${before}src="react-strapi-blog/${path}"${after}>`;
          }
        );

        return {
          code: updatedCode,
          map: null,
        };
      },
    },
  ],
  base: "/react-strapi-blog/",
});
