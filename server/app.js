const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const{ adminAuth, userAuth } = require("./auth/auth.js")

//Middleware
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", require("./routers/crud.js"))
app.set("view engine", "ejs")

// Connecting to Database
const connectDB = require("./config/db.js")
connectDB()


app.get("/", (req, res) => res.render("index"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))
app.get("/admin", adminAuth, (req, res)=> res.render("admin"))
app.get("/basic", userAuth, (req, res) => res.render("users"))
app.get("/logout", (req, res) =>{
    res.cookie("jwt", " ", {maxAge: "1"})
    res.redirect("/")
})






const server = app.listen(3000, ()=>{
    console.log("Server is now running on port ", server.address().port)
})

process.on("unhandledRejection", err=>{
    console.log(`An error has occured: ${err.message}`)
    server.close(()=> process.exit(1))
})
