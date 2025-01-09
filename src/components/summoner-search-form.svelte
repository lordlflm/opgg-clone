<script lang="ts">
    import { invoke } from "@tauri-apps/api/core";

  let summonerInvalidDiv;
  let summonerNameInvalid;
  let summonerTagInvalid;
  let summonerRegionInvalid;
  let summonerInvalid;

  let validRegions = [
    "north america", 
    "korea", 
    "middle east", 
    "europe west", 
    "europe nordic & east", 
    "oceania", 
    "japan", 
    "brazil",
    "LAS", 
    "LAN", 
    "russia", 
    "turkiye", 
    "singapore", 
    "philippines", 
    "taiwan", 
    "vietnam", 
    "thailand"
  ];

  async function onSummonerSubmit (event: any) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      let invalidFlag = 0;
      
      // TODO make sure name is of valid length
      if (data["summoner-name"] == "") {
        summonerInvalidDiv!.style.display = "block";
        summonerNameInvalid!.textContent = "invalid summoner name";
        invalidFlag++;
      } else {
        summonerNameInvalid!.textContent = "";
      }
      //TODO make sure tagline is of valid length
      if (!data["summoner-name"].toString().includes("#")) {
        summonerInvalidDiv!.style.display = "block";
        summonerTagInvalid!.textContent = "invalid #tagline";
        invalidFlag++;
      } else {
        summonerTagInvalid!.textContent = "";
      }
      if (!validRegions.includes(data["summoner-region"].toString())) {
        summonerInvalidDiv!.style.display = "block";
        summonerRegionInvalid!.textContent = "invalid region";
        invalidFlag++;
      } else {
        summonerRegionInvalid!.textContent = "";
      }
      
      //TODO sanitize data for XSS/SQLi
      //TODO trim spaces

      if (invalidFlag == 0) {
        try {
            const response: any = await invoke('get_account_by_gamename', { data });
            if (response.success === "true") {
              summonerInvalid!.textContent = "";
              const queryParams = new URLSearchParams();
              queryParams.append("gameName", response.gameName);
              queryParams.append("tagLine", response.tagLine);
              queryParams.append("region", response.region);
              queryParams.append("puuid", response.puuid);
              // TODO: proper svelte routing 
              window.location.href = `summoner?${queryParams.toString()}`;
            } else {
              summonerInvalid!.textContent = "This summoner does not exist";
            }
        } catch (error) {
          console.error('Error:', error);
        }
      }
  };
</script>

<main>
    <div id="form-container-div">
        <h2>Enter in-game name and region</h2>
        <form id="summoner-form" on:submit={onSummonerSubmit}>
          <div id="summoner-input-div">
            <label for="summoner-name" hidden>Summoner name</label>
            <input name="summoner-name" id="summoner-name" type="text" placeholder="IGN#TAG">
      
            <label for="summoner-region" hidden>Summoner region</label>
            <select name="summoner-region" id="summoner-region">
              <option value="">Select region</option>
              <option value="north america">North America</option>
              <option value="korea">Korea</option>
              <option value="middle east">Middle East</option>
              <option value="europe west">Europe West</option>
              <option value="europe nordic & east">Europe Nordic & East</option>
              <option value="oceania">Oceania</option>
              <option value="japan">Japan</option>
              <option value="brazil">Brazil</option>
              <option value="LAS">LAS</option>
              <option value="LAN">LAN</option>
              <option value="russia">Russia</option>
              <option value="turkiye">Türkiye</option>
              <option value="singapore">Singapore</option>
              <option value="philippines">Philippines</option>
              <option value="taiwan">Taiwan</option>
              <option value="vietnam">Vietnam</option>
              <option value="thailand">Thailand</option>
            </select>
          </div>
          <div id="summoner-invalid-div" bind:this={summonerInvalidDiv}>
            <p id="summoner-invalid" bind:this={summonerInvalid}></p>
            <p id="summoner-name-invalid" bind:this={summonerNameInvalid}></p>
            <p id="summoner-tag-invalid" bind:this={summonerTagInvalid}></p>
            <p id="summoner-region-invalid" bind:this={summonerRegionInvalid}></p>
          </div>
    
          <input type="submit" value="Find Summoner" id="submit">
        </form>
      </div>
</main>

<style></style>