use dotenv::dotenv;
use lazy_static::lazy_static;
use reqwest::Error;
use serde_json::Value;
use urlencoding::encode;

use std::collections::HashMap;

lazy_static! {
    static ref RIOT_API_KEY: String = {
        dotenv().ok();
        std::env::var("RIOT_API_KEY").expect("Riot API key must be set in a .env file")
    };
}

struct Summoner {
    gamne_name: String,
    tag_line: String,
    puuid: String,
}

struct Participant {
    summoner: Summoner,
    champion_name: String,
    champion_id: u32,
    lane: String,
    items: Vec<u32>,
    kills: u32,
    deaths: u32,
    assists: u32,
    gold_earned: u32,
}

struct Match {
    paticipants: Vec<Participant>,
}

/// Fetches endpoint `/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}`
/// of `ACCOUNT-V1` API
///
/// Takes summoner name and tag as String arguments and returns
/// a HashMap with the following gameName, tagLine and puuid on success,
/// and TODO WHAT? on failure. Used specifically to get the puuid for a summoner.
///
/// * `summoner_name` - Name of the summoner to fetch
/// * `summoner_tag` - tag line of the suummoner
pub async fn get_account_from_gamename(
    summoner_name: &String,
    summoner_tag: &String,
) -> Result<HashMap<String, String>, Error> {
    let mut response = HashMap::new();

    let url = format!("https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{name}/{tag}?api_key={api_key}",
      name = encode(summoner_name),
      tag = summoner_tag,
      api_key = *RIOT_API_KEY);

    let puuid_response = reqwest::get(url)
        .await?
        .json::<HashMap<String, String>>()
        .await?;

    for (key, value) in &puuid_response {
        response.insert(key.to_string(), value.to_string());
    }

    Ok(response)
}

pub async fn get_summoner_from_puuid(
    puuid: String,
    region: String,
) -> Result<HashMap<String, String>, Error> {
    let mut response = HashMap::new();
    let region_tag: String;
    match get_region_tag(&region) {
        Ok(region_tag_string) => region_tag = region_tag_string,
        Err(_) => return Ok(response), // this could probably be done better but the Err return type is reqwest::Error
    }

    let url = format!("https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}?api_key={api_key}",
    region = region_tag,
    puuid = puuid,
    api_key = *RIOT_API_KEY);

    let account_response = reqwest::get(url)
        .await?
        .json::<HashMap<String, Value>>()
        .await?;

    for (key, value) in &account_response {
        response.insert(key.to_string(), value.to_string());
    }

    Ok(response)
}

pub async fn get_league_from_summoner_id(
    summoner_id: String,
    region: String,
) -> Result<Vec<HashMap<String, String>>, Error> {
    let mut response = Vec::new();
    let region_tag: String;
    match get_region_tag(&region) {
        Ok(region_tag_string) => region_tag = region_tag_string,
        Err(_) => return Ok(response), // this could probably be done better but the Err return type is reqwest::Error
    }

    let url = format!("https://{region}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner_id}?api_key={api_key}",
    region = region_tag,
    summoner_id = summoner_id,
    api_key = *RIOT_API_KEY);

    let league_response = reqwest::get(url)
        .await?
        .json::<Vec<HashMap<String, Value>>>()
        .await?;

    for entry in league_response {
        let mut tmp_map = HashMap::new();
        for (key, value) in entry {
            tmp_map.insert(key.to_string(), value.to_string());
        }
        response.push(tmp_map);
    }

    Ok(response)
}

pub async fn get_challenger_players_from_queue(
    queue: &String,
    region_tag: &String,
) -> Result<Vec<HashMap<String, Value>>, Error> {
    let mut response = Vec::new();

    let url = format!("https://{region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/{queue}?api_key={api_key}",
    region = region_tag,
    queue = queue,
    api_key = *RIOT_API_KEY);

    let challenger_players_response = reqwest::get(url)
        .await?
        .json::<HashMap<String, Value>>()
        .await?;

    for (key, value) in &challenger_players_response {
        if key == "entries" {
            let datas: Vec<HashMap<String, Value>> = serde_json::from_value(value.clone()).unwrap();
            for entry in datas.iter() {
                response.push(entry.clone());
            }
        }
    }

    Ok(response)
}

