// exports.extractObservations = (chunks) => {
// const observations = [];

// chunks.forEach((chunk, idx) => {
// const text = chunk.content;


// observations.push({
//   area: `Area ${idx + 1}`,
//   observation: text.slice(0, 200),
//   severity_hint: text.toLowerCase().includes("crack")
//     ? "High"
//     : "Medium",
//   source: "inspection",
// });


// });

// return observations;
// };


 const keywords = [
"crack",
"leak",
"moisture",
"water",
"damage",
"thermal",
"temperature",
"heat",
"structural",
"fault",
];

 

exports.extractObservations = (chunks) => {
const observations = [];

chunks.forEach((chunk, idx) => {
const text = chunk.content.toLowerCase();


const isRelevant = keywords.some((word) => text.includes(word));

if (isRelevant) {
  observations.push({
    area: `Area ${idx + 1}`,
    observation: chunk.content.slice(0, 300),
    severity_hint:
      text.includes("crack") || text.includes("damage")
        ? "High"
        : "Medium",
  });
}


});

// ⭐ fallback if no keyword found
if (observations.length === 0) {
const fallback = chunks.slice(0, 3);


fallback.forEach((chunk, idx) => {
  observations.push({
    area: `Area ${idx + 1}`,
    observation: chunk.content.slice(0, 200),
    severity_hint: "Unknown",
  });
});


}
 

return observations;
};
