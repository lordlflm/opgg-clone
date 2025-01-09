import { League } from "./league";

export class Summoner {
    puuid: string;
    id: string;
    accountId: string;
    gameName: string;
    tagLine: string;
    iconId: number;
    level: number;
    server: string;
    soloLeague: League | null;
    flexLeague: League | null;

    constructor(
        puuid: string, 
        id: string, 
        accountId: string, 
        gameName: string, 
        tagLine: string, 
        iconId: number, 
        level: number,
        server: string
    ) {
        this.puuid = puuid;
        this.id = id;
        this.accountId = accountId;
        this.gameName = gameName;
        this.tagLine = tagLine;
        this.iconId = iconId;
        this.level = level;
        this.server = server;
        this.soloLeague = null;
        this.flexLeague = null;
    }
}