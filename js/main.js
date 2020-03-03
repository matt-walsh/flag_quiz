/*
    Project Title: Logic and Problem Solving Project
    File: main.js
    Author(s): Matt Walsh
    Date Created: 2019-11-29
    Description: Main script file for project. Contains all presentation code
*/
let countries;
window.onload = (event) => {
    //Load and process JSON data
    let jsonDataURL = `./data/countries.json`;
    FetchJSON(jsonDataURL).then((jsonArray) =>{
        countries = ProcessData(jsonArray);
    }).then(() =>{
        PopulateCountryList()
    });

    //Attach Event Handlers
    document.getElementById("country-list").addEventListener("change", (event)=>{
        //Get the current country from the event's target's (country-list) value
        let targetCountry = countries[event.target.value];
        if (document.getElementById("country-list").value > -1) {
            DisplayCountryData(targetCountry);
            DisplayCountryArea(targetCountry);
            DisplayPopulationData(targetCountry);
            DisplayPopulationDensity(targetCountry);           
        }
    });

    document.getElementById("area-select").addEventListener("change", (event)=>{
        //Get the current country from the selected county on the country-list
        let targetCountry = countries[document.getElementById("country-list").value];
        DisplayCountryArea(targetCountry);
    });

    document.getElementById("square-km").addEventListener("change", (event) =>{
        //Get the current country from the selected county on the country-list
        let targetCountry = countries[document.getElementById("country-list").value];
        DisplayPopulationDensity(targetCountry);
    });

    document.getElementById("square-mile").addEventListener("change", (event) => {
        //Get the current country from the selected county on the country-list
        let targetCountry = countries[document.getElementById("country-list").value];
        DisplayPopulationDensity(targetCountry)
    });
};

//Takes in a url to a JSON file and
//Asynchronously fetches that file, returning the JSON from the response
async function FetchJSON(url){
    let response = await fetch(url);
    return response.json();
}

//Creates Option nodes and appends them to the select element
function PopulateCountryList(){
        let countryList = document.getElementById("country-list");

        //Create an option element based on each countries data
        for (let i = 0; i < countries.length; i++) {
            let option = document.createElement("option");
            option.setAttribute("id", countries[i].name);
            option.setAttribute("value", i);
            option.innerHTML = countries[i].name;
            
            countryList.appendChild(option);
        }
}

//Updates the country name and flag elements
function DisplayCountryData(country){
    let countryName = document.getElementById("country-name");
    let flagImage = document.getElementById("flag-image");
    let wikiButton = document.getElementById("wiki-link");

    countryName.innerHTML = country.name;
    flagImage.setAttribute("src", `./flags/${country.flag}`);
    flagImage.setAttribute("alt", `The flag of ${country.name}`);
    wikiButton.setAttribute("href", country.wiki);

    console.log(`Displaying ${country.name} General Data!`);
}

//Updates the area element based on the select 
function DisplayCountryArea(country){
    let areaSelect = document.getElementById("area-select");
    let areaDisplay = document.getElementById("area-display");

    if(areaSelect.value === "km"){
        areaDisplay.value = country.areaKms;
    }
    else if(areaSelect.value === "mi"){
        areaDisplay.value = country.areaMiles;
    }
    console.log(`Displaying ${country.name} Area Data!`);
}

//Updates the population, and the percentage of world population elements
function DisplayPopulationData(country){
    let populationDisplay = document.getElementById("population-display");
    let populationPercent = document.getElementById("population-percent");

    populationDisplay.value = country.population;
    populationPercent.value = `${(country.population / CalculateTotalWorldPopulation() * 100).toFixed(4)}%`;
    console.log(`Displaying ${country.name} Population Data.`);
}

// Updates the population density element based on the units radio elements
function DisplayPopulationDensity(country){
    let squareKm = document.getElementById("square-km");
    let squareMile = document.getElementById("square-mile");
    let populationDensity = document.getElementById("population-density");

    if(squareKm.checked){
        populationDensity.value = country.populationDensityKm.toFixed(1);
    }
    else if(squareMile.checked){
        populationDensity.value = country.populationDensityMi.toFixed(1);
    }
}

//Adds the population of all countries together and returns the total
function CalculateTotalWorldPopulation(){
    let worldPopulation = 0;
    countries.forEach(country => {
        worldPopulation += country.population;
    });
    return worldPopulation;
}