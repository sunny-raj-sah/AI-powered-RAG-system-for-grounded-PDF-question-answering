const fs = require("fs");
const pdfParse = require("pdf-parse");

exports.extractTextFromPDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);

  return {
    text: data.text,
    totalPages: data.numpages,
  };
};
