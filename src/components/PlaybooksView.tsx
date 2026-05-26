import React, { useState } from 'react';
import { INITIAL_STUDENTS } from '../data';

interface Playbook {
  id: string;
  title: string;
  trigger: string;
  status: 'Ativo' | 'Pausado';
  description: string;
  templateMessage: string;
  escalationNeeded: boolean;
  minInteractionsCount: number;
}

export default function PlaybooksView() {
  const [playbooks, setPlaybooks] = useState<Playbook[]>([
    {
      id: 'play-1',
      title: 'Boas-vindas & Onboarding Inicial',
      trigger: 'Usuário cadastrado sem submissão de formulário inicial há 3 dias',
      status: 'Ativo',
      description: 'Dispara um lembrete empático no WhatsApp se o aluno clonar o repositório inicial mas não preencher o diagnóstico de maturidade empresarial.',
      templateMessage: 'Olá {student_name}! Vi que você já configurou o ambiente, ótimo começo! Para calibrarmos nosso Gêmeo Digital do seu mentor {course_module}, preenche o link do diagnóstico quando puder para personalizarmos os próximos desafios. Qualquer dúvida, estou por aqui!',
      escalationNeeded: false,
      minInteractionsCount: 1
    },
    {
      id: 'play-2',
      title: 'Acompanhamento Semanal Ativo',
      trigger: 'Cron semanal de monitoramento para alunos ativos',
      status: 'Ativo',
      description: 'Sincroniza o desempenho histórico do portal, extrai desafios e gera sugestões adaptadas ao estilo de aprendizagem do mentee (áudio, vídeo ou imagens).',
      templateMessage: 'Fala {student_name}, tudo bem? Olhei seus commits essa semana e achei fantástica a refatoração do {course_module}! Preparei um micro-desafio de 5 minutos sobre esse tema e adoraria ver sua solução. Bora testar?',
      escalationNeeded: false,
      minInteractionsCount: 2
    },
    {
      id: 'play-3',
      title: 'Reengajamento de Aluno Silencioso (>7 dias)',
      trigger: 'Aluno sem interações ou logs na plataforma por 7 dias',
      status: 'Ativo',
      description: 'Dispara fluxos de escuta ativa para entender barreiras pragmáticas de trabalho ou frustrações sem forçar entregas acadêmicas rígidas.',
      templateMessage: 'Oi {student_name}, tudo bem por aí? Notei que você ficou um pouco desconectado das aulas de {course_module} nos últimos dias. Sei que a rotina de trabalho é corrida! Só queria te dizer que não precisa se preocupar com prazos, estou aqui apenas para apoiar se tiver travado em algo. Quer que eu mande um áudio explicando o ponto mais difícil?',
      escalationNeeded: true,
      minInteractionsCount: 1
    },
    {
      id: 'play-4',
      title: 'Intervenção Crítica Anti-Burnout',
      trigger: 'Sentimento de Frustração ou Paralisia detectado 2x consecutivas pela IA',
      status: 'Ativo',
      description: 'Gera gatilho de urgência. Interrompe interações autônomas da inteligência artificial e passa o comando do WhatsApp diretamente para o mentor humano.',
      templateMessage: 'Olá {student_name}! Thiago aqui de forma direta. O robô me alertou que você teve dificuldades recorrentes em {course_module} e acabou ficando travado. Quero te tirar dessa inércia já! Separei uma vaga na minha mentoria individual de amanhã para resolvermos isso em chamada de vídeo. Qual o melhor horário para você?',
      escalationNeeded: true,
      minInteractionsCount: 3
    }
  ]);

  const [activePlayId, setActivePlayId] = useState<string>('play-3');
  const [students] = useState(INITIAL_STUDENTS);
  const [selectedStudentId, setSelectedStudentId] = useState('student-lucas-silva');
  
  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedTrigger, setEditedTrigger] = useState('');
  const [editedDesc, setEditedDesc] = useState('');
  const [editedMsg, setEditedMsg] = useState('');
  const [editedEscalation, setEditedEscalation] = useState(false);

  // Simulation outcome
  const [testOutcome, setTestOutcome] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const activePlay = playbooks.find(p => p.id === activePlayId) || playbooks[0];
  const testStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handleStartEditing = () => {
    setEditedTitle(activePlay.title);
    setEditedTrigger(activePlay.trigger);
    setEditedDesc(activePlay.description);
    setEditedMsg(activePlay.templateMessage);
    setEditedEscalation(activePlay.escalationNeeded);
    setIsEditing(true);
  };

  const handleSavePlaybook = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaybooks(prev => prev.map(p => {
      if (p.id === activePlay.id) {
        return {
          ...p,
          title: editedTitle,
          trigger: editedTrigger,
          description: editedDesc,
          templateMessage: editedMsg,
          escalationNeeded: editedEscalation
        };
      }
      return p;
    }));
    setIsEditing(false);
    setTestOutcome(null);
  };

  const handleTogglePlaybookStatus = (id: string) => {
    setPlaybooks(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'Ativo' ? 'Pausado' : 'Ativo' };
      }
      return p;
    }));
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTestOutcome(null);

    setTimeout(() => {
      // Substitute template tags
      const formatted = activePlay.templateMessage
        .replace(/{student_name}/g, testStudent.name)
        .replace(/{course_module}/g, testStudent.module);

      setTestOutcome(formatted);
      setIsSimulating(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col p-6 min-h-screen">
      <header className="flex justify-between items-center w-full px-4 py-2 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl font-bold">auto_stories</span>
            Playbooks Inteligentes
          </h1>
          <p className="text-xs font-semibold text-outline mt-0.5">Defina automações de escuta ativa baseadas no sentimento do gêmeo digital</p>
        </div>
      </header>

      {/* Playbook layouts workspace */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        
        {/* Left Side: Directory of Playbooks */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-5 bg-white rounded-3xl border border-white/60 clay-card">
            <h3 className="text-sm font-bold font-display text-on-surface mb-4">Selecione uma Jornada</h3>
            
            <div className="space-y-4">
              {playbooks.map(play => (
                <div
                  key={play.id}
                  onClick={() => {
                    setActivePlayId(play.id);
                    setIsEditing(false);
                    setTestOutcome(null);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative group ${
                    activePlay.id === play.id
                      ? 'bg-[#e8ddff] text-primary border-primary/25 shadow-sm'
                      : 'bg-white border-[#cac4d4]/10 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-extrabold text-on-surface select-none max-w-[70%] leading-normal">{play.title}</h4>
                    
                    {/* Status switch */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePlaybookStatus(play.id);
                      }}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold shadow-inner ${
                        play.status === 'Ativo' ? 'bg-[#96f3e1] text-[#003c34]' : 'bg-slate-100 text-outline'
                      }`}
                    >
                      {play.status}
                    </button>
                  </div>
                  <p className="text-[10px] text-outline mt-1 font-semibold line-clamp-2">{play.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Side: Configuration interface */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-white/60 clay-card">
            
            {!isEditing ? (
              <div className="space-y-5">
                <div className="flex justify-between items-start pb-3 border-b border-[#cac4d4]/30">
                  <div>
                    <h2 className="text-lg font-bold text-on-surface font-display leading-tight">{activePlay.title}</h2>
                    <span className="text-[10px] bg-purple-50 text-primary border border-primary/10 px-2 py-0.5 rounded-md font-bold mt-1 inline-block">Gatilho: {activePlay.trigger}</span>
                  </div>

                  <button
                    onClick={handleStartEditing}
                    className="text-primary font-bold text-xs bg-white py-1.5 px-4 rounded-xl border border-outline-variant/30 shadow-sm hover:bg-slate-50 cursor-pointer flex items-center gap-1 leading-none"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">edit</span>
                    Editar Configuração
                  </button>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-1.5">Descrição Operacional</h4>
                  <p className="text-xs font-semibold text-on-surface-variant leading-relaxed bg-[#fdf9f5] border border-outline-variant/30 p-3.5 rounded-2xl shadow-inner">
                    {activePlay.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-outline tracking-wider uppercase mb-1.5">Template de Mensagem Rich Text (WhatsApp)</h4>
                  <p className="text-xs font-mono text-slate-800 leading-relaxed bg-[#f7f3ef] border border-outline-variant/40 p-4 rounded-2xl whitespace-pre-wrap">
                    {activePlay.templateMessage}
                  </p>
                  <div className="flex items-center gap-4 text-[9px] text-[#855316] font-bold mt-1.5 italic justify-end">
                    <span>Tags Suportadas: {"{student_name}"} , {"{course_module}"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl border border-outline-variant/35 bg-slate-50 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#006b5e] font-bold">shield_person</span>
                    <h5 className="text-xs font-extrabold text-on-surface leading-none">Interromper Robô & Chamar Humano?</h5>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase shadow-sm ${
                    activePlay.escalationNeeded ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#e8ddff] text-primary'
                  }`}>
                    {activePlay.escalationNeeded ? 'Sim, Protocolar Alerta Técnico' : 'Não, Atuar Autonomamente'}
                  </span>
                </div>

                {/* Simulador area inside configure view */}
                <div className="pt-4 border-t border-[#cac4d4]/30 space-y-4">
                  <h4 className="text-xs font-bold text-outline uppercase tracking-wider">Simulador de Prévias Com Aluno</h4>
                  
                  <div className="flex gap-4 items-end flex-wrap">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-[10.5px] text-outline font-bold uppercase mb-1.5">Selecionar Aluno Teste</label>
                      <select
                        value={selectedStudentId}
                        onChange={(e) => {
                          setSelectedStudentId(e.target.value);
                          setTestOutcome(null);
                        }}
                        className="w-full bg-[#fdf9f5] border border-[#cac4d4]/50 rounded-xl p-3 text-xs font-extrabold text-on-surface focus:outline-none"
                      >
                        {students.map(st => (
                          <option key={st.id} value={st.id}>{st.name} ({st.module})</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleRunSimulation}
                      disabled={isSimulating}
                      className="clay-button py-3 px-6 rounded-xl text-white font-bold text-xs shadow-md select-none hover:bg-opacity-95 cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <span className="material-symbols-outlined font-bold text-base">smart_toy</span>
                      {isSimulating ? 'Simulando com LLM...' : 'Gerar Prévia Integrada'}
                    </button>
                  </div>

                  {testOutcome && (
                    <div className="p-4 rounded-3xl bg-[#e8ddff]/30 border border-primary-container/20 space-y-2 animate-[fadeIn_0.15s_ease-out]">
                      <div className="flex justify-between items-center bg-[#e8ddff]/30 p-1.5 px-3 rounded-xl border border-primary/10">
                        <span className="text-[9px] font-bold text-primary flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[#006b5e] text-xs font-bold font-mono">sms</span>
                          Prévia do WhatsApp Real para: {testStudent.name}
                        </span>
                        <span className="text-[9px] text-[#006b5e] font-extrabold bg-[#96f3e1] px-1.5 py-0.5 rounded">RAG Sincronizado</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 leading-relaxed italic bg-white p-3 border border-[#cac4d4]/30 rounded-2xl shadow-inner">
                        "{testOutcome}"
                      </p>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <form onSubmit={handleSavePlaybook} className="space-y-4 animate-[fadeIn_0.12s_ease-out]">
                <h3 className="text-sm font-bold font-display text-primary flex items-center gap-1 mb-2">
                  <span className="material-symbols-outlined">edit_note</span>
                  Modificando Propriedades do Playbook
                </h3>

                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Título do Playbook</label>
                  <input
                    required
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Gatilho Associado (Webhook ou Sensor de Humor)</label>
                  <input
                    required
                    type="text"
                    value={editedTrigger}
                    onChange={(e) => setEditedTrigger(e.target.value)}
                    className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Descrição Operacional</label>
                  <textarea
                    required
                    rows={2}
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
                    className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-semibold focus:outline-none leading-relaxed"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Template de Mensagem WhatsApp</label>
                  <textarea
                    required
                    rows={3}
                    value={editedMsg}
                    onChange={(e) => setEditedMsg(e.target.value)}
                    className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-mono font-medium focus:outline-none leading-relaxed"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="escalateCb"
                    checked={editedEscalation}
                    onChange={(e) => setEditedEscalation(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary shadow-inner cursor-pointer"
                  />
                  <label htmlFor="escalateCb" className="text-xs font-extrabold text-slate-800 cursor-pointer select-none">
                    Interromper robô e alertar mentor humano imediatamente
                  </label>
                </div>

                <div className="flex gap-2 border-t border-[#cac4d4]/30 pt-4">
                  <button
                    type="submit"
                    className="bg-primary text-white font-bold text-xs py-2 px-6 rounded-xl shadow-sm cursor-pointer hover:bg-opacity-95"
                  >
                    Salvar Playbook
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="border border-[#cac4d4] text-outline text-xs font-bold py-2 px-6 rounded-xl cursor-pointer hover:bg-slate-50"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
