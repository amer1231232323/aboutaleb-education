const bcrypt = require("bcryptjs");

const password = "123456"; // غيرها لو حابب
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then((hash) => {
  console.log("HASHED PASSWORD:");
  console.log(hash);
});