const express = require("express")
const router = express.Router()
const { login, register, update, deleteUser, adminAuth, getUsers } = require("../auth/auth.js")


router.route("/register").post(register)

router.route("/login").post(login)

router.route("/update").put(adminAuth, update)

router.route("/deleteUser").delete(adminAuth, deleteUser)

router.route("/getUsers").get(getUsers)

module.exports = router
