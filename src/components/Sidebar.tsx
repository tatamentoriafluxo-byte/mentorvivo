import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Painel Geral', icon: 'dashboard' },
    { id: 'mentoring', label: 'Chat de Mentoria', icon: 'forum' },
    { id: 'students', label: 'Estudantes', icon: 'group' },
    { id: 'meetings', label: 'Reuniões WhisperX', icon: 'record_voice_over' },
    { id: 'contents', label: 'RAG Geral', icon: 'book_4' },
    { id: 'automations', label: 'Studio de Fluxos', icon: 'account_tree' },
    { id: 'playbooks', label: 'Playbooks Ativos', icon: 'auto_stories' },
    { id: 'analytics', label: 'Análise & Métricas', icon: 'insights' },
    { id: 'admin', label: 'Painel Super Admin', icon: 'shield_person' },
    { id: 'settings', label: 'Configurações', icon: 'settings' },
  ];

  return (
    <aside className="w-64 max-h-[calc(100vh-2rem)] sticky top-4 rounded-r-3xl my-4 ml-4 shadow-[30px_0_30px_-5px__rgba(103,75,181,0.12)] bg-[#674bb5] font-sans text-white z-50 flex flex-col py-6 ring-inset ring-2 ring-white/10 shrink-0">
      {/* Brand & User Profile */}
      <div className="px-6 pb-6 flex flex-col items-center border-b border-white/10 mb-4 text-center">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 mb-3 shadow-lg bg-indigo-100 flex items-center justify-center">
          <img
            alt="Mentor Profile Avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2Y9JSm_omu9sLn4k2soDNgEivOJuQ8pApQqyqrWSHMR-7sd5Tc68QKWD8UHbYEg-kgxEFyEFRHjk5xlZz6at1-C_07eefl4io21fYzGhd5mqiNK64qz_4p5YWTRwhevnI7tooaAV8VUMgNy-10ze3AScUGlkJGSpifyLiK6q5jyYTbhlEcK3JHdEq9RmoV4txYfym9XCJ6QzQn3sBAt_WVNM-94wIWwsuusmk58pAswIfIfen-nafXi0Xs0rB_dB-zSmbPkzBZ7w"
          />
        </div>
        <h1 className="text-xl font-bold font-display tracking-tight text-white leading-tight">
          Mentor Vivo 365
        </h1>
        <p className="text-xs font-medium text-purple-200/80 mt-0.5">
          Parceria Intelectual de IA
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-1.5 px-3 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-3 rounded-2xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-white/25 shadow-[inset_2px_2px_5px_rgba(255,255,255,0.3)] font-semibold text-white scale-98 hover:bg-white/30'
                  : 'text-purple-100 hover:text-white hover:bg-white/10 hover:translate-x-1'
              }`}
            >
              <span className="material-symbols-outlined mr-3 text-xl font-normal !leading-none">
                {item.icon}
              </span>
              <span className="text-sm font-medium tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Upgrade CTA Card */}
      <div className="px-4 mt-auto mb-2">
        <div className="bg-gradient-to-br from-[#ffbc76] to-[#ffdcbd] p-4 rounded-3xl shadow-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-15 transform translate-x-3 -translate-y-3 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-5xl text-[#79490b]">
              workspace_premium
            </span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-sm text-[#79490b]">
                stars
              </span>
              <h3 className="text-xs font-bold text-[#79490b] uppercase tracking-wider">
                Mentor Pro
              </h3>
            </div>
            <p className="text-[11px] font-semibold text-[#79490b]/80 mb-2.5">
              Libere ferramentas avançadas de IA
            </p>
            <button className="w-full bg-[#79490b] text-white font-bold text-xs py-2 px-3 rounded-2xl shadow-sm hover:translate-y-[-1px] transition-transform cursor-pointer">
              Atualizar para o Pro
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-3 border-t border-white/10 pt-3">
        <button className="w-full text-purple-100 hover:text-white flex items-center p-2.5 rounded-xl transition-all hover:bg-white/10 cursor-pointer text-left">
          <span className="material-symbols-outlined mr-3 text-lg">help</span>
          <span className="text-xs font-semibold">Central de Ajuda</span>
        </button>
      </div>
    </aside>
  );
}
