import mongoose from "mongoose";


 export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://kavrelibikash:mayalu2425@cluster0.bqlw3tx.mongodb.net/NangSaal')
  .then(()=>console.log("DB Connected"));
}