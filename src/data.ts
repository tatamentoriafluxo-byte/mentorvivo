import { Student, BlockTemplate, CanvasNode, Message } from './types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'student-lucas-silva',
    name: 'Lucas Silva',
    email: 'lucas.silva@example.com',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmDn_REfprF9qJTa4KdlHC9-bEeYNLUg2F-hmXrD_01k5ITEsi50WPV5Gx0OK8w1gVNrfrB8ECw7aVM5zEoJh0-VtY1R8QZwKGCo8BdNiCkfeVkzMzJ73Jf3Pk_7urox0A6bnT2nYJnr50mZ1j32mMgaD0ffG5HfDc3q1aRdm1pN-J8Njbbwo2Ft9igWVvjLPZLB6qDyWLleBial_razwXA4XVGSTYFNwNCFJ-LMbuZ2dRjxL6OnnKZ6X4EmfITptZI_Ps47n00wQ',
    status: 'Ativo',
    risk: 'Alto',
    phase: 'Active',
    module: 'Module 4',
    lastInteraction: '2h',
    profileType: ['Visual', 'Prático'],
    currentStatusText: 'Desmotivado com a disciplina de Lógica. Relata dificuldade específica em estruturas de dados básicas (Arrays). Precisa de encorajamento constante.',
    aiMemory: [
      { week: 'Semana 1: Engajamento Alto', status: 'check', desc: 'Entregou todos os exercícios de variáveis.', icon: 'check', color: 'text-emerald-600 bg-emerald-100' },
      { week: 'Semana 2: Queda Brusca', status: 'warning', desc: 'Não acessou material de Loops.', icon: 'warning', color: 'text-rose-600 bg-rose-100' },
      { week: 'Intervenção AI: Sucesso parcial', status: 'smart_toy', desc: 'Respondeu bem a resumos visuais.', icon: 'smart_toy', color: 'text-purple-600 bg-purple-100' }
    ]
  },
  {
    id: 'student-mariana-costa',
    name: 'Mariana Costa',
    email: 'marianacosta@example.com',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfKe5vbS9cqEhVXDmBqc29iNDKFHA0kB4hBjKXvKRMEn6DxHXM8Hq6O0DSzKw_61QXX26gIUOZr_BC8VOUkjUXOGhSkoVuUppG_NUtlJi_qWtbFuI6yLOiBlGp0lsmLIlZJqXLWoFpqVJ0IyDpP5Gtja8AZ7UYrjxeEv7MmUKfZE7hDFpmLvy00KZL96MCN-AO3zXZEhzZNtFt2Wv_UXy8BeVo3RRzPuTJtMS6uohaBKj93_91JCs1SXe4f92KIf4axK5nmHNxXrM',
    status: 'Ativo',
    risk: 'Baixo',
    phase: 'Thriving',
    module: 'Module 2',
    lastInteraction: '1h',
    profileType: ['Visual', 'Teórico'],
    currentStatusText: 'Excelente ritmo de entrega, absorve conceitos teóricos muito bem e tira dúvidas pontuais nas mentorias em grupo.',
    aiMemory: [
      { week: 'Semana 1: Engajamento Máximo', status: 'check', desc: 'Entregou todos os desafios de lógica matemática.', icon: 'check', color: 'text-emerald-600 bg-emerald-100' },
      { week: 'Semana 2: Foco em Prática', status: 'check', desc: 'Refatorou código de calculadora três vezes.', icon: 'verified', color: 'text-emerald-600 bg-emerald-100' }
    ]
  },
  {
    id: 'student-lucas-oliveira',
    name: 'Lucas Oliveira',
    email: 'lucas.o@example.com',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Zr7BRMBsOMcP5xNNb8ePEcySMDOqnq0Y4-tMCkSaeVHZ7cZKFZqCUxckZbGaDJhlf3xjALxfAL_EvkYhudNijsdhna_kAXdAsXnjRuS8Lri7iUvnSpL4ETw_uzdus_qHUoF8jMZNwV1c9Ujqrqj8re7I1F-opdh1V7lLfEYmaOotRjkUZaDxMJqryJzURJ7WZVF44Z6jcC_jOYV2jnRtM3wysiCKaQZ4dGRWy6KkA2aqgkCuoXfTyHSuyF05fGKQdTOTlUW4gLU',
    status: 'Silencioso',
    risk: 'Médio',
    phase: 'Active',
    module: 'Module 3',
    lastInteraction: '1d',
    profileType: ['Prático', 'Auditivo'],
    currentStatusText: 'Estuda em períodos curtos aos finais de semana. Beneficia-se de lembretes rápidos via canais de áudio e podcasts curtos.',
    aiMemory: [
      { week: 'Semana 1: Organização Inicial', status: 'check', desc: 'Criou repositório Github do projeto.', icon: 'check', color: 'text-emerald-600 bg-emerald-100' },
      { week: 'Semana 3: Feedback Pendente', status: 'help', desc: 'Solicitou ajuda no fórum mas demorou a ler.', icon: 'forum', color: 'text-amber-600 bg-amber-100' }
    ]
  },
  {
    id: 'student-beatriz-silva',
    name: 'Beatriz Silva',
    email: 'bia.silva@example.com',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEBOrx4EUN341hxsKTZ2c1pKmybbjmWkZ3eKOo0Yq7RRXHp5kruNhI7omZmFjboGdKuXfixbMf9N6_5hEOwyEUXy1oZrpt6KAjE9sBJ8YOycG8oH3XPP0MihtqbEbXyMtqJmIuqK5Gn0Fq3c7DK7CossJuirt-uQTGZUFFbr84ViD1TrwM5La0HsOHnwZrOJyk6hWjwxPOc5afLZpVwSC_kbUMz94KzrJo5nu8BRdQqf2YLwOXzZxsgDvLIiUkCJZ-mbyM5R3kixE',
    status: 'Ativo',
    risk: 'Alto',
    phase: 'Onboarding',
    module: 'Module 1',
    lastInteraction: '5h',
    profileType: ['Visual', 'Prático'],
    currentStatusText: 'Parada no projeto inicial de lógica. Relatou insegurança extrema para submeter as primeiras linhas de código e medo de falhar nos testes.',
    aiMemory: [
      { week: 'Semana 1: Acesso Inicial', status: 'check', desc: 'Preencheu o formulário de perfil com sucesso.', icon: 'assignment', color: 'text-emerald-600 bg-emerald-100' },
      { week: 'Estágio Atual: Paralisia', status: 'error', desc: 'Clonou o repositório mas sem commits há 4 dias.', icon: 'error', color: 'text-rose-600 bg-rose-100' }
    ]
  }
];

