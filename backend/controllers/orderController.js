import orderModel from "../models/orderModle.js";
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order for frontend 
const placeOrder = async (req,res) => {
 const frontend_url = "http://localhost:5174";

try {
  const newOrder = new orderModel({
    userId:req.body.userId,
    items:req.body.items,
    amount:req.body.amount,
    address:req.body.address
  })
  await newOrder.save();
  await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

   const line_items = req.body.items.map((item)=>({
     price_data:{
      currency:"dollar",
      procucu_data:{
        name:item.name
      },
      unit_amount:item.price*100
     },
      quentity:item.quentity
   }))

    line_items.push({
      pirce_data:{
        currency:"dollar",
        procucu_data:{
          name:"Delivery charges"
        },
        unit_amount:4*100
      },
      quentity:1
    })
    const session = await stripe.checkout.sessions.create({
      mode:'payment',
       success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
       cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })
    res.json({success:true, session_url:session.url});

} catch (error) {
  console.log(error);
  res.json({success:false, message:"Error"});
 }
}

export {placeOrder}