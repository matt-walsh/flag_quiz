# JSON Data Flow Psudocode
## Get JSON Data
```javascript
    When the page loads:
        Use XMLHTTPRequest (or Fetch) To load json file
        Use JSON.Parse() to convert the file to an array of JS Objects (dataArray)
        Loop:
            create option tag for each country
            (innerHTML = country name, Value = current index)
            Store tag in tagArray
        Insert tagArray into country-list slect tag (index.html)
```

## Populate Country Info
```javascript
    When the user selects a country from "country-list":
        Retreive the specified country from the dataArray and populate the inputs that are specified in JSON (name, population, area (miles))
        Insert the countries flag onto page using country name to retreive image files (replace instances of " " to "_")
        Modify the wiki-link tag using the country name to link to wikipedia page (replace instances of " " to "_") 
        use the specified countries data to calculate the feilds that are not contained within the data and populate inputs
        (miles to km = miles * 1.609)
        (population density = population / area (miles))
        (percentage world population = country population / world population * 100);
```