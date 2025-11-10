import debounce from "lodash.debounce";
import { alert, defaultModules, success, error, info } from "@pnotify/core/dist/PNotify.js";

import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";

import "@pnotify/core/dist/BrightTheme.css";

import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css"

defaultModules.set(PNotifyMobile, {});

alert({
  text: "Моя перша нотифікація!",
});

function getCountriesArrey() {
    return fetch("https://restcountries.com/v3.1/all?fields=name").then(res => res.json());
}
getCountriesArrey().then(res => console.log(res))


const inputEl = document.querySelector(".countries")

inputEl.addEventListener("input", (evt) => {
 console.log(evt.target.value.trim());
})

