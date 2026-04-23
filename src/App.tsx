import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Countdown from './pages/Countdown';
import Grade from './pages/Grade';
import Quiz from './pages/Quiz';
import Mood from './pages/Mood';
import Joke from './pages/Joke';
import Chat from './pages/Chat';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countdown" element={<Countdown />} />
            <Route path="/grade" element={<Grade />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/mood" element={<Mood />} />
            <Route path="/joke" element={<Joke />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </main>
        <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100 bg-white">
          <p>© 2026 時間壓力緩解區 Survival Toolkit. 祝各位期末歐趴。</p>
        </footer>
      </div>
    </Router>
  );
}
