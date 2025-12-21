import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd(), "dsc-web/public/events");
const OUTPUT = path.join(ROOT, "manifest.json");

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"]);

function isImage(filename) {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function main() {
  if (!fs.existsSync(ROOT)) {
    console.error("Events directory not found:", ROOT);
    process.exit(1);
  }

  const entries = fs.readdirSync(ROOT, { withFileTypes: true });
  const manifest = {};

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dir = entry.name;
    const dirPath = path.join(ROOT, dir);
    const files = fs
      .readdirSync(dirPath, { withFileTypes: true })
      .filter((e) => e.isFile() && isImage(e.name))
      .map((e) => e.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
    manifest[dir] = files;
  }

  fs.writeFileSync(OUTPUT, JSON.stringify({ generatedAt: new Date().toISOString(), folders: manifest }, null, 2));
  console.log("Wrote manifest:", OUTPUT);
}

main();


