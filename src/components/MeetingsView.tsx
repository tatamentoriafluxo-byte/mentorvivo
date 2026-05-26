import React, { useState } from 'react';
import { INITIAL_STUDENTS } from '../data';

interface Meeting {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  date: string;
  duration: string;
  summary: string;
  transcript: string;
  tokensUsed: number;
  risks: string;
  tasks: string[];
}

export default function MeetingsView() {
  const [students] = useState(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState('student-lucas-silva');

  // Hardcoded meeting datasets
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 'meet-1',
      studentId: 'student-lucas-silva',
      studentName: 'Lucas Silva',
      title: 'Mentor Onboarding & Carreira',
      date: '15 Mai 2026',
      duration: '35 min',
      summary: 'Conversamos sobre o background do Lucas na área elétrica e sua forte intenção de trabalhar com desenvolvimento frontend em Javascript. Ele relata receio de quebrar o ambiente e de não passar nos testes das aulas.',
      transcript: '1:10 Thiago (Mental Coach): Fala Lucas, seja muito bem-vindo. Vamos desenhar o cronograma!\n2:42 Lucas: Obrigado professor. Estou animado, mas sinto um pouco de medo de travar e desistir.\n4:10 Thiago: Conheço esse medo, mas com o suporte 365 e nosso Gêmeo Digital você nunca estará sozinho.',
      tokensUsed: 4210,
      risks: 'Paralisia de Inércia no início do módulo 1.',
      tasks: ['Clonar primeiro repositório', 'Passar o primeiro teste de unidade', 'Configurar webhook de WhatsApp']
    },
    {
      id: 'meet-2',
      studentId: 'student-lucas-silva',
      studentName: 'Lucas Silva',
      title: 'Sessão Técnica - Lógica e Arrays',
      date: '22 Mai 2026',
      duration: '45 min',
      summary: 'Sessão emergencial de resolução de dilemas em estruturas de repetição. Aluno estuda de forma cíclica e tem pressa na transição, gerando ansiedade crônica secundária.',
      transcript: '0:15 Thiago: Fala Lucas, vi que você puxou o gatilho de arrays confuso?\n1:20 Lucas: Cara, eu tento fazer o for-loop mas dá undef do nada. Quase joguei tudo pro alto na terça.\n5:15 Thiago: Se acalma, vamos fazer um debugger visual juntos que você vai ver os arrays se comportando.',
      tokensUsed: 6200,
      risks: 'Risco médio de evasão por frustração momentânea.',
      tasks: ['Assistir vídeo arrays no portal', 'Fazer os 4 exercícios básicos de laço']
    },
    {
      id: 'meet-3',
      studentId: 'student-mariana-costa',
      studentName: 'Mariana Costa',
      title: 'Planejamento de Complexidade de Algoritmos',
      date: '18 Mai 2026',
      duration: '50 min',
      summary: 'Mariana solicitou mentoria para avançar sobre notação Big-O. Desempenho excelente, foco em performance e qualidade de código. Nível de engajamento acima da média.',
      transcript: '0:12 Thiago: Mariana, bem-vinda de volta. Big-O é o papo de hoje?\n1:05 Mariana: Sim! Fiz a calculadora funcionar e agora quero analisar complexidade temporal.',
      tokensUsed: 8400,
      risks: 'Nenhum risco de evasão detectado.',
      tasks: ['Escrever artigo curto sobre Big-O no LinkedIn', 'Refatorar repositório principal reduzindo de O(N^2) para O(N)']
    }
  ]);

  const [activeMeetingId, setActiveMeetingId] = useState<string | null>('meet-2');

  // Input creation forms states
  const [newTitle, setNewTitle] = useState('');
  const [newDur, setNewDur] = useState('30 min');
  const [newSum, setNewSum] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const selectedStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const studentsMeetings = meetings.filter(m => m.studentId === selectedStudentId);
  const activeMeeting = meetings.find(m => m.id === activeMeetingId) || studentsMeetings[0];

  // Drag and drop audio simulation
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Simulate file load
      setNewTitle(`Reunião Sincronizada: ${e.dataTransfer.files[0].name.replace(/\.[^/.]+$/, "")}`);
      setIsUploading(true);
    }
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSum) return;

    const created: Meeting = {
      id: `meet-${Date.now()}`,
      studentId: selectedStudentId,
      studentName: selectedStudent.name,
      title: newTitle,
      date: 'Hoje',
      duration: newDur,
      summary: newSum,
      transcript: '1:02 Thiago (Mentor Vivo): Gravação processada pelo WhisperX.\n1:40 Aluno: Obrigado por reordenar minha agenda de prioridades...',
      tokensUsed: 2150,
      risks: 'Baixo (Identificado reengajamento operante).',
      tasks: ['Revisar material estratégico editado']
    };

    setMeetings([created, ...meetings]);
    setActiveMeetingId(created.id);
    setNewTitle('');
    setNewSum('');
    setIsUploading(false);
  };

  return (
    <div className="flex-1 flex flex-col p-6 min-h-screen">
      <header className="flex justify-between items-center w-full px-4 py-2 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl font-bold">record_voice_over</span>
            Diarização de Reuniões (WhisperX Sync)
          </h1>
          <p className="text-xs font-semibold text-outline mt-0.5">Sincronize reuniões gravadas para transcrever chats, extrair tarefas e treinar o RAG</p>
        </div>
      </header>

      {/* Main workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        
        {/* Left Side: Drag-and-drop & Student Selector */}
        <div className="space-y-6 lg:col-span-1">
          {/* Student picker */}
          <div className="p-5 bg-white rounded-3xl border border-white/60 clay-card">
            <h3 className="text-xs font-bold font-display text-outline uppercase tracking-wider mb-3">Pesquisar por Mentorado</h3>
            <select
              value={selectedStudentId}
              onChange={(e) => {
                setSelectedStudentId(e.target.value);
                setActiveMeetingId(null); // Reset select meet
              }}
              className="w-full bg-[#fdf9f5] border border-[#cac4d4]/50 rounded-xl p-3 text-xs font-bold text-on-surface focus:outline-none"
            >
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.module})</option>
              ))}
            </select>
          </div>

          {/* Drag & drop recorder file upload simulation */}
          <div className="p-5 bg-white rounded-3xl border border-white/60 clay-card space-y-4">
            <h3 className="text-sm font-bold font-display text-on-surface">Subir Gravação de Vídeo/Áudio</h3>
            
            {!isUploading ? (
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl h-44 flex flex-col justify-center items-center text-center p-4 transition-all cursor-pointer ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-[#cac4d4] hover:bg-slate-50'
                }`}
                onClick={() => setIsUploading(true)}
              >
                <span className="material-symbols-outlined text-outline text-3xl mb-1.5 animate-pulse">cloud_upload</span>
                <h4 className="text-xs font-bold text-on-surface">Arraste a mentoria gravada (.mp3/.mp4)</h4>
                <p className="text-[10px] text-outline mt-1 font-semibold">Max arquivo: 200MB. Suporta diarização WhisperX.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateMeeting} className="space-y-3 animate-[fadeIn_0.1s_ease-out]">
                <div>
                  <input
                    required
                    type="text"
                    placeholder="ex: Reunião Operacional Quarta-feira"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#fdf9f5] border border-[#cac4d4]/50 rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    required
                    type="text"
                    placeholder="Duração (ex: 40 min)"
                    value={newDur}
                    onChange={(e) => setNewDur(e.target.value)}
                    className="w-full bg-[#fdf9f5] border border-[#cac4d4]/50 rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  />
                  <span className="text-[10px] font-bold text-primary flex items-center justify-center p-1.5 rounded-lg border border-primary/20 bg-primary-fixed">
                    Diarização Autocompilada
                  </span>
                </div>

                <div>
                  <textarea
                    required
                    rows={2}
                    placeholder="Insira as anotações do resumo desta mentoria..."
                    value={newSum}
                    onChange={(e) => setNewSum(e.target.value)}
                    className="w-full bg-[#fdf9f5] border border-[#cac4d4]/50 rounded-xl p-2.5 text-xs font-semibold focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex gap-1.5">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white font-bold text-xs py-2 px-3 rounded-xl shadow cursor-pointer text-center"
                  >
                    Gerar Transcrição WhisperX
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsUploading(false)}
                    className="border border-[#cac4d4] text-outline hover:bg-slate-50 text-xs font-bold py-2 px-3 rounded-xl cursor-pointer"
                  >
                    Voltar
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Meetings list of selected student */}
          <div className="p-5 bg-white rounded-3xl border border-white/60 clay-card">
            <h3 className="text-sm font-bold font-display text-on-surface mb-3.5">Histórico do Mentorado</h3>
            
            <div className="space-y-3">
              {studentsMeetings.map(meet => (
                <div
                  key={meet.id}
                  onClick={() => setActiveMeetingId(meet.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    activeMeeting?.id === meet.id
                      ? 'bg-primary-fixed text-primary border-primary/30 shadow-sm font-bold'
                      : 'bg-white border-transparent hover:bg-slate-50'
                  }`}
                >
                  <h4 className="text-xs font-bold text-on-surface">{meet.title}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[10px] text-outline font-semibold">{meet.date}</span>
                    <span className="text-[10px] bg-white text-primary border border-primary/10 px-2 py-0.5 rounded-md font-bold">{meet.duration}</span>
                  </div>
                </div>
              ))}

              {studentsMeetings.length === 0 && (
                <p className="text-[11px] text-outline font-semibold text-center py-6">Nenhuma mentoria gravada para este aluno.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Transcription dialogue, executive summary, risks, tasks */}
        <div className="lg:col-span-2">
          {activeMeeting ? (
            <div className="p-6 bg-white rounded-3xl border border-white/60 clay-card space-y-6">
              
              <div className="flex justify-between items-start pb-4 border-b border-[#cac4d4]/30 wrap gap-3">
                <div>
                  <h2 className="text-lg font-bold font-display text-on-surface leading-none">{activeMeeting.title}</h2>
                  <p className="text-xs font-bold text-primary mt-1.5">{selectedStudent.name} • {activeMeeting.date} ({activeMeeting.duration})</p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold text-[#006b5e] bg-[#96f3e1] py-1 px-3.5 rounded-full shadow-inner">
                    Diarizado via WhisperX
                  </span>
                  <p className="text-[9px] font-mono text-outline mt-1 font-bold">Consumo: {activeMeeting.tokensUsed} tokens IA</p>
                </div>
              </div>

              {/* Summary of meeting */}
              <div>
                <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-1.5">Resumo Executivo Gerado da Reunião</h4>
                <p className="text-xs font-semibold text-on-surface-variant leading-relaxed bg-[#fdf9f5] border border-outline-variant/30 p-4 rounded-2xl shadow-inner">
                  {activeMeeting.summary}
                </p>
              </div>

              {/* Tasks and Risks flex row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#e8ddff]/30 border border-primary-container/20">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm font-bold">alarm_on</span>
                    Tarefas Extraídas Pela IA e Roteiradas
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {activeMeeting.tasks.map((task, idx) => (
                      <li key={idx} className="text-xs font-semibold text-on-surface-variant">
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <h4 className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm font-bold">psychology</span>
                    Riscos Emocionais / Atitude
                  </h4>
                  <p className="text-xs font-extrabold text-slate-800 leading-relaxed">
                    {activeMeeting.risks}
                  </p>
                  <p className="text-[10px] text-outline font-semibold mt-1">Gêmeo digital adaptado para tons de conversa pacíficos no WhatsApp.</p>
                </div>
              </div>

              {/* Full diariation logs */}
              <div>
                <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-2">Trechos Detalhados da Diarização (Deteção Sincronizada)</h4>
                <div className="font-mono text-xs text-on-surface-variant bg-slate-50 p-4 border border-[#cac4d4]/30 rounded-2xl max-h-60 overflow-y-auto whitespace-pre-line leading-loose">
                  {activeMeeting.transcript}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-[#cac4d4] text-center flex flex-col items-center justify-center min-h-[400px]">
              <span className="material-symbols-outlined text-outline/30 text-5xl mb-3">podcasts</span>
              <h3 className="text-base font-bold font-display text-on-surface">Nenhuma Mentoria Selecionada</h3>
              <p className="text-xs text-outline max-w-sm mt-1">Selecione um estudante na coluna à esquerda ou suba um arquivo de áudio para ver resumos e transcrições diarizadas pelo WhisperX.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
