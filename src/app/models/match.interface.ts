export interface Match {
    id?: number;
    championshipId: number;
    homeTeamId: number;
    awayTeamId: number;
    matchDate: string;
    homeTeamGoals?: number;
    awayTeamGoals?: number;
    status: MatchStatus;
    round: number;
  }
  
  export type MatchStatus =
    | 'SCHEDULED'
    | 'IN_PROGRESS'
    | 'FINISHED'
    | 'CANCELLED';
  