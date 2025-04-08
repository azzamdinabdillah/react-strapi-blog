import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   // base: "/react-strapi-blog/",
//   server: {
//     allowedHosts: ["blog.azamportfolio.my.id"],
//     cors: {
//       origin: ["https://blog.azamportfolio.my.id"],
//       methods: ["GET", "POST", "PUT", "DELETE"],
//       allowedHeaders: ["Content-Type", "Authorization"],
//       credentials: true
//     },
//   },
// });

import { mergeConfig } from "vite";

export default (config) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    plugins: [react(), tailwindcss()],
    server: {
      allowedHosts: ["blog.azamportfolio.my.id"],
      cors: {
        origin: ["*", "your white list origin"],
        credentials: true,
      },
    },
  });
};
