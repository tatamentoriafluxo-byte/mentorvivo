import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import MentoringView from './components/MentoringView';
import StudentsView from './components/StudentsView';
import AutomationsView from './components/AutomationsView';
import StudentDetailView from './components/StudentDetailView';
import ContentsView from './components/ContentsView';
import MeetingsView from './components/MeetingsView';
import PlaybooksView from './components/PlaybooksView';
import AdminView from './components/AdminView';
import WhatsAppSetup from './components/WhatsAppSetup';
import { INITIAL_STUDENTS } from './data';
import { Student } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [settingsSubTab, setSettingsSubTab] = useState<'whatsapp' | 'general'>('whatsapp');
  
  // Default to Lucas Silva focus student
  const [selectedStudentId, setSelectedStudentId] = useState<string>('student-lucas-silva');

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const handleSelectStudent = (id: string) => {
    setSelectedStudentId(id);
  };

  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  return (
    <div className="flex bg-[#fdf9f5] min-h-screen text-[#1c1c19] overflow-x-hidden font-sans">
      {/* Shared Purple Claymorphic Sidebar Nav */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Pane viewport */}
      <main className="flex-1 min-h-screen flex flex-col overflow-y-auto max-w-full lg:max-w-[calc(100%-16rem)]">
        {activeTab === 'dashboard' && (
          <DashboardView
            students={students}
            onSelectStudent={handleSelectStudent}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'mentoring' && (
          <MentoringView
            selectedStudent={selectedStudent}
            students={students}
            onSelectStudent={handleSelectStudent}
          />
        )}

        {activeTab === 'students' && (
          <StudentsView
            students={students}
            onAddStudent={handleAddStudent}
            onSelectStudent={handleSelectStudent}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'student_detail' && (
          <StudentDetailView
            student={selectedStudent}
            allStudents={students}
            onBack={() => setActiveTab('students')}
            onUpdateStudent={(updated) => {
              setStudents((current) => current.map((s) => (s.id === updated.id ? updated : s)));
            }}
          />
        )}

        {activeTab === 'meetings' && <MeetingsView />}

        {activeTab === 'contents' && <ContentsView />}

        {activeTab === 'automations' && <AutomationsView />}

        {activeTab === 'playbooks' && <PlaybooksView />}

        {activeTab === 'admin' && <AdminView />}

        {activeTab === 'analytics' && (
          <div className="flex-1 flex flex-col p-6 min-h-screen">
            <header className="flex justify-between items-center w-full px-4 py-2 mb-6">
              <h1 className="text-2xl font-extrabold font-display text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-3xl font-bold">insights</span>
                Análise & Métricas
              </h1>
              <span className="text-xs font-bold text-primary bg-[#e8ddff] px-3.5 py-1.5 rounded-full shadow-inner">
                Período: Últimos 30 Dias
              </span>
            </header>

            <div className="flex-1 max-w-7xl mx-auto w-full space-y-8 pb-12">
              {/* Analytics Top Highlight Banner */}
              <div className="clay-card-primary p-6 shadow-md flex items-center justify-between text-on-primary-container relative overflow-hidden">
                <div className="relative z-10 shrink-0">
                  <span className="text-xs font-bold bg-white/40 px-3 py-1 rounded-full uppercase tracking-wider">
                    Índice de Sucesso
                  </span>
                  <h2 className="text-2xl font-bold font-display mt-2">
                    94.2% de Prevenção de Evasão
                  </h2>
                  <p className="text-xs font-medium text-on-primary-container/80 mt-1 max-w-md">
                    O acompanhamento híbrido com suporte em tempo real reengajou 142 estudantes este mês que estavam com risco de abandono.
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-3xl font-extrabold">auto_graph</span>
                </div>
              </div>

              {/* Bento plots panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sentiment trends */}
                <div className="clay-card p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-display text-on-background mb-4">
                      Proporção de Análise de Sentimento
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mb-6 leading-relaxed">
                      Distribuição dos logs de detecção cognitiva de sentimentos dos alunos de forma automática em chats ativos.
                    </p>
                    
                    <div className="space-y-4">
                      {/* Happy */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-on-background mb-1">
                          <span>Motivados (Engajados)</span>
                          <span className="text-[#006b5e]">65%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-tertiary rounded-full shadow" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      
                      {/* Neutral */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-on-background mb-1">
                          <span>Neutros / Focados</span>
                          <span className="text-secondary">20%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner font-bold">
                          <div className="h-full bg-secondary rounded-full shadow" style={{ width: '20%' }}></div>
                        </div>
                      </div>

                      {/* Warning */}
                      <div>
                        <div className="flex justify-between text-xs font-bold text-on-background mb-1">
                          <span>Frustrados / Risco de Evasão</span>
                          <span className="text-error">15%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-error rounded-full shadow" style={{ width: '15%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-outline font-bold mt-6 text-center">
                    Análise em tempo real processada por algoritmos de classificação de IA do Gemini
                  </p>
                </div>

                {/* Prevention chart mockup */}
                <div className="clay-card p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-display text-on-background mb-4">
                      Evolução Temporal de Intervenções
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mb-6 leading-relaxed">
                      Contagem semanal de intervenções recomendadas de IA versus intervenções manuais aceitas pelo mentor.
                    </p>

                    <div className="flex items-end h-[160px] gap-4 justify-between px-2 pt-4">
                      {/* Week 1 */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-4 bg-primary rounded-t-full shadow" style={{ height: '40%' }}></div>
                        <div className="w-4 bg-tertiary rounded-t-full shadow" style={{ height: '30%' }}></div>
                        <span className="text-[9px] font-bold text-outline">Sem 1</span>
                      </div>

                      {/* Week 2 */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-4 bg-primary rounded-t-full shadow" style={{ height: '65%' }}></div>
                        <div className="w-4 bg-tertiary rounded-t-full shadow" style={{ height: '50%' }}></div>
                        <span className="text-[9px] font-bold text-outline">Sem 2</span>
                      </div>

                      {/* Week 3 */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-4 bg-primary rounded-t-full shadow" style={{ height: '80%' }}></div>
                        <div className="w-4 bg-tertiary rounded-t-full shadow" style={{ height: '70%' }}></div>
                        <span className="text-[9px] font-bold text-outline">Sem 3</span>
                      </div>

                      {/* Week 4 */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <div className="w-4 bg-primary rounded-t-full shadow" style={{ height: '95%' }}></div>
                        <div className="w-4 bg-tertiary rounded-t-full shadow" style={{ height: '90%' }}></div>
                        <span className="text-[9px] font-bold text-outline">Sem 4</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-center mt-6 text-[10px] font-bold text-outline uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
                      <span>Automatizadas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-tertiary shadow-sm"></div>
                      <span>Interação Manual</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="mt-auto border-t border-outline-variant/30 pt-6 text-center text-xs font-semibold text-outline">
              © 2026 Mentor Vivo 365. Todos os direitos reservados.
            </footer>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 flex flex-col p-6 min-h-screen">
            <header className="flex justify-between items-center w-full px-4 py-2 mb-4">
              <div>
                <h1 className="text-2xl font-extrabold font-display text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-3xl font-bold">settings</span>
                  Configurações do Admin Cliente
                </h1>
                <p className="text-xs font-semibold text-outline mt-0.5">Gerenciamento de integrações, regras de inteligência de canal e chaves cognitivas</p>
              </div>
            </header>

            {/* Nested Sub-Tabs Bar */}
            <div className="flex gap-2 border-b border-[#cac4d4]/30 pb-3 mb-6 max-w-5xl mx-auto w-full">
              <button
                onClick={() => setSettingsSubTab('whatsapp')}
                className={`py-2 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                  settingsSubTab === 'whatsapp'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-outline hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-sm font-bold">qr_code_2</span>
                1. Conexão WhatsApp (Evolution API)
              </button>
              <button
                onClick={() => setSettingsSubTab('general')}
                className={`py-2 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 ${
                  settingsSubTab === 'general'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-outline hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-sm font-bold font-display">settings_suggest</span>
                2. Parâmetros & Chaves de IA
              </button>
            </div>

            <div className="flex-1 max-w-5xl mx-auto w-full space-y-6 pb-12">
              {settingsSubTab === 'whatsapp' ? (
                <WhatsAppSetup />
              ) : (
                <div className="clay-card p-6 space-y-6 max-w-3xl">
                  <div className="pb-4 border-b border-[#cac4d4]/30">
                    <h3 className="text-base font-bold font-display text-on-surface">Configurações de IA Integradas</h3>
                    <p className="text-xs text-on-surface-variant mt-0.5 font-medium">
                      Configure os gatilhos e alertas de suporte baseados na escalada emocional do aluno.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Option 1 */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Protocolo de Alerta Automático</h4>
                        <p className="text-xs text-on-surface-variant font-medium">
                          Notificar imediatamente o mentor por e-mail quando for detectado sentimento de "Frustração".
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    {/* Option 2 */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#cac4d4]/20">
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">Sugestão de Conteúdo Adaptativa</h4>
                        <p className="text-xs text-on-surface-variant font-medium">
                          Enviar pílulas em formatos visuais (vídeo/infográfico) automaticamente para destravar exercícios de lógica.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    {/* API Key placeholder indicator securely */}
                    <div className="pt-4 border-t border-[#cac4d4]/20">
                      <label className="block text-xs font-bold text-outline-dark mb-1.5 uppercase tracking-wider">
                        Setup da Chave API do Gemini
                      </label>
                      <div className="bg-[#fdf9f5] border border-outline-variant/50 rounded-xl p-3 text-xs font-mono text-[#494552] flex justify-between items-center bg-current/5 shadow-inner leading-relaxed">
                        <span>GEMINI_API_KEY=• • • • • • • • • • • • • • • • •</span>
                        <span className="text-primary font-bold text-[10px] uppercase font-sans border border-primary/20 px-2 py-0.5 rounded-lg">
                          Pré-configurado nos Segredos
                        </span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant font-medium mt-1.5 leading-relaxed">
                        As chaves de API são armazenadas com segurança. Você pode gerenciá-las a qualquer momento na aba de segredos do Google AI Studio.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <footer className="mt-auto border-t border-outline-variant/30 pt-6 text-center text-xs font-semibold text-outline">
              © 2026 Mentor Vivo 365. Parceria Híbrida Inteligente.
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}
