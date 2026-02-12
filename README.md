# AI-Powered University Admission Chatbot

The AI Powered University Admission Chatbot follows a structured workflow to deliver intelligent and context aware responses to students.

User Interaction
The process begins when a student interacts with the chatbot through the React based frontend interface. The user enters queries in a conversational format, creating a natural communication experience.

Input Processing
Once a query is submitted, the frontend sends the request to the Node.js backend. The backend receives the input and prepares it for further analysis.

Natural Language Understanding
The backend forwards the query to the Gemini AI model. The AI model interprets the intent, context, and meaning of the student’s question.

Knowledge Retrieval
If the query relates to university specific information such as courses, fees, eligibility criteria, or important dates, the system accesses the knowledge base to retrieve accurate and relevant data.

Response Generation
The AI model combines its language understanding with the retrieved knowledge base information to construct a meaningful and context aware response.

Response Delivery
The generated response is transmitted back to the backend and then returned to the frontend. The chatbot interface displays the reply to the student.

Fallback Handling
If the AI service or API key is unavailable, the system switches to a fallback demonstration mode, ensuring continuity by providing predefined responses.

Continuous Conversation
The chatbot maintains conversation history, enabling context aware interactions and allowing students to ask follow up questions smoothly.