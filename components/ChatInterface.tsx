import React, { useState, useRef, useEffect } from 'react';
import { generateAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, RotateCcw, Loader2 } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Buongiorno. Sono L\'Esperto, l\'assistente virtuale del Gruppo Vomero. Posso aiutarti con dubbi normativi, calcoli sulla fiscalità o vantaggi della previdenza complementare. Come posso esserti utile oggi?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    const responseText = await generateAssistantResponse(userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: 'Conversazione resettata. Dimmi, su quale argomento normativo posso supportarti?',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      {/* Chat Header */}
      <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-slate-900">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold">L'Esperto</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online - Gruppo Vomero AI
            </p>
          </div>
        </div>
        <button 
          onClick={resetChat} 
          className="text-slate-400 hover:text-white p-2 transition-colors rounded-full hover:bg-slate-800"
          title="Nuova Chat"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`
                w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1
                ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}
              `}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`
                p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'}
              `}>
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div className={`text-[10px] mt-2 opacity-70 ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex gap-3 max-w-[75%]">
                <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center mt-1">
                  <Bot size={16} className="text-slate-700" />
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin text-amber-500" />
                  <span className="text-sm text-slate-500">Sto analizzando la normativa...</span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Chiedi informazioni sulla deducibilità, tassazione rendite, ecc..."
            className="w-full pl-4 pr-12 py-4 bg-slate-100 border border-transparent focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 rounded-xl transition-all outline-none text-slate-800 placeholder-slate-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
        <div className="text-center mt-2">
          <p className="text-[10px] text-slate-400">
            L'Esperto AI può commettere errori. Verifica sempre le informazioni normative importanti.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
