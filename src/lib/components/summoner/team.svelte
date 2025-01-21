<script lang="ts">
    import type { Participant } from "$lib/types/participant";
    import {
        itemIdToAssetName,
        perkIdToRuneName,
        secondaryRuneNameToAssetName,
        styleIdToRuneName,
        summonerSpellIdToAssertName,
    } from "$lib/utils/utils";

    export let team: Array<Participant>;
</script>

<main>
    {#each team as participant}
        <img
            id="participant-champion-icon"
            src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/{participant.championId}.png"
            alt="Couldn't fetch champion icon"
        />
        <div id="participant-summoner-spells-div">
            <img
                src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/{summonerSpellIdToAssertName(
                    participant.summonerSpell1,
                )}.png"
                alt="Couldn't fetch spell 1 icon"
            />
            <img
                src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/{summonerSpellIdToAssertName(
                    participant.summonerSpell2,
                )}.png"
                alt="Couldn't fetch spell 2 icon"
            />
        </div>
        <div id="participant-runes-div">
            <img
                src="https://raw.communitydragon.org/10.1/game/assets/perks/styles/{styleIdToRuneName(
                    participant.primaryStyleCategorieId,
                )}/{perkIdToRuneName(
                    participant.primaryStylePerkId,
                )}/{perkIdToRuneName(participant.primaryStylePerkId)}.png"
                alt="Couldn't fetch primary rune icon"
            />
            <img
                src="https://raw.communitydragon.org/10.1/game/assets/perks/styles/{secondaryRuneNameToAssetName(
                    styleIdToRuneName(participant.primaryStyleCategorieId),
                )}.png"
                alt="Couldn't fetch secondary rune icon"
            />
        </div>
        <p id="participant-summoner-name-p">{participant.gameName}</p>
        <!--TODO fetch rank?-->
        <p id="participant-summoner-rank-p"></p>
        <p id="participant-kda-p">
            {participant.deaths == 0
                ? `${participant.kills}/${participant.deaths}/${participant.assists}
            (${participant.kills + participant.assists}:1 KDA)`
                : `${participant.kills}/${participant.deaths}/${participant.assists}
            (${(
                (participant.kills + participant.assists) /
                participant.deaths
            ).toFixed(2)}:1 KDA)`}
        </p>
        <p id="participant-damage-dealt-p">
            {participant.totalDamageDealtToChampions}
        </p>
        <p id="participant-damage-taken-p">{participant.totalDamageTaken}</p>
        <p id="participant-cs-p">{participant.minionKilled}</p>
        {#each participant.items as item}
            <img
                src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/{itemIdToAssetName(
                    item,
                )}.png"
                alt="Couldn't fetch icon of item with id {itemIdToAssetName(
                    item,
                )}"
            />
        {/each}
    {/each}
</main>

<style></style>
