exports.getAll = async ({ Despesa }, req, res) => {
  try {
    const despesas = await Despesa.find({});

    if (!despesas) throw new Error("Nenhum valor encontrado");

    res.status(200).json({
      status: "success",
      data: despesas,
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      error: e,
    });
  }
};

exports.create = async ({ Despesa }, req, res) => {
  try {
    const { item, amount, status } = req.body;

    if (!item || !amount || !status) throw new Error("Nenhum valor encontrado");

    const despesa = await Despesa.create({
      item,
      amount,
      status,
      date: req.body.date || undefined,
    });

    res.status(200).json({
      status: "success",
      data: despesa,
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
    });
  }
};

exports.getOne = async ({ Despesa }, req, res) => {
  try {
    const despesa = await Despesa.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: despesa,
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
    });
  }
};

exports.alter = async ({ Despesa }, req, res) => {
  try {
    const { item, amount, status } = req.body;

    const data = {
      item,
      amount,
      status,
      date: req.body.date || undefined,
    };

    await Despesa.findByIdAndUpdate(req.params.id, data);
    res.status(200).json({
      status: "success",
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
    });
  }
};

exports.remove = async ({ Despesa }, req, res) => {
  try {
    await Despesa.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
    });
  }
};
