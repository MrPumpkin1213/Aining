import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ghost, RefreshCw, MessageSquare } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const Joke: React.FC = () => {
  const [joke, setJoke] = useState({ q: "載入中...", a: "..." });
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);

  const jokes = [
    { q: "為什麼學生期末考前都不敢看醫生？", a: "因為醫生會說：你要多休息（多修系）。" },
    { q: "期末考跟女朋友有什麼共同點？", a: "你都不知道自己哪裡做錯了，然後就結束了。" },
    { q: "為什麼教授不喜歡玩躲貓貓？", a: "因為他只要一出現，學生就會全部消失。" },
    { q: "學生最喜歡的運動是什麼？", a: "極限運動：在交作業前最後一分鐘上傳。" },
    { q: "為什麼我的戶頭跟我的成績單長得很像？", a: "因為數字都小到可以忽略不計。" },
    { q: "為什麼地獄沒有網路？", a: "因為那裡都是工程師，他們會把地獄修成天堂。" },
    { q: "盲人最喜歡吃什麼？", a: "蝦仁（瞎人）。" },
    { q: "為什麼耶穌不吃 M&M？", a: "因為會從手上的洞掉出來。" },
    { q: "為什麼孤兒不能玩捉迷藏？", a: "因為沒人會去找他們。" },
    { q: "什麼東西有四條腿卻不能走路？", a: "兩隻殘廢的狗。" },
    { q: "為什麼地獄的冷氣總是不會壞？", a: "因為維修工都在天堂。" },
    { q: "小明問媽媽：『為什麼爸爸要跳樓？』", a: "媽媽說：『因為他想讓你看看什麼叫做落地生根。』" },
    { q: "為什麼非洲沒有藥？", a: "因為藥不能在空腹時服用。" },
    { q: "為什麼耶穌跟大學生很像？", a: "都在星期五被釘死，但大學生星期一不會復活。" },
    { q: "為什麼小明沒有朋友？", a: "因為他家住在火葬場旁邊，大家都說他朋友很多，只是都冒煙了。" }
  ];

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "請生成一個關於學生生活的地獄梗（Dark Joke），格式為問答形式。語言為繁體中文。內容要幽默、帶點地獄色彩但與學生生活相關（如考試、成績、畢業、延畢、分組報告、教授等）。請確保內容是原創且有趣的。",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              q: { type: Type.STRING, description: "問題" },
              a: { type: Type.STRING, description: "答案" }
            },
            required: ["q", "a"]
          }
        }
      });
      const newJoke = JSON.parse(response.text);
      setJoke(newJoke);
      setShowAnswer(false);
    } catch (error) {
      console.error("Failed to fetch AI joke:", error);
      const randomLocal = jokes[Math.floor(Math.random() * jokes.length)];
      setJoke(randomLocal);
      setShowAnswer(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-gray-900">地獄梗區</h1>
        <p className="text-gray-500">笑著笑著就哭了，這就是人生。</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 min-h-[500px] flex flex-col justify-between text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 p-4 rounded-2xl text-white shadow-lg">
            <Ghost className="w-8 h-8" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center space-y-4"
            >
              <RefreshCw className="w-12 h-12 text-gray-300 animate-spin" />
              <p className="text-gray-400 font-medium italic">正在從地獄深處挖掘笑話...</p>
            </motion.div>
          ) : (
            <motion.div
              key={joke.q}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-12 flex-1 flex flex-col justify-center"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500 uppercase tracking-widest">
                  <MessageSquare className="w-3 h-3" />
                  Question
                </div>
                <h3 className="text-3xl font-black text-gray-900 leading-tight px-4">
                  「{joke.q}」
                </h3>
              </div>

              <div className="min-h-[120px] flex items-center justify-center">
                {showAnswer ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full"
                  >
                    <div className="text-sm font-bold text-rose-500 uppercase tracking-widest mb-2">Answer</div>
                    <p className="text-2xl font-black text-rose-600 bg-rose-50 p-8 rounded-3xl border-2 border-rose-100 shadow-inner">
                      {joke.a}
                    </p>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 shadow-xl transition-all active:scale-95"
                  >
                    點擊顯示答案
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pt-8 mt-8 border-t border-gray-100">
          <button
            onClick={fetchJoke}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-gray-100 text-gray-600 font-bold hover:bg-gray-50 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "連線中..." : "換一題新的"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Joke;
