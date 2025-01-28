// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod scuttle;

use serde_json::Value;
use std::collections::HashMap;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_account_by_gamename,
            get_top_players,
            get_summoner_by_puuid,
            get_leagues,
            get_matches,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn get_account_by_gamename(
    data: HashMap<String, String>,
) -> Result<HashMap<String, String>, String> {
    let mut response = HashMap::new();
    let summoner_name: String;
    let summoner_tag: String;
    let summoner_region: String;
    let i: usize;

    match data.get("summoner-name") {
        Some(name) => {
            match name.find("#") {
                Some(index) => i = index,
                None => return Err("Something went wrong: No summoner tag".to_string()),
            }
            summoner_name = name[..i].to_string();
            summoner_tag = name[i + 1..].to_string();
        }
        None => return Err("Something went wrong: No summoner name".to_string()),
    }

    match data.get("summoner-region") {
        Some(region) => summoner_region = region.to_string(),
        None => return Err("Something went wrong: No summoner region".to_string()),
    }

    match scuttle::get_account_from_gamename(&summoner_name, &summoner_tag).await {
        Ok(summoner) => {
            response.insert("success".to_string(), "true".to_string());
            response.insert("region".to_string(), summoner_region);
            for (key, value) in &summoner {
                response.insert(key.to_string(), value.to_string());
            }
            return Ok(response);
        }
        Err(_) => {
            response.insert("success".to_string(), "false".to_string());
            return Ok(response);
        }
    }
}

#[tauri::command]
async fn get_summoner_by_puuid(
    puuid: String,
    region: String,
) -> Result<HashMap<String, String>, String> {
    let mut response = HashMap::new();

    match scuttle::get_summoner_from_puuid(puuid, region).await {
        Ok(account) => {
            if account.len() == 0 {
                response.insert("success".to_string(), "false".to_string());
                return Ok(response);
            }

            response.insert("success".to_string(), "true".to_string());
            for (key, value) in &account {
                response.insert(key.to_string(), value.to_string());
            }
            return Ok(response);
        }
        Err(_) => {
            response.insert("success".to_string(), "false".to_string());
            return Ok(response);
        }
    }
}

#[tauri::command]
async fn get_leagues(
    summoner_id: String,
    region: String,
) -> Result<Vec<HashMap<String, String>>, String> {
    let mut response = Vec::new();
    let mut response_map = HashMap::new();

    match scuttle::get_league_from_summoner_id(summoner_id, region).await {
        Ok(leagues) => {
            if leagues.len() == 0 {
                response_map.insert("success".to_string(), "false".to_string());
                response.push(response_map);
                return Ok(response);
            }

            response_map.insert("success".to_string(), "true".to_string());
            response.push(response_map);
            for entry in leagues {
                let mut tmp_map = HashMap::new();
                for (key, value) in entry {
                    tmp_map.insert(key.to_string(), value.to_string());
                }
                response.push(tmp_map);
            }
            return Ok(response);
        }
        Err(_) => {
            response_map.insert("success".to_string(), "false".to_string());
            response.push(response_map);
            return Ok(response);
        }
    }
}

#[tauri::command]
async fn get_top_players(queue: String) -> Result<Vec<HashMap<String, String>>, String> {
    let mut response = Vec::new();

    let top_players_futures = vec![
        get_queue_top_player(&queue, "na1".to_string()),
        get_queue_top_player(&queue, "br1".to_string()),
        get_queue_top_player(&queue, "kr".to_string()),
        get_queue_top_player(&queue, "eun1".to_string()),
        get_queue_top_player(&queue, "euw1".to_string()),
        get_queue_top_player(&queue, "ru".to_string()),
        get_queue_top_player(&queue, "la1".to_string()),
        get_queue_top_player(&queue, "la2".to_string()),
        get_queue_top_player(&queue, "jp1".to_string()),
        get_queue_top_player(&queue, "oc1".to_string()),
        get_queue_top_player(&queue, "sg2".to_string()),
        get_queue_top_player(&queue, "tw2".to_string()),
        get_queue_top_player(&queue, "tr1".to_string()),
        get_queue_top_player(&queue, "me1".to_string()),
    ];

    let top_players = futures::future::join_all(top_players_futures).await;

    let mut top_players_summoner_futures = Vec::new();
    for top_player in &top_players {
        match top_player {
            Ok(player) => {
                top_players_summoner_futures.push(get_summoner_by_id(
                    player["summonerId"].clone()[1..player["summonerId"].clone().len() - 1]
                        .to_string(),
                    player["region"].clone(),
                ));
                response.push(player.clone());
            }
            Err(e) => eprintln!("Error: {:?}", e),
        }
    }

    let top_players_summoner = futures::future::join_all(top_players_summoner_futures).await;
    let mut top_players_account_futures = Vec::new();
    for top_player_summoner in &top_players_summoner {
        match top_player_summoner {
            Ok(summoner) => {
                for entry in response.iter_mut() {
                    if entry["summonerId"] == summoner["id"] {
                        for (key, value) in summoner {
                            entry.insert(key.to_string(), value.to_string());
                        }
                        top_players_account_futures.push(get_account_by_puuid(
                            entry["puuid"].clone()[1..entry["puuid"].clone().len() - 1].to_string(),
                        ));
                        break;
                    }
                }
            }
            Err(e) => eprintln!("Error: {:?}", e),
        }
    }

    let top_players_account = futures::future::join_all(top_players_account_futures).await;
    for top_player_account in &top_players_account {
        match top_player_account {
            Ok(account) => {
                for entry in response.iter_mut() {
                    if entry["puuid"] == account["puuid"] {
                        for (key, value) in account {
                            entry.insert(key.to_string(), value.to_string());
                        }
                        break;
                    }
                }
            }
            Err(e) => eprintln!("Error: {:?}", e),
        }
    }

    Ok(response)
}

