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

async function getUsers1() {
  const users = await User.find({ fName: "BHZD", admin: true })
    .limit(3)
    .sort({ fName: 1 })
    .select({ fName: 1, lName: 1 })
    .count();
}
getUsers1();

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

// ==============================================================
//pagination

async function getUsers4(pageSize, Pagenumber) {
  const users = await User.find({ fName: "BHZD", admin: true })
    .skip((Pagenumber - 1) * pageSize)
    .limit(pageSize);
}
getUsers4(8, 1);
getUsers4(8, 2);

// ==============================================================
//updating docs

async function updateUser1(id) {
  const user1 = await User.findById(id); //==>{}
  const user2 = await User.findOne({ _id: id }); //==>{}
  const user3 = await User.find({ _id: id }); //=>[{}]

  if (!user1) {
    return;
  } else {
    // user1.admin = true;
    // user1.fName = "abcd";
    //or
    user1.set({ admin: true, fName: "abcd" });

    const result = await user1.save();
  }
}
updateUser1("6536daf6fe885df32623868c");

async function updateUser2(id) {
  // await User.update(
  //   { _id: id },
  //   {
  //     $set: {
  //       admin: true,
  //       fName: "abcd",
  //     },
  //   }
  // );

  // const userBeforUpdate = await User.findByIdAndUpdate(id, {
  //   $set: {
  //     admin: true,
  //     fName: "abcd",
  //   },
  // });
  const userAfterUpdate = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        admin: true,
        fName: "abcd",
      },
    },
    { new: true }
  );
}

updateUser2("6536daf6fe885df32623868c");

// ==============================================================
//removing docs

async function removeUser1(id) {
  const result = await User.deleteOne({ _id: id });
}
removeUser1("6536da ... f6fe885df32c");

async function removeUser2() {
  const result = await User.findByIdAndRemove(id);
}
removeUser2("6536da ... f6fe885df32c");

async function removeUsers() {
  const result = await User.deleteMany({ admin: false });
}
removeUsers();
