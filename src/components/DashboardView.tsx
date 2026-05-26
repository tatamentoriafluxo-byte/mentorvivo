import React, { useState } from 'react';
import { Student } from '../types';

interface DashboardViewProps {
  students: Student[];
  onSelectStudent: (studentId: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function DashboardView({ students, onSelectStudent, setActiveTab }: DashboardViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle clicking student from "Attention Needed"
  const handleAttentionClick = (studentId: string) => {
    onSelectStudent(studentId);
    setActiveTab('student_detail');
  };

  return (
    <div className="flex-1 flex flex-col p-6 min-h-screen">
      {/* TopNavBar */}
      <header className="flex justify-between items-center w-full px-4 py-2 bg-transparent sticky top-0 z-40 backdrop-blur-md">
        {/* Left: Brand Name */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold font-display text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">hub</span>
            Painel Geral
          </h1>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            className="w-full clay-input-well rounded-full py-2.5 pl-12 pr-4 font-sans text-sm text-on-surface placeholder:text-outline/70 focus:outline-none"
            placeholder="Pesquisar estudantes, cursos ou métricas..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="p-3 rounded-full clay-chip text-primary hover:bg-[#primary-fixed] transition-all relative hover:-translate-y-0.5 cursor-pointer">
            <span className="material-symbols-outlined text-xl font-bold">notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full border-2 border-white"></span>
          </button>
          
          <button className="p-3 rounded-full clay-chip text-primary hover:bg-[#primary-fixed] transition-all hover:-translate-y-0.5 cursor-pointer">
            <span className="material-symbols-outlined text-xl font-bold">chat_bubble</span>
          </button>

          <div
            onClick={() => setActiveTab('students')}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container shadow-md ml-2 hover:scale-105 transition-all cursor-pointer bg-purple-100"
          >
            <img
              alt="User profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz3mCEkQBpqTBCnoZEM5r9HzqCx9bqF5dpslV5nhvk6el3A7GM6MPRb94lCRIcRUzHg1JXHGmwkuqC4imgEPyaXuSwkJAgvRgn4MepXKVeaWfgYLdXdL4zUTJwbgjWCLITuKL5bJtmgM37TtqS-SkyGpxRHp6zcFwLWfVzlNSioNbW8TfPzgBjnBJ6wSVskIBZFAHLgf4ntaorZbTKz5q3s8L4-H5FGsrYUtHAlxojz2rmwAk3Z1PfxYWKgKzggBWVhDZnT-8vId0"
            />
          </div>
        </div>
      </header>

      {/* Dashboard Body Content */}
      <div className="flex-1 flex flex-col gap-8 max-w-7xl mx-auto w-full mt-6">
        {/* Welcome Hero Banner */}
        <section className="hero-bg p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/40 rounded-full text-on-primary-container font-sans text-xs font-semibold mb-4 backdrop-blur-sm border border-white/50">
              <span className="material-symbols-outlined text-sm">wb_sunny</span>
              <span>Momento de Foco Diário</span>
            </div>
            
            <h2 className="text-3xl font-bold font-display text-on-primary-container mb-2">
              Bom dia, Mentor(a)!
            </h2>
            <p className="text-sm text-on-primary-container/80 mb-6 max-w-md leading-relaxed">
              Você possui alunos que necessitam de atenção direta hoje. Vamos fazer a diferença e ajudá-los a sair da inércia.
            </p>
            
            <button
              onClick={() => handleAttentionClick('student-lucas-silva')}
              className="clay-button transform hover:scale-103 duration-150 text-white font-semibold text-sm py-3 px-6 rounded-2xl flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">play_arrow</span>
              Revisar Mentoria de Lucas
            </button>
          </div>

          <div className="w-full md:w-1/3 max-w-[240px] aspect-square relative z-10">
            {/* claymorphic plant and mug illustration */}
            <img
              alt="3D Clay Illustration Office Layout"
              className="w-full h-full object-cover rounded-3xl shadow-xl border-4 border-white/50"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXgbAf_31DeRIoIpltYhGdBMG_KkyGcts_iKYtLq6SC7XgesQBwM1DG65PFnM1wsa02k3CmYDTWVIV_FMUR49bduOLBYlQwa1NGKp0FLw3KWA65X1Iumv7VR0hRD769MH16VU-h9fxPo_zB10yvWnMsExiWIiotFBGIrIrplZi_4h13OH_RboEfauWbF_K0XGKbTEe3V4_R8MZnKTvWEaBotm38ywJD7e5E480UkFtKLiA2JOS1PXEEfhEG-8_nnSqTDGTzHylFwU"
            />
          </div>
        </section>

        {/* Bento Metrics Cards Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Metric 1 */}
          <div className="clay-card-primary p-5 flex flex-col justify-between min-h-[160px] relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-white/40 flex items-center justify-center text-primary mb-3 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6)]">
              <span className="material-symbols-outlined font-bold">group</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-on-primary-container/70 mb-0.5">Total de Alunos</p>
              <h3 className="text-3xl font-extrabold font-display text-on-primary-container leading-none">1.248</h3>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <span className="material-symbols-outlined text-[#006b5e] text-sm font-bold">trending_up</span>
              <span className="text-xs font-semibold text-[#006b5e]">+12 esta semana</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="clay-card-tertiary p-5 flex flex-col justify-between min-h-[160px] relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-white/40 flex items-center justify-center text-[#006b5e] mb-3 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6)]">
              <span className="material-symbols-outlined font-bold">task_alt</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-on-tertiary-container/70 mb-0.5">Taxa de Execução</p>
              <h3 className="text-3xl font-extrabold font-display text-on-tertiary-container leading-none">84.5%</h3>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <span className="material-symbols-outlined text-[#006b5e] text-sm font-bold">trending_up</span>
              <span className="text-xs font-semibold text-[#006b5e]">+2.4% vs mês ant.</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="clay-card-secondary p-5 flex flex-col justify-between min-h-[160px] relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-white/40 flex items-center justify-center text-secondary mb-3 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6)]">
              <span className="material-symbols-outlined font-bold text-secondary">smart_toy</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-on-secondary-container/70 mb-0.5">Custo de IA</p>
              <h3 className="text-3xl font-extrabold font-display text-on-secondary-container leading-none">$34.60</h3>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <span className="material-symbols-outlined text-on-secondary-container text-xs font-semibold">info</span>
              <span className="text-xs font-semibold text-on-secondary-container opacity-85">Margem Esperada</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="clay-card-error p-5 flex flex-col justify-between min-h-[160px] relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-white/40 flex items-center justify-center text-error mb-3 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)]">
              <span className="material-symbols-outlined font-bold">warning</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-on-error-container/70 mb-0.5">Estudantes em Risco</p>
              <h3 className="text-3xl font-extrabold font-display text-on-error-container leading-none">7</h3>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <span className="material-symbols-outlined text-error text-sm font-bold">trending_down</span>
              <span className="text-xs font-semibold text-error">-2 desde ontem</span>
            </div>
          </div>
        </section>

        {/* Dual Panels Area */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          {/* Left Column: Attention Needed */}
          <div className="clay-card p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold font-display text-on-background flex items-center gap-2">
                  <span className="material-symbols-outlined text-error">priority_high</span>
                  Atenção Necessária
                </h3>
                <span className="text-xs font-bold text-primary bg-primary-fixed/50 px-3 py-1 rounded-full">
                  3 Casos Escalados
                </span>
              </div>

              <div className="flex flex-col gap-3.5">
                {/* Lucas Silva */}
                <div
                  onClick={() => handleAttentionClick('student-lucas-silva')}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fdf9f5] hover:bg-surface-container-high transition-all group cursor-pointer border border-transparent hover:border-outline-variant/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow bg-purple-100 flex-shrink-0">
                      <img
                        alt="Lucas Silva profile"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmDn_REfprF9qJTa4KdlHC9-bEeYNLUg2F-hmXrD_01k5ITEsi50WPV5Gx0OK8w1gVNrfrB8ECw7aVM5zEoJh0-VtY1R8QZwKGCo8BdNiCkfeVkzMzJ73Jf3Pk_7urox0A6bnT2nYJnr50mZ1j32mMgaD0ffG5HfDc3q1aRdm1pN-J8Njbbwo2Ft9igWVvjLPZLB6qDyWLleBial_razwXA4XVGSTYFNwNCFJ-LMbuZ2dRjxL6OnnKZ6X4EmfITptZI_Ps47n00wQ"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">Lucas Silva</h4>
                      <p className="text-xs text-on-surface-variant font-medium">Módulo 4 • Inativo há 5 dias</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-error-container text-on-error-container text-[10px] uppercase font-bold tracking-wider">
                      Crítico
                    </span>
                    <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-150">
                      <span className="material-symbols-outlined text-sm font-extrabold">arrow_forward</span>
                    </button>
                  </div>
                </div>

                {/* Mariana Costa */}
                <div
                  onClick={() => handleAttentionClick('student-mariana-costa')}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fdf9f5] hover:bg-surface-container-high transition-all group cursor-pointer border border-transparent hover:border-outline-variant/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow bg-purple-100 flex-shrink-0">
                      <img
                        alt="Mariana Costa profile"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfKe5vbS9cqEhVXDmBqc29iNDKFHA0kB4hBjKXvKRMEn6DxHXM8Hq6O0DSzKw_61QXX26gIUOZr_BC8VOUkjUXOGhSkoVuUppG_NUtlJi_qWtbFuI6yLOiBlGp0lsmLIlZJqXLWoFpqVJ0IyDpP5Gtja8AZ7UYrjxeEv7MmUKfZE7hDFpmLvy00KZL96MCN-AO3zXZEhzZNtFt2Wv_UXy8BeVo3RRzPuTJtMS6uohaBKj93_91JCs1SXe4f92KIf4axK5nmHNxXrM"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">Mariana Costa</h4>
                      <p className="text-xs text-on-surface-variant font-medium">Módulo 2 • Baixo desempenho no Quiz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold tracking-wider">
                      Alto
                    </span>
                    <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-150">
                      <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                    </button>
                  </div>
                </div>

                {/* João Pedro */}
                <div
                  onClick={() => handleAttentionClick('student-beatriz-silva')} // Redirect to Beatriz if needed or standard
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fdf9f5] hover:bg-surface-container-high transition-all group cursor-pointer border border-transparent hover:border-outline-variant/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow bg-purple-100 flex items-center justify-center font-bold text-[#674bb5] text-sm font-display flex-shrink-0">
                      JP
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">João Pedro</h4>
                      <p className="text-xs text-on-surface-variant font-medium">Integração • Sem commits de código</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-secondary-container text-on-secondary-container text-[10px] uppercase font-bold tracking-wider">
                      Alto
                    </span>
                    <button className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-150">
                      <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('students')}
              className="mt-6 w-full py-3.5 rounded-2xl border-2 border-dashed border-outline-variant text-primary font-bold text-sm hover:bg-primary/5 transition-all text-center cursor-pointer"
            >
              Ver Diretório Completo de Alunos
            </button>
          </div>

          {/* Right Column: AI Insight & Activities Timeline */}
          <div className="flex flex-col gap-6">
            {/* Quick AI Insight card */}
            <div className="clay-card-tertiary p-6 relative overflow-hidden group cursor-pointer">
              <div className="absolute right-0 bottom-0 opacity-15 transform translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-8xl text-tertiary font-bold">
                  auto_awesome
                </span>
              </div>
              
              <div className="relative z-10 flex flex-col justify-between h-full gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/40 rounded-full text-tertiary font-bold text-[10px] uppercase tracking-wider mb-2">
                    <span className="material-symbols-outlined text-sm">psychology</span>
                    <span>Insight da IA</span>
                  </div>
                  
                  <h3 className="text-lg font-bold font-display text-on-tertiary-container mb-1.5">
                    Pico de Engajamento
                  </h3>
                  <p className="text-xs font-medium text-on-tertiary-container/80 leading-relaxed">
                    O novo módulo interactivo visual de Arrays aumentou o tempo diário de interação dos alunos em 15%. Recomendamos enviar este material como sugestão para os alunos estagnados.
                  </p>
                </div>
                
                <button className="bg-white/90 hover:bg-white text-tertiary font-bold text-xs py-2 px-4 rounded-xl shadow-sm self-start transition-all">
                  Rascunhar Enquete de Turma
                </button>
              </div>
            </div>

            {/* Recent messages Timeline Feed */}
            <div className="clay-card p-6 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-bold font-display text-on-background mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#855316]">chat</span>
                  Entrada de Contatos (Escuta Ativa)
                </h3>

                <div className="flex flex-col gap-5 relative">
                  {/* Vertical line indicator */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-[#ebe7e4] rounded-full"></div>

                  <div className="flex gap-4 relative z-10 group">
                    <div className="w-10 h-10 rounded-full bg-[#ffdcbd] flex items-center justify-center shrink-0 border-4 border-white shadow-sm z-10">
                      <span className="material-symbols-outlined text-[#855316] text-sm">chat</span>
                    </div>
                    
                    <div className="bg-[#fdf9f5] p-3.5 rounded-2xl rounded-tl-none border border-outline-variant/20 shadow-sm flex-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs font-bold text-on-surface">Ana P.</span>
                        <span className="text-[10px] font-bold text-outline">10 min atrás</span>
                      </div>
                      <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                        "Professor, fiquei com dúvida na lógica do exercício 3 de Arrays. Pode me enviar uma dica?"
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 relative z-10 group">
                    <div className="w-10 h-10 rounded-full bg-[#e8ddff] flex items-center justify-center shrink-0 border-4 border-white shadow-sm z-10">
                      <span className="material-symbols-outlined text-primary text-sm">forum</span>
                    </div>
                    
                    <div className="bg-[#fdf9f5] p-3.5 rounded-2xl rounded-tl-none border border-outline-variant/20 shadow-sm flex-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs font-bold text-on-surface">Carlos M.</span>
                        <span className="text-[10px] font-bold text-outline">1 hora atrás</span>
                      </div>
                      <p className="text-xs font-medium text-on-surface-variant leading-relaxed">
                        "Muito obrigado pelo feedback do projeto final! Entendi perfeitamente os pontos de melhoria que você marcou."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-[10px] text-outline font-medium mt-6">
                Última verificação: Agora mesmo • Sincronizado
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Corporate Credit Footer */}
      <footer className="mt-auto border-t border-outline-variant/30 pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-semibold text-outline text-center gap-4">
        <div>
          <span>© 2026 Mentor Vivo 365. Parceria Humano-IA.</span>
        </div>
        <div className="flex gap-4">
          <a className="hover:text-primary underline cursor-pointer">Política de Privacidade</a>
          <a className="hover:text-primary underline cursor-pointer">Termos de Serviço</a>
          <a className="hover:text-primary underline cursor-pointer">Suporte Técnico</a>
        </div>
      </footer>
    </div>
  );
}
