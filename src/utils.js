function dec2hexString(dec, x = 4) {
  return (dec+0x10000).toString(16).substr(-x).toUpperCase();
}

module.exports = { dec2hexString };