const moment = require("jalali-moment");

console.log(moment(new Date()).local("fa").format("YYYY/MM/DD"));
