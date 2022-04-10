import imagemin from "imagemin"
import imageminWebp from "imagemin-webp"
import fs from "node:fs"

const assetPath = "src/lib/assets"

/**
 * @param path {string} - path to image
 * @returns {string}
 */
function encodeImage(path) {
  return `data:image/${path.match(/\.(\w+)$/)[1]};base64,${fs.readFileSync(path).toString("base64")}`
}

;(async () => {
  await imagemin([`${assetPath}/raw/*.{jpg,png}`], {
    destination: assetPath,
    plugins: [
      imageminWebp({
        quality: 80,
      }),
    ],
  })

  for (const file of fs.readdirSync(assetPath)) {
    if (!file.endsWith(".webp")) continue

    fs.writeFileSync(
      `${assetPath}/${file.replace(/webp$/, "base64.txt")}`,
      encodeImage(`${assetPath}/${file}`),
    )
  }
})()
