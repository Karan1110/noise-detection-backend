const express = require("express")
const sessions = require("../routes/sessions")
const users = require("../routes/users")
const auth = require("../routes/auth")
const error = require("../middleware/error")
const cors = require("cors")

module.exports = function (app) {
  app.use(express.json())
  app.use(express.static("./uploads"))
  app.use("/api/sessions", sessions)
  app.use("/api/users", users)
  app.use("/api/auth", auth)
  app.use(cors())
  app.use(error)
}
