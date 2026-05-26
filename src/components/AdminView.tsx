import React, { useState } from 'react';

interface Tenant {
  id: string;
  name: string;
  ownerName: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  status: 'Ativo' | 'Suspenso';
  studentsCount: number;
  studentsLimit: number;
  tokensConsumed: number;
  tokensLimit: number;
  monthlyRevenue: number;
  dateCreated: string;
}

export default function AdminView() {
  const [tenants, setTenants] = useState<Tenant[]>([
    {
      id: 'tenant-1',
      name: 'Full Stack Academy 365',
      ownerName: 'Lucas Silva',
      plan: 'Pro',
      status: 'Ativo',
      studentsCount: 142,
      studentsLimit: 250,
      tokensConsumed: 12400000,
      tokensLimit: 20000000,
      monthlyRevenue: 2490,
      dateCreated: '12 Jan 2026'
    },
    {
      id: 'tenant-2',
      name: 'Copywriting Mastery Mentoring',
      ownerName: 'Mariana Costa',
      plan: 'Enterprise',
      status: 'Ativo',
      studentsCount: 450,
      studentsLimit: 1000,
      tokensConsumed: 45800000,
      tokensLimit: 80000000,
      monthlyRevenue: 5990,
      dateCreated: '04 Fev 2026'
    },
    {
      id: 'tenant-3',
      name: 'DevOps Mentoring Space',
      ownerName: 'Thiago Martins',
      plan: 'Basic',
      status: 'Ativo',
      studentsCount: 38,
      studentsLimit: 50,
      tokensConsumed: 4200000,
      tokensLimit: 10000000,
      monthlyRevenue: 890,
      dateCreated: '20 Mar 2026'
    },
    {
      id: 'tenant-4',
      name: 'Design UX/UI Mentor Premium',
      ownerName: 'Roberta Dias',
      plan: 'Basic',
      status: 'Suspenso',
      studentsCount: 12,
      studentsLimit: 50,
      tokensConsumed: 1400000,
      tokensLimit: 10000000,
      monthlyRevenue: 0,
      dateCreated: '02 Abr 2026'
    }
  ]);

  const [activeTenantId, setActiveTenantId] = useState<string | null>('tenant-1');
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields
  const [editPlan, setEditPlan] = useState<'Basic' | 'Pro' | 'Enterprise'>('Pro');
  const [editStudentsLimit, setEditStudentsLimit] = useState(250);
  const [editTokensLimit, setEditTokensLimit] = useState(20000000);
  const [editStatus, setEditStatus] = useState<'Ativo' | 'Suspenso'>('Ativo');

  const activeTenant = tenants.find(t => t.id === activeTenantId) || tenants[0];

  const handleStartEditing = () => {
    setEditPlan(activeTenant.plan);
    setEditStudentsLimit(activeTenant.studentsLimit);
    setEditTokensLimit(activeTenant.tokensLimit);
    setEditStatus(activeTenant.status);
    setIsEditing(true);
  };

  const handleSaveTenant = (e: React.FormEvent) => {
    e.preventDefault();
    setTenants(prev => prev.map(t => {
      if (t.id === activeTenant.id) {
        return {
          ...t,
          plan: editPlan,
          studentsLimit: editStudentsLimit,
          tokensLimit: editTokensLimit,
          status: editStatus,
          monthlyRevenue: editPlan === 'Basic' ? 890 : editPlan === 'Pro' ? 2490 : 5990
        };
      }
      return t;
    }));
    setIsEditing(false);
  };

  return (
    <div className="flex-1 flex flex-col p-6 min-h-screen">
      <header className="flex justify-between items-center w-full px-4 py-2 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-[#855316] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#855316] text-3xl font-bold">shield_person</span>
            Painel Super Admin SaaS
          </h1>
          <p className="text-xs font-semibold text-outline mt-0.5">Gestão Global de Tenants, faturamento de assinaturas e cotas de infraestrutura</p>
        </div>

        <span className="text-xs font-extrabold text-[#855316] bg-[#ffdcbd] px-4 py-1.5 rounded-full shadow-inner border border-[#ffbc76]/30">
          Cargo: Super Admin Geral
        </span>
      </header>

      {/* Global Platforms Metrics widgets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 w-full max-w-7xl mx-auto">
        
        <div className="clay-card p-5 flex items-center gap-4 border border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[#855316] shadow-inner">
            <span className="material-symbols-outlined text-2xl font-bold">corporate_fare</span>
          </div>
          <div>
            <span className="text-[10px] text-outline font-bold uppercase tracking-wider">Academias (Tenants)</span>
            <h3 className="text-xl font-extrabold text-on-surface leading-none mt-1">{tenants.length}</h3>
          </div>
        </div>

        <div className="clay-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-primary shadow-inner">
            <span className="material-symbols-outlined text-2xl font-bold font-display">group</span>
          </div>
          <div>
            <span className="text-[10px] text-outline font-bold uppercase tracking-wider">Total Estudantes SaaS</span>
            <h3 className="text-xl font-extrabold text-on-surface leading-none mt-1">
              {tenants.reduce((sum, current) => sum + current.studentsCount, 0)}
            </h3>
          </div>
        </div>

        <div className="clay-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-tertiary shadow-inner">
            <span className="material-symbols-outlined text-2xl font-bold">payments</span>
          </div>
          <div>
            <span className="text-[10px] text-outline font-bold uppercase tracking-wider">MRR de Assinaturas (Total)</span>
            <h3 className="text-xl font-extrabold text-on-surface leading-none mt-1">
              R$ {tenants.reduce((sum, current) => sum + current.monthlyRevenue, 0).toLocaleString('pt-BR')}
            </h3>
          </div>
        </div>

        <div className="clay-card p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-outline shadow-inner">
            <span className="material-symbols-outlined text-2xl">receipt_long</span>
          </div>
          <div>
            <span className="text-[10px] text-outline font-bold uppercase tracking-wider">Tokens Globais Consumidos</span>
            <h3 className="text-xl font-extrabold text-on-surface leading-none mt-1">63.8 M</h3>
          </div>
        </div>

      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        
        {/* Left column: Tenants lists */}
        <div className="lg:col-span-1 bg-white p-5 rounded-3xl border border-white/60 clay-card flex flex-col h-[550px]">
          <h3 className="text-sm font-bold font-display text-on-surface uppercase tracking-wider mb-4 pb-2 border-b">Lista de Clientes SaaS</h3>

          <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
            {tenants.map(tenant => (
              <div
                key={tenant.id}
                onClick={() => {
                  setActiveTenantId(tenant.id);
                  setIsEditing(false);
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  activeTenantId === tenant.id
                    ? 'bg-[#ffdcbd] text-[#2c1600] border-[#ffbc76]/40 shadow-sm font-bold'
                    : 'bg-white border-[#cac4d4]/15 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-xs font-extrabold text-on-surface line-clamp-1">{tenant.name}</h4>
                  <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                    tenant.status === 'Ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {tenant.status}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] text-outline font-semibold">Assinante: {tenant.ownerName}</span>
                  <span className="text-[10px] font-extrabold text-primary bg-[#e8ddff] px-2 py-0.5 rounded-full">{tenant.plan}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right columns: Tenant details & setup controls */}
        <div className="lg:col-span-2">
          {activeTenant ? (
            <div className="p-6 bg-white rounded-3xl border border-white/60 clay-card space-y-6">
              
              <div className="flex justify-between items-start pb-4 border-b border-[#cac4d4]/30 flex-wrap gap-2">
                <div>
                  <h2 className="text-lg font-bold font-display text-on-surface leading-tight">{activeTenant.name}</h2>
                  <p className="text-xs font-medium text-outline mt-1">ID da Academia: {activeTenant.id} • Cadastrada em: {activeTenant.dateCreated}</p>
                </div>

                {!isEditing && (
                  <button
                    onClick={handleStartEditing}
                    className="text-[#855316] font-bold text-xs bg-white py-1.5 px-4 rounded-xl border border-[#ffbc76]/30 shadow-sm hover:bg-slate-50 cursor-pointer flex items-center gap-1 leading-none"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">settings</span>
                    Alterar Limites
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-6">
                  {/* Info details blocks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#fdf9f5] border border-[#cac4d4]/35 space-y-1">
                      <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Plano de Assinatura</p>
                      <h4 className="text-base font-extrabold text-primary leading-tight">{activeTenant.plan}</h4>
                      <p className="text-[10.5px] text-outline-dark font-semibold">Mensalidade: R$ {activeTenant.monthlyRevenue.toLocaleString('pt-BR')} / mês</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#fdf9f5] border border-[#cac4d4]/35 space-y-1">
                      <p className="text-[10px] font-bold text-outline uppercase tracking-wider">Responsável Técnico</p>
                      <h4 className="text-base font-extrabold text-slate-800 leading-tight">{activeTenant.ownerName}</h4>
                      <p className="text-[10.5px] text-outline-dark font-semibold">Contato: {activeTenant.ownerName.toLowerCase().replace(/\s/g, '')}@parceiro.com</p>
                    </div>
                  </div>

                  {/* Seat Seats / Students consumed limits */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold font-display text-on-surface uppercase tracking-wider">Uso de Limite de Estudantes</h3>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{activeTenant.studentsCount} de {activeTenant.studentsLimit} slots ocupados</span>
                        <span className="text-primary font-bold">{((activeTenant.studentsCount / activeTenant.studentsLimit) * 100).toFixed(0)}% Utilizado</span>
                      </div>
                      <div className="w-full h-3.5 bg-slate-100 rounded-full shadow-inner overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${Math.min((activeTenant.studentsCount / activeTenant.studentsLimit) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Token consumtion usage limits */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold font-display text-on-surface uppercase tracking-wider">Cota de Tokens LLM (Qdrant & Gemini)</h3>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{(activeTenant.tokensConsumed / 1000000).toFixed(1)}M de {(activeTenant.tokensLimit / 1000000).toFixed(0)}M tokens permitidos</span>
                        <span className="text-secondary font-bold">{((activeTenant.tokensConsumed / activeTenant.tokensLimit) * 100).toFixed(0)}% Consumidos</span>
                      </div>
                      <div className="w-full h-3.5 bg-slate-100 rounded-full shadow-inner overflow-hidden">
                        <div
                          className="h-full bg-secondary rounded-full transition-all"
                          style={{ width: `${Math.min((activeTenant.tokensConsumed / activeTenant.tokensLimit) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Simulated security audit logs */}
                  <div className="p-4 bg-slate-50 border rounded-2xl border-[#cac4d4]/30 space-y-1.5">
                    <span className="text-[10px] font-bold text-outline-dark uppercase tracking-wider">Histórico Recente de Cobranças (Auditoria LGPD Logs)</span>
                    <ul className="space-y-1">
                      <li className="text-[10.5px] font-mono text-outline font-semibold flex justify-between">
                        <span>[22/05 04:10] Assinatura renovada com sucesso via Stripe</span>
                        <span className="text-emerald-700 font-extrabold">+ R$ {activeTenant.monthlyRevenue.toLocaleString('pt-BR')}</span>
                      </li>
                      <li className="text-[10.5px] font-mono text-outline font-semibold flex justify-between">
                        <span>[19/05 12:35] Limite de volume de alunos submetido para {activeTenant.studentsLimit} slots</span>
                        <span className="text-stone-800">SLA: OK</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveTenant} className="space-y-4 animate-[fadeIn_0.1s_ease-out]">
                  <h3 className="text-sm font-bold font-display text-primary flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined">edit_square</span>
                    Editar Configurações de Limites do SaaS
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Plano</label>
                      <select
                        value={editPlan}
                        onChange={(e) => setEditPlan(e.target.value as any)}
                        className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-bold focus:outline-none"
                      >
                        <option value="Basic">Basic (R$ 890 / mês)</option>
                        <option value="Pro">Pro (R$ 2.490 / mês)</option>
                        <option value="Enterprise">Enterprise (R$ 5.990 / mês)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Status Geral do Acesso</label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as any)}
                        className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-bold focus:outline-none"
                      >
                        <option value="Ativo">Acesso Ativo</option>
                        <option value="Suspenso">Acesso Bloqueado / Suspenso</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5 font-display">Slots Máx Alunos</label>
                      <input
                        type="number"
                        required
                        value={editStudentsLimit}
                        onChange={(e) => setEditStudentsLimit(Number(e.target.value))}
                        className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Máx Tokens LLM</label>
                      <input
                        type="number"
                        required
                        value={editTokensLimit}
                        onChange={(e) => setEditTokensLimit(Number(e.target.value))}
                        className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-semibold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-[#cac4d4]/30">
                    <button
                      type="submit"
                      className="bg-primary text-white font-bold text-xs py-2 px-6 rounded-xl shadow cursor-pointer hover:bg-opacity-95"
                    >
                      Salvar Restrições da Academia
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
          ) : (
            <p className="text-center font-bold text-xs text-outline py-12">Selecione uma empresa de mentoria administrada.</p>
          )}
        </div>

      </div>
    </div>
  );
}
