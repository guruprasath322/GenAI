import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaRobot } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageBubble = ({ message, isUser }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
            <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
                    {isUser ? <FaUser size={14} /> : <FaRobot size={16} />}
                </div>

                <div className={`p-3 rounded-2xl overflow-hidden ${isUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                    }`}>

                    {isUser ? (
                        <p className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                            {message}
                        </p>
                    ) : (
                        <div className="markdown-content text-sm md:text-base leading-relaxed">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2 space-y-1" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2 space-y-1" {...props} />,
                                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold my-3 pb-1 border-b border-gray-200" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold my-2" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-md font-semibold my-2" {...props} />,
                                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2 text-gray-600" {...props} />,
                                    table: ({ node, ...props }) => <div className="overflow-x-auto my-3 rounded-lg border border-gray-200"><table className="min-w-full divide-y divide-gray-200" {...props} /></div>,
                                    thead: ({ node, ...props }) => <thead className="bg-gray-50" {...props} />,
                                    tbody: ({ node, ...props }) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
                                    tr: ({ node, ...props }) => <tr className="" {...props} />,
                                    th: ({ node, ...props }) => <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />,
                                    td: ({ node, ...props }) => <td className="px-3 py-2 whitespace-normal text-sm text-gray-700" {...props} />,
                                    a: ({ node, ...props }) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                }}
                            >
                                {message}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MessageBubble;
