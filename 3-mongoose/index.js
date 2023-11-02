const { connect, Schema, model } = require("mongoose");

connect("mongodb://127.0.0.1:27017/mongoproject")
  .then(() => console.log("connected"))
  .catch((err) => console.log("not connected", err));

const userSchema = new Schema({
  fName: String,
  lName: { type: String, required: true },
  favorits: [String],
  admin: Boolean,
  date: { type: Date, default: Date.now() },
});

const User = model("User", userSchema);

// ==============================================================

async function createUser() {
  const user = new User({
    fName: "BHZDD",
    lName: "BAKHSHAYESH",
    favorits: ["DROWING", "READING"],
    admin: true,
    date: Date.now(),
  });
  const result = await user.save();
}
createUser();

async function getUsers() {
  const users = await User.find({ fName: "BHZD", admin: true })
    .limit(3)
    .sort({ fName: 1 })
    .select({ fName: 1, lName: 1 })
    .count();
}
getUsers();

// ==============================================================
// Comparison Query Operators
// $eq(==) - $ne(!=)  - $gt(>) - $gte(>=) - $lt(<) - $lte(<=) - $in - $nin

async function getUsers2() {
  const equalTo27Users = await User.find({ age: { $eq: 27 } }); //age == 27
  const notEqualTo27Users = await User.find({ age: { $ne: 27 } }); //age != 27
  const gereterThan27Users = await User.find({ age: { $gt: 27 } }); //age > 27
  const lessThan27Users = await User.find({ age: { $lt: 27 } }); //age < 27
  const between227to30Users = await User.find({ age: { $gt: 27, $lte: 30 } }); //age > 27 && age <= 30
  const only25or30Users = await User.find({ age: { $in: [25, 30] } }); // age == 25 ||  age == 30
}
getUsers2();

// ==============================================================
// or - and

async function getUsers3() {
  const users1 = await User.find({ fName: "BHZD", admin: true }); // (fName == "BHZD" && admin == true)
  const users2 = await User.find().and([{ fName: "BHZD" }, { admin: true }]); // (fName == "BHZD" && admin == true)

  const users3 = await User.find().or([{ fName: "BHZD" }, { admin: true }]); // (fName == "BHZD" || admin == true)
}
getUsers3();
