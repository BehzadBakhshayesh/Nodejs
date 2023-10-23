const { connect, Schema, model } = require("mongoose");

connect("mongodb://127.0.0.1:27017/mongoproject")
  .then(() => console.log("1"))
  .catch((err) => console.log("2", err));

const userSchema = new Schema({
  fName: String,
  lName: { type: String, required: true },
  favorits: [String],
  admin: Boolean,
  date: { type: Date, default: Date.now() },
});

const User = model("User", userSchema);

async function createUser() {
  const user = new User({
    fName: "BHZDD",
    lName: "BAKHSHAYESH",
    favorits: ["DROWING", "READING"],
    admin: true,
    date: Date.now(),
  });
  const result = await user.save();
  console.log(result);
}

createUser();