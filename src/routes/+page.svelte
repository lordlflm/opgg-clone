<script lang="ts">
  import SummonerSearchForm from "$lib/components/summoner-search-form.svelte";
  import TopSummonersDisplay from "$lib/components/top-summoners-display.svelte";
</script>

<main>
  <SummonerSearchForm />
  <hr class="my-4 border-t-2 border-gray-300 dark:border-gray-700 w-7/8 mx-auto">
  <TopSummonersDisplay />
</main>

<style>
</style>
