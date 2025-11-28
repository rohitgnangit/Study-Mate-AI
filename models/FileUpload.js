import mongoose from "mongoose";
const { Schema, models, model } = mongoose;

const FileUploadSchema = new Schema({
    userId:{type:String, required:true},
    fileName:{type:String, required:true},
    fileUrl:{type:String, required:true},
    fileType:{type:String, required:true},
    fileSize:{type:Number, required:true},
    publicId:{type:String, required:true},
    extractedText:{type:String},
    chunks: [
        {
            text: { type: String, required: true },
            embedding: { type: [Number], required: true }, // Array of numbers (your 768-dimension vector)
            index: { type: Number, required: true }
        }
    ],
    uploadedAt:{type:Date, default:Date.now}
})

export default models?.FileUpload || model("FileUpload", FileUploadSchema);
