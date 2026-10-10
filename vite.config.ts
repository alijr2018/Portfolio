import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubPagesBuild = process.env.GITHUB_PAGES === 'true'

export default defineConfig({
  // GitHub Pages serves this project from /Portfolio/ rather than the domain root.
  base: isGitHubPagesBuild ? '/Portfolio/' : '/',
  plugins: [react()],
  build: {
    // GitHub Pages serves the static files committed under /docs.
    outDir: isGitHubPagesBuild ? 'docs' : 'dist',
    emptyOutDir: true,
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
