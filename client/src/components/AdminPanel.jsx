import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BiSave, BiArrowBack, BiRefresh } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    const [dataset, setDataset] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    const fetchDataset = async () => {
        setIsLoading(true);
        setError(null);
        setSuccessMsg('');
        try {
            const response = await axios.get(`${API_URL}/api/knowledge-base`);
            setDataset(JSON.stringify(response.data, null, 2));
        } catch (err) {
            setError('Failed to load dataset: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataset();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setError(null);
        setSuccessMsg('');
        
        let parsedData;
        try {
            parsedData = JSON.parse(dataset);
        } catch (err) {
            setError('Invalid JSON format. Please correct syntax errors before saving.');
            setIsSaving(false);
            return;
        }

        try {
            await axios.put(`${API_URL}/api/knowledge-base`, parsedData);
            setSuccessMsg('Dataset updated successfully!');
            setTimeout(() => setSuccessMsg(''), 3000); // Clear success message after 3 seconds
        } catch (err) {
            setError('Failed to save dataset: ' + (err.response?.data?.message || err.message));
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8">
            <div className="max-w-5xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[calc(100vh-4rem)] border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 sm:p-6 flex justify-between items-center text-white shrink-0">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="p-2 hover:bg-white/20 rounded-full transition-colors" title="Back to Chat">
                            <BiArrowBack className="text-xl" />
                        </Link>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold font-heading">Admin Panel</h1>
                            <p className="text-blue-100 text-sm mt-1">Manage ChatBot Dataset</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-hidden flex flex-col p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Knowledge Base Editor (JSON format)</h2>
                        <button 
                            onClick={fetchDataset}
                            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                            <BiRefresh /> <span>Reload</span>
                        </button>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}

                    {successMsg && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200 text-sm"
                        >
                            {successMsg}
                        </motion.div>
                    )}

                    {isLoading ? (
                        <div className="flex-1 flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col min-h-0">
                            <textarea
                                value={dataset}
                                onChange={(e) => setDataset(e.target.value)}
                                className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
                                placeholder="Loading dataset..."
                                spellCheck="false"
                            />
                        </div>
                    )}
                </div>

                {/* Footer / Actions */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isLoading || isSaving}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
                    >
                        <BiSave className="text-lg" />
                        <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
