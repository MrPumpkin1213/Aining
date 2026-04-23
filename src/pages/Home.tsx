import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Clock, Brain, Heart, Ghost, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      title: '考試倒數',
      desc: '精準計算距離崩潰還有多久，提醒你該讀書了（或是該放棄了）。',
      icon: Clock,
      path: '/countdown',
      color: 'bg-purple-500',
    },
    {
      title: '成績計算機',
      desc: '快速算出你的平均分數，看看三段要考幾分才能及格。',
      icon: Calculator,
      path: '/grade',
      color: 'bg-blue-500',
    },
    {
      title: '心理測驗',
      desc: '你是哪種類型的學生？三題測出你的校園生存本性。',
      icon: Brain,
      path: '/quiz',
      color: 'bg-emerald-500',
    },
    {
      title: '心情紀錄',
      desc: '紀錄每天的喜怒哀樂，看看這學期你崩潰了幾次。',
      icon: Heart,
      path: '/mood',
      color: 'bg-rose-500',
    },
    {
      title: '地獄梗區',
      desc: '期中考後的唯一慰藉，笑著笑著就哭了。',
      icon: Ghost,
      path: '/joke',
      color: 'bg-gray-800',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-4"
        >
          學生生存神器 <span className="text-indigo-600">Survival Toolkit</span>
        </motion.h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          專為水深火熱的學生設計。不管是算成績、倒數考試，還是想看點地獄梗，這裡都有。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={feature.path}
                className="group block bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 h-full"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  {feature.title}
                  <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-20 bg-indigo-50 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">壓力太大了嗎？</h2>
        <p className="text-indigo-700 mb-8 max-w-xl mx-auto">
          找我們的國文老師艾寧或數學老師偉傑聊聊吧。雖然他們可能不會安慰你，但一定會讓你覺得「原來還有人比我更負面」。
        </p>
        <Link
          to="/chat"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
        >
          進入時間壓力緩解區
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
