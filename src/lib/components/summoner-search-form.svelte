<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";

  import { validRegions } from "$lib/utils/utils";
  import { goto } from "$app/navigation";

  let summonerInvalidDiv;
  let summonerNameInvalid;
  let summonerTagInvalid;
  let summonerRegionInvalid;
  let summonerInvalid;

  async function onSummonerSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    let invalidFlag = 0;

    // TODO make sure name is of valid length
    if (data["summoner-name"] == "") {
      summonerNameInvalid!.textContent = "invalid summoner name";
      invalidFlag++;
    } else {
      summonerNameInvalid!.textContent = "";
    }

    //TODO make sure tagline is of valid length
    if (!data["summoner-name"].toString().includes("#")) {
      summonerTagInvalid!.textContent = "invalid #tagline";
      invalidFlag++;
    } else {
      summonerTagInvalid!.textContent = "";
    }

    if (
      !validRegions
        .map((validRegion) => validRegion.value)
        .includes(data["summoner-region"].toString()) ||
      data["summoner-region"] == ""
    ) {
      summonerRegionInvalid!.textContent = "invalid region";
      invalidFlag++;
    } else {
      summonerRegionInvalid!.textContent = "";
    }

    //TODO sanitize data for XSS/SQLi
    //TODO trim spaces

    if (invalidFlag == 0) {
      try {
        const response: any = await invoke("get_account_by_gamename", { data });
        console.log(response);
        if (response.success === "true") {
          summonerInvalid!.textContent = "";
          const queryParams = new URLSearchParams();
          queryParams.append("gameName", response.gameName);
          queryParams.append("tagLine", response.tagLine);
          queryParams.append("region", response.region);
          queryParams.append("puuid", response.puuid);
          // TODO: proper svelte routing
          goto(`summoner?${queryParams.toString()}`);
        } else {
          summonerInvalid!.textContent = "This summoner does not exist";
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }
</script>

<main>
  <div id="form-container-div">
    <h2>Enter in-game name and region</h2>
    <form id="summoner-form" on:submit={onSummonerSubmit}>
      <div id="summoner-input-div">
        <label for="summoner-name" hidden>Summoner name</label>
        <input
          name="summoner-name"
          id="summoner-name"
          type="text"
          placeholder="IGN#TAG"
        />

        <label for="summoner-region" hidden>Summoner region</label>
        <select name="summoner-region" id="summoner-region">
          {#each validRegions as region}
            <option value={region.value}>{region.label}</option>
          {/each}
        </select>
      </div>
      <div id="summoner-invalid-div" bind:this={summonerInvalidDiv}>
        <p id="summoner-invalid" bind:this={summonerInvalid}></p>
        <p id="summoner-name-invalid" bind:this={summonerNameInvalid}></p>
        <p id="summoner-tag-invalid" bind:this={summonerTagInvalid}></p>
        <p id="summoner-region-invalid" bind:this={summonerRegionInvalid}></p>
      </div>

      <input type="submit" value="Find Summoner" id="submit" />
    </form>
  </div>
</main>

<style></style>
