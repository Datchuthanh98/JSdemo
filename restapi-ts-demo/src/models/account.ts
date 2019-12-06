import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const AccountSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  phone: {
    type: Number,
    require: true
  }
});
