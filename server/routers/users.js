const express = require("express")
const router = express.Router()
const { login, register, update, deleteUser } = require("../auth/auth.js")


router.route("/register").post(register)

router.route("/login").post(login)

router.route("/update").put(update)

router.route("/deleteUser").delete(deleteUser)

module.exports = router
