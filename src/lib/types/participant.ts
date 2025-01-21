export interface Participant {
    gameName: string;
    tagLine: string;
    puuid: string;
    champion: string;
    championId: number;
    championLevel: number
    lane: string;
    items: Array<number>;
    kills: number;
    deaths: number;
    assists: number;
    goldEarned: number;
    summonerSpell1: number;
    summonerSpell2: number;
    teamId: number;
    minionKilled: number;
    totalDamageDealtToChampions: number;
    totalDamageTaken: number;
    primaryStyleCategorieId: number;
    primaryStylePerkId: number;
    secondaryStyleCategorieId: number;
}