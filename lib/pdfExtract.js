// import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
// import axios from "axios";

// export async function extractTextFromPdfUrl(filerUrl) {
//     try {
//         console.log("Fetching PDF", fileUrl);

//         const response = await axios.get(fileUrl, { responseType: "arraybuffer"});
//         const data = new Uint8Array(response.data);

//         const pdf = await pdfjsLib.getDocument({ data }).promise;

//         let fullText = "";

//         for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//             const page = await pdf.getPage(pageNum);
//             const content = await page.getTextContent();
//             const strings = content.item.map(item => item.str);
//             fullText += strings.join(" ") + "\n";
//         }

//         console.log("Extracted Text Length:", fullText.length);
//         return fullText.trim();
//     } catch (error) {
//         console.error("PDF extraction failed", error);
//         return "";
//     }
// }

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

        // ✅ Safe decoder to avoid "URI malformed"
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
        resolve(rawText.trim());
      });

      pdfParser.parseBuffer(buffer);
    });
  } catch (error) {
    console.error("❌ PDF extraction failed:", error.message);
    return "";
  }
}

