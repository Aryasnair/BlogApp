const mongoose=require('mongoose');
mongoose
    .connect(process.env.mongoDB_URL)
    .then(()=>{
        console.log("conection extableshed to Db");
    })
    .catch(()=>{
        console.log("conection error");
    })