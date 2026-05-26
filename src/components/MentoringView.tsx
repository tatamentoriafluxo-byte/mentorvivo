import React, { useState, useEffect, useRef } from 'react';
import { Student, Message } from '../types';
import { INITIAL_CHATS } from '../data';

interface MentoringViewProps {
  selectedStudent: Student;
  students: Student[];
  onSelectStudent: (studentId: string) => void;
}

export default function MentoringView({ selectedStudent, students, onSelectStudent }: MentoringViewProps) {
  // Messages state mapped by student ID
  const [allChats, setAllChats] = useState<Record<string, Message[]>>(INITIAL_CHATS);
  const [inputText, setInputText] = useState('');
  const [isManualIntervention, setIsManualIntervention] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Filter out the selected student from other list
  const otherStudents = students.filter(s => s.id !== selectedStudent.id);

  const currentMessages = allChats[selectedStudent.id] || [];

  // Scroll to bottom whenever messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      senderName: 'Mentor Vivo (Humano)',
      senderType: 'mentor',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      text: inputText
    };

    const updatedMessages = [...currentMessages, userMsg];

    setAllChats({
      ...allChats,
      [selectedStudent.id]: updatedMessages
    });
    setInputText('');

    // Simulate Student Response after 1.5 seconds
    setTimeout(() => {
      let responseText = `Obrigado pelo retorno, professor! Vou dar uma olhada e aviso se funcionar.`;
      let detectedEmotion = 'Aliviado / Receptivo';

      if (selectedStudent.id === 'student-lucas-silva') {
        responseText = `Entendido! Assisti o vídeo de 3 minutos e ajudou bastante a clarear o conceito. Vou tentar reescrever o código do Exercício 3 agora.`;
        detectedEmotion = 'Engajamento Retornado';
      } else if (selectedStudent.id === 'student-beatriz-silva') {
        responseText = `Isso acalma bastante. Podemos fazer essa chamada sim, vou tentar abrir os arquivos aqui com menos medo.`;
        detectedEmotion = 'Ansiedade Reduzida';
      }

      const studentResponse: Message = {
        senderName: selectedStudent.name,
        senderType: 'student',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        text: responseText,
        emotion: detectedEmotion
      };

      setAllChats(prev => ({
        ...prev,
        [selectedStudent.id]: [...(prev[selectedStudent.id] || []), studentResponse]
      }));
    }, 1800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Suggestive Quick Actions Buttons
  const handleQuickAction = (action: 'manual' | 'schedule') => {
    if (action === 'manual') {
      setInputText('Olá, notei sua dificuldade e estou aqui como seu mentor de forma direta. Podemos marcar uma call de 10 minutos para destravar isso juntos?');
    } else {
      setInputText('Olá! Vamos agendar nossa mentoria individual 1:1 para focar exclusivamente nas suas dúvidas? Escolha um horário clicando no link do Calendly.');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 min-h-screen">
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-4 py-2 bg-transparent sticky top-0 z-40 backdrop-blur-md">
        <div className="flex-1 flex items-center">
          <div className="relative w-96 hidden md:block">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full clay-input-well rounded-full py-2.5 pl-12 pr-4 font-sans text-sm text-on-surface placeholder:text-outline/70 focus:outline-none"
              placeholder="Search chats, documents, parameters..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-extrabold font-display text-primary hidden lg:inline">Mentor Vivo 365</span>
          <button className="p-3 rounded-full clay-chip text-primary cursor-pointer relative hover:-translate-y-0.5 transition-transform">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          
          {/* Active profile switch selection */}
          <select
            value={selectedStudent.id}
            onChange={(e) => onSelectStudent(e.target.value)}
            className="bg-white border border-outline-variant/50 text-xs font-bold text-primary py-2.5 px-4 rounded-xl shadow-sm focus:outline-none cursor-pointer hover:bg-purple-50 transition-all font-sans"
          >
            {students.map((st) => (
              <option key={st.id} value={st.id}>
                Chat: {st.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Page Canvas Container split layout */}
      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-6 overflow-hidden min-h-[560px]">
        {/* Left Column: Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-3xl clay-card overflow-hidden h-[calc(100vh-140px)]">
          {/* Chat Header banner */}
          <div className="p-5 border-b border-[#cac4d4]/20 flex items-center justify-between bg-white/70 backdrop-blur-sm z-10 relative">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-purple-50 flex items-center justify-center">
                  <img
                    alt={selectedStudent.name}
                    className="w-full h-full object-cover"
                    src={selectedStudent.avatarUrl}
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-tertiary rounded-full border-2 border-white shadow-sm"></div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold font-display text-on-surface">{selectedStudent.name}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedStudent.risk === 'Alto'
                      ? 'bg-rose-150 text-error bg-[#ffdad6]'
                      : 'bg-[#ffbc76] text-[#79490b]'
                  }`}>
                    Risco {selectedStudent.risk} de Evasão
                  </span>
                  <span className="text-[11px] font-semibold text-on-surface-variant">
                    • Última interação há {selectedStudent.lastInteraction}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="text-xs font-bold text-[#006b5e] bg-[#96f3e1] px-2.5 py-1.5 rounded-xl hidden sm:inline shadow-inner">
                {selectedStudent.module}
              </span>
              <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#fdf9f5] text-on-surface-variant hover:text-primary transition-colors cursor-pointer shadow-sm">
                <span className="material-symbols-outlined text-xl">more_vert</span>
              </button>
            </div>
          </div>

          {/* Chat History Messages Scroll area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gradient-to-b from-[#fdf9f5]/20 to-[#ffffff]/30">
            <div className="flex justify-center select-none">
              <span className="text-[11px] font-bold text-on-surface-variant bg-surface-container-high px-3 py-1 rounded-full">
                Hoje
              </span>
            </div>

            {currentMessages.map((msg, index) => {
              const isAI = msg.senderType === 'ai';
              const isMentor = msg.senderType === 'mentor';
              const isStudent = msg.senderType === 'student';

              return (
                <div
                  key={index}
                  className={`flex gap-3 max-w-[85%] ${
                    isStudent ? 'self-end flex-row-reverse ml-auto' : 'mr-auto'
                  }`}
                >
                  {/* Left bubble avatar */}
                  <div className={`w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white shadow-sm flex items-center justify-center ${
                    isAI ? 'bg-primary text-white' : isMentor ? 'bg-[#79490b] text-white' : 'bg-purple-100'
                  }`}>
                    <span className="material-symbols-outlined text-sm font-bold leading-none">
                      {isAI ? 'smart_toy' : isMentor ? 'person' : 'school'}
                    </span>
                  </div>

                  {/* Bubble text content */}
                  <div className="flex flex-col gap-1">
                    <div className={`flex items-center gap-2 mb-1 ${isStudent ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs font-bold text-on-surface">
                        {msg.senderName}
                      </span>
                      <span className="text-[10px] font-semibold text-on-surface-variant">
                        {msg.timestamp}
                      </span>
                      {msg.intention && (
                        <div className="clay-tag px-2 py-0.5 flex items-center gap-1.5 ml-1">
                          <span className="material-symbols-outlined !text-[12px] text-primary">lightbulb</span>
                          <span className="text-[9px] font-semibold text-primary">Intenção: {msg.intention}</span>
                        </div>
                      )}
                    </div>

                    <div className={`p-4 text-sm leading-relaxed ${
                      isStudent
                        ? 'chat-bubble-student text-on-surface rounded-3xl rounded-tr-none text-right bg-[#ffdcbd]'
                        : isAI
                        ? 'chat-bubble-ai text-on-surface rounded-3xl rounded-tl-none bg-[#e8ddff]'
                        : 'bg-[#cac4d4]/35 text-on-surface rounded-3xl rounded-tl-none p-4 shadow-sm'
                    }`}>
                      {msg.text}
                    </div>

                    {msg.emotion && (
                      <div className="clay-tag px-2 py-0.5 flex items-center gap-1.5 mt-1 self-start">
                        <span className="material-symbols-outlined !text-[12px] text-secondary">sentiment_dissatisfied</span>
                        <span className="text-[10px] font-bold text-secondary">Emoção detectada: {msg.emotion}</span>
                      </div>
                    )}

                    {msg.attachment && (
                      <div className="mt-2 ml-2 p-3 bg-white/70 rounded-2xl border border-outline-variant/30 flex items-center gap-3 w-max max-w-full hover:bg-white transition-all cursor-pointer shadow-sm">
                        <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined font-extrabold text-xl">play_circle</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-on-surface">{msg.attachment.title}</p>
                          <p className="text-[10px] font-semibold text-on-surface-variant">
                            {msg.attachment.type} • {msg.attachment.duration}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Interactive Chat Input console area */}
          <div className="p-4 border-t border-[#cac4d4]/20 bg-white/90 backdrop-blur-md">
            {/* Template dynamic action chips */}
            <div className="flex gap-2 mb-3 overflow-x-auto pb-1 hide-scrollbar">
              <button
                onClick={() => handleQuickAction('manual')}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-primary-fixed text-on-primary-fixed font-bold text-xs hover:bg-primary-fixed-dim transition-colors border border-white cursor-pointer"
              >
                Intervir Manualmente
              </button>
              <button
                onClick={() => handleQuickAction('schedule')}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs hover:bg-secondary-fixed-dim transition-colors border border-white cursor-pointer"
              >
                Agendar Mentoria 1:1
              </button>
            </div>

            {/* Input bar */}
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-outline hover:text-primary transition-colors cursor-pointer flex-shrink-0">
                <span className="material-symbols-outlined text-2xl">add_circle</span>
              </button>
              
              <div className="flex-1 clay-input-well flex items-center px-4 py-3 rounded-full">
                <input
                  className="bg-transparent border-none text-sm w-full placeholder-[#cac4d4] font-medium text-on-surface focus:outline-none focus:ring-0 p-0"
                  placeholder={`Envie uma mensagem como mentor para ${selectedStudent.name}...`}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>

              <button
                onClick={handleSendMessage}
                className="w-12 h-12 flex-shrink-0 clay-button rounded-full flex items-center justify-center transform text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <span className="material-symbols-outlined !leading-none text-xl font-bold">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Digital Twin & Cognitive Memory */}
        <div className="w-full lg:w-80 flex flex-col gap-6 overflow-y-auto shrink-0 pb-6 h-[calc(100vh-140px)]">
          {/* Digital twin card */}
          <div className="bg-white rounded-3xl clay-card p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#cac4d4]/30">
              <span className="material-symbols-outlined text-primary font-bold">hub</span>
              <h3 className="text-sm font-bold font-display text-on-surface uppercase tracking-wider">
                Gêmeo Digital
              </h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Perfil de Aprendizagem
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.profileType.map((profile, i) => (
                    <span
                      key={i}
                      className={`clay-tag px-3 py-1 font-bold text-xs ${
                        i === 0 ? 'text-primary' : 'text-secondary'
                      }`}
                    >
                      {profile}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Status de Compreensão
                </p>
                <p className="text-xs font-semibold text-on-surface leading-relaxed">
                  {selectedStudent.currentStatusText}
                </p>
              </div>
            </div>
          </div>

          {/* Cognitive AI Memory Timeline Tracker */}
          <div className="bg-white rounded-3xl clay-card p-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#cac4d4]/30">
              <span className="material-symbols-outlined text-[#006b5e] font-extrabold">memory</span>
              <h3 className="text-sm font-bold font-display text-on-surface uppercase tracking-wider">
                Memória da IA
              </h3>
            </div>

            <ul className="flex flex-col gap-4 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-[#cac4d4]/30">
              {selectedStudent.aiMemory.map((mem, index) => (
                <li key={index} className="relative pl-7 group">
                  <div className={`absolute left-0 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm select-none ${mem.color}`}>
                    <span className="material-symbols-outlined !text-[12px] font-bold">
                      {mem.icon}
                    </span>
                  </div>
                  
                  <p className="text-xs font-bold text-on-surface leading-tight transition-colors group-hover:text-primary">
                    {mem.week}
                  </p>
                  <p className="text-[11px] font-medium text-on-surface-variant mt-0.5">
                    {mem.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Requested Escalation Banner */}
          <div className={`p-5 rounded-3xl flex flex-col gap-3 transition-all duration-300 ${
            isManualIntervention
              ? 'bg-[#e8ddff] border border-white/50 clay-card-primary'
              : 'bg-[#ffdcbd] border border-white/50 clay-card-secondary'
          }`}>
            <div className="flex items-start gap-3">
              <span className={`material-symbols-outlined text-2xl font-bold select-none ${
                isManualIntervention ? 'text-primary' : 'text-secondary'
              }`}>
                {isManualIntervention ? 'verified_user' : 'campaign'}
              </span>
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wide text-on-secondary-container">
                  {isManualIntervention ? 'Assumido por Humano' : 'Conversa sob IA'}
                </h4>
                <p className="text-[11px] font-semibold text-on-secondary-container/80 mt-1 leading-relaxed">
                  {isManualIntervention
                    ? 'Você assumiu esta mentoria. A IA responderá apenas como rascunho de auxílio em background.'
                    : 'A IA está respondendo de forma autônoma. Caso sinta a frustração do aluno persistir, assuma.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsManualIntervention(!isManualIntervention)}
              className={`w-full font-bold text-xs py-3 rounded-2xl shadow-md transition-all cursor-pointer ${
                isManualIntervention
                  ? 'bg-primary text-white hover:bg-opacity-95'
                  : 'bg-secondary text-white hover:bg-opacity-90'
              }`}
            >
              {isManualIntervention ? 'Liberar para Auxílio IA' : 'Assumir Conversa'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
