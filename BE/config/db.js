const mongoose=require("mongoose");


const mongodbUrl="mongodb+srv://srikanthkodari157:Q9N71oZGrFO8kpIT@cluster0.sa8ld3c.mongodb.net/?retryWrites=true&w=majority"

const connectDB=()=>{
    const results= mongoose.connect(mongodbUrl);
    // console.log(mongodbUrl)
}

module.exports={connectDB};