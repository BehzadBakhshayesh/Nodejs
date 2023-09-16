// global.console.log(global);
// global.console.log(module);

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
