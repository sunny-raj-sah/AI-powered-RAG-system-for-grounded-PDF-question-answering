// const vectors = [];

// exports.storeVector = (embedding, metadata) => {
//   vectors.push({
//     embedding,
//     metadata,
//   });
// };

// exports.cosineSimilarity = (a, b) => {
//   const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
//   const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
//   const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
//   return dot / (normA * normB);
// };

// exports.searchVectors = (queryEmbedding, topK = 5) => {
//   return vectors
//     .map((v) => ({
//       score: exports.cosineSimilarity(queryEmbedding, v.embedding),
//       metadata: v.metadata,
//     }))
//     .sort((a, b) => b.score - a.score)
//     .slice(0, topK);
// };
// ------------------------

// In-memory vector store  - production version
// const vectors = [];

// /**
//  * Store a vector (embedding) with metadata
//  * @param {Array} embedding - The vector embedding (can be empty for mock)
//  * @param {Object} metadata - Metadata for the chunk (text, chunkIndex, etc.)
//  */
// exports.storeVector = (embedding, metadata) => {
//   vectors.push({
//     embedding: embedding || [], // safe default
//     metadata,
//   });
// };

// /**
//  * Cosine similarity between two vectors
//  * @param {Array} a
//  * @param {Array} b
//  * @returns {number}
//  */
// exports.cosineSimilarity = (a, b) => {
//   if (!a.length || !b.length) return 0; // handle empty arrays
//   const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
//   const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
//   const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
//   if (normA === 0 || normB === 0) return 0;
//   return dot / (normA * normB);
// };

// /**
//  * Search topK vectors by similarity
//  * @param {Array} queryEmbedding - embedding to search (can be empty for mock)
//  * @param {number} topK - number of top results
//  * @returns {Array} - array of { score, metadata }
//  */
// exports.searchVectors = (queryEmbedding, topK = 5) => {
//   return vectors
//     .map((v) => ({
//       score: exports.cosineSimilarity(queryEmbedding || [], v.embedding),
//       metadata: v.metadata,
//     }))
//     .sort((a, b) => b.score - a.score)
//     .slice(0, topK);
// };
// ----------------------
// for the simple vector search
// const vectors = [];

// // Store chunks
// exports.storeVector = (embedding, metadata) => {
//   vectors.push({
//     embedding: embedding || [],
//     metadata,
//   });
// };

// // Keyword-based search (NO AI)
// exports.searchVectors = (queryText, topK = 5) => {
//   const keywords = queryText
//     .toLowerCase()
//     .split(" ")
//     .filter((w) => w.length > 2);

//   const scored = vectors.map((v) => {
//     const text = v.metadata.text.toLowerCase();
//     let score = 0;

//     keywords.forEach((word) => {
//       if (text.includes(word)) score += 1;
//     });

//     return {
//       score,
//       metadata: v.metadata,
//     };
//   });

//   return scored
//     .filter((v) => v.score > 0)
//     .sort((a, b) => b.score - a.score)
//     .slice(0, topK);
// };
// ---------------------------------------------------------------------------------




const vectors = [];

/**
 * Store embedding and metadata
 */
exports.storeVector = (embedding, metadata) => {
  vectors.push({
    embedding,
    metadata,
  });
};

/**
 * Calculate Cosine Similarity
 */
exports.cosineSimilarity = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) return 0;

  if (a.length === 0 || b.length === 0) return 0;

  if (a.length !== b.length) return 0;

  const dotProduct = a.reduce((sum, value, index) => {
    return sum + value * b[index];
  }, 0);

  const magnitudeA = Math.sqrt(
    a.reduce((sum, value) => sum + value * value, 0)
  );

  const magnitudeB = Math.sqrt(
    b.reduce((sum, value) => sum + value * value, 0)
  );

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
};

/**
 * Search Top K similar chunks
 */
exports.searchVectors = (queryEmbedding, topK = 5) => {
  return vectors
    .map((vector) => ({
      score: exports.cosineSimilarity(
        queryEmbedding,
        vector.embedding
      ),
      metadata: vector.metadata,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};