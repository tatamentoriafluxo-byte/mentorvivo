import React, { useState } from 'react';
import { Student } from '../types';

interface StudentsViewProps {
  students: Student[];
  onAddStudent: (newStudent: Student) => void;
  onSelectStudent: (studentId: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function StudentsView({ students, onAddStudent, onSelectStudent, setActiveTab }: StudentsViewProps) {
  // Filters state
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [riskFilter, setRiskFilter] = useState<string>('All');
  const [phaseFilter, setPhaseFilter] = useState<string>('All');

  // Search local state
  const [searchText, setSearchText] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStatus, setNewStatus] = useState<'Ativo' | 'Silencioso'>('Ativo');
  const [newRisk, setNewRisk] = useState<'Baixo' | 'Médio' | 'Alto'>('Baixo');
  const [newPhase, setNewPhase] = useState<'Thriving' | 'Active' | 'Onboarding'>('Onboarding');
  const [newProfile, setNewProfile] = useState<string>('Visual, Prático');

  const [currentPage, setCurrentPage] = useState(1);

  // Filter Logic
  const filteredStudents = students.filter((student) => {
    // Search match
    if (searchText && !student.name.toLowerCase().includes(searchText.toLowerCase()) && !student.email.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }
    // Status Filter
    if (statusFilter !== 'All' && student.status !== statusFilter) {
      return false;
    }
    // Risk Filter
    if (riskFilter !== 'All' && student.risk !== riskFilter) {
      return false;
    }
    // Phase Filter
    if (phaseFilter !== 'All' && student.phase !== phaseFilter) {
      return false;
    }
    return true;
  });

  // Handle Select student click
  const handleStudentClick = (studentId: string) => {
    onSelectStudent(studentId);
    setActiveTab('student_detail');
  };

  // Submit Modal New Student
  const handleSubmitNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const added: Student = {
      id: `student-${Date.now()}`,
      name: newName,
      email: newEmail,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', // placeholder clay style
      status: newStatus,
      risk: newRisk,
      phase: newPhase,
      module: 'Module 1',
      lastInteraction: 'Just now',
      profileType: newProfile.split(',').map(s => s.trim()),
      currentStatusText: `Registered manually as New Mentorado. Initialized learning profile: ${newProfile}. Needs active followups.`,
      aiMemory: [
        { week: 'Semana 1: Cadastro Inicial', status: 'check', desc: 'Ativado no portal com sucesso!', icon: 'check', color: 'text-emerald-600 bg-emerald-100' }
      ]
    };

    onAddStudent(added);
    setIsModalOpen(false);
    // Reset Form
    setNewName('');
    setNewEmail('');
    setNewStatus('Ativo');
    setNewRisk('Baixo');
    setNewPhase('Onboarding');
    setNewProfile('Visual, Prático');
  };

  const handleClearFilters = () => {
    setStatusFilter('All');
    setRiskFilter('All');
    setPhaseFilter('All');
    setSearchText('');
  };

