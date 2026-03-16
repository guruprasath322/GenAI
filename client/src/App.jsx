import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatInterface from './components/ChatInterface';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ChatInterface />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
