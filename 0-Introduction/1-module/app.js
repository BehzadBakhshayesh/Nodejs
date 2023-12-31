// global.console.log("global: ",global);
// global.console.log("module: ",module);
// console.log("exports: ",exports);
// console.log("require: ",require);
// console.log("filename: ",__filename);
// console.log("dirname: ",__dirname);

// const calculator = require("./calculator");

// console.log(calculator.add(1, 2));
// console.log(calculator.sub(1, 2));
// console.log(calculator.multi(1, 2));
// console.log(calculator.div(1, 2));

const { add, sub, multi, div } = require("./calculator");

console.log(add(1, 2));
console.log(sub(1, 2));
console.log(multi(1, 2));
console.log(div(1, 2));

const foo = require("./singleExports");

console.log(foo("foo"));
