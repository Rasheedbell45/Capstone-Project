import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputSvg = path.resolve("public/favicon.svg");
const outputDir = path.resolve("public");

async function generateFavicons() {
  try {
    if (!fs.existsSync(inputSvg)) {
      throw new Error("favicon.svg not found in /public");
    }

    // Sizes for PNG + ICO
    const sizes = [16, 32, 48, 64, 128, 192, 256, 512];

    // Generate PNGs
    await Promise.all(
      sizes.map((size) =>
        sharp(inputSvg)
          .resize(size, size)
          .toFile(path.join(outputDir, `favicon-${size}x${size}.png`))
      )
    );

    // Generate favicon.ico (multi-size)
    await sharp(inputSvg)
      .resize(256, 256)
      .toFormat("ico", { sizes: [16, 32, 48, 64, 128, 256] })
      .toFile(path.join(outputDir, "favicon.ico"));

    console.log("Favicons + app icons generated successfully in /public");
  } catch (err) {
    console.error("Error generating favicons:", err);
  }
}

generateFavicons();
