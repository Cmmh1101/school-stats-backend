const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// require("mongoose-currency").loadType(mongoose);
// const Currency = mongoose.Types.Currency;

const studentsSchema = new Schema({
  school: {
    type: String,
  },
  sex: {
    type: String,
  },
  G3: {
    type: Number,
    min: 1,
    max: 100,
  },
  address: {
    type: String,
  },
  famsize: {
    type: String,
  },
  famsize: {
    type: String,
  },
  Pstatus: {
    type: String,
  },
  Medu: {
    type: Number,
    min: 1,
    max: 5,
  },
  Fedu: {
    type: Number,
    min: 1,
    max: 5,
  },
  Mjob: {
    type: String,
  },
  Fjob: {
    type: String,
  },
  reason: {
    type: String,
  },
  guardian: {
    type: String,
  },
  traveltime: {
    type: Number,
    min: 1,
    max: 5,
  },
  studytime: {
    type: Number,
    min: 1,
    max: 5,
  },
  failures: {
    type: Number,
  },
  famsup: {
    type: String,
  },
  paid: {
    type: String,
  },
  activities: {
    type: String,
  },
  nursery: {
    type: String,
  },
  higher: {
    type: String,
  },
  internet: {
    type: String,
  },
  romantic: {
    type: String,
  },
  famrel: {
    type: Number,
  },
  freetime: {
    type: Number,
  },
  goout: {
    type: Number,
  },
  Dalc: {
    type: Number,
  },
  Dalc: {
    type: Number,
  },
  Walc: {
    type: Number,
  },
  health: {
    type: Number,
  },
  absences: {
    type: Number,
  },
  G1: {
    type: Number,
  },
  G2: {
    type: Number,
  },
  G3: {
    type: Number,
  },
});

const studentsSchema = mongoose.model("students", studentsSchema);

module.exports = Students;
