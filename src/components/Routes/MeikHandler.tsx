import Meik from "./MeikObject";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export var AllMeikData: Meik[] = [];

export async function loadAllMeiks() {
  if (AllMeikData.length === 0) {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, "meiks"));
    AllMeikData = snapshot.docs.map((doc) => doc.data() as Meik);
    console.log("Firebase is being called");
  }
}

export function updateSearch(tags: String[]): Meik[] {
  var searchResults: Meik[] = [];
  AllMeikData.forEach((meik) => {
    tags.forEach((tag) => {
      const currentTag = tag.toString().toLocaleLowerCase();
      if (
        meik.concentration.toLocaleLowerCase().includes(currentTag) ||
        meik.location.toLocaleLowerCase().includes(currentTag) ||
        meik.name.toLocaleLowerCase().includes(currentTag) ||
        meik.year.toLocaleLowerCase().includes(currentTag) ||
        meik.text.toLocaleLowerCase().split(" ").includes(currentTag)
      ) {
        searchResults.push(meik);
        return;
      }
      meik.tags.forEach((meikTag) => {
        if (meikTag.toLocaleLowerCase().includes(currentTag)) {
          searchResults.push(meik);
          return;
        }
      });
    });
  });
  return searchResults;
}

export function algoMeiks(uid: String): Promise<AlgoMeiksResponse> {
  return fetch("http://localhost:3232/getRecMeiks?uid=" + uid)
    .then((response) => response.json())
    .catch((e) => {
      return "ERROR: " + e;
    });
}

export function singleMeik(meikId: String): Meik {
  var searchResults: Meik = {
    concentration: "concentration",
    email: "example@brown.edu",
    id: "",
    imageURL: "",
    location: "place,country",
    name: "Example Name",
    tags: [""],
    text: "Example Text",
    year: "'26",
  };
  AllMeikData.forEach((meik) => {
    if (meik.id.includes(meikId.toString())) {
      searchResults = meik;
      return;
    }
  });
  return searchResults;
}
interface AlgoMeiksResponse {
  uid: string;
  results: {
    meiks: Meik[];
    // Other properties in the results object
  };
  images: Record<string, string>;
}

export function changeInfo(
  meikId: String,
  name: String,
  location: String,
  year: String,
  tag: String,
  concentration: String,
  collection: String
): Promise<string[]> {
  return fetch(
    "http://localhost:3232/updateMeik?collection=" +
      collection +
      "&id=" +
      meikId +
      "&name=" +
      name +
      "&location=" +
      location +
      "&year=" +
      year +
      "&tag=" +
      tag +
      "&concentration=" +
      concentration
  )
    .then((response) => response.json())
    .catch((e) => {
      return "ERROR: " + e;
    });
}
