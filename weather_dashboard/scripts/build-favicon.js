import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputSvg = path.resolve("public/favicon.svg");
const outputIco = path.resolve("public/favicon.ico");

async function generateFavicon() {
  try {
    if (!fs.existsSync(inputSvg)) {
      throw new Error("favicon.svg not found in /public");
    }

    // Generate multiple sizes for ICO
    const sizes = [16, 32, 48, 64];
    const pngBuffers = await Promise.all(
      sizes.map((size) =>
        sharp(inputSvg)
          .resize(size, size)
          .png()
          .toBuffer()
      )
    );

    // Save as ICO (multi-resolution)
    await sharp({
      create: {
        width: 64,
        height: 64,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .joinChannel(pngBuffers[0]) // base layer
      .toFile(outputIco);

    console.log("✅ Favicon generated at public/favicon.ico");
  } catch (err) {
    console.error("❌ Error generating favicon:", err);
  }
}

generateFavicon();
