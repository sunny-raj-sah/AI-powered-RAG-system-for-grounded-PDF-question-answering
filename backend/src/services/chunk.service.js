exports.createChunks = (text) => {
  const CHUNK_SIZE = 800;
  const OVERLAP = 100;

  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = start + CHUNK_SIZE;
    const chunkText = text.slice(start, end);

    chunks.push({
      content: chunkText.trim(),
    });

    start += CHUNK_SIZE - OVERLAP;
  }

  return chunks;
};
