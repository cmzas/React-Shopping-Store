const express= require("express");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");
const shortid= require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/react-shopping-store-db",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});
const Product=mongoose.model("product",
new mongoose.Schema({
    _id:{
        type:String,
        default:shortid.generate,
    },
    title:String,
    image:String,
    description:String,
    price:Number,
    availableSizes:[String],
})
)

app.get("/api/products",async (req, res)=>{
    const products=await Product.find({});
    res.send(products);

});
app.post("/api/products",async (req,res)=>{
    const newProduct=new Product(req.body);
const savedProduct=await newProduct.save();
res.send(savedProduct)
})
app.delete("api/products/:id",async (req,res)=>{
    const deletedProduct=Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

const port=process.env.port || 5000;
app.listen(port,()=>console.log("server at http://localhost:5000"));
