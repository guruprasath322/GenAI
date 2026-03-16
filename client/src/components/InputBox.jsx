import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const InputBox = ({ onSend, disabled }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2 max-w-4xl mx-auto">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about admissions, fees, courses..."
                    className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={disabled}
                />
                <button
                    type="submit"
                    disabled={!input.trim() || disabled}
                    className={`p-3 rounded-full text-white transition-all ${!input.trim() || disabled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                        }`}
                >
                    <FaPaperPlane />
                </button>
            </div>
        </form>
    );
};

export default InputBox;
