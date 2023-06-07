const mapping: Record<string, string> = {
  academies: 'academy',
  coaches: 'coach',
  events: 'event',
  exercises: 'exercise',
  players: 'player',
  'player-training-plans': 'player_training_plan',
  teams: 'team',
  'training-plans': 'training_plan',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
