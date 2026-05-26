import React, { useState, useRef, MouseEvent } from 'react';
import { CanvasNode, BlockType } from '../types';
import { INITIAL_CANVAS_NODES, BLOCKS_TEMPLATES } from '../data';

export default function AutomationsView() {
  const [nodes, setNodes] = useState<CanvasNode[]>(INITIAL_CANVAS_NODES);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');

  // Dragging node state
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Simulator state drawer
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0); 
  const [simInput, setSimInput] = useState('Desisto desse curso de Arrays, está muito confuso...');
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  const workspaceRef = useRef<HTMLDivElement>(null);

  // Trigger dragging
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    // Prevent default so we don't select text during dragging
    e.preventDefault();
    const node = nodes.find((n) => n.id === id);
    if (!node) return;

    setDraggedNodeId(id);
    setDragOffset({
      x: e.clientX - node.x,
      y: e.clientY - node.y,
    });
  };

  // Perform dragging
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!draggedNodeId) return;

    const rect = workspaceRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Constrain position relative to bounding workspace
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;

    // Constraints to canvas boundary
    newX = Math.max(10, Math.min(newX, rect.width - 240));
    newY = Math.max(10, Math.min(newY, rect.height - 120));

    setNodes((prevNodes) =>
      prevNodes.map((n) => (n.id === draggedNodeId ? { ...n, x: newX, y: newY } : n))
    );
  };

  // Stop dragging
  const handleMouseUp = () => {
    setDraggedNodeId(null);
  };

  // Add block to canvas
  const handleAddBlock = (type: BlockType, name: string, subtext: string) => {
    const id = `node-${Date.now()}`;
    const newNode: CanvasNode = {
      id,
      type,
      name,
      subtext,
      // Place near mock center coordinates
      x: 150 + Math.random() * 200,
      y: 150 + Math.random() * 150,
    };
    setNodes([...nodes, newNode]);
  };

  // Delete node from canvas
  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
  };

  // Simulation execution timeline
  const runNextSimulationStep = () => {
    if (simStep === 0) {
      setSimStep(1);
      const startNode = nodes.find(n => n.type === 'trigger') || nodes[0];
      setHighlightedNodeId(startNode?.id || null);
      setExecutionLogs([
        `[${new Date().toLocaleTimeString()}] ▶️ Gatilho disparado! Mensagem recebida: "${simInput}"`
      ]);
    } else if (simStep === 1) {
      setSimStep(2);
      const condNode = nodes.find(n => n.type === 'condition') || nodes[1];
      setHighlightedNodeId(condNode?.id || null);
      setExecutionLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] 🔍 Analisando sentimento da mensagem...`,
        `[${new Date().toLocaleTimeString()}] ⚠️ Sentimento negativo avaliado com sucesso. Roteando para caminhos 'True'.`
      ]);
    } else if (simStep === 2) {
      setSimStep(3);
      const aiNode = nodes.find(n => n.type === 'ai');
      const alertNode = nodes.find(n => n.type === 'alert');
      setHighlightedNodeId(null); // Highlight both branches
      setExecutionLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] 🤖 IA Resposta: Gerado incentivo 'Arrays Descomplicados Video'.`,
        `[${new Date().toLocaleTimeString()}] 🚨 Alerta Humano: Escalado para o mentor no painel de pendências.`,
        `[${new Date().toLocaleTimeString()}] 🎉 Fluxo finalizado com sucesso!`
      ]);
    }
  };

  const handleResetSimulation = () => {
    setSimStep(0);
    setHighlightedNodeId(null);
    setExecutionLogs([]);
  };

  return (
    <div className="flex-1 flex flex-col p-6 min-h-screen">
      {/* Top Header */}
      <header className="flex justify-between items-center w-full px-4 py-2 bg-transparent sticky top-0 z-40 backdrop-blur-md">
        <div className="flex-1 flex items-center gap-6">
          <nav className="flex gap-6">
            <a className="text-[#674bb5] font-extrabold border-b-2 border-[#674bb5] pb-1 text-sm cursor-pointer select-none">
              Flow Studio
            </a>
            <a className="text-[#494552] hover:text-[#674bb5] font-semibold text-sm transition-colors cursor-pointer select-none">
              Templates
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search automations..."
              className="w-full bg-white/60 border-none rounded-full py-2 pl-10 pr-4 text-xs font-medium placeholder-outline-variant focus:outline-none clay-input-well"
            />
          </div>
          
          <button className="p-3 text-[#674bb5] rounded-full clay-chip cursor-pointer hover:-translate-y-0.5 transition-transform">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <button className="p-3 text-[#674bb5] rounded-full clay-chip cursor-pointer hover:-translate-y-0.5 transition-transform">
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>
        </div>
      </header>

      {/* Builder Workspace content split layout */}
      <div className="flex-1 p-4 pt-0 flex flex-col lg:flex-row gap-5 overflow-hidden pb-4 mt-4 h-[calc(100vh-140px)]">
        {/* Left Side: Blocks template selection shelf */}
        <div className="w-full lg:w-72 bg-white rounded-3xl clay-card p-5 flex flex-col h-full shrink-0">
          <h2 className="text-xl font-bold font-display text-on-surface mb-5">Blocks</h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-5">
            {/* Triggers category section */}
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 select-none">
                Triggers / Gatilhos
              </p>
              {BLOCKS_TEMPLATES.filter((b) => b.type === 'trigger').map((block) => (
                <div
                  key={block.name}
                  onClick={() => handleAddBlock(block.type, block.name, 'Click to rename subtext')}
                  className="clay-block block-trigger p-3 flex items-center gap-3 transition-transform hover:scale-102 cursor-pointer relative"
                  title="Click to place on canvas"
                >
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg font-bold">{block.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-display">{block.name}</h4>
                    <p className="text-[10px] opacity-80">{block.subtext}</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-sm opacity-50 select-none">add</span>
                </div>
              ))}
            </div>

            {/* Logic Category Section */}
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 select-[#fdf9f5]">
                Logic / Decisões
              </p>
              {BLOCKS_TEMPLATES.filter((b) => b.type === 'condition').map((block) => (
                <div
                  key={block.name}
                  onClick={() => handleAddBlock(block.type, block.name, 'Evaluate Sentiment')}
                  className="clay-block block-condition p-3 flex items-center gap-3 transition-transform hover:scale-102 cursor-pointer relative"
                >
                  <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg font-bold">{block.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-display text-white">{block.name}</h4>
                    <p className="text-[10px] text-white opacity-80">{block.subtext}</p>
                  </div>
                  <span className="material-symbols-outlined ml-auto text-sm text-white opacity-50 select-none">add</span>
                </div>
              ))}
            </div>

            {/* Actions Category section */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2 select-[#fdf9f5]">
                Actions / Ações
              </p>
              {BLOCKS_TEMPLATES.filter(
                (b) => b.type !== 'trigger' && b.type !== 'condition'
              ).map((block) => {
                const isAI = block.type === 'ai';
                const isTask = block.type === 'task';
                const isAlert = block.type === 'alert';
                const extraClass = isAI
                  ? 'block-ai'
                  : isTask
                  ? 'block-task border border-outline-variant/35'
                  : 'block-alert';

                return (
                  <div
                    key={block.name}
                    onClick={() => handleAddBlock(block.type, block.name, block.subtext)}
                    className={`clay-block p-3 flex items-center gap-3 transition-transform hover:scale-102 cursor-pointer ${extraClass}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-lg font-extrabold">{block.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold font-display">{block.name}</h4>
                      <p className="text-[10px] opacity-80">{block.subtext}</p>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-sm opacity-50 select-none font-bold">
                      add
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[10px] text-center text-outline font-semibold mt-4">
            TIP: Click block item to place on dotted canvas.
          </div>
        </div>

        {/* Right workspace dotted Canvas panel */}
        <div className="flex-1 flex flex-col relative h-full">
          {/* Canvas Title header bar */}
          <div className="flex justify-between items-center mb-4 px-2 shrink-0">
            <div>
              <h1 className="text-2xl font-bold font-display text-on-surface">New Mentoring Flow</h1>
              <p className="text-xs font-semibold text-on-surface-variant mt-0.5">Last saved: 1 min ago</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setIsSimulating(true)}
                className="clay-btn-secondary px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 hover:translate-y-[-1px] cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm font-bold">play_arrow</span>
                Simular
              </button>
              <button className="clay-button px-5 py-2.5 rounded-full text-white font-bold text-xs flex items-center gap-2 hover:translate-y-[-1px] cursor-pointer">
                <span className="material-symbols-outlined text-sm">publish</span>
                Publicar
              </button>
            </div>
          </div>

          {/* Dotted Canvas body content viewport */}
          <div
            ref={workspaceRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="canvas-bg flex-1 relative overflow-hidden flex items-center justify-center select-none"
          >
            {/* SVG connections paths dynamically mapped */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
              {nodes.map((node) => {
                // Find potential target links based on layout logical flows in screenshots
                if (node.type === 'trigger') {
                  const condNode = nodes.find((n) => n.type === 'condition');
                  if (condNode) {
                    return (
                      <path
                        key={`line-${node.id}-${condNode.id}`}
                        d={`M ${node.x + 192} ${node.y + 45} C ${node.x + 300} ${node.y + 45}, ${condNode.x - 100} ${condNode.y + 45}, ${condNode.x} ${condNode.y + 45}`}
                        fill="transparent"
                        stroke="#cac4d4"
                        strokeDasharray="8 4"
                        strokeLinecap="round"
                        strokeWidth="4"
                      />
                    );
                  }
                } else if (node.type === 'condition') {
                  const aiNode = nodes.find((n) => n.type === 'ai');
                  const alertNode = nodes.find((n) => n.type === 'alert');
                  return (
                    <React.Fragment key={`lines-condition-${node.id}`}>
                      {aiNode && (
                        <path
                          d={`M ${node.x + 224} ${node.y + 30} C ${node.x + 320} ${node.y + 30}, ${aiNode.x - 100} ${aiNode.y + 40}, ${aiNode.x} ${aiNode.y + 40}`}
                          fill="transparent"
                          stroke="#4eac9c"
                          strokeDasharray="8 4"
                          strokeLinecap="round"
                          strokeWidth="4"
                        />
                      )}
                      {alertNode && (
                        <path
                          d={`M ${node.x + 224} ${node.y + 60} C ${node.x + 320} ${node.y + 60}, ${alertNode.x - 100} ${alertNode.y + 40}, ${alertNode.x} ${alertNode.y + 40}`}
                          fill="transparent"
                          stroke="#ffdad6"
                          strokeDasharray="8 4"
                          strokeLinecap="round"
                          strokeWidth="4"
                        />
                      )}
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </svg>

            {/* Draggable Active canvas cards */}
            {nodes.map((node) => {
              const isTrigger = node.type === 'trigger';
              const isCondition = node.type === 'condition';
              const isAI = node.type === 'ai';
              const isTask = node.type === 'task';
              const isAlert = node.type === 'alert';

              const cardClass = isTrigger
                ? 'block-trigger text-[#683c00]'
                : isCondition
                ? 'block-condition text-white'
                : isAI
                ? 'block-ai text-[#21005e]'
                : isTask
                ? 'block-task text-[#494552] border border-outline-variant/30'
                : 'block-alert text-[#93000a]';

              const icon = isTrigger
                ? 'bolt'
                : isCondition
                ? 'alt_route'
                : isAI
                ? 'auto_awesome'
                : isTask
                ? 'check_circle'
                : 'person_alert';

              const isHighlighted = highlightedNodeId === node.id || (highlightedNodeId === null && simStep === 3 && (isAI || isAlert));

              return (
                <div
                  key={node.id}
                  onMouseDown={(e) => handleMouseDown(e, node.id)}
                  style={{
                    position: 'absolute',
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    zIndex: draggedNodeId === node.id ? 50 : 10,
                  }}
                  className={`w-52 p-4 clay-block cursor-grab relative select-none transition-shadow ${cardClass} ${
                    isHighlighted ? 'ring-4 ring-purple-600 scale-103 shadow-[0_0_20px_rgba(103,75,181,0.5)]' : 'shadow-xl'
                  }`}
                >
                  {/* Delete button option */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNode(node.id);
                    }}
                    className="absolute top-2 right-2 opacity-40 hover:opacity-100 text-xs font-bold p-0.5 rounded hover:bg-black/10 cursor-pointer"
                  >
                    <span className="material-symbols-outlined !text-[16px] font-extrabold leading-none">close</span>
                  </button>

                  <div className="flex items-center gap-2 mb-1.5 pointer-events-none select-none">
                    <span className="material-symbols-outlined text-lg leading-none">{icon}</span>
                    <span className="text-xs font-bold font-display uppercase tracking-wide">{node.name}</span>
                  </div>

                  <p className="text-[11px] opacity-90 leading-tight pointer-events-none select-none">
                    {node.subtext}
                  </p>

                  {/* Left Connection Input circular point */}
                  {!isTrigger && (
                    <div className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 bg-white rounded-full border-2 border-inherit shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                    </div>
                  )}

                  {/* Right Connection Output circular points */}
                  {isTrigger && (
                    <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 bg-white rounded-full border-2 border-inherit shadow-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                    </div>
                  )}

                  {isCondition && (
                    <>
                      {/* Top outlet branch */}
                      <div className="absolute right-[-8px] top-[25%] transform -translate-y-1/2 w-4.5 h-4.5 bg-white rounded-full border-2 border-inherit shadow-md flex items-center justify-center" title="True">
                        <div className="w-1.5 h-1.5 bg-[#4eac9c] rounded-full"></div>
                      </div>
                      {/* Bottom outlet branch */}
                      <div className="absolute right-[-8px] top-[75%] transform -translate-y-1/2 w-4.5 h-4.5 bg-white rounded-full border-2 border-inherit shadow-md flex items-center justify-center" title="False">
                        <div className="w-1.5 h-1.5 bg-[#4eac9c] rounded-full"></div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {/* Canvas Controls overlay */}
            <div className="absolute bottom-4 right-4 flex bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-lg gap-2 border border-white/50">
              <button
                onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="text-xs font-bold text-[#494552] flex items-center select-none px-1">
                {zoomLevel}%
              </span>
              <button
                onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Simulation Drawer Sheet overlay */}
      {isSimulating && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col p-6 border-l border-[#cac4d4]/30 animate-[slideLeft_0.25s_ease-out]">
          {/* Close Header button */}
          <div className="flex justify-between items-center pb-4 border-b border-[#cac4d4]/20">
            <h3 className="text-lg font-bold font-display text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl font-bold">play_circle</span>
              Simular Automação
            </h3>
            <button
              onClick={() => {
                setIsSimulating(false);
                handleResetSimulation();
              }}
              className="text-outline hover:text-on-surface cursor-pointer p-1 rounded-full hover:bg-slate-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Input text setup */}
          <div className="my-5 fill-area space-y-4 flex-1 overflow-y-auto">
            <div>
              <label className="block text-[11px] font-bold text-outline uppercase tracking-wider mb-2">
                Simulador: Mensagem de Entrada
              </label>
              <textarea
                value={simInput}
                onChange={(e) => setSimInput(e.target.value)}
                placeholder="Insira dados de teste..."
                rows={3}
                className="w-full bg-[#fdf9f5] border border-[#cac4d4]/50 rounded-xl py-3 px-3.5 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none leading-relaxed"
              ></textarea>
            </div>

            {/* Execution step-by-step buttons control */}
            <div className="flex gap-2">
              <button
                onClick={runNextSimulationStep}
                disabled={simStep === 3}
                className="flex-1 bg-primary text-white font-bold text-xs py-3 rounded-2xl shadow-md hover:bg-opacity-90 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">navigate_next</span>
                {simStep === 0 ? 'Iniciar Simulação' : 'Avançar Passo'}
              </button>
              
              <button
                onClick={handleResetSimulation}
                className="px-4 py-3 rounded-2xl bg-[#fdf9f5] text-outline border border-[#cac4d4]/50 font-bold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Simulated Live visual console logs */}
            <div className="mt-6">
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                Linha de Testes (Debug)
              </p>
              
              <div className="bg-[#1c1c19] text-[#96f3e1] rounded-2xl p-4 font-mono text-[10px] space-y-2 max-h-72 overflow-y-auto shadow-inner min-h-[160px]">
                {executionLogs.length === 0 ? (
                  <p className="text-[#cac4d4] italic">Nenhuma instrução executada. Clique em 'Iniciar' para começar.</p>
                ) : (
                  executionLogs.map((log, i) => (
                    <p key={i} className="animate-[fadeIn_0.15s_ease-out] leading-loose">
                      {log}
                    </p>
                  ))
                )}
              </div>
            </div>

            {/* Interactive flow highlights indicator info */}
            <div className="p-4 bg-purple-50 rounded-2xl border border-primary-container/20 text-xs font-semibold text-primary leading-relaxed">
              <strong>Como funciona:</strong> Ao avançar os passos, visualize na tela os blocos da automação se iluminando em roxo de acordo com a sequência real de execução.
            </div>
          </div>

          {/* Footer controls status */}
          <div className="pt-4 border-t border-[#cac4d4]/20 flex justify-between items-center text-[10px] font-bold text-outline">
            <span>Status: {simStep === 3 ? 'Finalizado' : simStep > 0 ? 'Em execução' : 'Ocioso'}</span>
            <span>Versão v1.0 • Híbrido</span>
          </div>
        </div>
      )}
    </div>
  );
}
