<script lang="ts">
    import { page } from "$app/state";
    import { invoke } from "@tauri-apps/api/core";
    import { onMount } from "svelte";

    import type { Summoner } from "$lib/types/summoner";
    import {
        displayAltIcon,
        queueIdToType,
        RANKED_FLEX_LEAGUE,
        RANKED_SOLO_LEAGUE,
        tierValues,
    } from "$lib/utils/utils";
    import type { League } from "$lib/types/league";
    import type { Match } from "$lib/types/match";
    import type { Participant } from "$lib/types/participant";

    import MatchComponent from "$lib/components/summoner/match.svelte";
    import Team from "$lib/components/summoner/team.svelte";

    let rankTypeSelect: HTMLSelectElement;
    let selectedRankType: string = RANKED_SOLO_LEAGUE;

    let queryParams = page.url.searchParams;
    let summonerFetched = false;
    let summoner: Summoner;
    // highest tier between solo and flex queue. Used to determine which rank icon to display
    let summonerHighestTier: string | null = null;
    let matches: Array<Match> = [];

    onMount(async () => {
        try {
            let summonerId: string;
            let accountId: string;
            let iconId: number;
            let summonerLevel: number;
            let soloLeague: League | null = null;
            let flexLeague: League | null = null;

            // call to `/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}` endpoint
            const accountData = await fetch_account();
            if (accountData !== null) {
                [summonerId, accountId, iconId, summonerLevel] = accountData;
            } else {
                throw new Error();
            }

            //call to `/lol/league/v4/entries/by-summoner/{encryptedSummonerId}` endpoint
            const leaguesData = await fetch_leagues(
                summonerId,
                queryParams.get("region")!,
            );
            if (leaguesData !== null) {
                for (let league of leaguesData) {
                    if (league.leagueType === RANKED_SOLO_LEAGUE) {
                        soloLeague = league;
                    } else if (league.leagueType === RANKED_FLEX_LEAGUE) {
                        flexLeague = league;
                    }
                }
            }

            // call to `/lol/match/v5/matches/by-puuid/{puuid}/ids` endpoint
            const matchesData: any = await invoke("get_matches", {
                puuid: queryParams.get("puuid")!,
                region: queryParams.get("region")!,
            });

            if (matchesData.length > 0) {
                for (let matchData of matchesData) {
                    let participants: Array<Participant> = [];
                    for (let participantData of matchData["info"][
                        "participants"
                    ]) {
                        let primaryStyleCategorieId = 0;
                        let primaryStylePerkId = 0;
                        let secondaryStyleCategorieId = 0;
                        for (let style of participantData["perks"]["styles"]) {
                            if (style["description"] === "primaryStyle") {
                                primaryStyleCategorieId = style["style"];
                                primaryStylePerkId =
                                    style["selections"][0]["perk"];
                            } else if (style["description"] === "subStyle") {
                                secondaryStyleCategorieId = style["style"];
                            }
                        }

                        const participant = {
                            gameName: participantData["riotIdGameName"],
                            tagLine: participantData["riotIdTagline"],
                            puuid: participantData["puuid"],
                            champion: participantData["championName"],
                            championId: participantData["championId"],
                            championLevel: participantData["champLevel"],
                            lane: participantData["individualPosition"],
                            items: [
                                participantData["item0"],
                                participantData["item1"],
                                participantData["item2"],
                                participantData["item3"],
                                participantData["item4"],
                                participantData["item5"],
                                participantData["item6"],
                            ],
                            kills: participantData["kills"],
                            deaths: participantData["deaths"],
                            assists: participantData["assists"],
                            goldEarned: participantData["goldEarned"],
                            summonerSpell1: participantData["summoner1Id"],
                            summonerSpell2: participantData["summoner2Id"],
                            teamId: participantData["teamId"],
                            minionKilled:
                                participantData["totalMinionsKilled"] +
                                participantData["neutralMinionsKilled"],
                            totalDamageDealtToChampions:
                                participantData["totalDamageDealtToChampions"],
                            totalDamageTaken:
                                participantData["totalDamageTaken"],
                            primaryStyleCategorieId: primaryStyleCategorieId,
                            primaryStylePerkId: primaryStylePerkId,
                            secondaryStyleCategorieId:
                                secondaryStyleCategorieId,
                            doubleKills: participantData["doubleKills"],
                            tripleKills: participantData["tripleKills"],
                            quadraKills: participantData["quadraKills"],
                            pentaKills: participantData["pentaKills"],
                        };

                        participants.push(participant);
                    }

                    let winningTeam: number;
                    for (let team of matchData["info"]["teams"]) {
                        if (team["win"] === true) {
                            winningTeam = team["teamId"];
                            break;
                        }
                    }

                    const match: Match = {
                        queueType: queueIdToType(matchData["info"]["queueId"]),
                        duration: matchData["info"]["gameDuration"],
                        participants: participants,
                        winningTeam: winningTeam!,
                    };
                    matches.push(match);
                }
            } else {
                console.error(
                    "Error while fetching endpoint `/lol/match/v5/matches/by-puuid/{puuid}/ids`",
                );
            }

            summoner = {
                puuid: queryParams.get("puuid")!,
                id: summonerId,
                accountId: accountId,
                gameName: queryParams.get("gameName")!,
                tagLine: queryParams.get("tagLine")!,
                iconId: iconId,
                level: summonerLevel,
                server: queryParams.get("region")!,
            };
            if (soloLeague !== null) {
                summoner.soloLeague = soloLeague;
                summonerHighestTier = soloLeague.tier;
            }
            if (flexLeague !== null) {
                summoner.flexLeague = flexLeague;
                if (summonerHighestTier === null) {
                    summonerHighestTier = flexLeague.tier;
                } else if (
                    tierValues.get(summonerHighestTier)! <
                    tierValues.get(flexLeague.tier)!
                ) {
                    summonerHighestTier = flexLeague.tier;
                }
            }
            summonerFetched = true;
        } catch (error) {
            console.error("Error:", error);
        }
        console.debug(summoner);
    });

    async function fetch_account() {
        const accountData: any = await invoke("get_summoner_by_puuid", {
            puuid: queryParams.get("puuid"),
            region: queryParams.get("region"),
        });
        if (accountData.success === "true") {
            return [
                accountData.id.slice(1, -1),
                accountData.accountId.slice(1, -1),
                accountData.profileIconId,
                accountData.summonerLevel,
            ];
        } else {
            console.error(
                "Error while fetching endpoint `/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}`",
            );
            return null;
        }
    }

    async function fetch_leagues(summonerId: string, summonerRegion: string) {
        const leaguesData: any = await invoke("get_leagues", {
            summonerId: summonerId,
            region: summonerRegion,
        });
        let leagues: Array<League> = [];
        if (leaguesData[0].success === "true") {
            for (let league of leaguesData) {
                if (league.queueType) {
                    let leagueObject: League = {
                        leagueType: league.queueType.slice(1, -1),
                        tier: league.tier.slice(1, -1),
                        rank: league.rank.slice(1, -1),
                        leaguePoints: league.leaguePoints,
                        wins: league.wins,
                        losses: league.losses,
                    };
                    leagues.push(leagueObject);
                }
            }
            return leagues;
        } else {
            console.error(
                "Error while fetching endpoint `/lol/league/v4/entries/by-summoner/{encryptedSummonerId}`",
            );
            return null;
        }
    }

    async function onRankTypeSelectChange() {
        selectedRankType = rankTypeSelect.value;
    }
