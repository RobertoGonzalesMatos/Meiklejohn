var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { collection, getDocs, getFirestore } from "firebase/firestore";
export var AllMeikData = [];
export function loadAllMeiks() {
    return __awaiter(this, void 0, void 0, function* () {
        if (AllMeikData.length === 0) {
            const db = getFirestore();
            const snapshot = yield getDocs(collection(db, "meiks"));
            AllMeikData = snapshot.docs.map((doc) => doc.data());
            console.log("Firebase is being called");
        }
    });
}
export function updateSearch(tags) {
    var searchResults = [];
    AllMeikData.forEach((meik) => {
        tags.forEach((tag) => {
            const currentTag = tag.toString().toLocaleLowerCase();
            if (meik.concentration.toLocaleLowerCase().includes(currentTag) ||
                meik.location.toLocaleLowerCase().includes(currentTag) ||
                meik.name.toLocaleLowerCase().includes(currentTag) ||
                meik.year.toLocaleLowerCase().includes(currentTag) ||
                meik.text.toLocaleLowerCase().split(" ").includes(currentTag)) {
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
export function algoMeiks(uid) {
    return fetch("http://localhost:3232/getRecMeiks?uid=" + uid)
        .then((response) => response.json())
        .catch((e) => {
        return "ERROR: " + e;
    });
}
export function singleMeik(meikId) {
    return fetch("http://localhost:3232/getMeikById?id=" + meikId)
        .then((response) => response.json())
        .catch((e) => {
        return "ERROR: " + e;
    });
}
export function changeInfo(meikId, name, location, year, tag, concentration, collection) {
    return fetch("http://localhost:3232/updateMeik?collection=" +
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
        concentration)
        .then((response) => response.json())
        .catch((e) => {
        return "ERROR: " + e;
    });
}
