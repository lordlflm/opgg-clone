export const RANKED_SOLO_LEAGUE = "RANKED_SOLO_5x5"
export const RANKED_FLEX_LEAGUE = "RANKED_FLEX_SR"

export const tierValues = new Map([
  ["IRONS", 0],
  ["BRONZE", 1],
  ["SILVER", 2],
  ["GOLD", 3],
  ["PLATINUM", 4],
  ["EMERALD", 5],
  ["DIAMOND", 6],
  ["MASTER", 7],
  ["GRANDMASTER", 8],
  ["CHALLENGER", 9],
]);

export const validRegions = [
  { value: "", label: "Select region" },
  { value: "north america", label: "North America" },
  { value: "korea", label: "Korea" },
  { value: "middle east", label: "Middle East" },
  { value: "europe west", label: "Europe West" },
  { value: "europe nordic & east", label: "Europe Nordic & East" },
  { value: "oceania", label: "Oceania" },
  { value: "japan", label: "Japan" },
  { value: "brazil", label: "Brazil" },
  { value: "LAS", label: "LAS" },
  { value: "LAN", label: "LAN" },
  { value: "russia", label: "Russia" },
  { value: "turkiye", label: "Türkiye" },
  { value: "singapore", label: "Singapore" },
  { value: "philippines", label: "Philippines" },
  { value: "taiwan", label: "Taiwan" },
  { value: "vietnam", label: "Vietnam" },
  { value: "thailand", label: "Thailand" },
];

export function queueIdToType(id: number) {
  let queueType = "Unknown";
  switch (id) {
    case 420:
      queueType = "Ranked Solo/Duo";
      break;
    case 440:
      queueType = "Ranked Flex";
      break;
    case 400:
      queueType = "Normal Draft";
      break;
    case 450:
      queueType = "ARAM";
      break;
    case 700:
      queueType = "Clash";
      break;
    case 900:
      queueType = "URF";
      break;
  }
  return queueType;
}

export function displayAltIcon(event: Event) {
  const defaultFallbackIconPath = "icons/fallback/default_fallback.png"
  const target = event.target as HTMLImageElement;
  target.src = defaultFallbackIconPath;
}

export function region_tag_to_region(tag: string) {
  switch (tag) {
    case "na1":
      return "north america";
    case "br1":
      return "brazil";
    case "kr":
      return "korea";
    case "la1":
      return "LAN";
    case "la2":
      return "LAS";
    case "eun1":
      return "europe nordic & east";
    case "euw1":
      return "europe west";
    case "oc1":
      return "oceania";
    case "jp1":
      return "japan";
    case "ru1":
      return "russia";
    case "ru":
      return "russia";
    case "tr1":
      return "turkiye";
    case "me1":
      return "middle east";
    case "ph2":
      return "philippines";
    case "sg2":
      return "singapore";
    case "tw2":
      return "taiwan";
    case "th2":
      return "thailand";
    case "vn2":
      return "vietnam"
    default:
      return "ERROR";
  }
}

export function perkIdToRuneName(id: number) {
  switch (id) {
    case 8005:
      return "presstheattack";
    case 8008:
      return "lethaltempo";
    case 8021:
      return "fleetfootwork";
    case 8010:
      return "conqueror";
    case 8112:
      return "electrocute";
    case 8124:
      return "predator";
    case 8128:
      return "dark Harvest";
    case 9923:
      return "hailofblades";
    case 8214:
      return "summonaery";
    case 8229:
      return "arcanecomet";
    case 8230:
      return "phaserush";
    case 8437:
      return "graspoftheundying";
    case 8439:
      return "aftershock";
    case 8465:
      return "guardian";
    case 8351:
      return "glacialaugment";
    case 8360:
      return "unsealedspellbook";
    case 8369:
      return "firststrike";
    default:
      return "ERROR";
  }
}

export function secondaryRuneNameToAssetName(name: string) {
  switch (name) {
    case "precision":
      return "7201_precision"
    case "domination":
      return "7200_domination"
    case "sorcery":
      return "7202_sorcery"
    case "inspiration":
      return "7203_whimsy"
    case "resolve":
      return "7204_resolve"
    default:
      return "ERROR"
  }
}

export function styleIdToRuneName(id: number) {
  switch (id) {
    case 8000:
      return "precision";
    case 8100:
      return "domination";
    case 8200:
      return "sorcery";
    case 8300:
      return "inspiration";
    case 8400:
      return "resolve";
    default:
      return "ERROR";
  }
}

