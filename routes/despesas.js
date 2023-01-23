const express = require("express");
const router = express.Router();
const despesasControllers = require("../controllers/despesas");
const Despesa = require("../models/despesas");
const jwt = require("jsonwebtoken");
const models = {
  Despesa,
};

router.use(async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.query.token;

    if (!token) throw new Error();

    const decoded = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    if (!(decoded.roles.indexOf("admin") >= 0)) throw new Error();

    next();
  } catch (e) {
    res.json({
      status: "fail",
      message: "Não foi possível acessar está pagina",
    });
  }
});

router
  .route("/")
  .get(despesasControllers.getAll.bind(null, models))
  .post(despesasControllers.create.bind(null, models));

router
  .route("/:id")
  .get(despesasControllers.getOne.bind(null, models))
  .patch(despesasControllers.alter.bind(null, models))
  .delete(despesasControllers.remove.bind(null, models));

module.exports = router;
