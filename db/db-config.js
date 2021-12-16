const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/passportDB",{useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify: false});
const connection = mongoose.connection;
connection.on("error",(error) => console.error(error));
connection.once("open",() => console.log("connected to DB"));
