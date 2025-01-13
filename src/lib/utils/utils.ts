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