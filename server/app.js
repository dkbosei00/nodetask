const express = require("express")
const app = express()
app.use(express.json())
app.set("view engine", "ejs")

// Connecting to Database
const connectDB = require("./config/db.js")
connectDB()


// app.use("/", indexRouter)
// app.use("/dashboard", dashboardRouter)
// app.use("")
app.use("/api/auth", require("./routers/users.js"))



const server = app.listen(3000, ()=>{
    console.log("Server is now running on port ", server.address().port)
})

process.on("unhandledRejection", err=>{
    console.log(`An error has occured: ${err.message}`)
    server.close(()=> process.exit(1))
})
