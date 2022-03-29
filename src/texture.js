const OpenType = require("opentype.js");
const { dec2hexString } = require("./utils.js");
const ImageDataURI = require("image-data-uri");
const fs = require('fs');
const pkg = require('canvas');
const { createCanvas } = pkg;

function getFont(path, out) {
  try {
    const font = {
      otype: OpenType.loadSync(path),
      cache: new Map(),
      out: out,
    }
    return font;
  } catch (error) {
    if (error) throw error;
  }
}

function getName(cache, text) {

  const cache_value = cache.get(text);
  if (cache_value) return cache_value;

  let name;
  if (text.length == 1) {
    name = dec2hexString(text.charCodeAt(0));
  } else {
    name = `_${dec2hexString(cache.size, 3)}`;
  }
  cache.set(text, name);
  return name;
}

function generateTexture(font, str) {

  if (str === " ") {
    return false;
  }

  str = str.trim();
  const width = font.otype.getAdvanceWidth(str);
  const name = getName(font.cache, str);
  const canvas = createCanvas(width + 20, 80);
  const ctx = canvas.getContext("2d");
  const path = font.otype.getPath(str, 10, 65, 72);

  path.fill = "white";
  path.draw(ctx);

  const texture = {
    text: str,
    path: `${font.out}${name}.png`,
    isEmpty: false,
    width: width,
    height: 80,
    abs_path: font.out,
  };

  if (!fs.existsSync(font.out)) {
    fs.mkdirSync(font.out);
  }
 
  ImageDataURI.outputFile(canvas.toDataURL("image/png"), texture.path);

  return texture;
}

module.exports = { getFont, generateTexture };