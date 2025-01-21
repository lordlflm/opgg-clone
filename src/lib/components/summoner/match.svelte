<script lang="ts">
    import type { Match } from "$lib/types/match";
    import type { Participant } from "$lib/types/participant";
    import type { Summoner } from "$lib/types/summoner";
    import {
        itemIdToAssetName,
        summonerSpellIdToAssertName,
    } from "$lib/utils/utils";

    import Team from "./team.svelte";

    export let match: Match;
    export let summoner: Summoner;

    let summonerChampionId: string = getSummonerChampionId();
    let matchDuration: string = formatMatchDuration();
    let summonerKDA: string = getSummonerKDA();
    let summonerItemsPath: Array<string> = getSummonerItemsPath();
    let teams: Array<Array<Participant>> = getTeams();
    let summonerSpellsId: Array<number> = getSummonerSpellsId();

    function getTeams() {
        let teams: Array<Array<Participant>> = [[], []];
        for (let participant of match.participants) {
            if ((participant.teamId = 100)) {
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

    function getSummonerChampionId(): string {
        for (let participant of match.participants) {
            if (participant.puuid == summoner.puuid) {
                return participant.championId.toString();
            }
        }
        return "";
    }

    function getSummonerKDA(): string {
        for (let participant of match.participants) {
            if (participant.puuid == summoner.puuid) {
                return participant.deaths == 0
                    ? `${participant.kills}/${participant.deaths}/${participant.assists} (${participant.kills + participant.assists}:1 KDA)`
                    : `${participant.kills}/${participant.deaths}/${participant.assists} (${((participant.kills + participant.assists) / participant.deaths).toFixed(2)}:1 KDA)`;
            }
        }
        return "";
    }

    function getSummonerItemsPath(): Array<string> {
        let itemsPath: Array<string> = [];

        for (let participant of match.participants) {
            if (participant.puuid == summoner.puuid) {
                for (let item of participant.items) {
                    // TODO I guess some icons arent available in community dragon
                    // yet. The icon is determined by a huge switch case in utility.ts.
                    // If thoses icons are added we need to add them manually. Find an alternative.

                    // TODO default empty icon can be replaced by css also.
                    itemsPath.push(itemIdToAssetName(item));
                }
                break;
            }
        }
        return itemsPath;
    }

    function getSummonerSpellsId(): Array<number> {
        let spellsId = [];
        for (let participant of match.participants) {
            if (participant.puuid == summoner.puuid) {
                spellsId.push(participant.summonerSpell1);
                spellsId.push(participant.summonerSpell2);
                break;
            }
        }
        return spellsId;
    }
</script>

<main>
    <div id="match-div">
        <!--TODO queue type-->
        <p id="queue-type-p"></p>
        <img
            id="summoner-champion-icon"
            src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/{summonerChampionId}.png"
            alt="Couldn't fetch champion icon"
        />
        <p id="game-duration-p">{matchDuration}</p>
        <div id="items-div">
            {#each summonerItemsPath as item}
                <img
                    src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/{item}.png"
                    alt="Couldn't fetch icon of item with id {item}"
                />
            {/each}
        </div>
        <div id="summoner-spells-div">
            <img
                src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/{summonerSpellIdToAssertName(
                    summonerSpellsId[0],
                )}.png"
                alt="Couldn't fetch spell 1 icon"
            />
            <img
                src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/{summonerSpellIdToAssertName(
                    summonerSpellsId[1],
                )}.png"
                alt="Couldn't fetch spell 2 icon"
            />
        </div>
        <!--TODO rune icons-->
        <div id="runes-div">
            <img src="" alt="Couldn't fetch primary rune icon" />
            <img src="" alt="Couldn't fetch secondary rune icon" />
        </div>
        <p id="kda-p">{summonerKDA}</p>
        <div id="participants-div">
            {#each teams as team}
                <Team {team} />
            {/each}
        </div>
    </div>
</main>

<style>
</style>
