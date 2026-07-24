exports.mergeReports = (inspectionData, thermalData) => {
const merged = [];

inspectionData.forEach((item, idx) => {
const thermal = thermalData[idx];


merged.push({
  area: item.area,
  inspectionObservation: item.observation,
  thermalObservation: thermal
    ? thermal.observation
    : "Not Available",
  severity: item.severity_hint || "Unknown",
});


});

return merged;
};
