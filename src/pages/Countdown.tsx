import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Calendar as CalendarIcon, ChevronRight, Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';

const Countdown: React.FC = () => {
  const [targetDate, setTargetDate] = useState('');
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  const calculateDays = () => {
    if (!targetDate) return;
    const target = new Date(targetDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(diffDays);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-gray-900">考試倒數</h1>
        <p className="text-gray-500">距離崩潰還有多久？精準計算剩餘天數。</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-600 ml-1">選擇考試日期</label>
          <div className="relative">
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-indigo-500 focus:outline-none transition-all appearance-none text-lg font-medium"
            />
            <CalendarIcon className="absolute right-6 top-5 w-6 h-6 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <button
          onClick={calculateDays}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
        >
          開始倒數
        </button>

        <AnimatePresence>
          {daysLeft !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-10 bg-indigo-50 rounded-3xl border-2 border-indigo-100 mt-8"
            >
              {daysLeft > 0 ? (
                <div className="space-y-2">
                  <p className="text-indigo-600 font-bold text-lg">距離考試還有</p>
                  <div className="text-8xl font-black text-indigo-700 tracking-tighter">{daysLeft}</div>
                  <p className="text-indigo-600 font-bold text-2xl">天</p>
                  <div className="h-px bg-indigo-200 w-16 mx-auto my-6" />
                  <p className="text-indigo-400 text-sm italic">「現在讀書還來得及...大概吧。」</p>
                </div>
              ) : daysLeft === 0 ? (
                <div className="text-rose-600 font-black text-4xl animate-bounce">就是今天！祝你好運。</div>
              ) : (
                <div className="text-gray-500 font-bold text-xl">考試已經結束了，解脫啦！</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link 
          to="/chat"
          className="group w-full p-6 rounded-3xl bg-gradient-to-r from-rose-50 to-orange-50 border-2 border-rose-100 text-rose-700 font-bold flex items-center justify-between hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-2xl shadow-sm group-hover:rotate-12 transition-transform">
              <Ghost className="w-6 h-6 text-rose-500" />
            </div>
            <div className="text-left">
              <p className="text-lg">壓力太大了？</p>
              <p className="text-sm font-medium opacity-70">進入「時間壓力緩解區」找老師聊聊</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Countdown;