</script>

<main>
    {#if summonerFetched}
        <div
            class="flex bg-gray-800 max-w-250 mx-auto rounded-2xl my-10 text-white"
        >
            <div id="icon-div" class="relative m-5 mb-8 w-1/4">
                <img
                    id="icon"
                    src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/{summoner.iconId}.jpg"
                    alt="summoner icon not found"
                    class="rounded-full"
                    on:error={(event) => displayAltIcon(event)}
                />
                {#if summonerHighestTier !== null}
                    <!-- TODO -->
                    <!-- <img
                        id="rank-icon"
                        src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-{summonerHighestTier.toLowerCase()}.png"
                        alt="rank icon not found"
                        on:error={(event) => displayAltIcon(event)}
                    /> -->
                {/if}
                <p
                    id="level"
                    class="absolute top-60 left-27 rounded-lg bg-gray-900 border-1 px-1"
                >
                    {summoner.level}
                </p>
            </div>
            <div class="flex flex-col justify-center mx-auto">
                <div id="ign-tag-div" class="flex">
                    <h2 id="ign" class="text-3xl font-bold">{summoner.gameName}</h2>
                    <p id="tag" class="text-3xl text-gray-400 font-bold">#{summoner.tagLine}</p>
                </div>
                <p id="server" class="text-gray-400">{summoner.server.replace(/\b\w/g, (char) => char.toUpperCase())} server</p>
            </div>
            <div id="rank-div" class="flex flex-col justify-center text-center mx-auto">
                <select
                    id="rank-type-select"
                    bind:this={rankTypeSelect}
                    on:change={onRankTypeSelectChange}
                    class="dark:bg-gray-700 dark:text-white p-1 rounded-lg m-3 hover:dark:bg-gray-700"
                >
                    <option value={RANKED_SOLO_LEAGUE}>Ranked Solo/Duo</option>
                    <option value={RANKED_FLEX_LEAGUE}>Ranked Flex</option>
                </select>
                <div id="current-rank-div">
                    {#if selectedRankType == RANKED_SOLO_LEAGUE}
                        {#if summoner.soloLeague}
                            <p id="rank-p">
                                {summoner.soloLeague?.tier +
                                    " " +
                                    summoner.soloLeague?.rank +
                                    " " +
                                    summoner.soloLeague?.leaguePoints} LP
                            </p>
                            <p id="winrate-p">
                                {summoner.soloLeague?.wins} wins / {summoner
                                    .soloLeague?.losses} losses ({Math.round(
                                    (Number(summoner.soloLeague?.wins!) /
                                        (Number(summoner.soloLeague?.losses!) +
                                            Number(
                                                summoner.soloLeague?.wins!,
                                            ))) *
                                        100,
                                )}% winrate)
                            </p>
                        {:else}
                            <p>Summoner is unranked</p>
                        {/if}
                    {:else if selectedRankType == RANKED_FLEX_LEAGUE}
                        {#if summoner.flexLeague}
                            <p id="rank-p">
                                {summoner.flexLeague?.tier +
                                    " " +
                                    summoner.flexLeague?.rank +
                                    " " +
                                    summoner.flexLeague?.leaguePoints} LP
                            </p>
                            <p id="winrate-p">
                                {summoner.flexLeague?.wins} wins / {summoner
                                    .flexLeague?.losses} losses ({Math.round(
                                    (Number(summoner.flexLeague?.wins!) /
                                        (Number(summoner.flexLeague?.losses!) +
                                            Number(
                                                summoner.flexLeague?.wins!,
                                            ))) *
                                        100,
                                )}% winrate)
                            </p>
                        {:else}
                            <p>Summoner is unranked</p>
                        {/if}
                    {/if}
                </div>
            </div>
        </div>
        <div id="matches" class="flex flex-col">
            <h2
                class="text-gray-900 dark:text-white font-bold text-center text-2xl my-5"
            >
                Recent Matches
            </h2>
            {#each matches as match}
                <div class="mx-auto">
                    <MatchComponent {match} {summoner} />
                </div>
            {/each}
        </div>
    {:else}
        <div class="flex items-center h-screen">
            <div class="flex flex-col text-center mx-auto">
                <div
                    class="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-25 h-25 animate-spin mx-auto mb-8"
                ></div>
                <p id="fetching-msg">
                    Fetching your data... (All your gray screens)
                </p>
            </div>
        </div>
    {/if}
</main>

<style></style>
