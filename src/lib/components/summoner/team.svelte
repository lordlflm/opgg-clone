<script lang="ts">
    import type { Participant } from "$lib/types/participant";
    import { itemIdToAssetName } from "$lib/utils/utils";

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
            <img src="" alt="Couldn't fetch spell 1 icon" />
            <img src="" alt="Couldn't fetch spell 2 icon" />
        </div>
        <!--TODO rune icons-->
        <div id="participant-runes-div">
            <img src="" alt="Couldn't fetch primary rune icon" />
            <img src="" alt="Couldn't fetch secondary rune icon" />
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
