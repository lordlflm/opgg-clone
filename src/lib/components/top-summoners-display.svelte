<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { Summoner } from "../../types/summoner";
  import { onMount } from "svelte";
    import { region_tag_to_region } from "$lib/utils/utils";

  let rankTypeSelect: HTMLSelectElement;
  let topPlayersContainerDiv: HTMLDivElement;

  let topSummoners: Summoner[] = [];

  onMount(async () => {
    await onRankTypeSelectChange();
  });

  async function onRankTypeSelectChange() {
    console.log(rankTypeSelect!);
    const rankType = rankTypeSelect!.value;

    if (rankType === "flex") {
      topSummoners = await fetch_top_players("RANKED_FLEX_SR");
    } else {
      topSummoners = await fetch_top_players("RANKED_SOLO_5x5");
    }
  }

  async function fetch_top_players(queueType: string) {
    const top_players: Array<any> | string = await invoke("get_top_players", {
      queue: queueType,
    });
    console.log(top_players);
    let top_players_array: Array<Summoner> = new Array();
    if (top_players.length != 0) {
      for (let player of top_players) {
        if (player.success === "true") {
          let summoner_object = new Summoner(
            player.puuid.slice(1, -1),
            player.summonerId.slice(1, -1),
            player.accountId.slice(1, -1),
            player.gameName.slice(1, -1),
            player.tagLine.slice(1, -1),
            player.profileIconId,
            player.summonerLevel,
            region_tag_to_region(player.region),
          );

          // TODO
          // summoner_object.soloLeague.leaguePoints = player.leaguePoints;
          // summoner_object.soloLeague.wins = player.wins;
          // summoner_object.soloLeague.losses = player.losses;

          top_players_array.push(summoner_object);
        }
      }
    } else {
      console.error("Couldn't fetch top players");
    }
    return top_players_array;
  }

  //might rethink logic here after doing styles (e.g. remove br tags)
  // TODO: this code will go in summoner-preview-card.svelte
  function display_summoner(summoner: Summoner) {
    //this div is used to have a border for now since anchors dont display border as expected
    let summoner_div = document.createElement("div");
    summoner_div.id = "top-player-div";
    let summoner_anchor = document.createElement("a");
    summoner_anchor.href = `summoner.html?gameName=${encodeURIComponent(summoner.gameName)}&region=${encodeURIComponent(summoner.server)}&puuid=${summoner.puuid}`;
    let region = document.createTextNode(
      `Top challenger of ${summoner.server}`,
    );
    // TODO
    // let winrate = document.createTextNode(`${summoner.soloLeague.wins} wins / ${summoner.soloLeague.losses} losses (${Math.round(summoner.soloLeague.wins/(summoner.soloLeague.wins + summoner.soloLeague.losses) * 100)}% winrate)`);
    // let lp = document.createTextNode(`Challenger ${summoner.soloLeague.leaguePoints} LP`);
    let icon = document.createElement("img");
    icon.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${summoner.iconId}.jpg`;
    let name = document.createTextNode(`${summoner.gameName}`);
    summoner_anchor.appendChild(icon);
    summoner_anchor.appendChild(document.createElement("br"));
    summoner_anchor.appendChild(region);
    summoner_anchor.appendChild(document.createElement("br"));
    summoner_anchor.appendChild(name);
    summoner_anchor.appendChild(document.createElement("br"));
    // TODO
    // summoner_anchor.appendChild(lp);
    summoner_anchor.appendChild(document.createElement("br"));
    // TODO
    // summoner_anchor.appendChild(winrate);
    summoner_div.appendChild(summoner_anchor);
    topPlayersContainerDiv!.appendChild(summoner_div);
  }
</script>

<main class="container">
  <div id="top-players-container-div" bind:this={topPlayersContainerDiv}>
    <h2 id="top-players-h2">Top players</h2>
    <select
      id="rank-type-select"
      bind:this={rankTypeSelect}
      on:change={onRankTypeSelectChange}
    >
      <option value="solo">Ranked Solo/Duo</option>
      <option value="flex">Ranked Flex</option>
    </select>
  </div>
</main>

{#each await topSummoners as summoner}
  <SummonerPreviewCard {summoner} />
{/each}

<style></style>
