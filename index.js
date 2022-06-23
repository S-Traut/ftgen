var fs = require("fs"),
  PNG = require("pngjs").PNG;
 
const png = new PNG({
  width: 100,
  height: 100,
}).pack().pipe(fs.createWriteStream('out.png'));


