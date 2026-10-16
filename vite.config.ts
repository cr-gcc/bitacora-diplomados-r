import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
            "@app": path.resolve(import.meta.dirname, "./src/app"),
            "@router": path.resolve(import.meta.dirname, "./src/router"),
            "@components": path.resolve(import.meta.dirname, "./src/components"),
            "@pages": path.resolve(import.meta.dirname, "./src/pages"),
            "@layouts": path.resolve(import.meta.dirname, "./src/layouts"),
            "@stores": path.resolve(import.meta.dirname, "./src/stores")
        },
    },
})
