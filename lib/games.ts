import { Game } from "../types/game";

export const getGames = async (): Promise<Game[]> => {
  const res = await fetch(process.env.GAME_SHEET_URL);
  return await res.json();
};
