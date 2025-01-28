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

<main class="mb-20">
  <div
    id="top-players-container-div"
    class="flex flex-col items-center justify-center w-full mx-auto"
  >
    <h2
      id="top-summoners-h2"
      class="text-gray-900 dark:text-white font-bold text-center text-2xl"
    >
      Top Summoners
    </h2>
    <select
      id="rank-type-select"
      bind:this={rankTypeSelect}
      on:change={onRankTypeSelectChange}
      class="dark:bg-gray-800 dark:text-white p-1 rounded-lg m-3 hover:dark:bg-gray-700 mb-7"
    >
      <option value={RANKED_SOLO_LEAGUE}>Ranked Solo/Duo</option>
      <option value={RANKED_FLEX_LEAGUE}>Ranked Flex</option>
    </select>
    {#if topSummonersFetched}
      <div
        id="top-summoners-cards-div"
        class="flex flex-wrap justify-center w-full"
      >
        {#each topSummonersArray! as summoner}
          <div
            id="summoner-card-div"
            class="dark:bg-gray-800 m-2 rounded-xl w-5/12 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 border-2 border-blue-500 hover:dark:bg-gray-700 bg-white"
          >
            <a
              href="summoner?gameName={summoner.gameName}&tagLine={summoner.tagLine}&region={summoner.server}&puuid={summoner.puuid}"
            >
              <h3
                id="region-h3"
                class="text-gray-900 dark:text-white text-xl p-2"
              >
                Top summoner of {summoner.server} server
              </h3>
              <img
                id="summmoner-icon"
                src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/{summoner.iconId}.jpg"
                alt="Icon not found"
                class="rounded-full w-1/4 mx-auto p-2"
              />
              <p
                id="summoner-name"
                class="text-gray-900 dark:text-white text-xl p-2"
              >
                {summoner.gameName}
              </p>
              {#if rankTypeSelect.value == RANKED_SOLO_LEAGUE}
                <p id="league-points-p p-2">
                  Challenger {summoner.soloLeague?.leaguePoints} LP
                </p>
                <p id="winrate-p" class="p-2">
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
      </div>
    {:else}
      <div
        class="dark:bg-gray-700 rounded-xl text-center w-60 h-60 mx-auto p-4 flex flex-col shadow-xl border-2 border-blue-500"
      >
        <p id="fetching-msg">Fetching top players... (probably not you)</p>
        <div
          class="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-25 h-25 animate-spin mx-auto mt-8"
        ></div>
      </div>
    {/if}
  </div>
</main>

<style>
</style>
