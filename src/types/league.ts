export class League {
    leagueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;

    constructor(
        leagueType: string,
        tier: string,
        rank: string,
        leaguePoints: number,
        wins: number,
        losses: number
    ) {
        this.leagueType = leagueType;
        this.tier = tier;
        this.rank = rank;
        this.leaguePoints = leaguePoints;
        this.wins = wins;
        this.losses = losses;
    }
}