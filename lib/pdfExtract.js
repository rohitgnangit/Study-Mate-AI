import axios from "axios";
import PDFParser from "pdf2json";


export async function extractTextFromPdfUrl(fileUrl) {
  try {
    console.log("📄 Fetching PDF:", fileUrl);

    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const buffer = Buffer.from(response.data);

    const pdfParser = new PDFParser();

    return await new Promise((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (errData) => reject(errData.parserError));
      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        let rawText = "";

        //  Safe decoder to avoid "URI malformed"
        const safeDecode = (str) => {
          try {
            return decodeURIComponent(str);
          } catch {
            return str; // fallback to raw string
          }
        };

        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((text) => {
            text.R.forEach((t) => {
              rawText += safeDecode(t.T);
            });
            rawText += " ";
          });
        });

        console.log("✅ Extracted text length:", rawText.length);  
          resolve( rawText);

      });

      pdfParser.parseBuffer(buffer);

    });


  } catch (error) {
    console.error("❌ PDF extraction failed:", error.message);
    return "";
  }
}

