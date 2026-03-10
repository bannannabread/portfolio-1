import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src');

const walk = (d) => {
  let results = [];
  const list = fs.readdirSync(d);
  list.forEach(file => {
    file = path.join(d, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.css') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Update old CSS variables
  content = content.replace(/var\(--color-midnight\)/g, 'var(--color-bg)');
  content = content.replace(/var\(--color-twilight\)/g, 'var(--color-bg-surface)');
  content = content.replace(/var\(--color-dusk\)/g, 'var(--color-bg-surface)');
  content = content.replace(/var\(--color-mist\)/g, 'var(--color-text-primary)');
  
  // Specific hardcoded jsx/css replacements
  if(file.endsWith('Landing.jsx')) {
    content = content.replace(/color: '#ccc'/g, "color: 'var(--color-text-muted)'");
  }
  if(file.endsWith('Skills.jsx')) {
    content = content.replace(/color: '#888'/g, "color: 'var(--color-text-muted)'");
    content = content.replace(/color: '#000'/g, "color: 'var(--color-bg)'");
  }
  if(file.endsWith('About.jsx')) {
    content = content.replace(/color: '#555'/g, "color: 'var(--color-text-subtle)'");
  }
  if(file.endsWith('Footer.jsx')) {
    content = content.replace(/color: '#888'/g, "color: 'var(--color-text-subtle)'");
    content = content.replace(/color: '#666'/g, "color: 'var(--color-text-muted)'");
  }
  
  if (content !== originalContent) {
      console.log(`Updated ${path.basename(file)}`);
      fs.writeFileSync(file, content, 'utf8');
  }
});
