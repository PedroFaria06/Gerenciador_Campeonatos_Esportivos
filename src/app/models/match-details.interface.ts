import { PlayerMatch } from './player-match.interface';
import { MatchEvent } from './match-event.interface';

export interface MatchDetails {
  id: number;
  championshipId: number;
  matchDate: string;
  location: string;
  referee?: string;
  homeTeam: TeamDetails;
  awayTeam: TeamDetails;
  events: MatchEvent[];
}

export interface TeamDetails {
  id: number;
  name: string;
  coach: string;
  players: PlayerMatch[];
}
