import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

try {
  const indexContent = fs.readFileSync(indexPath, 'utf-8');
  
  const redirectScript = `
    <script>
      (function() {
        var path = window.location.pathname;
        var urlParams = new URLSearchParams(window.location.search);
        var hash = window.location.hash;
        if (!urlParams.has('p')) {
          urlParams.set('p', path);
          window.location.replace('/huanghe-delta-data-platform/?' + urlParams.toString() + hash);
        }
      })();
    </script>`;
    
  const notFoundContent = indexContent.replace('</head>', redirectScript + '\n</head>');
  
  fs.writeFileSync(notFoundPath, notFoundContent);
  console.log('404.html generated successfully with redirect logic');
} catch (error) {
  console.error('Error generating 404.html:', error);
  process.exit(1);
}