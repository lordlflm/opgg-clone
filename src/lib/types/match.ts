import type { Summoner } from "./summoner";

export interface Match {
    victory: boolean | null;
    queueType: string | null;
    participants: Array<Summoner>;
}