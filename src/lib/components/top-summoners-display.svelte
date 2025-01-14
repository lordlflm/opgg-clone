<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { onMount } from "svelte";

  import {
    region_tag_to_region,
    RANKED_FLEX_LEAGUE,
    RANKED_SOLO_LEAGUE,
  } from "$lib/utils/utils";

  import type { Summoner } from "$lib/types/summoner";

  let rankTypeSelect: HTMLSelectElement;

  let topSummonersFetched: boolean = false;
  let topSummonersArray: Array<Summoner>;

  onMount(async () => {
    await onRankTypeSelectChange();
  });

  async function onRankTypeSelectChange() {
    if (rankTypeSelect!.value === "flex") {
      await fetchTopPlayers(RANKED_FLEX_LEAGUE);
    } else {
      await fetchTopPlayers(RANKED_SOLO_LEAGUE);
    }
  }

  async function fetchTopPlayers(queueType: string) {
    topSummonersFetched = false;
    const topSummoners: Array<any> | string = await invoke("get_top_players", {
      queue: queueType,
    });
    topSummonersArray = new Array();
    if (topSummoners.length != 0) {
      for (let summoner of topSummoners) {
        if (summoner.success === "true") {
          let summonerObject: Summoner = {
            puuid: summoner.puuid.slice(1, -1),
            id: summoner.summonerId.slice(1, -1),
            accountId: summoner.accountId.slice(1, -1),
            gameName: summoner.gameName.slice(1, -1),
            tagLine: summoner.tagLine.slice(1, -1),
            iconId: summoner.profileIconId,
            level: summoner.summonerLevel,
            server: region_tag_to_region(summoner.region),
          };

          if (queueType == RANKED_SOLO_LEAGUE) {
            summonerObject.soloLeague = {
              leagueType: RANKED_SOLO_LEAGUE,
              tier: "CHALLENGER",
              rank: "I",
              leaguePoints: summoner.leaguePoints,
              wins: summoner.wins,
              losses: summoner.losses,
            };
          } else if (queueType == RANKED_FLEX_LEAGUE) {
            summonerObject.flexLeague = {
              leagueType: RANKED_FLEX_LEAGUE,
              tier: "CHALLENGER",
              rank: "I",
              leaguePoints: summoner.leaguePoints,
              wins: summoner.wins,
              losses: summoner.losses,
            };
          }

          topSummonersArray.push(summonerObject);
        }
      }
      topSummonersFetched = true;
    } else {
      console.error("Couldn't fetch top players");
    }
  }
</script>

<main class="container">
  <div id="top-players-container-div">
    <h2 id="top-summoners-h2">Top summoners</h2>
    <select
      id="rank-type-select"
      bind:this={rankTypeSelect}
      on:change={onRankTypeSelectChange}
    >
      <option value={RANKED_SOLO_LEAGUE}>Ranked Solo/Duo</option>
      <option value={RANKED_FLEX_LEAGUE}>Ranked Flex</option>
    </select>
    <div id="top-summoners-cards-div">
      {#if topSummonersFetched}
        {#each topSummonersArray! as summoner}
          <div id="summoner-card-div">
            <!-- TODO change route -->
            <a href="/">
              <h3 id="region-h3">Top player of {summoner.server} server</h3>
              <img
                src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/{summoner.iconId}.jpg"
                alt="Icon not found"
              />
              <p id="summoner-name">{summoner.gameName}</p>
              {#if rankTypeSelect.value == RANKED_SOLO_LEAGUE}
                <p id="league-points-p">
                  Challenger {summoner.soloLeague?.leaguePoints} LP
                </p>
                <p id="winrate-p">
                  {summoner.soloLeague?.wins} wins / {summoner.soloLeague
                    ?.losses} losses ({Math.round(
                    (Number(summoner.soloLeague?.wins!) /
                      (Number(summoner.soloLeague?.losses!) +
                        Number(summoner.soloLeague?.wins!))) *
                      100,
                  )}% winrate)
                </p>
              {:else if rankTypeSelect.value == RANKED_FLEX_LEAGUE}
                <p id="league-points-p">
                  Challenger {summoner.flexLeague?.leaguePoints} LP
                </p>
                <p id="winrate-p">
                  {summoner.flexLeague?.wins} wins / {summoner.flexLeague
                    ?.losses} losses ({Math.round(
                    (Number(summoner.flexLeague?.wins!) /
                      (Number(summoner.flexLeague?.losses!) +
                        Number(summoner.flexLeague?.wins!))) *
                      100,
                  )}% winrate)
                </p>
              {/if}
            </a>
          </div>
        {/each}
      {:else}
        <p id="fetching-msg">Fetching top players... (probably not you)</p>
        <!-- TODO add loading circle with css? -->
        <!-- TODO add some timeout mechanism where an error is displayed -->
      {/if}
    </div>
  </div>
</main>

<style></style>
