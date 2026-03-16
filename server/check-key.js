const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function check() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        // access the model to check if valid? No, getGenerativeModel is synchronous.
        // We need to make a call.
        // Since generateContent failed, let's try to see if the key is valid by listing models?
        // The SDK doesn't expose listModels cleanly in early versions, unsure about 0.24.1
        // Let's try the error message from test-gemini.js again.
        // "Call ListModels to see the list of available models"
        // So there must be a way.
        // actually, let's just try to run a simple generation with a known working model name like 'gemini-1.0-pro' or just 'gemini-pro'.
        // The previous error for gemini-pro was also 404.

        // Attempt with a very standard model name.
        const result = await model.generateContent("Test");
        console.log("Success: " + result.response.text());
    } catch (error) {
        console.error("Error: " + error.message);
    }
}

check();
