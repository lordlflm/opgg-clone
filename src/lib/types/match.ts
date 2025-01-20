import type { Summoner } from "./summoner";
import type { Participant } from "./participant";

export interface Match {
    queueType: string;
    duration: number;
    participants: Array<Participant>;
    winningTeam: number;
}