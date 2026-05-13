import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Plus, Trash2, Calendar, Image as ImageIcon, X } from 'lucide-react';

interface MoodEntry {
  id: string;
  date: string;
  mood: 'happy' | 'neutral' | 'sad' | 'angry' | 'dead';
  note: string;
  image?: string;
}

const Mood: React.FC = () => {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('mood_entries');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood']>('neutral');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('mood_entries', JSON.stringify(entries));
  }, [entries]);

  const moods = [
    { type: 'happy', emoji: '😊', label: '開心', color: 'bg-yellow-100 text-yellow-700' },
    { type: 'neutral', emoji: '😐', label: '還好', color: 'bg-gray-100 text-gray-700' },
    { type: 'sad', emoji: '😢', label: '難過', color: 'bg-blue-100 text-blue-700' },
    { type: 'angry', emoji: '😡', label: '生氣', color: 'bg-red-100 text-red-700' },
    { type: 'dead', emoji: '💀', label: '崩潰', color: 'bg-purple-100 text-purple-700' },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEntry = () => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      mood: selectedMood,
      note: newNote,
      image: selectedImage || undefined,
    };
    setEntries([entry, ...entries]);
    setNewNote('');
    setSelectedImage(null);
    setShowForm(false);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900">心情紀錄</h1>
          <p className="text-gray-500">紀錄你的校園生活點滴。</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
        >
          <Plus className={`w-6 h-6 transition-transform ${showForm ? 'rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-6 shadow-xl border border-indigo-100 mb-8"
          >
            <h3 className="text-lg font-bold mb-4">今天感覺如何？</h3>
            <div className="flex justify-between mb-6">
              {moods.map((m) => (
                <button
                  key={m.type}
                  onClick={() => setSelectedMood(m.type as any)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                    selectedMood === m.type ? 'bg-indigo-50 ring-2 ring-indigo-500' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-3xl">{m.emoji}</span>
                  <span className="text-xs font-medium">{m.label}</span>
                </button>
              ))}
            </div>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="寫點什麼吧..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all mb-4 h-24 resize-none"
            />
            
            <div className="mb-6">
              {!selectedImage ? (
                <label className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors text-gray-500">
                  <ImageIcon className="w-5 h-5" />
                  <span className="font-medium text-sm">放張照片紀錄一下？</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              ) : (
                <div className="relative group">
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-xl shadow-sm"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={addEntry}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
            >
              儲存紀錄
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">還沒有任何紀錄，點擊上方按鈕開始吧！</p>
          </div>
        ) : (
          entries.map((entry) => {
            const moodInfo = moods.find(m => m.type === entry.mood);
            return (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-start group"
              >
                <div className={`text-3xl p-3 rounded-2xl ${moodInfo?.color}`}>
                  {moodInfo?.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {entry.date}
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-800 font-medium whitespace-pre-wrap">{entry.note || '（沒有備註）'}</p>
                  {entry.image && (
                    <div className="mt-3 overflow-hidden rounded-xl border border-gray-100 shadow-sm">
                      <img 
                        src={entry.image} 
                        alt="Mood" 
                        className="w-full max-h-80 object-cover hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Mood;