#[tauri::command]
async fn get_matches(puuid: String, region: String) -> Result<Vec<Value>, String> {
    let mut response = Vec::new();

    match get_matches_id(puuid, region.clone()).await {
        Ok(matches_id) => {
            // test match id from bakad: NA1_5206297052
            for id in matches_id.clone() {
                // TODO this needs to be async
                match scuttle::get_matches_from_id(id.to_owned(), region.clone()).await {
                    Ok(match_response) => {
                        response.push(match_response);
                    }
                    Err(_) => {
                        println!("Error occured fetching match with id {}", id);
                    }
                }
            }
        }
        Err(_) => {}
    };

    Ok(response)
}

async fn get_matches_id(puuid: String, region: String) -> Result<Vec<String>, String> {
    let mut response = Vec::new();

    match scuttle::get_matches_id_from_puuid(puuid, region).await {
        Ok(matches) => {
            if matches.len() == 0 {
                return Ok(response);
            }

            for m in matches {
                response.push(m);
            }

            return Ok(response);
        }
        Err(_) => return Ok(response),
    }
}

async fn get_summoner_by_id(id: String, region: String) -> Result<HashMap<String, String>, String> {
    let mut response = HashMap::new();

    match scuttle::get_summoner_from_summoner_id(id, region).await {
        Ok(summoner) => {
            if summoner.len() == 0 {
                response.insert("success".to_string(), "false".to_string());
                return Ok(response);
            }

            response.insert("success".to_string(), "true".to_string());
            for (key, value) in &summoner {
                response.insert(key.to_string(), value.to_string());
            }
            return Ok(response);
        }
        Err(_) => {
            response.insert("success".to_string(), "false".to_string());
            return Ok(response);
        }
    }
}

async fn get_queue_top_player(
    queue: &String,
    region: String,
) -> Result<HashMap<String, String>, String> {
    let mut response = HashMap::new();

    match scuttle::get_challenger_players_from_queue(&queue, &region).await {
        Ok(mut players) => {
            let mut top_player;
            match players.pop() {
                Some(player) => top_player = player,
                None => {
                    return Err(format!(
                        "something went wrong while fetching {region} top player",
                        region = region
                    ))
                }
            }
            // .expect(format!("something went wrong while fetching {region} top player", region = region).as_str());
            for player in players {
                if player
                    .get("leaguePoints")
                    .as_ref()
                    .unwrap()
                    .as_u64()
                    .unwrap()
                    > top_player
                        .get("leaguePoints")
                        .as_ref()
                        .unwrap()
                        .as_u64()
                        .unwrap()
                {
                    top_player = player;
                }
            }
            for (key, value) in top_player {
                response.insert(key, value.to_string());
            }
            response.insert("region".to_string(), region);
            return Ok(response);
        }
        Err(_) => {
            return Err(format!(
                "Couldn't fetch top player for {region}",
                region = region
            ))
        }
    }
}

async fn get_account_by_puuid(puuid: String) -> Result<HashMap<String, String>, String> {
    let mut response = HashMap::new();

    match scuttle::get_account_from_puuid(puuid).await {
        Ok(account) => {
            response.insert("success".to_string(), "true".to_string());
            for (key, value) in &account {
                response.insert(key.to_string(), value.to_string());
            }
            return Ok(response);
        }
        Err(_) => {
            response.insert("success".to_string(), "false".to_string());
            return Ok(response);
        }
    }
}
