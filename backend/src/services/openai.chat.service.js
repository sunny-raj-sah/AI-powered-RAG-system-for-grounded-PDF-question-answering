const OpenAI = require("openai");


exports.generateOpenAIAnswer = async(
  prompt,
  apiKey
)=>{


const openai = new OpenAI({
  apiKey
});


const completion =
await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[
 {
  role:"user",
  content:prompt
 }
],

temperature:0.2

});


return completion
.choices[0]
.message
.content;


};