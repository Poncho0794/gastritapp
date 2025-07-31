const { execSync } = require('child_process');

console.log('➡ Instalando dependencias con --legacy-peer-deps');

execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
