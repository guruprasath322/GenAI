import React, { useState, useRef, useEffect } from 'react';
import { BiBot, BiUser, BiSend, BiLoaderAlt, BiTrash } from 'react-icons/bi';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ChatInterface = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am the University Admission Assistant. How can I help you today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const clearHistory = () => {
        if (window.confirm('Are you sure you want to clear the chat history?')) {
            const initialMessage = [{
                id: 'welcome',
                role: 'assistant',
                content: 'Hello! I am your University Admission Assistant. How can I help you today with information about courses, fees, eligibility, or campus facilities?',
                timestamp: new Date().toISOString()
            }];
            setMessages(initialMessage);
            localStorage.setItem('chatHistory', JSON.stringify(initialMessage));
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    const API_URL = rawApiUrl.replace(/\/$/, '');

    const handleSendMessage = async (userMessage) => {
        // Add user message to state
        const newMessages = [...messages, { role: 'user', content: userMessage }];
        setMessages(newMessages);
        setIsLoading(true);

        try {
            // Prepare history for API (excluding the last user message we just added for now, 
            // but actually the API expects history + new message. 
            // My backend implementation expects `history` and `message`.
            // Let's format history as { role, content }

            const history = newMessages.slice(0, -1).map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await axios.post(`${API_URL}/api/chat`, {
                message: userMessage,
                history: history
            });

            const botReply = response.data.reply;
            setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
        } catch (error) {
            console.error('Error sending message:', error);

            let errorMessage = 'Sorry, I encountered an error while processing your request. Please try again later.';

            if (error.response && error.response.data && error.response.data.reply) {
                errorMessage = error.response.data.reply;
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: errorMessage
            }]);
        } finally {
            setIsLoading(false);
        } // Closing brace for finally block
    }; // Closing brace for handleSendMessage

    const suggestedQuestions = [
        "What courses do you offer?",
        "Tell me about the fee structure.",
        "What are the eligibility criteria?",
        "When is the application deadline?"
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 sm:p-6 flex justify-between items-center text-white shrink-0 shadow-md z-10">
                <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="bg-white/20 p-2 sm:p-3 rounded-full backdrop-blur-sm shadow-inner">
                        <BiBot className="text-2xl sm:text-3xl" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold font-heading tracking-tight flex items-center gap-2">
                            Admission Bot
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                        </h1>
                        <p className="text-blue-100 text-xs sm:text-sm mt-0.5 font-medium opacity-90">Always here to help</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={clearHistory}
                        className="p-2 sm:p-2.5 hover:bg-white/20 rounded-full transition-all hover:rotate-12 active:scale-95"
                        title="Clear Chat History"
                    >
                        <BiTrash className="text-lg sm:text-xl" />
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map((msg, index) => (
                        <MessageBubble key={index} message={msg.content} isUser={msg.role === 'user'} />
                    ))}

                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-500 text-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                <span className="ml-2">Typing...</span>
                            </div>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Suggested Questions */}
            {messages.length === 1 && (
                <div className="max-w-4xl mx-auto px-4 pb-2 w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="flex gap-2 pb-2">
                        {suggestedQuestions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => handleSendMessage(q)}
                                className="px-4 py-2 bg-white border border-blue-100 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition-colors shadow-sm"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <InputBox onSend={handleSendMessage} disabled={isLoading} />
        </div>
    );
};

export default ChatInterface;

