const http = require("node:http");

const server = http.createServer((req, res) => {
  //   console.log("req", req.url);
  //   console.log("res", res);

  if (req.url === "/") {
    res.write("home page");
  } else if (req.url === "/about") {
    res.write(JSON.stringify({ page: "about page", arr: [1, 2] }));
  } else {
    res.write("not found");
  }

  res.end();
});

server.listen(3000);
