const fs = require('fs');

if (process.env.CI === 'true') {
  return;
}

const sharedDir = process.env.PACKAGE_SOURCE || '../../services/backend/src/apiTypes';
const targetDir = './src';
const indexFile = './index.ts';

fs.cpSync(sharedDir, targetDir, { recursive: true });

const files = fs.readdirSync(targetDir);

const indexContent = files.reduce((content, filename) => {
  const [name] = filename.split('.');
  return `${content}export * from './src/${name}'\n`
}, '');

fs.writeFileSync(indexFile, indexContent);
