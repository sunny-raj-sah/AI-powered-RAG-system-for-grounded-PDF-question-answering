exports.generateDDRReport = (data) => {
let report = "";

report += "DETAILED DIAGNOSTIC REPORT (DDR)\n\n";

report += "1. Property Issue Summary\n";
report += "Issues detected across inspected areas.\n\n";

report += "2. Area-wise Observations\n";

data.forEach((item) => {
report += `\nArea: ${item.area}\n`;
report += `Inspection Observation: ${item.inspectionObservation}\n`;
report += `Thermal Observation: ${item.thermalObservation}\n`;
report += `Severity: ${item.severity}\n`;


if (item.conflict) {
  report += `Conflict: ${item.conflict}\n`;
}


});

report += "\n3. Probable Root Cause\n";
report += "Further inspection required to determine exact causes.\n";

report += "\n4. Severity Assessment\n";
report += "Severity determined based on observed structural indicators.\n";

report += "\n5. Recommended Actions\n";
report += "Professional inspection and repair recommended.\n";

report += "\n6. Additional Notes\n";
report += "Thermal imaging findings included where available.\n";

report += "\n7. Missing or Unclear Information\n";
report += "Not Available\n";

return report;
};
