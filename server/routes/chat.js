const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/knowledgeBase.json');

// Helper to read data dynamically
const getKnowledgeBase = () => {
    try {
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Error reading knowledge base:", error);
        return {};
    }
};

// Initialize Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let genAI;
let model;

if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

// Helper function to format knowledge base into a system prompt context
const getSystemPrompt = () => {
    const knowledgeBase = getKnowledgeBase();
    const context = JSON.stringify(knowledgeBase);
    return `You are an AI assistant for a university admission system. 
  Your goal is to help students with their queries regarding courses, fees, eligibility, cutoffs, important dates, and campus facilities.
  
  Use the following knowledge base to answer questions accurately:
  ${context}
  
  Rules:
  1. If the answer is in the knowledge base, provide it clearly.
  2. If the user asks something not in the knowledge base (e.g., "What is the weather?"), politely say you can only assist with university admissions.
  3. Be polite, professional, and concise.
  4. Use Markdown formatting for a professional look:
     - Use **Bold** for headers or key terms.
     - Use Lists (bullet points) for features or steps.
     - Use Tables for fees, course lists, or comparisons.
  5. If the user greets you, greet them back and ask how you can help with admissions today.
  `;
};

router.post('/', async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!model) {
            console.warn('Gemini API key not found. Returning mock response.');
            // Simple mock logic for demo purposes
            let reply = "I'm sorry, I can't connect to the AI service right now (API Key missing). But I can tell you that we offer CS, EC, Mechanical, Civil, and MBA courses.";
            if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
                reply = "Hello! I am the University Admission Assistant. How can I help you today?";
            } else if (message.toLowerCase().includes('fee')) {
                reply = "The fees vary by course. For example, CS is ₹1,20,000/year and MBA is ₹2,00,000/year.";
            } else if (message.toLowerCase().includes('course')) {
                reply = "We offer Computer Science, Electronics & Communication, Mechanical, Civil Engineering, and MBA.";
            }

            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return res.json({ reply });
        }

        // Prepare chat history for Gemini
        // Gemini expects history in format: { role: "user" | "model", parts: [{ text: "..." }] }
        // The history from frontend comes as: { role: "user" | "assistant", content: "..." }
        const chatHistory = (history || []).map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }));

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: getSystemPrompt() }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to assist with university admission queries using the provided knowledge base." }],
                },
                ...chatHistory
            ],
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const reply = response.text();

        res.json({ reply });

    } catch (error) {
        console.error('Error in chat endpoint:', error);

        // Check for quota exceeded error or service unavailable
        if ((error.message && (error.message.includes('429') || error.message.includes('503'))) || !model) {
            console.warn('API Quota Exceeded or Service Unavailable. Using Mock Response.');
            const fallbackReply = getMockResponse(req.body.message || "");

            return res.json({
                reply: fallbackReply + "\n\n> *[Note: System is currently using offline mode due to high traffic.]*"
            });
        }

        res.status(500).json({
            error: 'Failed to generate response',
            details: error.message
        });
    }
});

// Simple keyword-based fallback responder
const getMockResponse = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes('hello') || msg.includes('hi')) {
        return "Hello! I am the University Admission Assistant. How can I help you today? (Offline Mode)";
    }

    const knowledgeBase = getKnowledgeBase();
    
    if (msg.includes('fee') || msg.includes('cost') || msg.includes('price')) {
        if (msg.includes('hostel')) {
            return "### Hostel Fees\n\n| Type | Fee |\n| :--- | :--- |\n" +
                (knowledgeBase.hostel_details || []).map(h => `| ${h.type} | ${h.fee} |`).join('\n');
        }
        return "### Course Fees\n\n| Course | Fee |\n| :--- | :--- |\n" +
            (knowledgeBase.courses || []).map(c => `| ${c.name} | ${c.fees} |`).join('\n');
    }

    if (msg.includes('course') || msg.includes('program') || msg.includes('branch')) {
        return "### Available Courses\n\n" +
            (knowledgeBase.courses || []).map(c => `- **${c.name}**: ${c.description} (${c.duration})`).join('\n');
    }

    if (msg.includes('eligibility') || msg.includes('criteria')) {
        return "### Eligibility Criteria\n\n" +
            (knowledgeBase.courses || []).map(c => `- **${c.name}**: ${c.eligibility}`).join('\n');
    }

    if (msg.includes('hostel') || msg.includes('accommodation')) {
        return "### Hostel Facilities\n\nWe offer Single, Double, and Triple occupancy rooms (AC/Non-AC).\n\n" +
            (knowledgeBase.hostel_details || []).map(h => `- **${h.type}**: ${h.description}`).join('\n');
    }

    if (msg.includes('food') || msg.includes('mess')) {
        return `### Food & Mess\n\n* **Mess Fee:** ${knowledgeBase.food_details?.mess_fee || 'N/A'}\n* **Type:** ${knowledgeBase.food_details?.mess_type || 'N/A'}\n* **Menu Highlights:**\n${(knowledgeBase.food_details?.menu_highlights || []).map(i => `  - ${i}`).join('\n')}`;
    }

    if (msg.includes('date') || msg.includes('deadline')) {
        return `### Important Dates\n\n* **Application Deadline:** ${knowledgeBase.important_dates?.application_deadline || 'N/A'}\n* **Entrance Exam:** ${knowledgeBase.important_dates?.entrance_exam || 'N/A'}\n* **Session Start:** ${knowledgeBase.important_dates?.session_start || 'N/A'}`;
    }

    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone')) {
        return `### Contact Us\n\n* **Email:** ${knowledgeBase.contact_info?.email || 'N/A'}\n* **Phone:** ${knowledgeBase.contact_info?.phone || 'N/A'}\n* **Address:** ${knowledgeBase.contact_info?.address || 'N/A'}`;
    }

    return "I am currently in offline mode and can only answer basic questions about courses, fees, hostels, and dates. Please check the website for more details or try again later.";
};

module.exports = router;
