import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url : { type : String , required : true, unique : true},
    title : {type : String , required : true},
    image : {type: String , required : true},
    currency :  {type: String , required : true},
    currentPrice:  {type: Number , required : true},
    originalPrice:  {type: Number , required : true},
    lowestprice :  {type: Number },
    highestprice:  {type: Number },
    averageprice:  {type: Number},
    priceHistory: [
        {
            prices:  { type : Number , required : true},
            Date:  { type : Date , required : true},
        },
    ],
    
},
{timestamps : true}
);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
