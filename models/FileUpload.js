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
    uploadedAt:{type:Date, default:Date.now}
})

export default models?.FileUpload || model("FileUpload", FileUploadSchema);
