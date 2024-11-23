import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";

const base64Loader: Plugin = {
  name: "base64-loader",
  transform(_: any, id: string) {
    const [path, query] = id.split("?");
    if (query != "base64") return null;

    const data = fs.readFileSync(path);
    const base64 = data.toString("base64");

    // Add linebreaks every 60 characters
    const base64WithLinebreaks = base64.match(/.{1,60}/g)?.join("\n") || base64;

    return `export default \`${base64WithLinebreaks}\`;`;
  },
};


// https://vite.dev/config/
export default defineConfig({
  plugins: [base64Loader, react()],
})
