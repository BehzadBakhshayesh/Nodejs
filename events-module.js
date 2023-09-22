const EventEmitter = require("node:events");

const emmitter = new EventEmitter();

emmitter.on("myEvet", (e) => {
  console.log(e);
});

emmitter.emit("myEvet", { date: Date.now(), a: 1 });
