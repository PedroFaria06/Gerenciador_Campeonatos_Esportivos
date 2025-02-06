import { Match } from './match.interface';
export interface MatchGroup {
  nome: string;
  status: string;
  expanded: boolean;
  matches: Match[];
}
