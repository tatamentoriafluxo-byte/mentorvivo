import React, { useState } from 'react';
import { Student, Message } from '../types';
import { INITIAL_CHATS } from '../data';

interface StudentDetailViewProps {
  student: Student;
  allStudents: Student[];
  onBack: () => void;
  onUpdateStudent: (updated: Student) => void;
}

export default function StudentDetailView({
  student,
  allStudents,
  onBack,
  onUpdateStudent,
}: StudentDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'chats' | 'memory' | 'meetings' | 'assets' | 'tasks' | 'analytics'>('profile');

  // Chats local state
  const [chatLogs, setChatLogs] = useState<Message[]>(INITIAL_CHATS[student.id] || [
    { senderName: 'Mentor Vivo AI', senderType: 'ai', timestamp: '9:00', text: 'Olá! Como estão indo os estudos hoje?', intention: 'Reengajamento' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMsgText, setNewMsgText] = useState('');

  // 5 Categories of memory
  const [memories, setMemories] = useState({
    fixa: 'Aluno cadastrado no Bootcamp FullStack. Conhecimento prévio básico de HTML/CSS. Almeja transição de carreira para Engenheiro de Software em 6 meses.',
    estrategica: 'Focar na entrega de portfólios práticos de backend. Priorizar feedback de Git/GitHub para destravar confiança operacional.',
    emocional: 'Apresenta ansiedade moderada ao receber erros vermelhos no console. Beneficia-se de tom empático e reforço positivo frequente.',
    operacional: 'Estuda preferencialmente aos sábados de manhã. Seus blocos de código costumam ser bem estruturados, mas faltavam comentários.',
    temporaria: 'Dúvida recente pendente sobre Arrays e loops na aula 3. Prometido contato ativo pela equipe caso não avance até amanhã.',
  });
  const [editingMemoryKey, setEditingMemoryKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');

  // Local student state to sync changes locally/globally
  const [localStudent, setLocalStudent] = useState<Student>(student);

  // WhisperX Meetings
  const [meetings, setMeetings] = useState([
    {
      id: 'm1',
      title: 'Alinhamento Estratégico - Semana 2',
      date: '22 Maio 2026',
      duration: '42 min',
      instructor: 'Mentor Thiago',
      summary: 'Revisão geral de lógica de programação. Identificado ponto de atenção em Arrays. Aluno demonstrou preocupação, mas se comprometeu a ver os desafios práticos.',
      transcript: '0:12 Thiago: Fala Lucas, tudo bem? Como é que estão as coisas?\n1:05 Lucas: Tudo bem professor, travado no array mas tentando...\n2:34 Thiago: Relaxa, arrays são assim mesmo. Pensa neles como gaveteiros organizados...',
      tasks: ['Ver vídeo de arrays de 3 minutos', 'Refazer o exercício de repositório nº 3'],
      risks: 'Insegurança com testes automatizados.',
    }
  ]);
  const [newMeetingTitle, setNewMeetingTitle] = useState('');
  const [newMeetingDur, setNewMeetingDur] = useState('30 min');
  const [newMeetingSum, setNewMeetingSum] = useState('');
  const [isAddingMeeting, setIsAddingMeeting] = useState(false);

  // Business Assets with simulated dynamic AI recommendations
  const [assets, setAssets] = useState([
    { id: 'a1', type: 'Projeto GitHub', name: 'modulo1-calculadora-js', status: 'Revisado', url: 'github.com/lucas/calc', analysis: 'Estruturação semântica excelente. Necessita otimizar legibilidade do loop na linha 42.' },
    { id: 'a2', type: 'Página de Vendas (Simulação)', name: 'landing-page-vendas-v1', status: 'Aguardando IA', url: 'figma.com/file/vendas-lucas', analysis: 'Aguardando diagnóstico inteligente do orquestrador.' }
  ]);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetType, setNewAssetType] = useState('Projeto GitHub');
  const [newAssetUrl, setNewAssetUrl] = useState('');

  // Interactive Checklist Tasks
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Completar Questionário de Onboarding', completed: true, origin: 'Manual', deadline: 'Concluído' },
    { id: 't2', title: 'Assistir Vídeo Arrays Descomplicados (3 min)', completed: false, origin: 'IA Sugestão', deadline: 'Hoje' },
    { id: 't3', title: 'Submeter Exercício 3 refatorado', completed: false, origin: 'Reunião Semana 2', deadline: 'Amanhã' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskOrigin, setNewTaskOrigin] = useState('Manual');
  const [newTaskDeadline, setNewTaskDeadline] = useState('Amanhã');

  // Trigger Memory Save
  const handleSaveMemory = (key: keyof typeof memories) => {
    setMemories(prev => ({ ...prev, [key]: editingValue }));
    setEditingMemoryKey(null);
  };

  const handleStartEditing = (key: keyof typeof memories) => {
    setEditingMemoryKey(key);
    setEditingValue(memories[key]);
  };

  // Add Asset Simulation
  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName || !newAssetUrl) return;

    const added = {
      id: `asset-${Date.now()}`,
      type: newAssetType,
      name: newAssetName,
      status: 'Aguardando IA',
      url: newAssetUrl,
      analysis: 'Status: Enviado para fila de análise. O agente de Inteligência Comportamental rodará o mapeamento estratégico de gargalos estruturais nas próximas horas.'
    };
    setAssets([...assets, added]);
    setNewAssetName('');
    setNewAssetUrl('');

    // Trigger fake AI feedback delay
    setTimeout(() => {
      setAssets(current => current.map(item => {
        if (item.id === added.id) {
          return {
            ...item,
            status: 'Revisado',
            analysis: 'Análise Concluída pelo Claude 3.5 Sonnet: Mapeamos boa intenção de conversão na CTA principal, contudo a densidade do escopo do porto está sobrecarregando o design móvil. Recomendamos espaçamento fluido.'
          };
        }
        return item;
      }));
    }, 2500);
  };

  // Add Task
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    const added = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      completed: false,
      origin: newTaskOrigin,
      deadline: newTaskDeadline
    };
    setTasks([...tasks, added]);
    setNewTaskTitle('');
  };

  // Toggle Task Completion
  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSendSimulatedMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText) return;

    const newMsg: Message = {
      senderName: 'Mentor Vivo (Humano)',
      senderType: 'mentor',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      text: newMsgText
    };

    setChatLogs([...chatLogs, newMsg]);
    setNewMsgText('');

    // Simulated Student Auto reply
    setTimeout(() => {
      const replies = [
        "Vou tentar fazer isso agora mesmo!",
        "Muito obrigado pela dica, clareou bastante",
        "Estava meio perdido, mas isso ajuda muito. Vou testar."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const autoReply: Message = {
        senderName: student.name,
        senderType: 'student',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        text: randomReply,
        emotion: 'Aliviado / Confiante',
        intention: 'Confirmação'
      };
      setChatLogs(current => [...current, autoReply]);
    }, 1500);
  };

  // Add Meeting WhisperX Upload simulation
  const handleAddMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeetingTitle || !newMeetingSum) return;

    const added = {
      id: `meet-${Date.now()}`,
      title: newMeetingTitle,
      date: 'Hoje',
      duration: newMeetingDur,
      instructor: 'Mentor Vivo AI (Auto)',
      summary: newMeetingSum,
      transcript: 'Lote de áudio transcrito em tempo real pelo WhisperX...\nMentor: Vamos trabalhar o bloqueio funcional na aula 3 para avançarmos de fase.',
      tasks: ['Revisar material de loops', 'Praticar 15min por dia'],
      risks: 'Risco de interrupção temporária por excesso de atribuições laborais.',
    };

    setMeetings([...meetings, added]);
    setNewMeetingTitle('');
    setNewMeetingSum('');
    setIsAddingMeeting(false);
  };

  const filteredMsgs = chatLogs.filter(m => 
    m.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.intention && m.intention.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1 flex flex-col p-6 min-h-screen">
      {/* Header bar */}
      <header className="flex justify-between items-center w-full px-4 py-2 bg-transparent mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold text-sm bg-white/60 hover:bg-white/90 py-2 px-4 rounded-xl shadow-sm transition-all cursor-pointer border border-white/50"
        >
          <span className="material-symbols-outlined font-bold text-lg">arrow_back</span>
          Voltar aos Alunos
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow bg-purple-100 flex items-center justify-center">
            <img src={student.avatarUrl} className="w-full h-full object-cover" alt={student.name} />
          </div>
          <div className="text-right">
            <h2 className="text-sm font-bold text-on-background leading-none">{student.name}</h2>
            <span className="text-[10px] text-outline font-semibold">Gêmeo Digital Ativo</span>
          </div>
        </div>
      </header>

      {/* Hero card showing digital twin summary */}
      <div className="clay-card-primary p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-white shadow bg-purple-50 flex items-center justify-center flex-shrink-0">
            <img src={student.avatarUrl} className="w-full h-full object-cover" alt="Student avatar large" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <h1 className="text-2xl font-extrabold font-display text-on-primary-container leading-none">{student.name}</h1>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/40 shadow-inner ${
                student.risk === 'Alto' ? 'text-rose-700 bg-rose-100/65' : student.risk === 'Médio' ? 'text-amber-800 bg-amber-100/65' : 'text-emerald-800 bg-emerald-100/65'
              }`}>
                Risco {student.risk}
              </span>
            </div>
            <p className="text-xs font-semibold text-on-primary-container/85">{student.email} • {student.module}</p>
            <p className="text-xs font-semibold text-on-primary-container/70 mt-1 max-w-xl italic">
              "{student.currentStatusText}"
            </p>
          </div>
        </div>

        <div className="shrink-0 flex flex-col gap-2 relative z-10 w-full md:w-auto">
          <div className="flex items-center gap-2 justify-between bg-white/35 backdrop-blur-sm p-3 rounded-2xl border border-white/40">
            <div>
              <p className="text-[9px] font-bold uppercase text-on-primary-container/80 tracking-wider">Fase de Jornada</p>
              <p className="text-sm font-bold text-on-primary-container leading-none mt-0.5">
                {student.phase === 'Thriving' ? 'Alta Performance' : student.phase === 'Active' ? 'Ativo em Execução' : 'Alinhamento Inicial'}
              </p>
            </div>
            <span className="material-symbols-outlined text-primary text-xl font-bold">trending_up</span>
          </div>

          <div className="flex items-center gap-2 justify-between bg-white/35 backdrop-blur-sm p-3 rounded-2xl border border-white/40">
            <div>
              <p className="text-[9px] font-bold uppercase text-on-primary-container/80 tracking-wider">Última Conexão</p>
              <p className="text-sm font-bold text-on-primary-container leading-none mt-0.5">{student.lastInteraction} atrás</p>
            </div>
            <span className="material-symbols-outlined text-primary text-xl">schedule</span>
          </div>
        </div>
      </div>

      {/* Tabs navigation menu bar */}
      <div className="flex border-b border-[#cac4d4]/30 mb-8 overflow-x-auto gap-1.5 pb-1 hide-scrollbar bg-white/40 p-1 rounded-2xl border border-white/50">
        {[
          { id: 'profile', label: '1. Perfil', icon: 'account_circle' },
          { id: 'chats', label: '2. Conversas', icon: 'forum' },
          { id: 'memory', label: '3. Memória IA', icon: 'memory' },
          { id: 'meetings', label: '4. Reuniões', icon: 'podcasts' },
          { id: 'assets', label: '5. Ativos', icon: 'interests' },
          { id: 'tasks', label: '6. Tarefas', icon: 'check_box' },
          { id: 'analytics', label: '7. Métricas & Analytics', icon: 'insights' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 py-3 px-4.5 rounded-xl font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow shadow-primary-container/50 font-extrabold'
                : 'text-on-surface-variant hover:text-primary hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-base leading-none">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab viewport panel */}
      <div className="flex-1 w-full max-w-7xl mx-auto pb-12 animate-[fadeIn_0.2s_ease-out]">
        
        {/* TAB 1: Profile View */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Dynamic Assessment Details card */}
              <div className="clay-card p-6">
                <h3 className="text-lg font-bold font-display text-on-background mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006b5e]">query_stats</span>
                  Diagnóstico Inicial & Gargalos Operacionais
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 rounded-2xl bg-[#fdf9f5] border border-outline-variant/30">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Objetivo de Curto Prazo</p>
                    <p className="text-xs font-bold text-on-surface mt-1">Concluir desafios práticos e destravar bloqueios funcionais no GitHub</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#fdf9f5] border border-outline-variant/30">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Nível de Maturidade Empresarial</p>
                    <p className="text-xs font-bold text-on-surface mt-1">Sustentável (Autônomo, mas inseguro na lógica de refatorações complexas)</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#fdf9f5] border border-outline-variant/30 col-span-1 md:col-span-2">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Principal Obstáculo Atual (Bottleneck)</p>
                    <p className="text-xs font-bold text-on-surface mt-1 text-[#ba1a1a]">Medo visível do fracasso acadêmico expresso em conversas com a IA. Rejeita rodar testes locais alegando receio de erros no compilador de dev.</p>
                  </div>
                </div>
              </div>

              {/* Learning styles details bento */}
              <div className="clay-card p-6">
                <h3 className="text-lg font-bold font-display text-on-background mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                  Mapeamento de Estilos de Aprendizagem
                </h3>
                
                <p className="text-xs font-semibold text-on-surface-variant leading-relaxed mb-4">
                  O Gêmeo Digital analisa interações no WhatsApp e WhisperX e propõe formatos calibrados:
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {student.profileType.map((profile, idx) => (
                    <span key={idx} className="clay-tag px-3.5 py-1.5 text-xs font-bold text-primary flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#006b5e] text-sm font-bold">check</span>
                      {profile}
                    </span>
                  ))}
                  <span className="clay-tag px-3.5 py-1.5 text-xs font-bold text-outline flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">stars</span>
                    Sugerir Lembrete de Áudio
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Side panel */}
            <div className="space-y-6">
              {/* Status Manager card */}
              <div className="clay-card p-5">
                <h4 className="text-sm font-bold font-display text-on-surface uppercase tracking-wider pb-2 border-b border-[#cac4d4]/30 mb-4">
                  Gerenciar Estudante
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Status de Evasão</label>
                    <div className="flex gap-2">
                      {['Ativo', 'Silencioso', 'Inativo'].map(st => (
                        <button
                          key={st}
                          onClick={() => {
                            const updated = { ...student, status: st as any };
                            onUpdateStudent(updated);
                          }}
                          className={`flex-1 font-bold text-xs py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                            student.status === st
                              ? 'bg-primary text-white border-primary shadow-sm font-extrabold'
                              : 'bg-white text-on-surface-variant border-outline-variant/30 hover:bg-slate-50'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Risco Escalonado Dev</label>
                    <div className="flex gap-2">
                      {['Baixo', 'Médio', 'Alto'].map(rk => (
                        <button
                          key={rk}
                          onClick={() => {
                            const updated = { ...student, risk: rk as any };
                            onUpdateStudent(updated);
                          }}
                          className={`flex-1 font-bold text-xs py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                            student.risk === rk
                              ? 'bg-[#ba1a1a] text-white border-[#ba1a1a] shadow-sm font-extrabold'
                              : 'bg-white text-on-surface-variant border-outline-variant/30 hover:bg-slate-50'
                          }`}
                        >
                          {rk}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Chats View */}
        {activeTab === 'chats' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Chat directory sidebar */}
            <div className="lg:col-span-1 bg-white p-4 rounded-3xl border border-white/60 clay-card flex flex-col h-full">
              <h3 className="text-sm font-bold font-display text-on-surface uppercase tracking-wider mb-4">Outros Estudantes</h3>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {allStudents.map(other => (
                  <div
                    key={other.id}
                    className={`p-3 rounded-2xl flex items-center gap-3 border transition-all cursor-pointer ${
                      other.id === student.id
                        ? 'bg-primary-fixed text-primary border-primary/25 shadow-sm font-bold'
                        : 'bg-white border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-inner flex-shrink-0 bg-purple-50 flex items-center justify-center">
                      <img src={other.avatarUrl} className="w-full h-full object-cover" alt="Avatar small list" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-on-surface">{other.name}</h4>
                      <p className="text-[10px] text-on-surface-variant font-medium">Módulo: {other.module}</p>
                    </div>
                    <span className={`w-2.5 h-2.5 rounded-full ml-auto ${
                      other.risk === 'Alto' ? 'bg-error' : other.risk === 'Médio' ? 'bg-secondary' : 'bg-tertiary'
                    }`}></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Chat dialogue panel */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-white/60 clay-card flex flex-col h-full overflow-hidden">
              {/* Header filter search */}
              <div className="p-4 border-b border-[#cac4d4]/30 flex items-center gap-3">
                <span className="material-symbols-outlined text-outline">search</span>
                <input
                  type="text"
                  placeholder="Pesquisar histórico WhatsApp do estudante..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-on-surface focus:outline-none focus:ring-0 p-0 font-medium"
                />
              </div>

              {/* Message scroll viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#fdf9f5]/20 to-[#ffffff]/40">
                {filteredMsgs.map((msg, index) => {
                  const isStudent = msg.senderType === 'student';
                  const isAI = msg.senderType === 'ai';
                  return (
                    <div key={index} className={`flex gap-2.5 max-w-[85%] ${isStudent ? 'self-end flex-row-reverse ml-auto' : 'mr-auto'}`}>
                      <div className={`w-8 h-8 rounded-full overflow-hidden border border-white/50 shadow flex items-center justify-center shrink-0 ${
                        isStudent ? 'bg-orange-100' : isAI ? 'bg-purple-100' : 'bg-stone-100'
                      }`}>
                        <span className="material-symbols-outlined text-xs font-bold">
                          {isStudent ? 'school' : isAI ? 'smart_toy' : 'person'}
                        </span>
                      </div>
                      
                      <div>
                        {/* Bubble */}
                        <div className={`p-3.5 text-xs leading-relaxed ${
                          isStudent ? 'chat-bubble-student text-on-surface' : 'chat-bubble-ai text-on-surface'
                        }`}>
                          {msg.text}
                        </div>

                        {/* Metadata Tag details */}
                        <div className="flex items-center gap-2 mt-1 px-1.5 flex-wrap">
                          <span className="text-[9px] font-bold text-outline">{msg.senderName} • {msg.timestamp}</span>
                          {msg.intention && (
                            <span className="text-[9px] font-extrabold text-primary bg-[#e8ddff]/80 px-2 py-0.5 rounded-md">Intenção: {msg.intention}</span>
                          )}
                          {msg.emotion && (
                            <span className="text-[9px] font-extrabold text-[#79490b] bg-[#ffdcbd]/80 px-2 py-0.5 rounded-md">Sentimento: {msg.emotion}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sending simulation console */}
              <form onSubmit={handleSendSimulatedMsg} className="p-3 border-t border-[#cac4d4]/30 bg-slate-50 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Simular envio de resposta manual ou sugestão ativa..."
                  value={newMsgText}
                  onChange={(e) => setNewMsgText(e.target.value)}
                  className="flex-1 bg-white border border-[#cac4d4]/30 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-none"
                />
                <button
                  type="submit"
                  className="clay-button py-2 px-4 rounded-xl text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-md"
                >
                  <span className="material-symbols-outlined text-sm font-bold">send</span>
                  Intervir
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: Memory Layers View */}
        {activeTab === 'memory' && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-white/60 clay-card">
              <h3 className="text-lg font-bold font-display text-on-background mb-1.5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary font-bold">memory</span>
                Central de Memória Contínua (Hierárquica 5-Camadas)
              </h3>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed mb-6">
                O Gêmeo Digital do mentorado acumula conhecimento em 5 níveis de sensibilidade operacional. Admins humanos têm poder total para ajustar estas memórias, calibrando as respostas automáticas da inteligência artificial.
              </p>

              <div className="space-y-4">
                {[
                  { key: 'fixa', label: '1. Memória Fixa (Permanente)', desc: 'Informações imutáveis de longo prazo (objetivos de carreira, histórico prévio de desenvolvimento).' },
                  { key: 'estrategica', label: '2. Memória Estratégica', desc: 'Diretrizes traçadas pelo mentor para guiar a evolução do negócio ou acadêmica.' },
                  { key: 'emocional', label: '3. Memória Emocional (Avançado)', desc: 'Classificação de humor recorrente, pontos de medo de fracasso, ansiedade ou burnout.' },
                  { key: 'operacional', label: '4. Memória Operacional', desc: 'Roteiros de horários, logs de acesso específicos e ritmo de codificação.' },
                  { key: 'temporaria', label: '5. Memória Temporária (Contextual)', desc: 'Informações flutuantes que expiram em curto prazo (dúvida do exercício atual, compromisso agendado).' }
                ].map(item => {
                  const isEditing = editingMemoryKey === item.key;
                  const currentText = memories[item.key as keyof typeof memories];

                  return (
                    <div key={item.key} className="p-4 rounded-2xl bg-[#fdf9f5] border border-outline-variant/30 flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-bold text-[#674bb5] font-display">{item.label}</h4>
                          <p className="text-[10px] text-on-surface-variant-dim text-outline font-semibold">{item.desc}</p>
                        </div>
                        
                        {!isEditing ? (
                          <button
                            onClick={() => handleStartEditing(item.key as any)}
                            className="text-primary hover:text-opacity-80 text-xs font-bold flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-xl shadow-sm border border-outline-variant/20"
                          >
                            <span className="material-symbols-outlined text-sm font-bold">edit</span>
                            Editar
                          </button>
                        ) : (
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => handleSaveMemory(item.key as any)}
                              className="text-white bg-primary hover:bg-[#674bb5]/90 text-xs font-bold py-1.5 px-3 rounded-xl shadow cursor-pointer shadow-primary-container/30"
                            >
                              Salvar
                            </button>
                            <button
                              onClick={() => setEditingMemoryKey(null)}
                              className="text-outline hover:text-on-surface text-xs font-bold py-1.5 px-3 rounded-xl border border-outline-variant/50 cursor-pointer bg-white"
                            >
                              Cancelar
                            </button>
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <textarea
                          rows={3}
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          className="w-full bg-white border border-[#cac4d4]/50 rounded-xl p-3 text-xs font-medium focus:outline-none mt-2 leading-relaxed"
                        ></textarea>
                      ) : (
                        <p className="text-xs font-semibold text-on-surface leading-relaxed mt-1 text-slate-700 bg-white/50 p-2.5 rounded-xl border border-dashed border-outline-variant/25">
                          {currentText || 'Sem registro de memória ativo.'}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Meetings WhisperX transcripts */}
        {activeTab === 'meetings' && (
          <div className="space-y-6">
            {/* Quick meetings controller panel */}
            <div className="flex justify-between items-center bg-white/40 p-4 rounded-3xl border border-white/50 mb-4 flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold font-display text-on-surface">Lista de Reuniões</h3>
                <span className="text-xs font-bold text-outline">Transcrição Diarizada WhisperX</span>
              </div>
              
              <button
                onClick={() => setIsAddingMeeting(!isAddingMeeting)}
                className="bg-primary hover:bg-opacity-95 text-white font-bold text-xs py-2 px-4.5 rounded-2xl shadow-md clay-highlight flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined font-bold text-lg">upload_file</span>
                Carregar Nova Gravação Transcrita
              </button>
            </div>

            {/* Addition drawer form */}
            {isAddingMeeting && (
              <form onSubmit={handleAddMeeting} className="p-6 bg-white rounded-3xl border border-white/60 clay-card-shadow space-y-4 animate-[fadeIn_0.15s_ease-out]">
                <h4 className="text-sm font-bold font-display text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined">podcasts</span>
                  Adicionar Transcrição Manual de WhisperX
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Título da Reunião</label>
                    <input
                      required
                      type="text"
                      placeholder="ex: Reunião Operacional Quarta-feira"
                      value={newMeetingTitle}
                      onChange={(e) => setNewMeetingTitle(e.target.value)}
                      className="w-full bg-[#fdf9f5] border border-outline-variant/50 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Duração</label>
                    <input
                      required
                      type="text"
                      placeholder="ex: 45 min"
                      value={newMeetingDur}
                      onChange={(e) => setNewMeetingDur(e.target.value)}
                      className="w-full bg-[#fdf9f5] border border-outline-variant/50 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Resumo Executivo da Reunião</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Resumo estratégico produzido pelo WhisperX + LLM..."
                    value={newMeetingSum}
                    onChange={(e) => setNewMeetingSum(e.target.value)}
                    className="w-full bg-[#fdf9f5] border border-outline-variant/50 rounded-xl p-3 text-xs font-semibold focus:outline-none leading-relaxed"
                  ></textarea>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-primary text-white font-bold text-xs py-2 px-4 rounded-xl shadow cursor-pointer hover:bg-opacity-95"
                  >
                    Salvar e indexar nos RAGs
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingMeeting(false)}
                    className="border border-[#cac4d4] text-outline text-xs font-bold py-2 px-4 rounded-xl cursor-pointer hover:bg-slate-50"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {/* Meetings details loop */}
            <div className="space-y-6">
              {meetings.map((meet) => (
                <div key={meet.id} className="p-6 bg-white rounded-3xl border border-white/60 clay-card">
                  <div className="flex justify-between items-start pb-3 border-b border-[#cac4d4]/30 mb-4 flex-wrap gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-on-surface font-display">{meet.title}</h4>
                      <p className="text-xs font-medium text-purple-600 mt-1">Conduzido por: {meet.instructor} em {meet.date} ({meet.duration})</p>
                    </div>

                    <span className="text-xs font-extrabold text-[#006b5e] bg-[#96f3e1]/70 px-3 py-1.5 rounded-full shadow-inner">
                      Status WhisperX: Transcrito
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      {/* Summary */}
                      <div>
                        <h5 className="text-xs font-bold text-outline uppercase tracking-wide mb-1.5">Resumo Estratégico</h5>
                        <p className="text-xs font-semibold text-on-surface-variant leading-relaxed bg-[#fdf9f5] p-3 rounded-2xl border border-outline-variant/30">
                          {meet.summary}
                        </p>
                      </div>

                      {/* Transcripts lines snippet */}
                      <div>
                        <h5 className="text-xs font-bold text-outline uppercase tracking-wide mb-1.5">Trecho da Diarização (Gravação Sincronizada)</h5>
                        <pre className="font-mono text-[10px] text-on-surface-variant leading-loose bg-[#f7f3ef] p-4 rounded-2xl max-h-40 overflow-y-auto whitespace-pre-wrap">
                          {meet.transcript}
                        </pre>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Tasks extracted */}
                      <div className="p-4 rounded-2xl bg-[#e8ddff]/40 border border-primary-container/20">
                        <h5 className="text-xs font-bold text-primary uppercase tracking-wide mb-2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">alarm_on</span>
                          Tarefas Extraídas
                        </h5>
                        <ul className="space-y-2 list-disc list-inside">
                          {meet.tasks.map((tk, idx) => (
                            <li key={idx} className="text-xs font-medium text-on-surface-variant leading-relaxed">
                              {tk}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Risks detected */}
                      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                        <h5 className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wide mb-1 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm font-bold">warning</span>
                          Atitude / Riscos
                        </h5>
                        <p className="text-xs font-bold text-slate-700">{meet.risks}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Assets and business diagnostics */}
        {activeTab === 'assets' && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-white/60 clay-card">
              <div className="flex justify-between items-center mb-6 border-b border-[#cac4d4]/30 pb-3 flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-bold font-display text-on-background flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#79490b]">interests</span>
                    Ativos Cadastrados e Diagnósticos Estratégicos
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5 font-medium">Cadastre URLs e canais (Funis de Vendas, Instagram, repositório GitHub) do aluno para auditagem e insights automatizados.</p>
                </div>
              </div>

              {/* Add asset form */}
              <form onSubmit={handleAddAsset} className="bg-slate-50 p-4 rounded-2xl border border-outline-variant/30 grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">
                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Tipo do Canal</label>
                  <select
                    value={newAssetType}
                    onChange={(e) => setNewAssetType(e.target.value)}
                    className="w-full bg-white border border-outline-variant/50 rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Projeto GitHub">Projeto GitHub</option>
                    <option value="Página de Vendas">Página de Vendas</option>
                    <option value="Instagram / Tráfego">Instagram / Tráfego</option>
                    <option value="Vídeo de Vendas (VSL)">Vídeo de Vendas (VSL)</option>
                  </select>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Nome do Ativo</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: modulo3-vendas-lp"
                    value={newAssetName}
                    onChange={(e) => setNewAssetName(e.target.value)}
                    className="w-full bg-white border border-outline-variant/50 rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Endereço URL</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: github.com/aluno/proj"
                    value={newAssetUrl}
                    onChange={(e) => setNewAssetUrl(e.target.value)}
                    className="w-full bg-white border border-outline-variant/50 rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="clay-button py-2.5 px-4 rounded-xl text-white font-bold text-xs shadow-md cursor-pointer hover:bg-opacity-95"
                >
                  Adicionar & Analisar
                </button>
              </form>

              {/* Assets list items */}
              <div className="space-y-4">
                {assets.map(asset => (
                  <div key={asset.id} className="p-4 rounded-2xl bg-[#fdf9f5] border border-outline-variant/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-orange-100 text-[#79490b] rounded-lg font-bold text-[10px]">{asset.type}</span>
                        <h4 className="text-xs font-bold text-on-surface">{asset.name}</h4>
                      </div>
                      
                      <p className="text-[10px] font-mono text-outline">{asset.url}</p>
                      
                      <div className="mt-2 text-xs font-semibold text-slate-700 bg-white/70 p-3 rounded-xl border border-dashed border-outline-variant/40 leading-relaxed max-w-2xl">
                        <strong>Feedback do AI Coach:</strong> {asset.analysis}
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm ${
                      asset.status === 'Revisado'
                        ? 'bg-[#96f3e1] text-[#003c34]'
                        : 'bg-orange-100 text-[#855316]'
                    }`}>
                      {asset.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: Tasks Management */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-3xl border border-white/60 clay-card">
              <h3 className="text-lg font-bold font-display text-on-background mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary font-bold">check_box</span>
                Plano de Ações & Tarefas Atribuídas
              </h3>

              {/* Task Creation form */}
              <form onSubmit={handleAddTask} className="flex gap-3 mb-6 flex-wrap md:flex-nowrap">
                <input
                  type="text"
                  required
                  placeholder="Cadastrar nova tarefa personalizada para Lucas (ex: Refazer loop na linha 25)..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 bg-[#fdf9f5] border border-[#cac4d4]/60 rounded-xl py-2.5 px-4 text-xs font-semibold focus:outline-none"
                />

                <select
                  value={newTaskDeadline}
                  onChange={(e) => setNewTaskDeadline(e.target.value)}
                  className="bg-[#fdf9f5] border border-[#cac4d4]/60 rounded-xl py-2.5 px-3 text-xs font-semibold focus:outline-none"
                >
                  <option value="Hoje">Hoje</option>
                  <option value="Amanhã">Amanhã</option>
                  <option value="Final de Semana">Final de Semana</option>
                </select>

                <button
                  type="submit"
                  className="clay-button py-2.5 px-6 rounded-xl text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1 select-none flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-sm font-bold">add</span>
                  Adicionar
                </button>
              </form>

              {/* Interactive tasks loop */}
              <div className="space-y-3">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(task.id)}
                    className="p-3.5 rounded-2xl bg-[#fdf9f5] border border-outline-variant/30 flex justify-between items-center hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-xl font-bold select-none transition-colors ${
                        task.completed ? 'text-[#006b5e]' : 'text-outline/40 group-hover:text-primary'
                      }`}>
                        {task.completed ? 'task_alt' : 'radio_button_unchecked'}
                      </span>
                      
                      <span className={`text-xs font-bold leading-none select-none transition-all ${
                        task.completed ? 'line-through text-outline' : 'text-slate-800'
                      }`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-outline p-1 rounded bg-[#f7f3ef]">{task.origin}</span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        task.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-150 text-[#79490b] font-bold bg-[#ffbc76]/60'
                      }`}>
                        {task.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: Analytics Individual Performance */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Metric 1: Attendance Engagement Rate */}
            <div className="clay-card p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold font-display text-on-background mb-1">Relação de Engajamento por Semana</h4>
                <p className="text-xs text-outline font-semibold mb-6">Mapeamento de taxa de progresso contínuo e resolução de problemas.</p>
                
                <div className="space-y-4">
                  {/* Problem Solving rate */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#1c1c19] mb-1">
                      <span>Execução de Tarefas</span>
                      <span className="text-primary">68%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full shadow-inner overflow-hidden">
                      <div className="h-full bg-primary rounded-full shadow" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  {/* WhatsApp Prompt response frequency */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#1c1c19] mb-1">
                      <span>Frequência das Conversas no WhatsApp</span>
                      <span className="text-secondary">42%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full shadow-inner overflow-hidden">
                      <div className="h-full bg-secondary rounded-full shadow" style={{ width: '42%' }}></div>
                    </div>
                  </div>

                  {/* Sentiment average score */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#1c1c19] mb-1">
                      <span>Média de Resiliência Emocional</span>
                      <span className="text-[#006b5e]">89%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full shadow-inner overflow-hidden font-bold">
                      <div className="h-full bg-tertiary rounded-full shadow" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-outline font-extrabold text-center mt-6">
                Média calculada baseada nas últimas 4 atualizações de memória estratégica.
              </div>
            </div>

            {/* Metric 2: AI Token Incurred Cost on this student */}
            <div className="clay-card p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold font-display text-on-background mb-1">Rastreamento de Custos IA / Aluno</h4>
                <p className="text-xs text-outline font-semibold mb-6">Visualização detalhada do consumo em sandbox de tokens das LLMs para este mentee.</p>

                <div className="space-y-4 mt-2">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-medium text-[#494552]">Claude 3.5 Sonnet (Primário)</span>
                    <span className="text-xs font-bold text-[#1c1c19]">R$ 11.20</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-medium text-[#494552]">GPT-4o (Fallback)</span>
                    <span className="text-xs font-bold text-[#1c1c19]">R$ 2.45</span>
                  </div>

                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-xs font-medium text-[#494552]">Embeddings (text-embedding-3-large)</span>
                    <span className="text-xs font-bold text-[#1c1c19]">R$ 0.95</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs font-bold text-primary">Custo Total Acumulado</span>
                    <span className="text-sm font-extrabold text-primary">R$ 14.60</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] text-outline text-center mt-4">
                SLA Alvo: Limite de R$ 15,00/mês. Gêmeo digital otimizado.
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
