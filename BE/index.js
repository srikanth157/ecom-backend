const express = require("express");

const cors=require("cors");
const app=express()

const authenticate= require("./middleware/authenticate");

app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    return res.status(200).send({message:"hello started the project"})
})
const departmentsRouter = require('./routes/departments');
const productTypesRouter = require('./routes/productTypes');
const brandsRouter = require('./routes/brands');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users'); 
const cartsRouter = require('./routes/carts');
const searchRouter = require('./routes/search');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/departments', departmentsRouter);
app.use('/api/productTypes', productTypesRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/products', productsRouter);
app.use('/api/users',usersRouter); 
app.use('/api/carts',cartsRouter);
app.use('/api/search', searchRouter);
app.use('/api/orders', orderRoutes);
module.exports=app;