const app = require(".");
const { connectDB } = require("./config/db");

const PORT=5000;
app.listen(PORT ,async()=>{
    await connectDB();
    console.log("started",PORT)
})