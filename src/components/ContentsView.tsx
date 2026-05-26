import React, { useState } from 'react';

interface KnowledgeItem {
  id: string;
  name: string;
  type: 'PDF' | 'TXT' | 'YouTube' | 'URL';
  sizeOrLength: string;
  chunks: number;
  status: 'Processado' | 'Indexando' | 'Falhou';
  dateAdded: string;
}

export default function ContentsView() {
  const [items, setItems] = useState<KnowledgeItem[]>([
    { id: 'rag-1', name: 'Regras do Negocio e Escopo Campanha 2026.pdf', type: 'PDF', sizeOrLength: '4.8 MB', chunks: 142, status: 'Processado', dateAdded: '18 Mai 2026' },
    { id: 'rag-2', name: 'Guia de Boas Praticas de Desenvolvimento.txt', type: 'TXT', sizeOrLength: '124 KB', chunks: 28, status: 'Processado', dateAdded: '19 Mai 2026' },
    { id: 'rag-3', name: 'https://youtube.com/watch?v=aula-estruturas-dados', type: 'YouTube', sizeOrLength: '1h 12m', chunks: 210, status: 'Processado', dateAdded: '20 Mai 2026' },
    { id: 'rag-4', name: 'https://github.com/regras-finais-vendas', type: 'URL', sizeOrLength: 'N/A', chunks: 15, status: 'Indexando', dateAdded: 'Hoje' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'PDF' | 'TXT' | 'YouTube' | 'URL'>('all');
  
  // Create / add states
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'PDF' | 'TXT' | 'YouTube' | 'URL'>('PDF');
  const [isAdding, setIsAdding] = useState(false);

  // Semantic search mockup
  const [semanticPrompt, setSemanticPrompt] = useState('');
  const [semanticResults, setSemanticResults] = useState<{ chunk: string; score: number; docName: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    const added: KnowledgeItem = {
      id: `rag-${Date.now()}`,
      name: newTitle || newUrl,
      type: newType,
      sizeOrLength: newType === 'PDF' ? '3.2 MB' : newType === 'YouTube' ? '25 min' : '45 KB',
      chunks: 0,
      status: 'Indexando',
      dateAdded: 'Hoje'
    };

    setItems([added, ...items]);
    setNewUrl('');
    setNewTitle('');
    setIsAdding(false);

    // Simulated indexing success
    setTimeout(() => {
      setItems(current => current.map(item => {
        if (item.id === added.id) {
          return { ...item, status: 'Processado', chunks: 64 };
        }
        return item;
      }));
    }, 3000);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleTestSemanticSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!semanticPrompt) return;

    setIsSearching(true);
    setSemanticResults([]);

    setTimeout(() => {
      // Simulate RAG vector matches
      setSemanticResults([
        {
          docName: 'Regras do Negocio e Escopo Campanha 2026.pdf',
          score: 0.945,
          chunk: '...as campanhas de conversão de leads devem focar integralmente em estratégias de carrossel móvel. O tempo médio de resposta tolerável (SLA) para novas mentorias deve ser mantido abaixo de 10 minutos após o recebimento do webhook no WhatsApp.'
        },
        {
          docName: 'Guia de Boas Praticas de Desenvolvimento.txt',
          score: 0.812,
          chunk: '...manter o código limpo, documentado com anotações JSDoc. Modularização estrutural ajuda a evitar perdas de coesão no transcorrer dos blocos de iteração do Gêmeo Digital.'
        }
      ]);
      setIsSearching(false);
    }, 1200);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 flex flex-col p-6 min-h-screen">
      <header className="flex justify-between items-center w-full px-4 py-2 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl font-bold">book_4</span>
            Base de Conhecimento RAG Geral
          </h1>
          <p className="text-xs font-semibold text-outline mt-0.5">Indexação de materiais e apostilas de treinamento das IAs</p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="clay-button py-2 px-5 py-2.5 rounded-2xl text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined font-bold text-lg">add</span>
          Adicionar Ativo RAG
        </button>
      </header>

      {/* RAG Stat cards bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full max-w-7xl mx-auto">
        <div className="clay-card p-5 flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-primary shadow-inner shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">folder_open</span>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-outline font-bold uppercase tracking-wider block leading-tight">Ativos de Conteúdo</span>
            <h3 className="text-xl font-extrabold text-on-surface leading-none mt-1">{items.length}</h3>
          </div>
        </div>

        <div className="clay-card p-5 flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#006b5e] shadow-inner shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">grid_view</span>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-outline font-bold uppercase tracking-wider block leading-tight">Total Chunks Ativos</span>
            <h3 className="text-xl font-extrabold text-on-surface leading-none mt-1">
              {items.reduce((sum, current) => sum + current.chunks, 0)}
            </h3>
          </div>
        </div>

        <div className="clay-card p-5 flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[#79490b] shadow-inner shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">query_stats</span>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-outline font-bold uppercase tracking-wider block leading-tight">Vetorização Média</span>
            <h3 className="text-xl font-extrabold text-on-surface leading-none mt-1">98.4%</h3>
          </div>
        </div>

        <div className="clay-card p-5 flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-700 shadow-inner shrink-0">
            <span className="material-symbols-outlined text-2xl">database</span>
          </div>
          <div className="min-w-0">
            <span className="text-[10px] text-outline font-bold uppercase tracking-wider block leading-tight">Armazenamento Qdrant</span>
            <h3 className="text-xl font-extrabold text-on-surface leading-none mt-1">11.6 MB</h3>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        
        {/* Main Database list */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Add content card */}
          {isAdding && (
            <form onSubmit={handleAddItem} className="p-6 bg-white rounded-3xl border border-white/60 clay-card-primary text-on-primary-container space-y-4 animate-[fadeIn_0.15s_ease-out]">
              <h3 className="text-sm font-bold font-display flex items-center gap-1">
                <span className="material-symbols-outlined">cloud_upload</span>
                Adicionar Nova Fonte para RAG
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-on-primary-container/80 uppercase tracking-wider mb-1">Título do Documento</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Apostila de Algoritmos v2"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-white/70 border-none rounded-xl p-3 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-on-primary-container/80 uppercase tracking-wider mb-1">Format / Canal</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-white/70 border-none rounded-xl p-3 text-xs font-semibold focus:outline-none"
                  >
                    <option value="PDF">PDF</option>
                    <option value="TXT">TXT</option>
                    <option value="YouTube">Vídeo do YouTube</option>
                    <option value="URL">URL Geral / Site</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-primary-container/80 uppercase tracking-wider mb-1">Caminho URL ou Arquivo de texto</label>
                <input
                  type="text"
                  required
                  placeholder="ex: https://site.com/docs/apostila.pdf"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-white/70 border-none rounded-xl p-3 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-primary hover:bg-[#674bb5]/90 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-sm cursor-pointer"
                >
                  Salvar e Processar Vetores
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-white text-on-primary-container border border-primary-container/35 text-xs font-bold py-2 px-4 rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {/* Library and filter manager */}
          <div className="p-6 bg-white rounded-3xl border border-white/60 clay-card space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div className="flex items-center gap-2 bg-[#fdf9f5] border border-outline-variant/30 rounded-2xl py-2 px-4 flex-1 w-full md:w-auto">
                <span className="material-symbols-outlined text-outline">search</span>
                <input
                  type="text"
                  placeholder="Filtrar base de conhecimento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs text-on-surface bg-transparent border-none p-0 focus:outline-none focus:ring-0 font-medium"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto w-full md:w-auto">
                {(['all', 'PDF', 'TXT', 'YouTube', 'URL'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase transition-all whitespace-nowrap cursor-pointer ${
                      activeFilter === f
                        ? 'bg-[#e8ddff] text-primary'
                        : 'text-outline hover:bg-slate-50'
                    }`}
                  >
                    {f === 'all' ? 'Tudo' : f}
                  </button>
                ))}
              </div>
            </div>

            {/* Document listings looping */}
            <div className="space-y-3">
              {filteredItems.map(item => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-[#fdf9f5] hover:bg-[#faf6f2] border border-[#cac4d4]/30 flex justify-between items-center gap-4 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-[#cac4d4]/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl text-primary leading-none">
                        {item.type === 'PDF' ? 'picture_as_pdf' : item.type === 'YouTube' ? 'video_library' : 'description'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-on-surface line-clamp-1">{item.name}</h4>
                      <p className="text-[10px] font-bold text-outline mt-0.5">
                        Tamanho: {item.sizeOrLength} • {item.chunks} Chunks • Adicionado: {item.dateAdded}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className={`px-2 py-0.5 text-[9px] font-extrabold rounded-md shadow-sm ${
                      item.status === 'Processado' ? 'bg-[#96f3e1] text-[#003c34]' : 'bg-[#ffdcbd] text-[#79490b]'
                    }`}>
                      {item.status}
                    </span>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-outline hover:text-rose-600 p-1 rounded-xl hover:bg-rose-50 transition-all cursor-pointer leading-none"
                    >
                      <span className="material-symbols-outlined text-sm font-bold">delete</span>
                    </button>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <p className="text-xs text-outline text-center py-8 font-semibold">Nenhum ativo RAG correspondente.</p>
              )}
            </div>
          </div>
        </div>

        {/* Semantic search simulation panel */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white rounded-3xl border border-white/60 clay-card space-y-4">
            <h3 className="text-base font-bold font-display text-on-background flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006b5e] font-bold">saved_search</span>
              Testador de Busca Semântica
            </h3>
            <p className="text-xs text-slate-500 font-medium">Insira uma pergunta simulada de aluno para testar quais chunks e conteúdos o RAG entregaria à LLM do Gêmeo Digital.</p>

            <form onSubmit={handleTestSemanticSearch} className="space-y-3">
              <div className="bg-[#fdf9f5] border border-outline-variant/50 rounded-2xl py-2 px-3 flex items-center gap-2 focus-within:border-primary/45 transition-all">
                <input
                  required
                  type="text"
                  placeholder="ex: Qual o SLA para responder aluno?"
                  value={semanticPrompt}
                  onChange={(e) => setSemanticPrompt(e.target.value)}
                  className="w-full text-xs text-on-surface bg-transparent border-none p-0.5 focus:outline-none focus:ring-0 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSearching}
                className="w-full clay-button py-2.5 px-4 rounded-xl text-white font-bold text-xs shadow hover:bg-opacity-95 select-none disabled:opacity-50 cursor-pointer"
              >
                {isSearching ? 'Pesquisando vetores...' : 'Rodar Busca Semântica'}
              </button>
            </form>

            <div className="space-y-3 pt-3 border-t border-[#cac4d4]/30 min-h-[180px]">
              {semanticResults.map((res, index) => (
                <div key={index} className="p-3 bg-[#e8ddff]/10 rounded-2xl border border-[#cac4d4]/35 space-y-1.5 hover:shadow-inner transition-shadow scale-99">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-primary max-w-[80%] line-clamp-1">{res.docName}</span>
                    <span className="text-[9px] font-extrabold text-[#006b5e]">{(res.score * 100).toFixed(1)}% Relevância</span>
                  </div>
                  <p className="text-[10px] text-slate-700 font-semibold leading-relaxed">
                    {res.chunk}
                  </p>
                </div>
              ))}

              {!isSearching && semanticResults.length === 0 && (
                <div className="h-44 border border-dashed border-[#cac4d4]/30 rounded-2xl flex flex-col justify-center items-center text-center p-4">
                  <span className="material-symbols-outlined text-outline/30 text-3xl mb-1.5">quiz</span>
                  <p className="text-[10px] text-outline font-semibold">Os resultados dos embeddings do Qdrant e buffers de similaridade cosseno serão mostrados aqui.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
