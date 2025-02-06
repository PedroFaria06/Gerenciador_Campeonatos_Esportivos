export type ChampionshipStatus =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'FINISHED'
  | 'CANCELLED';

export interface Championship {
  id?: number;
  name: string;
  startDate: string;
  endDate: string;
  season: string;
  status: ChampionshipStatus;
  teamIds?: number[];
}
