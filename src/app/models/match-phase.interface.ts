import { MatchGroup } from './match-group.interface';
export interface MatchPhase {
  nome: string;
  status: string;
  groups: MatchGroup[];
}
