import debounce from "lodash.debounce";
import {
  alert,
  defaultModules,
  success,
  error,
  info,
} from "@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";

import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/mobile/dist/PNotifyMobile.css";

defaultModules.set(PNotifyMobile, {});

import fetchCountries from "./fetchCountries";


const inputEl = document.querySelector(".countries");
const listEl = document.querySelector(".js-list");
const divEl = document.querySelector(".app-contant");

inputEl.addEventListener("input", debounce(searchCountry, 500));

function searchCountry(evt) {
  const countryName = evt.target.value.trim();

  if (!countryName) {
    listEl.innerHTML = "";
    divEl.innerHTML = "";
    return;
  }

  fetchCountries(countryName)
    .then((res) => {
      listEl.innerHTML = "";
      divEl.innerHTML = "";

      if (res.length > 10) {
        errorMessage();
        return;
      }

      if (res.length > 1 && res.length <= 10) {
        const countriesList = res
          .map((country) => `<li class="js-item">${country.name.common}</li>`)
          .join("");
        listEl.innerHTML = countriesList;
        return;
      }

      if (res.length === 1) {
        const { name, capital, population, flags, languages } = res[0];
        const languagesArray = Object.values(languages);

        divEl.innerHTML = `
          <h1 class="app-cname">${name.common}</h1>
          <div class="app-box">
            <div class="app-cinfo">
              <h3 class="app-subtitle">Capital: 
                <span class="app-subtitle-info">${capital}</span></h3>
              <h3 class="app-subtitle">Population: 
                <span class="app-subtitle-info">${population}</span></h3>
              <h3 class="app-subtitle">Languages:</h3>
              <ul class="app-clanguages">
                ${languagesArray
                  .map(
                    (language) => `
                    <li class="clanguages-item">
                      <h3 class="clanguages-subtitle">${language}</h3>
                    </li>`
                  )
                  .join("")}
              </ul>
            </div>
            <div class="app-cimage">
              <img src="${flags.png}" 
                   alt="Country Flag" 
                   class="app-cimg" 
                   width="400" 
                   height="300">
            </div>
          </div>`;
      }
    })
    .catch(() => {
      error({
        title: "Error!",
        text: "Country not found 😢",
        delay: 1500,
      });
    });
}

// =====================

function errorMessage() {
    error({
        title: "Oh No!",
        text: "Write the name of the country more precisely",
        delay: 1000,
    });
}


