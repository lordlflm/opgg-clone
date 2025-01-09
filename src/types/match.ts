import type { Summoner } from "./summoner";

export class Match {
    victory: boolean | null;
    queueType: string | null;
    participants: Array<Summoner>;

    constructor() {
        this.victory = null;
        this.queueType = null;
        this.participants = [];
    }
}