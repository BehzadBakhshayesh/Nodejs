const fs = require("fs");
// console.log(fs);

const files = fs.readdirSync("./");

console.log(files);

fs.readdir("./", (err, files) => {
  console.log(err, files);
});
