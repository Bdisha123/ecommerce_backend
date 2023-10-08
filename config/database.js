const mongoose = require("mongoose");
require("dotenv").config({path:'./config/config.env'})
console.log(process.env.PORT)
const connectDatabase =()=>{
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true
        // useCreateIndex: true
    }).then(
        (data)=>{
            console.log(`mongodb connected with server: ${data.connection.host}`);
        });
}
module.exports = connectDatabase