#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting build process...');

try {
  // Note: We don't manually remove the 'dist' directory anymore
  // because Vite handles it automatically via the `emptyOutDir` config
  // and manual deletion causes EBUSY errors in Linux/Docker containers.

  // Run vite build
  console.log('📦 Building with Vite...');
  execSync('vite build --mode production', { stdio: 'inherit' });

  // Copy additional files
  console.log('📋 Copying additional files...');
  const filesToCopy = [
    { src: 'public/_redirects', dest: 'dist/_redirects' },
    { src: 'public/_headers', dest: 'dist/_headers' },
    { src: 'netlify.headers', dest: 'dist/_headers' },
    { src: 'static.json', dest: 'dist/static.json' }
  ];

  filesToCopy.forEach(({ src, dest }) => {
    if (fs.existsSync(src)) {
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
      console.log(`✅ Copied ${src} to ${dest}`);
    } else {
      console.log(`⚠️  File ${src} not found, skipping...`);
    }
  });

  console.log('🎉 Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
