export const RANKED_SOLO_LEAGUE = "RANKED_SOLO_5x5"
export const RANKED_FLEX_LEAGUE = "RANKED_FLEX_SR"

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