export const INITIAL_CHATS: Record<string, Message[]> = {
  'student-lucas-silva': [
    {
      senderName: 'Mentor Vivo AI',
      senderType: 'ai',
      timestamp: '09:41',
      text: 'Olá, Lucas! Notei que você não acessou o material da última semana de Lógica de Programação. Está tudo bem? Como posso te ajudar a organizar os estudos para não acumular?',
      intention: 'Reengajar'
    },
    {
      senderName: 'Lucas Silva',
      senderType: 'student',
      timestamp: '10:15',
      text: 'Oi... pois é, eu travei na parte de arrays. Tentei fazer o exercício 3 mas não roda de jeito nenhum. Fiquei meio desanimado.',
      emotion: 'Frustração'
    },
    {
      senderName: 'Mentor Vivo AI',
      senderType: 'ai',
      timestamp: '10:16',
      text: 'Entendo perfeitamente, Lucas. Arrays podem ser confusos no começo mesmo. Não desanime! Que tal fazermos o seguinte: vou te mandar um pequeno vídeo interativo de 3 minutos que explica arrays visualmente. Depois, podemos olhar o exercício 3 juntos, passo a passo. Topa?',
      intention: 'Suporte Técnico e Motivacional',
      attachment: {
        title: 'Arrays Descomplicados',
        type: 'Vídeo Interativo',
        duration: '3 min'
      }
    }
  ],
  'student-mariana-costa': [
    {
      senderName: 'Mentor Vivo AI',
      senderType: 'ai',
      timestamp: '14:00',
      text: 'Excelente trabalho na refatoração, Mariana! Seu código ficou super limpo. Quer algum desafio avançado sobre estruturas de repetição?',
      intention: 'Aprofundamento'
    },
    {
      senderName: 'Mariana Costa',
      senderType: 'student',
      timestamp: '14:05',
      text: 'Olá! Sim, por favor! Queria entender melhor complexidade O(N) versus O(N²). Sinto que posso otimizar ainda mais.',
      emotion: 'Thriving / Curiosidade'
    },
    {
      senderName: 'Mentor Vivo AI',
      senderType: 'ai',
      timestamp: '14:06',
      text: 'Que incrível! Vou te enviar agora mesmo um infográfico interativo sobre Notação Big O com exemplos práticos em JavaScript.',
      intention: 'Suporte Avançado',
      attachment: {
        title: 'Big-O Descomplicado',
        type: 'Infográfico Interativo',
        duration: '5 min'
      }
    }
  ],
  'student-lucas-oliveira': [
    {
      senderName: 'Mentor Vivo AI',
      senderType: 'ai',
      timestamp: 'Ontem',
      text: 'Lucas, vi que você passou o final de semana sem acessar a plataforma. Houve algum imprevisto? Se precisar ajustar o cronograma, conte comigo.',
      intention: 'Verificação'
    },
    {
      senderName: 'Lucas Oliveira',
      senderType: 'student',
      timestamp: 'Hoje 08:30',
      text: 'Oi! Tudo sob controle, apenas tive muito plantão na firma. Vou focar nas práticas de condicionais hoje à noite.',
      emotion: 'Focado / Neutro'
    }
  ],
  'student-beatriz-silva': [
    {
      senderName: 'Mentor Vivo AI',
      senderType: 'ai',
      timestamp: 'Ontem',
      text: 'Oi Beatriz! Tudo bem? Vi que você configurou seu ambiente mas ainda não iniciou os testes locais. Quer estruturar o primeiro teste de simulação junto comigo?',
      intention: 'Redução de Ansiedade'
    },
    {
      senderName: 'Beatriz Silva',
      senderType: 'student',
      timestamp: 'Hoje 09:12',
      text: 'Tenho bastante receio de quebrar o setup ou ver aquele monte de erro vermelho no console. Fico adiando o primeiro comando por causa disso.',
      emotion: 'Ansiedade / Paralisia'
    }
  ]
};

