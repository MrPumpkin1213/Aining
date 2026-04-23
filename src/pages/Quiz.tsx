import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, RefreshCw, ChevronRight } from 'lucide-react';

const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<any>(null);

  const questions = [
    { q: "明天要期中考，你現在在做什麼？", options: ["狂灌咖啡通宵讀書", "打遊戲，反正明天才考", "已經睡了，生死有命"] },
    { q: "教授說這題必考，但你完全聽不懂：", options: ["下課立刻去問教授", "拍下黑板，回家再說（然後就忘了）", "放空，這題我不要了"] },
    { q: "分組報告時，你通常是：", options: ["Carry 全場的組長", "負責排版跟校對的工具人", "負責呼吸的薪水小偷"] }
  ];

  const results = [
    { type: "卷王 / 努力型學生", desc: "你是校園裡的生存專家，對成績有極高的執著。雖然壓力大，但你總是能笑到最後。", color: "text-emerald-600", bg: "bg-emerald-50", emoji: "🏆" },
    { type: "拖延症末期學生", desc: "你的潛力只會在考試前 12 小時爆發。雖然過程驚險，但你總能奇蹟般地活下來。", color: "text-orange-600", bg: "bg-orange-50", emoji: "⏳" },
    { type: "佛系學生", desc: "不以物喜，不以己悲。分數只是浮雲，及格是緣分，被當是命運。", color: "text-sky-600", bg: "bg-sky-50", emoji: "🧘" }
  ];

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    if (step < questions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      const counts = [0, 0, 0];
      newAnswers.forEach(a => counts[a]++);
      const maxIdx = counts.indexOf(Math.max(...counts));
      setResult(results[maxIdx]);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-gray-900">學生類型測驗</h1>
        <p className="text-gray-500">你是哪種生存型態？三題測出你的本性。</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 p-8 min-h-[450px] flex flex-col">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 flex-1"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Question {step + 1} of 3</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className={`w-8 h-1.5 rounded-full transition-colors ${i <= step ? 'bg-indigo-500' : 'bg-gray-100'}`} />
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">{questions[step].q}</h3>
              </div>
              <div className="space-y-4">
                {questions[step].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="group w-full text-left p-6 rounded-2xl border-2 border-gray-50 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center justify-between"
                  >
                    <span className="font-bold text-gray-700 group-hover:text-indigo-700">{opt}</span>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-6 flex-1 flex flex-col justify-center"
            >
              <div className={`inline-block p-8 rounded-full ${result.bg} mx-auto mb-2`}>
                <span className="text-6xl">{result.emoji}</span>
              </div>
              <div className="space-y-3">
                <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">測驗結果：你屬於</p>
                <h3 className={`text-4xl font-black ${result.color}`}>{result.type}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg max-w-sm mx-auto">{result.desc}</p>
              <div className="pt-6">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                  重新測驗
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
