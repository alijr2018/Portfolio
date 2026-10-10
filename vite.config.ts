import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubPagesBuild = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  // Relative assets work from the repository's /docs GitHub Pages path.
  base: isGitHubPagesBuild ? './' : '/',
  plugins: [react()],
  build: {
    // GitHub Pages serves the static files committed under /docs.
    outDir: isGitHubPagesBuild ? 'docs' : 'dist',
    emptyOutDir: true,
  },
  // Keep generated GitHub Pages files out of Vite's development dependency scan.
  optimizeDeps: {
    entries: ['index.html'],
  },
  server: {
    host: '0.0.0.0',
    // Arena serves previews through a generated subdomain.
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
})