export const BLOCKS_TEMPLATES: BlockTemplate[] = [
  { type: 'trigger', name: 'Gatilho', subtext: 'Start flow', icon: 'bolt' },
  { type: 'condition', name: 'Condição', subtext: 'If / Else', icon: 'alt_route' },
  { type: 'ai', name: 'IA Resposta', subtext: 'Generate text', icon: 'auto_awesome' },
  { type: 'task', name: 'Tarefa', subtext: 'Assign work', icon: 'check_circle' },
  { type: 'alert', name: 'Alerta Humano', subtext: 'Notify mentor', icon: 'person_alert' }
];

export const INITIAL_CANVAS_NODES: CanvasNode[] = [
  {
    id: 'node-1',
    type: 'trigger',
    name: 'Gatilho',
    subtext: 'User sends message',
    x: 120,
    y: 160
  },
  {
    id: 'node-2',
    type: 'condition',
    name: 'Condição',
    subtext: 'Sentiment is negative?',
    x: 420,
    y: 280
  },
  {
    id: 'node-3',
    type: 'ai',
    name: 'IA Resposta',
    subtext: 'Send encouragement',
    x: 770,
    y: 160
  },
  {
    id: 'node-4',
    type: 'alert',
    name: 'Alerta Humano',
    subtext: 'Escalate to mentor',
    x: 770,
    y: 420
  }
];

export const INITIAL_MESSAGES_DASHBOARD = [
  {
    id: 'm1',
    sender: 'Ana P.',
    time: '10 min ago',
    text: '"Professor, fiquei com dúvida no exercício 3. Pode me ajudar?"',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    type: 'chat'
  },
  {
    id: 'm2',
    sender: 'Carlos M.',
    time: '1 hr ago',
    text: '"Muito obrigado pelo feedback do projeto final! Entendi os pontos."',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    type: 'forum'
  }
];
