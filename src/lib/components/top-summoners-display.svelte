<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { region_tag_to_region } from "$lib/utils/utils";
  import { onMount } from "svelte";

  import type { Summoner } from "$lib/types/summoner";

  let rankTypeSelect: HTMLSelectElement;
  let topPlayersContainerDiv: HTMLDivElement;

  let top_summoners_fetched: boolean = false;
  let top_summoners_array: Array<Summoner>;

  onMount(async () => {
    await onRankTypeSelectChange()
  });

  async function onRankTypeSelectChange() {
    const rankType = rankTypeSelect!.value;

    if (rankType === "flex") {
      await fetch_top_players("RANKED_FLEX_SR");
    } else {
      await fetch_top_players("RANKED_SOLO_5x5");
    }
  };

  async function fetch_top_players(queueType: string) {
    top_summoners_fetched = false;
    const top_summoners: Array<any> | string = await invoke("get_top_players", { queue: queueType });
    top_summoners_array = new Array();
    if (top_summoners.length != 0) {
      for (let summoner of top_summoners) {
        if (summoner.success === "true") {
          let summoner_object: Summoner = {
            puuid: summoner.puuid.slice(1, -1),
            id: summoner.summonerId.slice(1, -1),
            accountId: summoner.accountId.slice(1, -1),
            gameName: summoner.gameName.slice(1, -1),
            tagLine: summoner.tagLine.slice(1, -1),
            iconId: summoner.profileIconId,
            level: summoner.summonerLevel,
            server: region_tag_to_region(summoner.region)
          };

          if (queueType == "RANKED_SOLO_5x5") {
            summoner_object.soloLeague = {
              leagueType: "RANKED_SOLO_5x5", 
              tier: "CHALLENGER", 
              rank: "I", 
              leaguePoints: summoner.leaguePoints,
              wins: summoner.wins,
              losses: summoner.losses,
            }
          } else if (queueType == "RANKED_FLEX_SR") {
            summoner_object.flexLeague = {
              leagueType: "RANKED_FLEX_SR", 
              tier: "CHALLENGER", 
              rank: "I", 
              leaguePoints: summoner.leaguePoints,
              wins: summoner.wins,
              losses: summoner.losses,
            }
          }
          
          top_summoners_array.push(summoner_object);
        }
      }
      top_summoners_fetched = true;
    } else {
      console.error("Couldn't fetch top players");
    }
  }
</script>

<main class="container">
    <div id="top-players-container-div" bind:this={topPlayersContainerDiv}> 

      <h2 id="top-summoners-h2">Top summoners</h2>
      <select id="rank-type-select" bind:this={rankTypeSelect} on:change={onRankTypeSelectChange}>
        <option value="solo">Ranked Solo/Duo</option>
        <option value="flex">Ranked Flex</option>
      </select>
      <div id="top-summoners-cards-div">
        {#if top_summoners_fetched}
          {#each top_summoners_array! as summoner}
            <div id="summoner-card-div">
              <!-- TODO change route -->
              <a href="/">
                <h3 id="region-h3">Top player of {summoner.server} server</h3>
                <img src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/{summoner.iconId}.jpg" alt="Icon not found">
                <p id="summoner-name">{summoner.gameName}</p>
                {#if rankTypeSelect.value == "solo"}
                  <p id="league-points-p">Challenger {summoner.soloLeague?.leaguePoints} LP</p>
                  <p id="winrate-p">{summoner.soloLeague?.wins} wins / {summoner.soloLeague?.losses} losses ({Math.round(Number(summoner.soloLeague?.wins!)/(Number(summoner.soloLeague?.losses!) + Number(summoner.soloLeague?.wins!))*100)}% winrate)</p>
                {:else if rankTypeSelect.value == "flex"}
                  <p id="league-points-p">Challenger {summoner.flexLeague?.leaguePoints} LP</p>
                  <p id="winrate-p">{summoner.flexLeague?.wins} wins / {summoner.flexLeague?.losses} losses ({Math.round(Number(summoner.flexLeague?.wins!)/(Number(summoner.flexLeague?.losses!) + Number(summoner.flexLeague?.wins!))*100)}% winrate)</p>
                {/if}
              </a>
            </div>
          {/each}
        {:else}
          <p id="fetching-msg">Fetching top players... (probably not you)</p>
          <!-- TODO add loading circle with css? -->
        {/if}
      </div>
    </div>
</main>

<style></style>