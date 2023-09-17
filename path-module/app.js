const path = require("path");
console.log(path);

const parsedPath = path.basename("/foo/bar/baz/asdf/quux.html");
console.log("parsedPath=> ", parsedPath);
const basename = path.basename("/foo/bar/baz/asdf/quux.html");
console.log("basename=> ", basename);
const delimiter = path.delimiter;
console.log("delimiter=> ", delimiter);
const dirname = path.dirname("/foo/bar/baz/asdf/quux");
console.log("dirname=> ", dirname);
console.log(
  "dirname2=> ",
  path.basename("/foo/bar/baz/asdf/quux.html", ".html")
);
const extname = path.extname("index.html");
console.log("extname=> ", extname);
const format = path.format({
  root: "/ignored",
  dir: "/home/user/dir",
  base: "file.txt",
});
console.log("format=> ", format);
const isAbsolute = path.isAbsolute("/foo/bar");
console.log("isAbsolute=> ", isAbsolute);
const join = path.join("/foo", "bar", "baz/asdf", "quux", "..");
console.log("join=> ", join);
const normalize = path.normalize("/foo/bar//baz/asdf/quux/..");
console.log("normalize=> ", normalize);
const parse = path.parse("/home/user/dir/file.txt");
console.log("parse=> ", parse);
const posix = path.posix;
console.log("posix=> ", posix);
const relative = path.relative(
  "/data/orandea/test/aaa",
  "/data/orandea/impl/bbb"
);
console.log("relative=> ", relative);
const resolve = path.resolve("/foo/bar", "./baz");
console.log("resolve=> ", resolve);
const sep = "foo/bar/baz".split(path.sep);
console.log("sep=> ", sep);
const toNamespacedPath = path.toNamespacedPath(path);
console.log("toNamespacedPath=> ", toNamespacedPath);
const win32 = path.win32;
console.log("win32=> ", win32);