  return (
    <div className="flex-1 flex flex-col p-6 min-h-screen">
      {/* Top Header */}
      <header className="flex justify-between items-center w-full px-4 py-2 bg-transparent sticky top-0 z-40 backdrop-blur-md">
        <div className="flex-1 flex items-center">
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full bg-white/60 border-none rounded-full py-3 pl-12 pr-4 text-sm font-sans text-on-surface-variant focus:ring-2 focus:ring-primary/25 clay-input-well placeholder:text-outline-variant transition-all font-medium"
              placeholder="Pesquisar mentorados, fase, módulo..."
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="font-extrabold font-display text-primary hidden lg:inline">Mentor Vivo 365</span>
          <div className="flex gap-3">
            <button className="text-on-surface-variant hover:text-primary transition-colors hover:translate-y-[-1px] cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-on-surface-variant hover:text-primary transition-colors hover:translate-y-[-1px] cursor-pointer">
              <span className="material-symbols-outlined">chat_bubble</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <div className="flex-1 px-4 py-8">
        {/* Title Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold font-display text-on-background mb-2">Mentorados</h1>
            <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
              Gerencie seus mentorados ativos e acompanhe a evolução de cada um.
            </p>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-[0_10px_20px_-5px_rgba(103,75,181,0.4)] clay-highlight flex items-center gap-2 hover:translate-y-[-2px] transition-all hover:bg-opacity-95 cursor-pointer active:translate-y-[1px]"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            Novo Mentorado
          </button>
        </div>

        {/* Toolbar & Filters Selector */}
        <div className="bg-[#ffffff] rounded-2xl p-4 flex flex-wrap gap-4 items-center mb-8 clay-card-shadow border border-white/60">
          <div className="flex items-center gap-2 text-outline font-bold text-sm px-2">
            <span className="material-symbols-outlined text-[20px] font-bold">filter_list</span>
            <span>Filtros:</span>
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/30 text-xs font-semibold text-on-surface-variant py-2.5 px-4 rounded-xl focus:ring-1 focus:ring-primary/25 cursor-pointer focus:outline-none"
          >
            <option value="All">Status: Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Silencioso">Silencioso</option>
          </select>

          {/* Risk Dropdown */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/30 text-xs font-semibold text-on-surface-variant py-2.5 px-4 rounded-xl focus:ring-1 focus:ring-primary/25 cursor-pointer focus:outline-none"
          >
            <option value="All">Risco: Todos</option>
            <option value="Baixo">Risco Baixo</option>
            <option value="Médio">Risco Médio</option>
            <option value="Alto">Risco Alto</option>
          </select>

          {/* Phase Dropdown */}
          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/30 text-xs font-semibold text-on-surface-variant py-2.5 px-4 rounded-xl focus:ring-1 focus:ring-primary/25 cursor-pointer focus:outline-none"
          >
            <option value="All">Fase: Todas</option>
            <option value="Thriving">Alta Performance (Thriving)</option>
            <option value="Active">Ativo em Execução (Active)</option>
            <option value="Onboarding">Alinhamento Inicial (Onboarding)</option>
          </select>

          {(statusFilter !== 'All' || riskFilter !== 'All' || phaseFilter !== 'All' || searchText) && (
            <button
              onClick={handleClearFilters}
              className="ml-auto text-primary font-bold text-sm px-3 py-1.5 hover:bg-primary-fixed/40 rounded-xl transition-all cursor-pointer"
            >
              Limpar Filtros
            </button>
          )}
        </div>

        {/* Directory List Container */}
        <div className="flex flex-col gap-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                onClick={() => handleStudentClick(student.id)}
                className="bg-white rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 clay-card-shadow border border-white/85 hover:scale-[1.01] transition-transform duration-200 cursor-pointer group"
              >
                {/* Avatar area container */}
                <div className="relative shrink-0 select-none">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-indigo-50 flex items-center justify-center">
                    <img
                      alt={student.name}
                      className="w-full h-full object-cover"
                      src={student.avatarUrl}
                    />
                  </div>
                  {/* Bottom Ring status dot */}
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-white ${
                      student.status === 'Ativo' ? 'bg-[#006b5e]' : 'bg-[#7a7583]'
                    }`}
                    title={student.status}
                  >
                    <span className="material-symbols-outlined !text-[11px] font-bold">
                      {student.status === 'Ativo' ? 'flash_on' : 'do_not_disturb_on'}
                    </span>
                  </div>
                </div>

                {/* Name Email Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-display text-on-background group-hover:text-primary transition-colors leading-tight">
                    {student.name}
                  </h3>
                  <p className="text-xs font-semibold text-on-surface-variant mt-1">
                    {student.email}
                  </p>
                </div>

                {/* status Badge container */}
                <div className="shrink-0 w-32">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm clay-highlight ${
                      student.status === 'Ativo'
                        ? 'bg-[#96f3e1] text-[#003c34]'
                        : 'bg-surface-variant/75 text-on-surface-variant border border-white/50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px] font-bold">
                      {student.status === 'Ativo' ? 'bolt' : 'do_not_disturb_on'}
                    </span>
                    {student.status}
                  </span>
                </div>

                {/* Risk Level gauge indicator */}
                <div className="shrink-0 w-32 flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-outline">Risco</span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3.5 h-3.5 rounded-full shadow-sm ${
                        student.risk === 'Alto'
                          ? 'bg-error'
                          : student.risk === 'Médio'
                          ? 'bg-secondary'
                          : 'bg-tertiary'
                      }`}
                    ></div>
                    <span
                      className={`text-xs font-bold ${
                        student.risk === 'Alto'
                          ? 'text-error'
                          : student.risk === 'Médio'
                          ? 'text-secondary font-semibold'
                          : 'text-[#006b5e]'
                      }`}
                    >
                      {student.risk}
                    </span>
                  </div>
                </div>

                {/* Journey Phase tracker banner */}
                <div className="shrink-0 w-40 flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-outline">Fase da Jornada</span>
                  <span className="text-xs font-bold text-[#674bb5] font-sans">
                    {student.phase === 'Thriving' ? 'Alta Performance' : student.phase === 'Active' ? 'Ativo em Execução' : 'Alinhamento Inicial'}
                  </span>
                </div>

                {/* Quick actions popup triple dot */}
                <div className="shrink-0 pl-4 border-l border-[#cac4d4]/30 hidden sm:block">
                  <button className="w-10 h-10 rounded-full flex items-center justify-center text-outline hover:bg-surface-container hover:text-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center clay-card-shadow border border-white text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">person_search</span>
              <p className="font-bold">Nenhum mentorado encontrado com os filtros atuais.</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-sm font-bold text-primary underline hover:text-opacity-80 cursor-pointer"
              >
                Limpar Todos os Filtros
              </button>
            </div>
          )}
        </div>

        {/* Pagination Section controls */}
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-xl bg-white text-outline disabled:opacity-50 shadow-sm flex items-center justify-center font-bold hover:bg-surface-container transition-all clay-highlight border border-white/50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>
          
          <button
            onClick={() => setCurrentPage(1)}
            className={`w-10 h-10 rounded-xl shadow-md flex items-center justify-center font-bold text-xs clay-highlight cursor-pointer ${
              currentPage === 1 ? 'bg-primary text-white' : 'bg-white text-on-surface'
            }`}
          >
            1
          </button>
          
          <button
            onClick={() => setCurrentPage(2)}
            className={`w-10 h-10 rounded-xl shadow-sm flex items-center justify-center font-bold text-xs hover:bg-surface-container transition-all clay-highlight border border-white/50 cursor-pointer ${
              currentPage === 2 ? 'bg-primary text-white' : 'bg-white text-[#7a7583]'
            }`}
          >
            2
          </button>
          
          <button
            onClick={() => setCurrentPage(2)}
            disabled={currentPage === 2}
            className="w-10 h-10 rounded-xl bg-white text-outline disabled:opacity-50 shadow-sm flex items-center justify-center font-bold hover:bg-surface-container transition-all clay-highlight border border-white/50 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Corporate Badge Area */}
      <footer className="mt-auto border-t border-outline-variant/30 pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-outline text-center gap-4">
        <div className="font-display font-extrabold text-secondary text-sm">
          Mentor Vivo 365
        </div>
        <div>
          <span>© 2026 Mentor Vivo 365. Parceria Híbrida Inteligente.</span>
        </div>
      </footer>

      {/* Novo Mentorado Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl relative border border-white/50 clay-card-shadow animate-[scaleUp_0.2s_ease-out]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-outline hover:text-on-surface cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h2 className="text-2xl font-bold font-display text-primary mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person_add</span>
              Novo Mentorado
            </h2>
            <p className="text-xs font-medium text-on-surface-variant mb-6">
              Registre um novo aluno na plataforma de acompanhamento híbrido.
            </p>

            <form onSubmit={handleSubmitNewStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-outline-dark mb-1.5 uppercase tracking-wider">
                  Nome Completo
                </label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="ex: João Ricardo Pereira"
                  className="w-full bg-[#fdf9f5] border border-outline-variant/50 rounded-xl py-3 px-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-outline-dark mb-1.5 uppercase tracking-wider">
                  Endereço de E-mail
                </label>
                <input
                  required
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="ex: joao.p@example.com"
                  className="w-full bg-[#fdf9f5] border border-outline-variant/50 rounded-xl py-3 px-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-outline-dark mb-1.5 uppercase tracking-wider">
                    Risco de Evasão
                  </label>
                  <select
                    value={newRisk}
                    onChange={(e: any) => setNewRisk(e.target.value)}
                    className="w-full bg-[#fdf9f5] border border-outline-variant/50 rounded-xl py-3 px-3 text-xs font-sans font-semibold focus:outline-none focus:ring-2 focus:ring-primary/25"
                  >
                    <option value="Baixo">Baixo</option>
                    <option value="Médio">Médio</option>
                    <option value="Alto">Alto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-outline-dark mb-1.5 uppercase tracking-wider">
                    Fase da Jornada
                  </label>
                  <select
                    value={newPhase}
                    onChange={(e: any) => setNewPhase(e.target.value)}
                    className="w-full bg-[#fdf9f5] border border-outline-variant/50 rounded-xl py-3 px-3 text-xs font-sans font-semibold focus:outline-none focus:ring-2 focus:ring-primary/25"
                  >
                    <option value="Onboarding">Alinhamento Inicial (Onboarding)</option>
                    <option value="Active">Ativo em Execução (Active)</option>
                    <option value="Thriving">Alta Performance (Thriving)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-outline-dark mb-1.5 uppercase tracking-wider">
                  Perfil de Aprendizagem
                </label>
                <input
                  required
                  type="text"
                  value={newProfile}
                  onChange={(e) => setNewProfile(e.target.value)}
                  placeholder="ex: Visual, Prático"
                  className="w-full bg-[#fdf9f5] border border-outline-variant/50 rounded-xl py-3 px-4 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/25"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-outline hover:bg-surface-container transition-all text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs clay-highlight hover:bg-opacity-90 transition-all shadow-md cursor-pointer"
                >
                  Confirmar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
