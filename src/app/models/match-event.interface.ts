export interface MatchEvent {
    id?: number;
    matchId: number;
    eventType: EventType;
    playerId: number;
    minute: number;
    observation?: string;
  }
  
  export type EventType = 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION';
  