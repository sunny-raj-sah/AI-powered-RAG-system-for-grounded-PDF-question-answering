const { extractTextFromPDF } = require("../services/pdf.service");
const { createChunks } = require("../services/chunk.service");

const {
extractObservations,
} = require("../services/observationExtractor.service");

const { mergeReports } = require("../services/reportMerger.service");

const {
detectConflicts,
} = require("../services/conflictDetector.service");

const {
generateDDRReport,
} = require("../services/ddrGenerator.service");

exports.generateDDR = async (req, res) => {
try {
if (!req.files) {
return res.status(400).json({
error: "Both inspectionReport and thermalReport PDFs are required",
});
}


const inspectionFile = req.files.inspectionReport?.[0];
const thermalFile = req.files.thermalReport?.[0];

if (!inspectionFile || !thermalFile) {
  return res.status(400).json({
    error: "Please upload both inspectionReport and thermalReport PDFs",
  });
}

// 1️⃣ Extract text
const inspectionData = await extractTextFromPDF(inspectionFile.path);
const thermalData = await extractTextFromPDF(thermalFile.path);

// 2️⃣ Chunk documents
const inspectionChunks = createChunks(inspectionData.text);
const thermalChunks = createChunks(thermalData.text);

// 3️⃣ Extract observations
const inspectionObservations =
  extractObservations(inspectionChunks);

const thermalObservations =
  extractObservations(thermalChunks);

// 4️⃣ Merge reports
const mergedData = mergeReports(
  inspectionObservations,
  thermalObservations
);

// 5️⃣ Detect conflicts
const conflictData = detectConflicts(mergedData);

// 6️⃣ Generate DDR
const report = generateDDRReport(conflictData);

res.status(200).json({
  message: "DDR generated successfully",
  report,
});

} catch (error) {
res.status(500).json({
error: "Failed to generate DDR",
details: error.message,
});
}
};
