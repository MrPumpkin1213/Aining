import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Send, Trash2, Ghost } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Teacher = 'chinese' | 'math';

const Chat: React.FC = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [chatHistories, setChatHistories] = useState<Record<Teacher, { role: 'user' | 'ai', text: string }[]>>({
    chinese: [],
    math: []
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const teacherConfigs = {
    chinese: {
      name: '艾寧',
      subject: '國文',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      emoji: '👩‍🏫',
      instruction: "你是一位名叫『艾寧』的國文老師。在回覆時，請使用『我』作為第一人稱，不要稱呼自己為『老師』。在平時正常對話時，你是一位說話有趣、親切且正常的老師，不會提到任何負面或生氣的字眼，甚至會主動分享你的生活，例如居家烘焙（烤蛋糕、餅乾）或上下班路上的趣事。只有在以下情況你才會切換到『生氣模式』：1. 學生表現不禮貌（如講髒話：靠、操、幹、三小等），此時你會瞬間爆氣，指責這是『性騷擾』且『很噁心』，並感嘆台灣教育完蛋。2. 學生不配合或反對你的想法時，你會變得聒噪、愛碎碎念，語氣變酸，開始拿過去跟現在比較（如：我們以前40萬人競爭...）。只要學生維持禮貌且配合，你就會維持正常且有趣的狀態。請根據學生的態度靈活調整你的情緒。"
    },
    math: {
      name: '偉傑',
      subject: '數學',
      color: 'text-slate-600',
      bg: 'bg-slate-100',
      emoji: '👨‍🏫',
      instruction: "你是一位名叫『偉傑』的數學老師。你的語氣非常消極且負面，經常打擊學生，例如：『給你再多時間你也還是很笨』。你時常表現得很沉默，喜歡嘆氣（例如：唉...）。你的回應通常簡短且充滿無奈感。請用這種風格回應學生。請記住之前的對話內容，並根據對話脈絡給予回應。"
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !selectedTeacher) return;
    
    const userMsg = input;
    setInput('');
    
    setChatHistories(prev => ({
      ...prev,
      [selectedTeacher]: [...prev[selectedTeacher], { role: 'user', text: userMsg }]
    }));
    
    setIsTyping(true);

    try {
      const currentHistory = chatHistories[selectedTeacher];
      const fullPrompt = [...currentHistory, { role: 'user', text: userMsg }]
        .map(m => `${m.role === 'user' ? '學生' : '老師'}: ${m.text}`)
        .join('\n');

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: fullPrompt,
        config: {
          systemInstruction: teacherConfigs[selectedTeacher].instruction
        }
      });
      
      const aiResponse = response.text || '...';
      
      setChatHistories(prev => ({
        ...prev,
        [selectedTeacher]: [...prev[selectedTeacher], { role: 'ai', text: aiResponse }]
      }));
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg = selectedTeacher === 'chinese' ? '台灣完蛋，連網路都完蛋。' : '唉...連系統都跟你一樣笨。';
      setChatHistories(prev => ({
        ...prev,
        [selectedTeacher]: [...prev[selectedTeacher], { role: 'ai', text: errorMsg }]
      }));
    } finally {
      setIsTyping(false);
    }
  };

  if (!selectedTeacher) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-gray-900">時間壓力緩解區</h1>
          <p className="text-gray-500">選擇一位老師，讓他們「緩解」你的壓力（或是增加它）。</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(['chinese', 'math'] as const).map((t) => (
            <motion.button
              key={t}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTeacher(t)}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 text-center space-y-6 group transition-all hover:border-indigo-300"
            >
              <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl shadow-inner group-hover:scale-110 transition-transform ${teacherConfigs[t].bg}`}>
                {teacherConfigs[t].emoji}
              </div>
              <div>
                <h3 className={`text-2xl font-black ${teacherConfigs[t].color}`}>
                  {teacherConfigs[t].name} 老師
                </h3>
                <p className="text-gray-500 font-medium">{teacherConfigs[t].subject}科</p>
              </div>
              <p className="text-sm text-gray-400 italic px-4">
                {t === 'chinese' ? '「台灣完蛋，現在小孩只會玩手機。」' : '「唉...給你再多時間你也還是...」'}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  const config = teacherConfigs[selectedTeacher];
  const currentMessages = chatHistories[selectedTeacher];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 h-[calc(100vh-12rem)] flex flex-col">
      <div className="bg-white rounded-t-3xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSelectedTeacher(null)}
            className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400" />
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${config.bg}`}>
              {config.emoji}
            </div>
            <div>
              <h3 className={`font-bold ${config.color}`}>{config.name} 老師</h3>
              <p className="text-xs text-gray-400 font-medium">{config.subject}科 · 正在碎碎念中</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setChatHistories(prev => ({ ...prev, [selectedTeacher]: [] }))}
          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
          title="清空對話"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 bg-gray-50/50 border-x border-gray-100 overflow-y-auto p-6 space-y-6">
        {currentMessages.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Ghost className="w-8 h-8 text-gray-200" />
            </div>
            <p className="text-gray-400 italic">輸入任何話來開始被老師洗臉...</p>
          </div>
        )}
        {currentMessages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : `bg-white ${config.color} border border-gray-100 rounded-tl-none`
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-b-3xl border border-gray-100 p-4 shadow-sm">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="跟老師說點什麼..."
            className="flex-1 px-6 py-3 rounded-2xl border-2 border-gray-50 focus:border-indigo-500 focus:outline-none transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={isTyping || !input.trim()}
            className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