pub async fn get_summoner_from_summoner_id(
    id: String,
    region: String,
) -> Result<HashMap<String, String>, Error> {
    let mut response = HashMap::new();
    let region_tag: String;
    match get_region_tag(&region) {
        Ok(region_tag_string) => region_tag = region_tag_string,
        Err(_) => return Ok(response), // this could probably be done better but the Err return type is reqwest::Error
    }

    let url = format!("https://{region}.api.riotgames.com/lol/summoner/v4/summoners/{summoner_id}?api_key={api_key}",
    region = region_tag,
    summoner_id = id,
    api_key = *RIOT_API_KEY);

    let summoner_response = reqwest::get(url)
        .await?
        .json::<HashMap<String, Value>>()
        .await?;

    for (key, value) in &summoner_response {
        response.insert(key.to_string(), value.to_string());
    }

    Ok(response)
}

pub async fn get_account_from_puuid(puuid: String) -> Result<HashMap<String, String>, Error> {
    let mut response = HashMap::new();

    let url = format!("https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/{puuid}?api_key={api_key}",
    puuid = puuid,
    api_key = *RIOT_API_KEY);

    let account_response = reqwest::get(url)
        .await?
        .json::<HashMap<String, Value>>()
        .await?;

    for (key, value) in &account_response {
        response.insert(key.to_string(), value.to_string());
    }

    Ok(response)
}

pub async fn get_matches_id_from_puuid(
    puuid: String,
    region: String,
) -> Result<Vec<String>, Error> {
    let response = Vec::new();
    let region_continent: String;
    match get_region_continent(&region) {
        Ok(continent) => region_continent = continent,
        Err(_) => return Ok(response),
    }

    let url = format!("https://{region_continent}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=20&api_key={api_key}",
    region_continent = region_continent,
    puuid = puuid,
    api_key = *RIOT_API_KEY);

    let matches_response = reqwest::get(url).await?.json::<Vec<String>>().await?;

    Ok(matches_response)
}

pub async fn get_matches_from_id(match_id: String) -> Result<Value, Error> {
    let url = format!(
        "https://americas.api.riotgames.com/lol/match/v5/matches/{match_id}?api_key={api_key}",
        match_id = match_id,
        api_key = *RIOT_API_KEY
    );

    let matches_response = reqwest::get(url).await?.json::<Value>().await?;

    // println!("{:?}", matches_response);
    // println!("{:?}", matches_response["metadata"]);
    // println!("{}", std::any::type_name_of_val(&matches_response));

    Ok(matches_response)
}

fn get_region_continent(region: &String) -> Result<String, ()> {
    match region.as_str() {
        "north america" | "na1" | "brazil" | "br1" | "LAS" | "la2" | "LAN" | "la1" => {
            Ok("americas".to_string())
        }
        "korea" | "kr" | "japan" | "jp1" => Ok("asia".to_string()),
        "europe nordic & east"
        | "eun1"
        | "europe west"
        | "euw1"
        | "russia"
        | "ru1"
        | "ru"
        | "turkiye"
        | "tr1"
        | "middle east"
        | "me1" => Ok("europe".to_string()),
        "oceania" | "oc1" | "oce" | "philippines" | "ph2" | "singapore" | "sg2" | "thailand"
        | "th2" | "taiwan" | "tw2" | "vietnam" | "vn2" => Ok("sea".to_string()),
        _ => Err(()),
    }
}

fn get_region_tag(region: &String) -> Result<String, ()> {
    match region.as_str() {
        "north america" | "na1" => Ok("na1".to_string()),
        "brazil" | "br1" => Ok("br1".to_string()),
        "LAS" | "la2" => Ok("la2".to_string()),
        "LAN" | "la1" => Ok("la1".to_string()),
        "korea" | "kr" => Ok("kr".to_string()),
        "europe nordic & east" | "eun1" => Ok("eun1".to_string()),
        "europe west" | "euw1" => Ok("euw1".to_string()),
        "oceania" | "oc1" | "oce" => Ok("oc1".to_string()),
        "japan" | "jp1" => Ok("jp1".to_string()),
        "russia" | "ru1" | "ru" => Ok("ru".to_string()),
        "turkiye" | "tr1" => Ok("tr1".to_string()),
        "middle east" | "me1" => Ok("me1".to_string()),
        "philippines" | "ph2" => Ok("ph2".to_string()),
        "singapore" | "sg2" => Ok("sg2".to_string()),
        "taiwan" | "tw2" => Ok("tw2".to_string()),
        "thailand" | "th2" => Ok("th2".to_string()),
        "vietnam" | "vn2" => Ok("vn2".to_string()),
        _ => return Err(()),
    }
}
