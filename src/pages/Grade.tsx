import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, CheckCircle2, XCircle, Clock, Info } from 'lucide-react';

const Grade: React.FC = () => {
  const [mode, setMode] = useState<'usual' | 'target'>('usual');
  const [scores, setScores] = useState({ 
    first: '', second: '', third: '', usual: '', target: '60' 
  });
  const [usualResult, setUsualResult] = useState<number | null>(null);
  const [targetResult, setTargetResult] = useState<number | null>(null);

  const calculateUsual = () => {
    const first = Number(scores.first) || 0;
    const second = Number(scores.second) || 0;
    const third = Number(scores.third) || 0;
    const target = Number(scores.target) || 60;
    
    // Usual * 0.4 = Average - (Exam1 * 0.15 + Exam2 * 0.15 + Exam3 * 0.3)
    const required = (target - (0.15 * first + 0.15 * second + 0.3 * third)) / 0.4;
    setUsualResult(Math.round(required * 10) / 10);
  };

  const calculateTarget = () => {
    const first = Number(scores.first) || 0;
    const second = Number(scores.second) || 0;
    const usual = Number(scores.usual) || 0;
    const target = Number(scores.target) || 60;
    
    const required = (target - (0.15 * first + 0.15 * second + 0.4 * usual)) / 0.3;
    setTargetResult(Math.round(required * 10) / 10);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-black text-gray-900">成績計算機</h1>
        <p className="text-gray-500">算出你的平時成績預估，或計算段考目標。</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => { setMode('usual'); setUsualResult(null); setTargetResult(null); }}
            className={`flex-1 py-4 font-bold text-sm transition-all ${mode === 'usual' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            算平時成績
          </button>
          <button
            onClick={() => { setMode('target'); setUsualResult(null); setTargetResult(null); }}
            className={`flex-1 py-4 font-bold text-sm transition-all ${mode === 'target' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            算三段目標
          </button>
        </div>

        <div className="p-8 space-y-6">
          {mode === 'usual' ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-2xl text-indigo-700 text-sm font-medium mb-4">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>輸入三次段考分數，計算老師需要給你多少「平時分」才能及格/達標。</p>
              </div>
              {[
                { key: 'first', label: '一段成績' },
                { key: 'second', label: '二段成績' },
                { key: 'third', label: '三段成績' },
                { key: 'target', label: '目標總平均' },
              ].map((item) => (
                <div key={item.key} className="space-y-1">
                  <label className="text-sm font-bold text-gray-600 ml-1">{item.label}</label>
                  <input
                    type="number"
                    value={scores[item.key as keyof typeof scores]}
                    onChange={(e) => setScores({ ...scores, [item.key]: e.target.value })}
                    placeholder={item.key === 'target' ? "預設為 60" : "請輸入分數"}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-indigo-500 focus:outline-none transition-all text-lg"
                  />
                </div>
              ))}
              <button
                onClick={calculateUsual}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all mt-4"
              >
                計算所需平時成績
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl text-blue-700 text-sm font-medium mb-4">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>採用權重計算：一段(15%)、二段(15%)、三段(30%)、平時(40%)</p>
              </div>
              {[
                { key: 'first', label: '一段成績' },
                { key: 'second', label: '二段成績' },
                { key: 'usual', label: '平時成績' },
                { key: 'target', label: '目標總平均' },
              ].map((item) => (
                <div key={item.key} className="space-y-1">
                  <label className="text-sm font-bold text-gray-600 ml-1">{item.label}</label>
                  <input
                    type="number"
                    value={scores[item.key as keyof typeof scores]}
                    onChange={(e) => setScores({ ...scores, [item.key]: e.target.value })}
                    placeholder={item.key === 'target' ? "預設為 60" : "請輸入分數"}
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-50 focus:border-indigo-500 focus:outline-none transition-all text-lg"
                  />
                </div>
              ))}
              <button
                onClick={calculateTarget}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all mt-4"
              >
                計算三段需要考多少
              </button>
            </div>
          )}

          <AnimatePresence>
            {usualResult !== null && mode === 'usual' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-8 rounded-3xl text-center space-y-2 ${usualResult <= 100 ? 'bg-emerald-50 text-emerald-700 border-2 border-emerald-100' : 'bg-rose-50 text-rose-700 border-2 border-rose-100'}`}
              >
                <div className="text-sm font-bold uppercase tracking-widest opacity-60">所需平時分數</div>
                <div className="text-6xl font-black">{usualResult}</div>
                <div className="flex items-center justify-center gap-2 font-bold text-xl mt-4">
                  {usualResult <= 0 ? (
                    <><CheckCircle2 className="w-6 h-6" /> 即使老師給 0 分你也會過！</>
                  ) : usualResult <= 100 ? (
                    <><Clock className="w-6 h-6" /> 只要老師稍微「撈」你一下就過了！</>
                  ) : (
                    <><XCircle className="w-6 h-6" /> 老師撈不動了，分數爆表了。</>
                  )}
                </div>
              </motion.div>
            )}

            {targetResult !== null && mode === 'target' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-8 rounded-3xl text-center space-y-2 ${targetResult <= 100 ? 'bg-indigo-50 text-indigo-700 border-2 border-indigo-100' : 'bg-rose-50 text-rose-700 border-2 border-rose-100'}`}
              >
                <div className="text-sm font-bold uppercase tracking-widest opacity-60">三段至少需要考</div>
                <div className="text-6xl font-black">{targetResult}</div>
                <div className="flex items-center justify-center gap-2 font-bold text-xl mt-4">
                  {targetResult <= 0 ? (
                    <><CheckCircle2 className="w-6 h-6" /> 躺著考都會過，恭喜！</>
                  ) : targetResult <= 100 ? (
                    <><Clock className="w-6 h-6" /> 努力一下還有救，加油！</>
                  ) : (
                    <><XCircle className="w-6 h-6" /> 除非滿分加分，否則涼了。</>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Grade;
