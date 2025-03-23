import mongoose from "mongoose";

const RecordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Record = mongoose.model("Record", RecordSchema);

export default Record;