import type { League } from "./league";

export interface Summoner {
    puuid: string;
    id: string;
    accountId: string;
    gameName: string;
    tagLine: string;
    iconId: number;
    level: number;
    server: string;
    soloLeague?: League;
    flexLeague?: League;
}