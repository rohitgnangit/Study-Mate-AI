// "use server"

// import { v2 as cloudinary } from "cloudinary"
// import connectDB from "@/db/connectDB"
// import FileUpload from "@/models/FileUpload"
// import { extractPdfTextFromUrl } from "@/lib/pdfExtract"

// cloudinary.config({
//     cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export async function saveFileAction({ fileUrl, publicId, fileName, fileType, fileSize, userId}) {

//     // const signedDownloadUrl = cloudinary.url(publicId, {
//     //     resource_type: "raw",
//     //     type: "authenticated",
//     //     secure: true,
//     //     sign_url: true,
//     //     expires_at: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour from now

//     //    transformation: [{}],
//     // })

//     await connectDB();

//     console.log("File URL for Extraction:", fileUrl);


//     const extractedTextFromUrl = await extractPdfTextFromUrl(fileUrl)
//     console.log("Extracted Text:", extractedTextFromUrl);

//     const newFile = await FileUpload.create({
//         userId,
//         fileName,
//         fileUrl,
//         fileType,
//         fileSize,
//         publicId,
//         extractedText: extractedTextFromUrl,
//     })
//     return JSON.parse(JSON.stringify(newFile));
// }



"use server";

import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/db/connectDB";
import FileUpload from "@/models/FileUpload";
import { extractPdfTextFromUrl } from "@/lib/pdfExtract";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveFileAction({ file, fileName, fileType, fileSize, userId }) {
  try {
    await connectDB();

    // ✅ Step 1: Convert file (Blob) to Base64 string
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = buffer.toString("base64");
    const dataURI = `data:${fileType};base64,${base64String}`;

    // ✅ Step 2: Upload directly to Cloudinary without using fs
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      resource_type: "raw", // needed for PDFs
      access_mode: "public", // make it accessible via public URL
      public_id: `uploads/${Date.now()}_${fileName.replace(/\s+/g, "_")}`,
    });

    console.log("✅ Uploaded to Cloudinary:", uploadResponse.secure_url);

    // ✅ Step 3: Extract text from the public Cloudinary URL
    const extractedTextFromUrl = await extractPdfTextFromUrl(uploadResponse.secure_url);
    console.log("📄 Extracted text length:", extractedTextFromUrl.length);

    // ✅ Step 4: Save file metadata + extracted text to MongoDB
    const newFile = await FileUpload.create({
      userId,
      fileName,
      fileUrl: uploadResponse.secure_url,
      fileType,
      fileSize,
      publicId: uploadResponse.public_id,
      extractedText: extractedTextFromUrl,
    });

    console.log("✅ File saved to MongoDB with extracted text");
    return JSON.parse(JSON.stringify(newFile));
  } catch (error) {
    console.error("❌ Error in saveFileAction:", error);
    throw new Error(error.message || "File upload or processing failed");
  }
}
