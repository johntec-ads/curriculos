const fs = require('fs');
const path = require('path');

async function gen() {
  try {
    const sharp = require('sharp');
    const svgPath = path.resolve(__dirname, '../src/logo-footer.svg');
    const pub = path.resolve(__dirname, '../public');
    const svg = fs.readFileSync(svgPath);

    const targets = [
      { name: 'logo192.png', size: 192 },
      { name: 'logo512.png', size: 512 },
      { name: 'favicon.png', size: 32 },
      { name: 'logo-footer.png', size: 80 },
    ];

    for (const t of targets) {
      const out = path.join(pub, t.name);
      await sharp(svg)
        .resize({ width: t.size, height: t.size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ quality: 90 })
        .toFile(out);
      console.log('Wrote', out);
    }

    console.log('All icons generated.');
  } catch (err) {
    console.error(err);
    console.error('Install sharp: npm install --save-dev sharp');
    process.exit(1);
  }
}

gen();
