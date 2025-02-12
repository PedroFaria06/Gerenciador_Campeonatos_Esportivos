export interface MatchEvent {
  id?: number;
  matchId: number;
  eventType: EventType;
  playerId: number;
  eventMinute: number;
  observation?: string;
}

export type EventType = 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION';
