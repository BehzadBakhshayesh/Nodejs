const os = require("node:os");
console.log(os);

console.log("free memory => ", os.freemem());
console.log("total memory => ", os.totalmem());
console.log("version => ", os.version());
console.log("cpus => ", os.cpus());
console.log("devNull => ", os.devNull);
