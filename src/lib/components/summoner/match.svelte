<script lang="ts">
    import type { Match } from "$lib/types/match";
    import type { Participant } from "$lib/types/participant";
    import type { Summoner } from "$lib/types/summoner";
    import {
        displayAltIcon,
        itemIdToAssetName,
        perkIdToRuneName,
        secondaryRuneNameToAssetName,
        styleIdToRuneName,
        summonerSpellIdToAssertName,
    } from "$lib/utils/utils";

    import Team from "./team.svelte";

    export let match: Match;
    export let summoner: Summoner;

    let summonerParticipantObject: Participant =
        getSummonerParticipantObject()!;
    let summonerKDA: string = getSummonerKDA();
    let teams: Array<Array<Participant>> = getTeams();

    // icons paths
    let summonerSpellsIconPaths: Array<string> = [];
    summonerSpellsIconPaths.push(
        `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${summonerSpellIdToAssertName(summonerParticipantObject.summonerSpell1)}.png`,
    );
    summonerSpellsIconPaths.push(
        `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/${summonerSpellIdToAssertName(summonerParticipantObject.summonerSpell2)}.png`,
    );
    let summonerChampionIconPath: string = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${summonerParticipantObject.championId}.png`;
    let summonerItemPaths: Array<string> = [];
    for (let item of summonerParticipantObject.items) {
        // TODO I guess some icons arent available in community dragon
        // yet. The icon is determined by a huge switch case in utility.ts.
        // If thoses icons are added we need to add them manually. Find an alternative.

        // TODO default empty icon can be replaced by css also.
        summonerItemPaths.push(
            `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/${itemIdToAssetName(item)}.png`,
        );
    }

    function getTeams() {
        let teams: Array<Array<Participant>> = [[], []];
        for (let participant of match.participants) {
            if (participant.teamId == 100) {
                teams[0].push(participant);
            } else {
                teams[1].push(participant);
            }
        }

        return teams;
    }

    function formatMatchDuration(): string {
        let hours = Math.floor(match.duration / 3600); // Total hours
        let minutes = Math.floor((match.duration % 3600) / 60); // Remaining minutes
        let seconds = match.duration % 60; // Remaining seconds

        return hours > 0
            ? `${hours}h ${minutes}m ${seconds}s`
            : `${minutes}m ${seconds}s`;
    }

    function getSummonerParticipantObject() {
        for (let participant of match.participants) {
            if (participant.puuid == summoner.puuid) {
                return participant;
            }
        }
    }

    function getSummonerKDA() {
        return summonerParticipantObject.deaths == 0
            ? `${summonerParticipantObject.kills}/${summonerParticipantObject.deaths}/${summonerParticipantObject.assists} (${summonerParticipantObject.kills + summonerParticipantObject.assists}:1 KDA)`
            : `${summonerParticipantObject.kills}/${summonerParticipantObject.deaths}/${summonerParticipantObject.assists} (${((summonerParticipantObject.kills + summonerParticipantObject.assists) / summonerParticipantObject.deaths).toFixed(2)}:1 KDA)`;
    }
</script>

<main>
    <div
        id="match-div"
        class="border-3 {summonerParticipantObject.teamId == match.winningTeam
            ? 'border-blue-500'
            : 'border-red-500'} mb-10 p-3 bg-gray-800 text-white font-bold"
    >
        <div class="flex pb-3 max-w-250">
            <div class="flex flex-col text-center">
                <p id="queue-type-p">{match.queueType}</p>
                <p id="is-victory" class="pt-10 {summonerParticipantObject.teamId == match.winningTeam
                        ? "text-blue-500"
                        : "text-red-500"}">
                    {summonerParticipantObject.teamId == match.winningTeam
                        ? "Victory"
                        : "Defeat"}
                </p>
                <p id="game-duration-p">{formatMatchDuration()}</p>
            </div>
            <div class="px-5 flex items-center">
                <img
                    id="summoner-champion-icon"
                    src={summonerChampionIconPath}
                    alt="Couldn't fetch champion icon"
                    on:error={(event) => displayAltIcon(event)}
                    class="rounded-full"
                />
            </div>
            <div id="summoner-spells-div" class="flex flex-col justify-center">
                <div class="w-[75%] pb-2">
                    <img
                        id="spell-1-icon"
                        src={summonerSpellsIconPaths[0]}
                        alt="Couldn't fetch spell 1 icon"
                        on:error={(event) => displayAltIcon(event)}
                    />
                </div>
                <div class="w-[75%]">
                    <img
                        id="spell-2-icon"
                        src={summonerSpellsIconPaths[1]}
                        alt="Couldn't fetch spell 2 icon"
                        on:error={(event) => displayAltIcon(event)}
                    />
                </div>
            </div>
            <div
                id="runes-div"
                class="flex flex-col justify-center items-center"
            >
                <div class="w-10">
                    <img
                        id="primary-rune-icon"
                        src="https://raw.communitydragon.org/10.1/game/assets/perks/styles/{styleIdToRuneName(
                            summonerParticipantObject.primaryStyleCategorieId,
                        )}/{perkIdToRuneName(
                            summonerParticipantObject.primaryStylePerkId,
                        )}/{perkIdToRuneName(
                            summonerParticipantObject.primaryStylePerkId,
                        )}.png"
                        alt="Couldn't fetch primary rune icon"
                        on:error={(event) => displayAltIcon(event)}
                    />
                </div>
                <div class="w-7">
                    <img
                        id="secondary-rune-icon"
                        src="https://raw.communitydragon.org/10.1/game/assets/perks/styles/{secondaryRuneNameToAssetName(
                            styleIdToRuneName(
                                summonerParticipantObject.primaryStyleCategorieId,
                            ),
                        )}.png"
                        alt="Couldn't fetch secondary rune icon"
                        on:error={(event) => displayAltIcon(event)}
                    />
                </div>
            </div>
            <div class="flex justify-center text-center items-center w-[25%]">
                <p id="kda-p">{summonerKDA}</p>
            </div>
            <div
                id="items-div"
                class="flex justify-center items-center mx-auto"
            >
                {#each summonerItemPaths as item}
                    <div class="p-1 w-[15%]">
                        <img
                            id="summoner-item-icon"
                            src={item}
                            alt="Couldn't fetch icon of item with id {item}"
                            on:error={(event) => displayAltIcon(event)}
                        />
                    </div>
                {/each}
            </div>
        </div>
        <div id="participants-div">
            {#each teams as team}
                <Team
                    {team}
                    server={summoner.server}
                    gameDuration={match.duration}
                    winningTeam={match.winningTeam}
                />
            {/each}
        </div>
    </div>
</main>

<style>
</style>
