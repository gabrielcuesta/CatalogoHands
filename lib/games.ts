import { Game } from '../types/game';

const gameSheet = process.env.GAME_SHEET_URL ?? '';

export const getGames = async (): Promise<Game[]> => {
  const res = await fetch(gameSheet);
  return await res.json();
};
