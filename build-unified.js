const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(command, cwd = process.cwd()) {
    console.log(`> Running: ${command} in ${cwd}`);
    execSync(command, { stdio: 'inherit', cwd });
}

// 1. Install Dependencies for Root (Frontend)
console.log('--- Installing Frontend Dependencies ---');
const frontendNodeModules = path.resolve(__dirname, 'frontend', 'node_modules');
const frontendPackageLock = path.resolve(__dirname, 'frontend', 'package-lock.json');

// Force clean install to prevent CI caching issues
if (fs.existsSync(frontendNodeModules)) fs.rmSync(frontendNodeModules, { recursive: true, force: true });
if (fs.existsSync(frontendPackageLock)) fs.rmSync(frontendPackageLock, { force: true });

try {
    console.log('--- Executing npm install --force ---');
    runCommand('npm install --force --no-audit --no-fund', path.resolve(__dirname, 'frontend'));
} catch (error) {
    console.error('Frontend install failed:', error.message);
    process.exit(1);
}

// 2. Build Frontend
console.log('--- Building Frontend ---');
runCommand('npm run build', path.resolve(__dirname, 'frontend'));

// 3. Move dist to public
console.log('---// 2. Move Frontend Build to Next.js Public Folder');
const distDir = path.resolve(__dirname, 'frontend', 'dist');
const publicDir = path.resolve(__dirname, 'public');

if (!fs.existsSync(distDir)) {
    console.error('Error: Frontend build directory (dist) not found!');
    process.exit(1);
}

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Helper to Copy Recursive
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

copyRecursiveSync(distDir, publicDir);
console.log('Frontend build copied to backend/public');

// 4. Build Backend (Next.js)
console.log('--- Building Backend ---');
runCommand('next build');
