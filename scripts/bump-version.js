import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const versionPath = path.join(rootDir, 'version.json');
const packagePath = path.join(rootDir, 'package.json');
const swPath = path.join(rootDir, 'sw.js');

const rawVersion = fs.readFileSync(versionPath, 'utf8');
const versionData = JSON.parse(rawVersion);

// Formato vX.Y.ZZ
const match = versionData.version.match(/^v?(\d+)\.(\d+)\.(\d+)$/);
if (!match) {
  console.error('Versión inválida en version.json:', versionData.version);
  process.exit(1);
}

let major = parseInt(match[1], 10);
let minor = parseInt(match[2], 10);
let patch = parseInt(match[3], 10) + 1;
const patchStr = patch.toString().padStart(2, '0');
const newVersion = `v${major}.${minor}.${patchStr}`;
const semverPkg = `${major}.${minor}.${patchStr}`;

versionData.version = newVersion;
versionData.build = (versionData.build || 0) + 1;
versionData.releaseDate = new Date().toISOString().split('T')[0];

fs.writeFileSync(versionPath, JSON.stringify(versionData, null, 2) + '\n', 'utf8');

if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  pkg.version = semverPkg;
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
}

if (fs.existsSync(swPath)) {
  let swContent = fs.readFileSync(swPath, 'utf8');
  swContent = swContent.replace(/const CACHE_NAME = 'glucofit-cache-[^']+';/, `const CACHE_NAME = 'glucofit-cache-${newVersion}';`);
  fs.writeFileSync(swPath, swContent, 'utf8');
}

console.log(`[Version Bump] Actualizado exitosamente a ${newVersion} (build ${versionData.build})`);
