exports.detectConflicts = (mergedData) => {
return mergedData.map((item) => {
let conflict = null;


if (
  item.inspectionObservation &&
  item.thermalObservation &&
  item.inspectionObservation !== item.thermalObservation
) {
  conflict = "Possible mismatch between inspection and thermal data";
}

return {
  ...item,
  conflict,
};


});
};
