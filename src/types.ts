export interface Student {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  status: 'Ativo' | 'Silencioso' | 'Inativo';
  risk: 'Baixo' | 'Médio' | 'Alto';
  phase: 'Thriving' | 'Active' | 'Onboarding';
  module: string;
  lastInteraction: string;
  profileType: string[];
  currentStatusText: string;
  aiMemory: {
    week: string;
    status: string;
    desc: string;
    icon: string;
    color: string;
  }[];
}

export interface Message {
  senderName: string;
  senderType: 'ai' | 'student' | 'mentor';
  timestamp: string;
  text: string;
  intention?: string;
  emotion?: string;
  attachment?: {
    title: string;
    type: string;
    duration?: string;
  };
}

export type BlockType = 'trigger' | 'condition' | 'ai' | 'task' | 'alert';

export interface BlockTemplate {
  type: BlockType;
  name: string;
  subtext: string;
  icon: string;
}

export interface CanvasNode {
  id: string;
  type: BlockType;
  name: string;
  subtext: string;
  x: number;
  y: number;
  inputs?: string[];
  outputs?: string[];
}
