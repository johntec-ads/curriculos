const fs = require('fs');
const path = require('path');

// This script converts src/logo-footer.svg to public/logo-footer.png using sharp.
// Install sharp first: npm install --save-dev sharp

async function run() {
  try {
    const sharp = require('sharp');
    const svgPath = path.resolve(__dirname, '../src/logo-footer.svg');
    const outPath = path.resolve(__dirname, '../public/logo-footer.png');
    const svg = fs.readFileSync(svgPath);

    await sharp(svg)
      .resize({ height: 80 })
      .png({ quality: 90 })
      .toFile(outPath);

    console.log('Generated', outPath);
  } catch (err) {
    console.error('Error: ', err.message);
    console.error('Ensure you installed sharp: npm install --save-dev sharp');
    process.exit(1);
  }
}

run();
