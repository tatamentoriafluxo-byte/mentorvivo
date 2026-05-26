import React, { useState, useEffect } from 'react';

export default function WhatsAppSetup() {
  const [connectionStatus, setConnectionStatus] = useState<'desconectado' | 'gerando' | 'aguardando_scan' | 'conectado'>('desconectado');
  const [sessionName, setSessionName] = useState('empresa_mentor_365');
  const [apiEndpoint, setApiEndpoint] = useState('https://evolution.mentorvivo365.com.br');
  const [apiToken, setApiToken] = useState('apikey_evolution_prod_shared_7k3jsa');
  const [webhookUrl, setWebhookUrl] = useState('https://app.mentorvivo365.com.br/api/v1/whatsapp/webhook');
  
  const [qrCountdown, setQrCountdown] = useState(45);
  const [syncAudios, setSyncAudios] = useState(true);
  const [syncDocs, setSyncDocs] = useState(true);
  const [activeReminders, setActiveReminders] = useState(true);
  const [connectedNumber, setConnectedNumber] = useState('+55 (11) 98765-4321');

  // QR Code expiration timer simulation
  useEffect(() => {
    let timer: any;
    if (connectionStatus === 'aguardando_scan' && qrCountdown > 0) {
      timer = setInterval(() => {
        setQrCountdown(prev => prev - 1);
      }, 1000);
    } else if (qrCountdown === 0) {
      setConnectionStatus('desconectado');
    }
    return () => clearInterval(timer);
  }, [connectionStatus, qrCountdown]);

  const handleGenerateQR = () => {
    setConnectionStatus('gerando');
    setQrCountdown(45);
    setTimeout(() => {
      setConnectionStatus('aguardando_scan');
    }, 1200);
  };

  const handleSimulateScan = () => {
    setConnectionStatus('conectado');
  };

  const handleDisconnect = () => {
    if (window.confirm('Tem certeza de que deseja desconectar o WhatsApp da Evolution API? Isso pausará o envio de mensagens automáticas.')) {
      setConnectionStatus('desconectado');
      setQrCountdown(45);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-10">
          <span className="material-symbols-outlined text-[150px] font-bold">cell_tower</span>
        </div>
        <div className="relative z-15 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 text-white font-extrabold text-[10px] uppercase px-3 py-1 rounded-full backdrop-blur-sm tracking-wider">
                Integração WhatsApp
              </span>
              <span className="bg-emerald-500/30 text-[#e6fcf5] border border-emerald-400/20 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full backdrop-blur-sm">
                Evolution API Oficial
              </span>
            </div>
            <h2 className="text-xl font-extrabold font-display leading-tight">Configurações de Canal Inteligente</h2>
            <p className="text-xs text-emerald-100/80 mt-1 max-w-xl font-medium">
              Conecte o WhatsApp de sua mentoria via API da Evolution. Isso permitirá que o gêmeo digital envie mensagens, analise áudios, tire dúvidas de alunos e aplique playbooks operacionais de cobrança 365 dias por ano.
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            {connectionStatus === 'conectado' ? (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 py-2 px-4 rounded-2xl flex items-center gap-2.5 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <div>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none">Status</p>
                  <p className="text-xs font-extrabold mt-0.5">CONECTADO</p>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 text-rose-800 border border-rose-200 py-2 px-4 rounded-2xl flex items-center gap-2.5 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                <div>
                  <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest leading-none">Status</p>
                  <p className="text-xs font-extrabold mt-0.5">DESCONECTADO</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Code and Connection panel */}
        <div className="lg:col-span-1 clay-card p-6 flex flex-col justify-between min-h-[420px]">
          <div>
            <h3 className="text-sm font-bold font-display text-on-surface uppercase tracking-wider mb-4 pb-2 border-b border-[#cac4d4]/30">
              Associação de Dispositivo
            </h3>

            {/* Desconectado */}
            {connectionStatus === 'desconectado' && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-500 shadow-inner">
                  <span className="material-symbols-outlined text-3xl">qr_code_2</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-on-surface">Instância Inativa</p>
                  <p className="text-[11px] text-slate-500 font-medium px-4 leading-relaxed">
                    Para habilitar o envio automático cognitivo, é necessário gerar o QR Code e escaneá-lo com seu WhatsApp de Mentoria.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateQR}
                  className="w-full bg-[#006b5e] hover:bg-opacity-95 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg transition-transform hover:translate-y-[-1px] cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">sync</span>
                  Gerar Conexão QR Code
                </button>
              </div>
            )}

            {/* Gerando QR Code */}
            {connectionStatus === 'gerando' && (
              <div className="text-center py-12 space-y-4">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700 animate-pulse">Criando Instância na Evolution...</p>
                  <p className="text-[10px] text-slate-400 font-medium">Injetando credenciais e buscando Webhooks de escuta.</p>
                </div>
              </div>
            )}

            {/* Aguardando Scan */}
            {connectionStatus === 'aguardando_scan' && (
              <div className="text-center space-y-4">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 inline-block shadow-sm relative">
                  {/* Fake polished QR Code using CSS vectors */}
                  <div className="w-44 h-44 bg-slate-50 border-4 border-slate-100 rounded-xl flex flex-col items-center justify-center relative p-2 overflow-hidden">
                    {/* Visual grid lines to simulate QR Code */}
                    <div className="grid grid-cols-4 gap-1 w-full h-full opacity-80 select-none">
                      {[...Array(16)].map((_, i) => (
                        <div
                          key={i}
                          className={`rounded ${
                            i === 0 || i === 3 || i === 12 || i === 15 || i % 3 === 0
                              ? 'bg-[#1e293b]'
                              : 'bg-transparent border border-dashed border-slate-300'
                          }`}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Simulated Scanner Laser line animation */}
                    <div className="absolute left-0 w-full h-1 bg-emerald-500 opacity-60 animate-[bounce_2s_infinite]"></div>
                  </div>
                  
                  {/* Timer display */}
                  <span className="absolute -top-2.5 -right-2.5 bg-rose-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow">
                    Expira em {qrCountdown}s
                  </span>
                </div>

                <div className="space-y-1.5 px-2">
                  <p className="text-xs font-bold text-[#1e293b]">Escaneie com seu WhatsApp</p>
                  <p className="text-[10.5px] text-slate-500 leading-relaxed font-semibold">
                    Abra o WhatsApp → Aparelhos Conectados → Conectar um Aparelho. Aponte a câmera para a tela.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#cac4d4]/20 space-y-2">
                  <button
                    type="button"
                    onClick={handleSimulateScan}
                    className="w-full bg-[#006b5e] hover:bg-opacity-95 text-white font-extrabold text-[11px] py-2 px-4 rounded-xl shadow cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">check_circle</span>
                    [Mock] Simular Escaneamento
                  </button>
                  <button
                    type="button"
                    onClick={() => setConnectionStatus('desconectado')}
                    className="w-full border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold text-[10px] py-1.5 px-4 rounded-xl cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* Conectado */}
            {connectionStatus === 'conectado' && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-inner relative">
                  <span className="material-symbols-outlined text-3xl">phone_iphone</span>
                  <span className="absolute bottom-0 right-0 bg-emerald-500 text-white w-5 h-5 rounded-full flex items-center justify-center shadow">
                    <span className="material-symbols-outlined text-xs">done</span>
                  </span>
                </div>

                <div className="space-y-1 bg-slate-50 border border-[#cac4d4]/30 rounded-2xl p-4 text-left">
                  <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Número Ativo</span>
                    <span className="text-xs font-semibold text-slate-800">{connectedNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/50 pt-1.5 pb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Instância ID</span>
                    <span className="text-xs font-mono font-bold text-[#674bb5]">{sessionName}</span>
                  </div>
                  <div className="flex justify-between pt-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Webhooks</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded">Ativo (SLA 100%)</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#cac4d4]/20">
                  <button
                    type="button"
                    onClick={handleDisconnect}
                    className="w-full border-2 border-rose-100 hover:border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 font-bold text-xs py-2 px-4 rounded-xl cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm font-bold">link_off</span>
                    Desconectar WhatsApp
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[10px] text-slate-500 font-semibold leading-relaxed">
            <span className="font-extrabold text-primary block mb-0.5">Nota de Segurança SaaS:</span>
            As conexões são protegidas com criptografia de ponta a ponta. Sessões inativas há mais de 15 dias são desconectadas automaticamente por segurança.
          </div>
        </div>

        {/* Settings and Sync config list */}
        <div className="lg:col-span-2 space-y-6">
          {/* API credentials */}
          <div className="clay-card p-6 space-y-4">
            <h3 className="text-sm font-bold font-display text-on-surface uppercase tracking-wider pb-2 border-b border-[#cac4d4]/30 flex items-center gap-1.5">
              <span className="material-symbols-outlined">api</span>
              Credenciais da Instância (Evolution API)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Endpoint Servidor</label>
                <input
                  type="text"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary/25"
                  placeholder="Ex: https://servidor-evolution.seuSaaS.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Nome da Instância</label>
                <input
                  type="text"
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary/25"
                  placeholder="Nome único da sessão do cliente"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-outline uppercase tracking-wider mb-1.5">Evolution API Key / Token Secreto</label>
              <input
                type="password"
                value={apiToken}
                onChange={(e) => setApiToken(e.target.value)}
                className="w-full bg-[#fdf9f5] border border-outline-variant/65 rounded-xl p-3 text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-primary/25"
                placeholder="Insira a API Key global de autenticação do servidor Evolution"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-bold text-outline uppercase tracking-wider">URL do Webhook (Destino de Eventos)</label>
                <span className="text-[9px] text-[#006b5e] font-extrabold bg-[#96f3e1]/50 px-2 py-0.5 rounded shadow-inner">AUTO CONFIG</span>
              </div>
              <input
                type="text"
                readOnly
                value={webhookUrl}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-mono text-slate-500 select-all focus:outline-none"
              />
              <p className="text-[9.5px] text-slate-500 font-semibold mt-1 leading-normal">
                Insira essa URL de Webhook no painel da sua Evolution API para escutar os eventos de <code className="bg-slate-100 px-1 py-0.5 rounded font-bold font-mono">MESSAGES_UPSERT</code> e <code className="bg-slate-100 px-1 py-0.5 rounded font-bold font-mono">MEDIA_UPLOAD</code>.
              </p>
            </div>
          </div>

          {/* Sync behaviors */}
          <div className="clay-card p-6 space-y-4">
            <h3 className="text-sm font-bold font-display text-on-surface uppercase tracking-wider pb-2 border-b border-[#cac4d4]/30 flex items-center gap-1.5">
              <span className="material-symbols-outlined">settings_suggest</span>
              Parâmetros de Sincronização Cognitiva
            </h3>

            <div className="space-y-4">
              {/* Option Track Audios */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Transcrição Automática de Áudios</h4>
                  <p className="text-[10px] text-slate-500 font-semibold max-w-md mt-0.5 leading-relaxed">
                    Converter áudios recebidos dos alunos em texto via WhisperX e incluí-los na memória de conversas.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={syncAudios}
                    onChange={(e) => setSyncAudios(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Option Track documents */}
              <div className="flex items-center justify-between pt-4 border-t border-[#cac4d4]/20">
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Leitura Cognitiva de Anexos/PDFs (Ativos)</h4>
                  <p className="text-[10px] text-slate-500 font-semibold max-w-md mt-0.5 leading-relaxed">
                    Permitir que a IA leia e salve na base de ativos todas as imagens e mídias PDF enviadas no chat privado do aluno.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={syncDocs}
                    onChange={(e) => setSyncDocs(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Option active follow-ups */}
              <div className="flex items-center justify-between pt-4 border-t border-[#cac4d4]/20">
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Ativar Cobranças e Mentoria Ativa (365 Dias)</h4>
                  <p className="text-[10px] text-slate-500 font-semibold max-w-md mt-0.5 leading-relaxed">
                    Permitir disparo autônomo dos playbooks ativos cadastrados nos checkpoints programados (D+1, D+3, D+7, etc).
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeReminders}
                    onChange={(e) => setActiveReminders(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
