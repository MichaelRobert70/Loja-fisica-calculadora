import sharp from 'sharp';
import fs from 'fs';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#EC4899" rx="80"/>
  <text x="256" y="360" font-family="Arial, sans-serif" font-size="300" font-weight="bold" fill="#fff" text-anchor="middle">M</text>
</svg>`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  if (!fs.existsSync('public/icons')) {
    fs.mkdirSync('public/icons', { recursive: true });
  }

  const svgBuffer = Buffer.from(svgContent);

  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`public/icons/icon-${size}x${size}.png`);
    console.log(`Generated icon-${size}x${size}.png`);
  }

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile('public/icons/icon-512x512.png');

  console.log('All icons generated!');
}

generateIcons();
