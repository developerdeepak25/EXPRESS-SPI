const mongoose = require("mongoose");

// uri = "mongodb+srv://developerdeepak25:COGL9JZ0wkpDjPva@deepakapi.eany7h2.mongodb.net/DeepakApi?retryWrites=true&w=majority"

const connectDB = (uri) => {
    console.log("connect db");
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB;