import React, { useState, useMemo } from 'react';

const nodesData = [
  { 
    id: 'estrutura', label: 'ESTRUTURA', x: 50, y: 15, color: '#3b82f6', 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />,
    title: 'Estrutura: Modelagem HSTP', 
    desc: 'O problema é tratado como uma alocação otimizada sem colisões temporais ou espaciais, sendo modelado através de uma Matriz Tridimensional.',
    items: [
      'Entidades Fundamentais: Professores, turmas, disciplinas, salas e períodos.',
      'Relação Base: Um professor leciona uma disciplina a uma turma numa sala, sem sofrer dupla alocação no mesmo período.',
      'Ingestão & Cruzamento: Leitura de dados (CSV/PDF) e mapeamento de combinações.',
      'Evolução & Entrega: Algoritmo Genético avalia populações até gerar a matriz ótima para a interface.'
    ]
  },
  { 
    id: 'hard', label: 'RESTRIÇÕES HARD', x: 82, y: 35, color: '#ef4444', 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
    title: 'Restrições Rígidas (Hard)', 
    desc: 'Violações invalidam matematicamente o horário. Exige-se tolerância zero a falhas nesta categoria.',
    items: [
      'Axioma da Coexistência: Proíbe sobreposições num mesmo exato período.',
      'RN01 & RN02: Divisão de turmas (>40 alunos) e preferência por salas fixas.',
      'RN04 & RN07: Bloqueios como Reuniões Pedagógicas (quartas à tarde) e respeito à carga curricular exata.',
      'RN08 & RN09: Respeito à capacidade laboratorial e sincronismo lógico de eletivas em bloco.',
      'RN12 & RN13: Grade do aluno contínua (sem furos) e validação de competência técnica docente.',
      'RN14 & RN15: Garantia de intervalo intrajornada (1h) e teto de 8 aulas diárias contra exaustão.'
    ]
  },
  { 
    id: 'soft', label: 'RESTRIÇÕES SOFT', x: 82, y: 70, color: '#22c55e', 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5" />,
    title: 'Restrições Flexíveis (Soft)', 
    desc: 'Violações geram penalizações. O sistema avalia trade-offs e busca a grade com o "mínimo global" de pontos.',
    items: [
      'RN03: Supressão de janelas para evitar ineficiência orçamental e tempo ocioso docente.',
      'RN05 & RN06: Limite de aulas consecutivas da mesma disciplina e proteção no último período do dia.',
      'RN10 & RN11: Alinhamento de turnos docentes e dispersão curricular para retenção de memória.',
      'RN17 & RN18: Prevenção de fadiga cognitiva (Exatas de manhã) e condensação da jornada.',
      'RN19 & RN20: Prioridade para o 3º ano (Ensino Médio) e rodízio matemático em salas premium.',
      'Gestão de Conflitos: Resolução algorítmica de dilemas (ex: Suprimir janelas RN03 vs. Manter dispersão RN11).'
    ]
  },
  { 
    id: 'qualidade', label: 'QUALIDADE', x: 50, y: 88, color: '#0ea5e9', 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
    title: 'Critérios de Qualidade', 
    desc: 'Os quatro pilares fundamentais que determinam o sucesso da solução gerada pelo motor EduSchedule.',
    items: [
      'Validade: Tolerância zero para violações de Hard Constraints. O horário nunca deve apresentar colisões.',
      'Minimização: Excelência em Soft Constraints, visando índice zero de janelas e distribuição pedagógica perfeita.',
      'Flexibilidade (Re-trava): Permite reajustes humanos pontuais recalculando o impacto sem destruir o resto da matriz.',
      'Usabilidade: Dashboard intuitivo com curva de aprendizagem baixa, ocultando a complexidade algébrica dos servidores.'
    ]
  },
  { 
    id: 'requisitos', label: 'REQUISITOS', x: 18, y: 70, color: '#a855f7', 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    title: 'Requisitos do Sistema', 
    desc: 'Arquitetura e funcionalidades essenciais para viabilizar e interagir com o motor de otimização.',
    items: [
      'Motor Genético Híbrido: Combinação de Álgebra Linear 3D com Algoritmos Genéticos.',
      'Reprocessamento Just-in-Time: Módulo de crise com redes neurais LSTM para previsão de faltas.',
      'Interface React/Drag-and-Drop: Alertas visuais automáticos em caso de colisões no ajuste humano.',
      'Gestão de Histórico: Exportação (PDF/Excel) e suporte à regressão de versões anteriores.'
    ]
  },
  { 
    id: 'desafios', label: 'DESAFIOS', x: 18, y: 35, color: '#eab308', 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />,
    title: 'Desafios Técnicos', 
    desc: 'Soluções de engenharia para lidar com explosões combinatórias e viabilizar processamento massivo.',
    items: [
      'Modelagem Matemática: Tradução de regras abstratas em penalty functions exatas.',
      'Tratamento de Conflitos: Resolução de dependências cruzadas via tensores de verificação.',
      'Arquitetura HPC & CUDA: Transição de CPU (Multithreading) para aceleração via GPU (ganhos de 400x).',
      'Integração Stateless: Conectar um núcleo de força bruta em C++/Go ao frontend web em milissegundos.'
    ]
  }
];

export default function EduScheduleDark() {
  const [activeNode, setActiveNode] = useState('estrutura');

  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.1,
      size: Math.random() * 2 + 1 + 'px'
    }));
  }, []);

  const activeData = nodesData.find(n => n.id === activeNode);

  return (
    <div className="bg-[#1a1b23] rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-7xl mx-auto border border-slate-800 font-sans text-slate-200">
      
      {/* Header System Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter italic">EDUSCHEDULE <span className="text-indigo-500 font-light tracking-normal">INFOGRAPHIC</span></h1>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Mapeamento de Regras HSTP, Arquitetura e Qualidade</p>
        </div>
        
        <div className="flex gap-4 text-[10px] font-mono text-slate-400 bg-[#0d0e12] p-4 rounded-xl border border-slate-800 shadow-inner">
          <div className="pr-4 border-r border-slate-800">
            <div className="opacity-40 mb-1">Architecture</div>
            <div className="text-indigo-400 font-bold uppercase">3D Matrix Tensor</div>
          </div>
          <div className="pl-4">
            <div className="opacity-40 mb-1">Processor</div>
            <div className="text-emerald-400 font-bold uppercase">Cuda Accelerated</div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-8 min-h-[550px]">
        
        {/* Visualizer (Left) */}
        <div className="relative flex-1 bg-[#0d0e12] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
          {stars.map(star => (
            <div key={star.id} className="absolute bg-white rounded-full animate-pulse" 
                 style={{ top: star.top, left: star.left, width: star.size, height: star.size, opacity: star.opacity }} />
          ))}

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodesData.map(node => (
              <line key={`line-${node.id}`} x1="50%" y1="50%" x2={`${node.x}%`} y2={`${node.y}%`} 
                    stroke={activeNode === node.id ? node.color : "#1e293b"} 
                    strokeWidth={activeNode === node.id ? 2 : 1} 
                    className="transition-all duration-500" />
            ))}
          </svg>

          {/* Core Node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.2)]">
              <span className="text-indigo-400 font-black text-[10px] tracking-widest text-center">CORE<br/>GENETIC</span>
            </div>
          </div>

          {/* Satellite Nodes */}
          {nodesData.map(node => (
            <div key={node.id} 
                 className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer z-20 group"
                 style={{ top: `${node.y}%`, left: `${node.x}%` }}
                 onClick={() => setActiveNode(node.id)}>
              
              <div className={`w-14 h-14 rounded-full border-2 bg-[#1a1b23] flex items-center justify-center transition-all duration-500
                  ${activeNode === node.id ? 'scale-125 shadow-[0_0_20px_currentColor]' : 'opacity-50 hover:opacity-100 hover:scale-110'}`}
                   style={{ borderColor: node.color, color: node.color }}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">{node.icon}</svg>
              </div>
              
              <div className={`mt-3 text-[9px] font-black px-2 py-1 border rounded transition-all uppercase tracking-widest
                  ${activeNode === node.id ? 'bg-white text-black border-white' : 'bg-slate-900 border-slate-700 text-slate-500'}`}>
                {node.label}
              </div>
            </div>
          ))}
        </div>

        {/* Data Panel (Right) */}
        <div className="w-full lg:w-[450px] bg-[#1a1b23] rounded-2xl border border-slate-800 flex flex-col relative overflow-hidden shadow-2xl">
          {activeData && (
            <>
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundColor: activeData.color }}></div>
              
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-xl bg-[#0d0e12] border-2 shadow-inner" style={{ borderColor: activeData.color, color: activeData.color }}>
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">{activeData.icon}</svg>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter ml-4 italic" style={{ color: activeData.color }}>{activeData.title}</h3>
                </div>
                
                <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                  <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium bg-[#0d0e12] p-5 rounded-xl border border-slate-800 shadow-inner">
                    {activeData.desc}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4">Critérios e Parâmetros</h4>
                    {activeData.items.map((item, idx) => (
                      <div key={idx} className="flex items-start text-sm text-slate-200 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 mr-4 flex-shrink-0" style={{ backgroundColor: activeData.color }}></div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-8 flex flex-wrap items-center gap-6 bg-[#0d0e12] p-5 rounded-2xl border border-slate-800 shadow-inner">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Selecione o Módulo:</span>
          <select 
            value={activeNode} 
            onChange={(e) => setActiveNode(e.target.value)}
            className="bg-[#1a1b23] border border-slate-700 rounded-lg px-4 py-2 text-[10px] font-black text-white uppercase focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer">
            {nodesData.map(node => (
              <option key={node.id} value={node.id}>{node.label}</option>
            ))}
          </select>
        </div>
        <div className="h-6 w-[1px] bg-slate-800 hidden md:block"></div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Engine: Híbrido C++/Go Ativo</span>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0d0e12;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #334155 #0d0e12;
        }
      `}</style>
    </div>
  );
}