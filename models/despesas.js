const mongoose = require("mongoose");

const despesaSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ["payed", "paying", "to-pay"],
  },
});

const Despesa = mongoose.model("Despesa", despesaSchema);

module.exports = Despesa;
