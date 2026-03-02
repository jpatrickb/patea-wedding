#!/usr/bin/env node
/**
 * Scans assets/images/ and embeds the image list into gallery.html.
 * Run manually for local preview, or let the GitHub Action run it on push.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGE_DIR = path.join(ROOT, 'assets', 'images');
const GALLERY_HTML = path.join(ROOT, 'gallery.html');
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const IMAGES_PATTERN = /(const images = )[\s\S]*?;/;

function isImageFile(name) {
  return EXTENSIONS.has(path.extname(name).toLowerCase());
}

function naturalSort(a, b) {
  const na = parseInt(a, 10) || 0;
  const nb = parseInt(b, 10) || 0;
  if (na !== nb) return na - nb;
  return String(a).localeCompare(b, undefined, { numeric: true });
}

function build() {
  if (!fs.existsSync(IMAGE_DIR)) {
    console.error('assets/images/ not found');
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGE_DIR);
  const images = files
    .filter((f) => fs.statSync(path.join(IMAGE_DIR, f)).isFile() && isImageFile(f))
    .sort(naturalSort)
    .map((name) => 'assets/images/' + name);

  let html = fs.readFileSync(GALLERY_HTML, 'utf8');
  const replacement = '$1' + JSON.stringify(images) + ';';
  const newHtml = html.replace(IMAGES_PATTERN, replacement);

  if (html === newHtml) {
    console.log('gallery.html unchanged (' + images.length + ' images)');
    return;
  }

  fs.writeFileSync(GALLERY_HTML, newHtml, 'utf8');
  console.log('Updated gallery.html with ' + images.length + ' images');
}

build();
