const jwt = require("jsonwebtoken");

const auth = async ({ User }, req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await User.findOne({ username });
    if (!checkUser) throw new Error();

    const isValid = await checkUser.checkPassword(password);
    if (!isValid) throw new Error();

    const payload = {
      id: checkUser.id,
      roles: checkUser.roles,
    };

    const token = await jwt.sign(payload, process.env.TOKEN_SECRET_KEY);

    res.json({
      status: "success",
      token,
    });
  } catch (e) {
    res.json({
      status: "fail",
      message: "Username or password is wrong",
    });
  }
};

module.exports = { auth };
