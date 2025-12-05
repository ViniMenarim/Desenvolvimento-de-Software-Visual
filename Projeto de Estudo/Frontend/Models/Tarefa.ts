// src/models/tarefa.ts
export interface Tarefa {
  id?: number;
  titulo: string;
  descricao: string;
  status: string;
  criadoEm?: string;
}
