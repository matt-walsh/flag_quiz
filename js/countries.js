/*
    Project Title: Logic and Problem Solving Project
    File: countries.js
    Author(s): Matt Walsh
    Date Created: 2019-11-29
    Description: Creates aa array of JS object that contains all of the information required for the page to function
*/


/*
JSON Schema
{
    'name' : COUNTRY_NAME,
    'population' : POPULATION,
    'areaMiles' : AREA,
    'areaKms' : CalculateAreaInKm(),
    'flag' : COUNTRY_NAME.png,
    'wiki' : "https://en.wikipedia.org/wiki/COUNTRY_NAME",
    'populationDensity' : CalculatePopulationDensity()
}
*/

//Takes in an array of JSON data about countries of the world and
//Returns an array of augmented JSON data containing more information about these countries
function ProcessData(rawData){
    let countryArray = [];
    rawData.forEach(country => {
        newCountry = {
            'name' : country.Name,
            'population' : country.Population,
            'areaMiles' : country.Area,
            'areaKms' : CalculateAreaInKM(country.Area),
            'flag' : `${country.Name.replace(/( )/g, "_")}.png`,
            'wiki' : `https://en.wikipedia.org/wiki/${country.Name.replace(/( )/g, "_")}`,
            'populationDensityKm' : CalculatePopulationDensity(country.Population, country.Area, "km"),
            'populationDensityMi' : CalculatePopulationDensity(country.Population, country.Area, "mi"),
        }
        countryArray.push(newCountry);
    });
    return countryArray;
}

//Takes in the area in miles
//Returns area in kilometers (km)
function CalculateAreaInKM(areaInMiles){
    return areaInMiles * 1.609
}

//Takes in the area and population of a country and the unit you want the results in and
//returns the population density of the country in the specified unit
function CalculatePopulationDensity(population, area, unitChoice){
    let density;
    if (unitChoice === 'km') {
        density = population / CalculateAreaInKM(area);
    }
    else if(unitChoice === 'mi'){
        density = population / area;
    }

    return density
}