export function summonerSpellIdToAssertName(id: number) {
  switch (id) {
    case 1:
      return "summoner_boost";
    case 3:
      return "summoner_exhaust";
    case 4:
      return "summoner_flash";
    case 6:
      return "summoner_haste";
    case 7:
      return "summoner_heal";
    case 11:
      return "summoner_smite";
    case 12:
      return "summoner_teleport_new";
    case 13:
      return "summonermana";
    case 14:
      return "summonerignite";
    case 21:
      return "summonerbarrier";
    case 32:
      return "summoner_mark";
    default:
      return "ERROR";
  }
}

export function itemIdToAssetName(id: number) {
  switch (id) {
    case 0:
      return "gp_ui_placeholder";
    case 96:
      return "096_eye_of_the_observer";
    case 1001:
      return "1001_class_t1_bootsofspeed";
    case 1004:
      return "1004_class_t1_faeriecharm";
    case 1006:
      return "1006_tank_t1_rejuvenationbead";
    case 1011:
      return "1011_class_t2_giantsbelt";
    case 1018:
      return "1018_base_t1_cloakagility";
    case 1026:
      return "1026_mage_t1_blastingwand";
    case 1027:
      return "1027_base_t1_saphirecrystal";
    case 1028:
      return "1028_base_t1_rubycrystal";
    case 1029:
      return "1029_base_t1_clotharmor";
    case 1031:
      return "1031_base_t2_chainvest";
    case 1033:
      return "1033_base_t1_magicmantle";
    case 1035:
      return "1035_alll_t1_emberknife";
    case 1036:
      return "1036_class_t1_longsword";
    case 1037:
      return "1037_class_t1_pickaxe";
    case 1038:
      return "1038_marksman_t1_bfsword";
    case 1039:
      return "1039_all_t1_hailblade";
    case 1040:
      return "1040_obsidianedge";
    case 1042:
      return "1042_base_t1_dagger";
    case 1043:
      return "1043_base_t2_recurvebow";
    case 1052:
      return "1052_mage_t2_amptome";
    case 1053:
      return "1053_fighter_t2_vampiricscepter";
    case 1054:
      return "1054_tank_t1_doransshield";
    case 1055:
      return "1055_marksman_t1_doransblade";
    case 1056:
      return "1056_mage_t1_doransring";
    case 1057:
      return "1057_tank_t2_negatroncloak";
    case 1058:
      return "1058_mage_t1_largerod";
    case 1082:
      return "1082_mage_t1_darkseal";
    case 1083:
      return "1083_marksman_t1_cull";
    case 1101:
      return "1101_jungle_t1_scorchclawpup";
    case 1102:
      return "1102_jungle_t1_gustwalkerhatchling";
    case 1103:
      return "1103_jungle_t1_mosstomperseedling";
    case 1103:
      return "1103_testitem2";
    case 1402:
      return "1402_enchantment_runeglaive";
    case 1504:
      return "1504_turretshielder";
    case 1507:
      return "1507_tournament_suddendeath";
    case 1508:
      return "1508_antitowersocks";
    case 1509:
      return "1509_gusto";
    case 1510:
      return "1510_phreakishgusto";
    case 1511:
      return "1511_supermecharmor";
    case 1512:
      return "1512_supermechpowerfield";
    case 2003:
      return "2003_class_t1_healthpotion";
    case 2010:
      return "2010_class_t1_totalbiscuitofeverlastingwill";
    case 2021:
      return "2012_tunneler";
    case 2015:
      return "2015_marksman_t2_kirkcheisshard";
    case 2019:
      return "2019_steel_sigil";
    case 2020:
      return "2020_thebrutalizer";
    case 2022:
      return "2022_glowingmote";
    case 2031:
      return "2031_class_t1_refillablepotion";
    case 2033:
      return "2033_class_t1_corruptingpotion";
    case 2048:
      return "2048_ichorofillumination";
    case 2049:
      return "2049_guardiansamulet";
    case 2051:
      return "2051_aram_t1_guardianshorn";
    case 2052:
      return "2052_poro_snack";
    case 2055:
      return "2055_class_t1_controlward";
    case 2065:
      return "2065_tank_t4_shurelyasbattlesong";
    case 2138:
      return "2138_class_elixirofiron";
    case 2139:
      return "2139_class_t1_elixirofsorcery";
    case 2140:
      return "2140_class_t0_elixirofwrath";
    case 220000:
      return "220000_statanvil";
    case 220001:
      return "220001_fighteranvil";
    case 220002:
      return "220002_marksmananvil";
    case 220003:
      return "220003_assassinanvil";
    case 220004:
      return "220004_mageanvil";
    case 220005:
      return "220005_tankanvil";
    case 220006:
      return "220006_supportanvil";
    case 220007:
      return "220007_prismaticanvil";
    case 2319:
      return "2319_sackofgold";
    case 2403:
      return "2403_minion_dematerializer";
    case 2420:
      return "2420_shatteredarmguard";
    case 2422:
      return "2422_class_t1_slightlymagicalboots";
    case 2502:
      return "2502_unendingdespair";
    case 2503:
      return "2503_blackfiretorch64";
    case 2504:
      return "2504_kaenicrookern";
    case 2508:
      return "2508_fatedashes64";
    case 3001:
      return "3001_support_lunari";
    case 3002:
      return "3002_trailblazer";
    case 3003:
      return "3003_mage_t3_archangelstaff";
    case 3004:
      return "3004_marksman_t3_manamune";
    case 3005:
      return "3005_fighter_t3_atmasreckoning";
    case 3006:
      return "3006_class_t2_berserkersgreaves";
    case 3009:
      return "3009_class_t2_bootsofswiftness";
    case 3010:
      return "3010_voidboots";
    case 3010:
      return "3010_voidwalkers";
    case 3011:
      return "3011_enchanter_t3_chemtechfumigator";
    case 3012:
      return "3012_blessed_chalice";
    case 3020:
      return "3020_class_t2_sorcerersshoes";
    case 3022:
      return "3022_frozen_mallet";
    case 3023:
      return "3023_lifewell_pendant";
    case 3024:
      return "3024_tank_t2_glacialshroud";
    case 3026:
      return "3026_fighter_t3_guardianangel";
    case 3031:
      return "3031_marksman_t3_infinityedge";
    case 3032:
      return "3032_innervating_locket";
    case 3032:
      return "3032_yuntalwildarrows";
    case 3033:
      return "3033_marksman_t3_mortalreminder";
    case 3035:
      return "3035_marksman_t2_lastwhisper";
    case 3036:
      return "3036_marksman_t3_dominikregards";
    case 3041:
      return "3041_mage_t2_mejaissoulstealer";
    case 3042:
      return "3042_marksman_t3_muramana";
    case 3042:
      return "3042_netherrift_armor";
    case 3044:
      return "3044_fighter_t2_phage";
    case 3046:
      return "3046_marksman_t3_phantomdancer";
    case 3047:
      return "3047_class_t2_ninjatabi";
    case 3048:
      return "3048_mage_t3_seraphsembrace";
    case 3050:
      return "3050_enchanter_t3_zekesconvergence";
    case 3051:
      return "3051_fighter_t2_axeofavarosa";
    case 3053:
      return "3053_steraks_gage";
    case 3054:
      return "3054_silversteeltalons";
    case 3055:
      return "3055_fulmination";
    case 3056:
      return "3056_demonkingscrown";
    case 3056:
      return "3056_ohmwrecker";
    case 3057:
      return "3057_fighter_t2_sheen";
    case 3058:
      return "3058_shieldofmoltenstone";
    case 3059:
      return "3059_cloakofstarrynight";
    case 3061:
      return "3061_forceofentropy";
    case 3062:
      return "3062_sanguinegift";
    case 3063:
      return "3063_elishasmiracle";
    case 3064:
      return "3064_talismanofascension";
    case 3065:
      return "3065_tank_t3_spiritvisage";
    case 3066:
      return "3066_tank_t3_wingedmoonplate";
    case 3067:
      return "3067_tank_t1_kindlegem";
    case 3068:
      return "3068_tank_t4_sunfireaegis";
    case 3069:
      return "3069_hamstringer";
    case 3070:
      return "3070_all_t1_tearofthegoddess";
    case 3071:
      return "3071_fighter_t3_blackcleaver";
    case 3072:
      return "3072_fighter_t3_bloodthirster";
    case 3073:
      return "3073_hexaegis";
    case 3074:
      return "3074_fighter_t3_ravenoushydra";
    case 3075:
      return "3075_tank_t3_thornmail";
    case 3076:
      return "3076_tank_t2_bramblevest";
    case 3077:
      return "3077_fighter_t2_tiamat";
    case 3078:
      return "3078_fighter_t4_trinityforce";
    case 3082:
      return "3082_tank_t2_wardensmail";
    case 3083:
      return "3083_tank_t3_warmogs";
    case 3084:
      return "3084_tank_t4_heartsteel";
    case 3085:
      return "3085_marksman_t3_runaans";
    case 3086:
      return "3086_fighter_t2_zeal";
    case 3087:
      return "3087_statikk_shiv";
    case 3089:
      return "3089_mage_t3_deathcap";
    case 3091:
      return "3091_fighter_t3_witsend";
    case 3094:
      return "3094_marksman_t3_rapidfirehandcannon";
    case 3095:
      return "3095_windblade";
    case 3100:
      return "3100_mage_t3_lichbane";
    case 3102:
      return "3102_mage_t3_bansheesveil";
    case 3105:
      return "3105_tank_t2_aegisofthelegion";
    case 3107:
      return "3107_enchanter_t3_redemption";
    case 3108:
      return "3108_mage_t2_fiendishcodex";
    case 3109:
      return "3109_tank_t3_knightsvow";
    case 3110:
      return "3110_tank_t3_frozenheart";
    case 3111:
      return "3111_class_t2_mercurystreads";
    case 3112:
      return "3112_aram_t1_guardiansorb";
    case 3113:
      return "3113_mage_t2_aetherwisp";
    case 3114:
      return "3114_mage_t2_forbiddenidol";
    case 3115:
      return "3115_mage_t3_nashorstooth";
    case 3116:
      return "3116_mage_t3_rylajscrystalscepter";
    case 3117:
      return "3117_class_t2_bootsofmobility";
    case 3118:
      return "3118_malignance";
    case 3119:
      return "3119_wintersapproach";
    case 3121:
      return "3121_fimbulwinter";
    case 3123:
      return "3123_fighter_t2_executionerscalling";
    case 3124:
      return "3124_marksman_t3_guinsoosrageblade";
    case 3128:
      return "3128_deathfire_grasp";
    case 3131:
      return "3131_fighter_t3_swordofthedivine";
    case 3133:
      return "3133_fighter_t2_caulfieldswarhammer";
    case 3134:
      return "3134_assassin_t2_serrateddirk";
    case 3135:
      return "3135_mage_t3_voidstaff";
    case 3137:
      return "3137_cryptbloom";
    case 3139:
      return "3139_marksman_t3_mercurialscimitar";
    case 3140:
      return "3140_marksman_t2_quicksilversash";
    case 3142:
      return "3142_assassin_t3_youmuusghostblade";
    case 3143:
      return "3143_tank_t3_randuinsomen";
    case 3144:
      return "3144_scoutslingshot";
    case 3145:
      return "3145_mage_t2_hextechalternator";
    case 3146:
      return "3146_hextechgunblade";
    case 3147:
      return "3147_hauntingguise";
    case 3152:
      return "3152_mage_t4_hextechrocketbelt";
    case 3153:
      return "3153_fighter_t3_bladeoftheruinedking";
    case 3155:
      return "3155_fighter_t2_hexdrinker";
    case 3156:
      return "3156_fighter_t3_mawofmalmortius";
    case 3157:
      return "3157_mage_t3_zhonyashourglass";
    case 3158:
      return "3158_class_t2_ionianbootsoflucidity";
    case 3161:
      return "3161_fighter_t3_spearofshojin";
    case 3165:
      return "3165_mage_t3_morellonomicon";
    case 3172:
      return "3172_zephyr";
    case 3177:
      return "3177_aram_t1_guardiansblade";
    case 3177:
      return "3177_aram_t1_guardianshammer";
    case 3179:
      return "3179_assassin_t3_umbralglaive";
    case 3181:
      return "3181_hullbreaker";
    case 3181:
      return "3181_sanguineblade";
    case 3190:
      return "3190_enchanter_t4_locketofironsolari";
    case 3191:
      return "3191_battlemage_t2_seekersarmguard";
    case 3193:
      return "3193_tank_t3_gargoylestoneplate";
    case 3194:
      return "3194_battlemage_blocker";
    case 3211:
      return "3211_tank_t2_spectrescowl";
    case 3222:
      return "3222_enchanter_t3_mikaelsblessing";
    case 3302:
      return "3302_terminus";
    case 3340:
      return "3340_class_t1_wardingtotem";
    case 3348:
      return "3348_arcanesweeper";
    case 3363:
      return "3363_class_t1_farsightalteration";
    case 3364:
      return "3364_class_t1_oracleslens";
    case 3380:
      return "3380_the_forge_cleaver";
    case 3385:
      return "3385_forge_wooglets_witchcap";
    case 34:
      return "34";
    case 3430:
      return "3430_riteofruin";
    case 3504:
      return "3504_enchanter_t3_ardentcenser";
    case 3508:
      return "3508_marksman_t3_essencereaver";
    case 3513:
      return "3513_eyeoftheherald";
    case 3599:
      return "3599_kalistapassiveitem";
    case 3600:
      return "3600_champ_t0_blackspear";
    case 3742:
      return "3742_tank_t3_deadmansplate";
    case 3744:
      return "3744_enchanter_t3_staffofflowingwater";
    case 3748:
      return "3748_fighter_t3_titanichydra";
    case 3801:
      return "3801_tank_t2_crystallinebracer";
    case 3802:
      return "3802_mage_tier2_lostchapter";
    case 3803:
      return "3803_mage_t2_catalystofaeons";
    case 3814:
      return "3814_assassin_t3_edgeofnight";
    case 3850:
      return "3850_mage_t1_spellthiefsedge";
    case 3851:
      return "3851_mage_t2_frostfang";
    case 3853:
      return "3853_mage_t3_shardoftrueice";
    case 3854:
      return "3854_tank_t1_petriciteshoulderguard";
    case 3855:
      return "3855_tank_t2_runesteelspaulders";
    case 3857:
      return "3857_tank_t3_pauldronsofwhiterock";
    case 3858:
      return "3858_tank_t1_relicshield";
    case 3859:
      return "3859_tank_t2_targonsbucker";
    case 3860:
      return "3860_tank_t3_bulwarkofthemountain";
    case 3862:
      return "3862_marksman_t1_spectralsickle";
    case 3863:
      return "3863_marksman_t2_harrowingcrescent";
    case 3864:
      return "3864_marksman_t3_blackmistscythe";
    case 3865:
      return "3865_worldatlas";
    case 3866:
      return "3866_runiccompass";
    case 3867:
      return "3867_bountyofworlds";
    case 3869:
      return "3869_celestialopposition";
    case 3870:
      return "3870_dreammaker";
    case 3871:
      return "3871_zazzaksrealmspike";
    case 3876:
      return "3876_solticesleigh";
    case 3877:
      return "3877_bloodsong";
    case 3901:
      return "3901_champ_t0_fireatwillcircle";
    case 3902:
      return "3902_champ_t0_deathsdaughtercircle";
    case 3903:
      return "3903_champ_t0_raisemoralecircle";
    case 3916:
      return "3916_mage_t2_oblivionorb";
    case 4001:
      return "4001_ghostwalkers";
    case 4003:
      return "4003_assassin_t2_lifeline";
    case 4004:
      return "4004_assassin_t3_spectralcutlass";
    case 4005:
      return "4005_enchanter_t4_imperialmandate";
    case 4010:
      return "4010_bloodlettersveil";
    case 4011:
      return "4011_swordofblossomingdawn";
    case 4012:
      return "4012_sineater";
    case 4013:
      return "4013_lightning_braid";
    case 4015:
      return "4015_perplexity";
    case 4016:
      return "4016_wordlesspromise";
    case 4017:
      return "4017_hellfirehatchet";
    case 4401:
      return "4401_tank_t3_forceofnature";
    case 4403:
      return "4403_goldenspatula";
    case 443080:
      return "443080_twinmasks";
    case 443081:
      return "443081_hexboltcompanion";
    case 443090:
      return "443090_reaperstoll";
    case 447114:
      return "447114_reverberation";
    case 447115:
      return "447115_regicide";
    case 447116:
      return "447116_kinkoujitte";
    case 447118:
      return "447118_pyromancerscloak";
    case 447119:
      return "447119_lightningrod";
    case 447120:
      return "447120_diamondtippedspear";
    case 447121:
      return "447121_twilightsedge";
    case 447122:
      return "447122_blackholegauntlet";
    case 447123:
      return "447123_puppeteer";
    case 4628:
      return "4628_mage_t3_horizonfocus";
    case 4629:
      return "4629_mage_t3_cosmicdrive";
    case 4630:
      return "4630_mage_t2_voidcrystal";
    case 4632:
      return "4632_tank_t2_verdantbarrier";
    case 4633:
      return "4633_mage_t4_riftmaker";
    case 4635:
      return "4635_mage_t2_leechingleer";
    case 4636:
      return "4636_mage_t4_nightharvester";
    case 4637:
      return "4637_mage_t3_demonicembrace";
    case 4638:
      return "4638_enchanter_t3_watchfulsightstone";
    case 4641:
      return "4641_enchanter_t2_stirringsightstone";
    case 4642:
      return "4642_enchanter_t2_bandleglassmirror";
    case 4643:
      return "4643_enchanter_t3_vigilantsightstone";
    case 4644:
      return "4644_crown";
    case 4645:
      return "4645_shadowflame";
    case 4646:
      return "4646_stormsurge";
    case 6029:
      return "6029_fighter_t2_ironspikewhip";
    case 6035:
      return "6035_fighter_t3_silvermeredawn";
    case 6333:
      return "6333_fighter_t3_deathsdance";
    case 6609:
      return "6609_fighter_t3_chempunkchainsword";
    case 6610:
      return "6610_sunderedsky";
    case 6617:
      return "6617_enchanter_t4_moonstonerenewer";
    case 6620:
      return "6620_echoes_of_helia";
    case 6621:
      return "6621_dawncore";
    case 6630:
      return "6630_fighter_t4_goredrinker";
    case 6631:
      return "6631_fighter_t4_stridebreaker";
    case 6632:
      return "6632_fighter_t4_divinedevourer";
    case 6653:
      return "6653_mage_t4_liandrysanguish";
    case 6655:
      return "6655_casterscompanion";
    case 6656:
      return "6656_mage_t4_everfrost";
    case 6657:
      return "6657_mage_t4_rodofages";
    case 6660:
      return "6660_tank_t2_bamiscinder";
    case 6662:
      return "6662_tank_t3_iceborngauntlet";
    case 6664:
      return "6664_hollowradiance";
    // case 6664:
    //   return "6664_tank_t4_acceleratedchemtank";
    case 6665:
      return "6665_tank_t4_jakshotheprotean";
    case 6667:
      return "6667_tank_t4_radiantvirtue";
    case 6670:
      return "6670_marksman_t2_noonquiver";
    case 6671:
      return "6671_marksman_t4_galeforce";
    case 6672:
      return "6672_marksman_t4_behemothslayer";
    case 6673:
      return "6673_marksman_t4_crimsonshieldbow";
    case 6675:
      return "6675_navoriflickerblade";
    case 6676:
      return "6676_marksman_t3_thecollector";
    case 6677:
      return "6677_marksman_t2_rageknife";
    case 6690:
      return "6690_rectrix";
    case 6691:
      return "6691_assassin_t4_duskbladeofdraktharr";
    case 6692:
      return "6692_assassin_t4_eclipse";
    case 6693:
      return "6693_assassin_t4_prowlersclaw";
    case 6694:
      return "6694_assasin_t3_seryldasgrudge";
    case 6695:
      return "6695_assassin_t3_serpentsfang";
    case 6696:
      return "6696_axiomarc";
    case 6697:
      return "6697_hubris";
    case 6698:
      return "6698_profanehydra";
    case 6699:
      return "6699_voltaiccyclosword";
    case 6700:
      return "6700_aegis";
    case 6701:
      return "6701_opportunity";
    case 7000:
      return "7000_ornn_claws";
    case 7003:
      return "7003_ornn_glory";
    case 7100:
      return "7100_mirageblade";
    case 7101:
      return "7101_gamblers_blade";
    case 7102:
      return "7102_realityfracture";
    case 7103:
      return "7103_hemomancershelm";
    case 7105:
      return "7105_angelicpromise";
    case 7106:
      return "7106_dragonheart";
    case 7107:
      return "7107_decapitator";
    case 7108:
      return "7108_runecarver";
    case 7110:
      return "7110_moonflairspellblade";
    case 7111:
      return "7111_overlordsbloodmail";
    case 7112:
      return "7112_flesheater";
    case 7113:
      return "7113_detonationorb";
    case 8001:
      return "8001_tank_t3_anathemaschains";
    case 8020:
      return "8020_tank_t3_abyssalmask";
    default:
      return "ERROR"
  }
}