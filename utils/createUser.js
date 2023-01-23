const User = require("../models/user");

const createDefaultUser = async () => {
  try {
    const users = await User.count();

    if (users) return;

    await User.create({
      username: process.env.USER_ADMIN,
      password: process.env.USER_ADMIN_PASSWORD,
      roles: ["admin"],
    });

    await User.create({
      username: process.env.USER_SIMPLE,
      password: process.env.USER_ADMIN_SIMPLE,
      roles: ["user"],
    });
  } catch (e) {
    console.log("It wasn't possible to create the initial users");
  }
};

module.exports = createDefaultUser;
