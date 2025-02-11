<script lang="ts">
    import type { Participant } from "$lib/types/participant";
    import {
        displayAltIcon,
        itemIdToAssetName,
        perkIdToRuneName,
        secondaryRuneNameToAssetName,
        styleIdToRuneName,
        summonerSpellIdToAssertName,
    } from "$lib/utils/utils";

    export let team: Array<Participant>;
    export let server: string;
    export let gameDuration: number;
    export let winningTeam: number;
</script>

<main class="text-white">
    <div
        class="grid grid-cols-[2fr_1fr_1fr_2fr_3fr_2fr_2fr_2fr_7fr] max-w-250 bg-gray-700 text-gray-400"
    >
    <div class="text-center">
        <p>{team[0].teamId == 100 ? 'Red team' : 'Blue team'}</p>
        <p class={team[0].teamId == winningTeam ? 'text-blue-500' : 'text-red-500'}>{team[0].teamId == winningTeam ? 'Victory' : 'Defeat'}</p>
    </div>
        <p></p>
        <p></p>
        <p></p>
        <div class="flex justify-center items-center"><p>KDA</p></div>
        <div class="flex justify-center items-center"><p>Damage dealt</p></div>
        <div class="flex justify-center items-center"><p>Damage taken</p></div>
        <div class="flex justify-center items-center"><p>CS</p></div>
        <div class="flex justify-center items-center"><p>Items</p></div>
    </div>
    {#each team as participant}
        <a
            id="participant-anchor"
            class="{participant.teamId == winningTeam
                ? 'bg-blue-400 hover:bg-blue-300'
                : 'bg-red-400 hover:bg-red-300'} grid grid-cols-[2fr_1fr_1fr_2fr_3fr_2fr_2fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-1 p-1 items-center max-w-250"
            href="summoner?gameName={participant.gameName}&tagLine={participant.tagLine}&region={server}&puuid={participant.puuid}"
        >
            <div class="w-7/9">
                <img
                    id="participant-champion-icon"
                    src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/{participant.championId}.png"
                    alt="Couldn't fetch champion icon"
                    on:error={(event) => displayAltIcon(event)}
                    class="rounded-full ml-2"
                />
            </div>
            <div id="participant-summoner-spells-div" class="flex flex-col w-7/9">
                <div>
                    <img
                        src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/{summonerSpellIdToAssertName(
                            participant.summonerSpell1,
                        )}.png"
                        alt="Couldn't fetch spell 1 icon"
                        on:error={(event) => displayAltIcon(event)}
                        class="pb-1"
                    />
                </div>
                <div>
                    <img
                        src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/{summonerSpellIdToAssertName(
                            participant.summonerSpell2,
                        )}.png"
                        alt="Couldn't fetch spell 2 icon"
                        on:error={(event) => displayAltIcon(event)}
                    />
                </div>
            </div>
            <div id="participant-runes-div" class="flex flex-col justify-center items-center w-7/9">
                <div>
                    <img
                        id="primary-rune-icon"
                        src="https://raw.communitydragon.org/10.1/game/assets/perks/styles/{styleIdToRuneName(
                            participant.primaryStyleCategorieId,
                        )}/{perkIdToRuneName(
                            participant.primaryStylePerkId,
                        )}/{perkIdToRuneName(
                            participant.primaryStylePerkId,
                        )}.png"
                        alt="Couldn't fetch primary rune icon"
                        on:error={(event) => displayAltIcon(event)}
                    />
                </div>
                <div class="w-6/9">
                    <img
                        id="secondary-rune-icon"
                        src="https://raw.communitydragon.org/10.1/game/assets/perks/styles/{secondaryRuneNameToAssetName(
                            styleIdToRuneName(
                                participant.primaryStyleCategorieId,
                            ),
                        )}.png"
                        alt="Couldn't fetch secondary rune icon"
                        on:error={(event) => displayAltIcon(event)}
                    />
                </div>
            </div>
            <div class="flex flex-col items-center justify-center font-bold">
                <p id="participant-summoner-name-p">
                    {participant.gameName}
                </p>
                <!--TODO fetch rank?-->
                <!-- <p id="participant-summoner-rank-p" class="ml-[0.5%] mr-[0.5%]"></p> -->
            </div>
            <div class="flex flex-col items-center justify-center">
                <p id="participant-kda-p" class="">
                    {participant.kills}/{participant.deaths}/{participant.assists}
                </p>
                <p id="participant-kda-ratio-p">
                    {participant.deaths == 0
                        ? `(${participant.kills + participant.assists}:1 KDA)`
                        : `(${(
                              (participant.kills + participant.assists) /
                              participant.deaths
                          ).toFixed(2)}:1 KDA)`}
                </p>
            </div>
            <div class="flex justify-center">
                <p id="participant-damage-dealt-p">
                    {participant.totalDamageDealtToChampions}
                </p>
            </div>
            <div class="flex justify-center">
                <p id="participant-damage-taken-p">
                    {participant.totalDamageTaken}
                </p>
            </div>
            <div class="flex flex-col justify-center items-center">
                <p id="participant-cs-p">
                    {participant.minionKilled} cs
                </p>
                <p>
                    ({((participant.minionKilled / gameDuration) * 60).toFixed(
                        1,
                    )}/m)
                </p>
            </div>
            {#each participant.items as item}
                <div>
                    <img
                        src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/{itemIdToAssetName(
                            item,
                        )}.png"
                        alt="Couldn't fetch icon of item with id {itemIdToAssetName(
                            item,
                        )}"
                        on:error={(event) => displayAltIcon(event)}
                    />
                </div>
            {/each}
        </a>
    {/each}
</main>

<style></style>
