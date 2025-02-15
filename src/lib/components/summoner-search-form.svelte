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

    if (data["summoner-name"] == "") {
      summonerNameInvalid!.textContent = "invalid summoner name";
      invalidFlag++;
    } else {
      summonerNameInvalid!.textContent = "";
    }

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

    if (invalidFlag == 0) {
      try {
        const response: any = await invoke("get_account_by_gamename", { data });
        if (response.success === "true") {
          summonerInvalid!.textContent = "";
          const queryParams = new URLSearchParams();
          queryParams.append("gameName", response.gameName);
          queryParams.append("tagLine", response.tagLine);
          queryParams.append("region", response.region);
          queryParams.append("puuid", response.puuid);
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
  <div
    id="form-container-div"
    class="flex flex-col justify-center items-center mt-5 mb-6 text-center"
  >
    <h2
      id="find-summoner-h2"
      class="text-gray-900 dark:text-white font-bold text-center text-2xl"
    >
      Find a Summoner
    </h2>
    <h2>Enter in-game name and region</h2>
    <form id="summoner-form" class="w-full" on:submit={onSummonerSubmit}>
      <div id="summoner-input-div" class="flex flex-col justify-center items-center">
        <label for="summoner-name" hidden>Summoner name</label>
        <input
          name="summoner-name"
          id="summoner-name"
          type="text"
          placeholder="IGN#TAG"
          class="p-1 rounded-lg dark:bg-gray-800 dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-1 mb-1 text-center w-[40%]"
        />

        <label for="summoner-region" hidden>Summoner region</label>
        <select
          name="summoner-region"
          id="summoner-region"
          class="dark:bg-gray-800 dark:text-white p-1 rounded-lg m-3 hover:dark:bg-gray-700"
        >
          {#each validRegions as region}
            <option value={region.value}>{region.label}</option>
          {/each}
        </select>
      </div>
      <div
        id="summoner-invalid-div"
        class="text-red-600"
        bind:this={summonerInvalidDiv}
      >
        <p id="summoner-invalid" bind:this={summonerInvalid}></p>
        <p id="summoner-name-invalid" bind:this={summonerNameInvalid}></p>
        <p id="summoner-tag-invalid" bind:this={summonerTagInvalid}></p>
        <p id="summoner-region-invalid" bind:this={summonerRegionInvalid}></p>
      </div>

      <input
        type="submit"
        value="Find Summoner"
        id="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </form>
  </div>
</main>

<style></style>
