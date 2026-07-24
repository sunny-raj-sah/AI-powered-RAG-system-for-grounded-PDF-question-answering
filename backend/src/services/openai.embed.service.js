const OpenAI = require("openai");


exports.createOpenAIEmbedding = async (
  text,
  apiKey
) => {

  const openai = new OpenAI({
    apiKey
  });


  const response =
    await openai.embeddings.create({

      model: "text-embedding-3-small",

      input: text,

    });


  return response.data[0].embedding;

};