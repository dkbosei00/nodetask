const mongoose = require("mongoose")
const config = require("./index.js");

const CONNECTION_URL = `mongodb://${config.db.url}/${config.db.name}`

const connectDB = async()=>{
    await mongoose.connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log("MongoDB connected.")
}

module.exports = connectDB