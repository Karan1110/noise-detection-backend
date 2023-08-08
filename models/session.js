const mongoose = require("mongoose")

const sessionSchema = new mongoose.Schema(
  {
    audio: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  }
)

const Session = mongoose.model("Session", sessionSchema)

exports.Session = Session
exports.sessionSchema = sessionSchema
