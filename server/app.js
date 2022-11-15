const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const{ adminAuth, userAuth } = require("./auth/auth.js")

//Middleware
app.use(cookieParser())
app.use(express.json())
app.set("view engine", "ejs")

// Connecting to Database
const connectDB = require("./config/db.js")
connectDB()


app.get("/admin", adminAuth, (req, res)=>{
    res.send("Admin Route")
})
app.get("/basic", userAuth, (req, res) =>{
    res.send("Basic User Route")
})
app.use("/api/auth", require("./routers/users.js"))



const server = app.listen(3000, ()=>{
    console.log("Server is now running on port ", server.address().port)
})

process.on("unhandledRejection", err=>{
    console.log(`An error has occured: ${err.message}`)
    server.close(()=> process.exit(1))
})
