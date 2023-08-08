const { Session } = require("../models/session")
const { User } = require("../models/user")
const auth = require("../middleware/auth")
const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "/uploads")) // Specify the destination folder
  },
  filename: function (req, file, cb) {
    // Preserve the original extension of the file
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  },
})

// Set up the multer middleware with the custom storage engine
const upload = multer({ storage: storage })

router.get("/", [auth], async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "sessions",
    options: { sort: { createdAt: -1 } }, // Sort sessions in descending order based on createdAt
  })

  res.send(user.sessions)
})

router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.user._id).populate("sessions")
  const session = user.sessions.find((s) => s._id.toString() === req.params.id)

  res.send(session)
})

router.post("/", [auth, upload.single("audio")], async (req, res) => {
  const session = new Session({
    audio: req.file.filename,
  })
  await session.save()

  const user = await User.findById(req.user._id)
  user.sessions.push(session._id)
  await user.save()

  res.send(session)
})

module.exports = router
