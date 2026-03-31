import React, { useState } from 'react';
import { useLocalStorage } from '../store';
import { Plus, Trash2, ListMusic, Play, X, Download } from 'lucide-react';
import { documentData, Question } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export interface Playlist {
  id: string;
  name: string;
  questions: string[]; // Array of question titles
}

export const Playlists = ({ onPrintPlaylist }: { onPrintPlaylist?: (playlist: Playlist) => void }) => {
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>('physics-playlists', []);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [activePlaylist, setActivePlaylist] = useState<Playlist | null>(null);

  const createPlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName.trim(),
      questions: []
    };
    
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName('');
  };

  const deletePlaylist = (id: string) => {
    setPlaylists(playlists.filter(p => p.id !== id));
    if (activePlaylist?.id === id) {
      setActivePlaylist(null);
    }
  };

  const removeQuestion = (playlistId: string, questionTitle: string) => {
    setPlaylists(playlists.map(p => {
      if (p.id === playlistId) {
        return { ...p, questions: p.questions.filter(q => q !== questionTitle) };
      }
      return p;
    }));
    
    if (activePlaylist?.id === playlistId) {
      setActivePlaylist({
        ...activePlaylist,
        questions: activePlaylist.questions.filter(q => q !== questionTitle)
      });
    }
  };

  // Helper to find question details
  const getQuestionDetails = (title: string): Question | undefined => {
    for (const section of documentData.sections) {
      const q = section.questions.find(q => q.title === title);
      if (q) return q;
    }
    return undefined;
  };

  if (activePlaylist) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setActivePlaylist(null)}
              className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
            <h2 className="text-xl font-bold text-slate-800">{activePlaylist.name}</h2>
            <span className="bg-violet-100 text-violet-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {activePlaylist.questions.length} questions
            </span>
          </div>
          {onPrintPlaylist && activePlaylist.questions.length > 0 && (
            <button
              onClick={() => onPrintPlaylist(activePlaylist)}
              className="flex items-center space-x-1.5 text-sm font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download Playlist</span>
            </button>
          )}
        </div>

        <div className="space-y-4">
          {activePlaylist.questions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
              <ListMusic className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">This playlist is empty.</p>
              <p className="text-sm text-slate-400 mt-1">Go to Browse and add questions to this playlist.</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {activePlaylist.questions.map((title) => {
                const q = getQuestionDetails(title);
                if (!q) return null;
                
                return (
                  <motion.div
                    key={title}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between gap-4"
                  >
                    <div>
                      <h3 className="font-bold text-slate-800 mb-2">{q.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                          {q.marks}
                        </span>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                          Priority: {q.priority}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeQuestion(activePlaylist.id, title)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                      title="Remove from playlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <ListMusic className="w-5 h-5 mr-2 text-violet-500" />
          Custom Playlists
        </h2>
        
        <form onSubmit={createPlaylist} className="flex gap-3">
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="Name your new playlist..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
          />
          <button
            type="submit"
            disabled={!newPlaylistName.trim()}
            className="px-4 py-2.5 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {playlists.map((playlist) => (
            <motion.div
              key={playlist.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-slate-800 text-lg truncate pr-4">{playlist.name}</h3>
                <button
                  onClick={() => deletePlaylist(playlist.id)}
                  className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-medium text-slate-500">
                  {playlist.questions.length} {playlist.questions.length === 1 ? 'question' : 'questions'}
                </span>
                <button
                  onClick={() => setActivePlaylist(playlist)}
                  className="flex items-center space-x-1.5 text-sm font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>View</span>
                </button>
              </div>
            </motion.div>
          ))}
          
          {playlists.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white/50 rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium">No playlists created yet.</p>
              <p className="text-sm text-slate-400 mt-1">Create one above to organize your study sessions.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
