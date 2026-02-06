
export type Situation = 
  | 'assalariado'
  | 'autonomo'
  | 'aposentado'
  | 'mei'
  | 'desempregado'
  | 'nuncaTrabalhou'
  | 'beneficiario'
  | 'estagiario'
  | 'produtor'
  | 'socio';

export type Housing = '' | 'alugada' | 'cedida' | 'financiada' | 'propria';

export type YesNo = '' | 'sim' | 'nao';

export interface PersonData {
  id: string;
  name: string;
  situations: Situation[];
}

export interface CandidateData extends PersonData {
  housing: Housing;
  isSingleOrphan: YesNo;
  hasRentalIncome: YesNo;
  hasFarm: YesNo;
}
