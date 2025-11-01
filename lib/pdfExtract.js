import axios from "axios";
export const runtime = "nodejs";
const pdf = require("pdf-parse");

export async function extractPdfTextFromUrl(fileUrl) {
    console.log(`DEBUG START extractPdfTextFromUrl with URL: ${fileUrl}`);
    let rawText = "";

    try {
        // Fetching the pdf file from public url using axios
        const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
        console.log("RESPONSE", response)
      if (response.status < 200 || response.status >= 300) { 
         throw new Error(`Failed to fetch PDF file. Status: ${response.status}`);
}
        // Converting response data to buffer
        const buffer = Buffer.from(response.data);
        console.log("LOG 1: PDF Buffer size", buffer.length)
         if (buffer.length === 0) {
             console.error("LOG ERROR: Buffer is empty after download!");
             return "";
        }

        // useing pdf-parse to extract text
       const data = await pdf(buffer);
        rawText = data.text;
        console.log(`LOG 2: Raw extracted text length:${rawText.length}`);


        if (rawText.length > 0) {
             console.log(`LOG 3: PDF-Parse Raw Text Snippet: ${rawText.substring(0, 200).replace(/\n/g, ' ')}...`);
        }

        // Clean and normalized text
        const text = data.text.replace(/\r/g, "").replace(/\n{2,}/g, "/n").trim();
        console.log(`LOG 4: Final Cleaned Text Length: ${text.length}`);
        return text || "";
    } catch (error) {
         console.error("--- DEBUG FAIL: PDF Extraction Failed:", error.message);
        console.error("Detailed Error Object:", error);
        return "";
    } finally {
        console.log("---DEBUG END")
    }
}
