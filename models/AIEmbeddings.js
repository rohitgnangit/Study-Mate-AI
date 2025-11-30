import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const AIEmbeddingsSchema = new Schema({
    userId:{type:String, required:true},
    fileId:{type:String, required:true},
    fileName:{type:String, required:true},
    text:{type:String, required:true},
    embedding: { type: [Number], required: true }, // Overall embedding for the file
    index:{type:Number, required:true},
    createdAt:{type:Date, default:Date.now}
},);

export default models?.AIEmbeddings || model("AIEmbeddings", AIEmbeddingsSchema);
