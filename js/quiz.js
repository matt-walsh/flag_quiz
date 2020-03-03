'use strict;'
//Holds the index of the currently display question
let currentQuestion = 0;

let quiz;
window.onload = (event) =>{
    let jsonDataURL = `./data/countries.json`;
    FetchJSON(jsonDataURL).then((jsonArray) =>{
        quiz = CreateQuiz(jsonArray);
    }).then(() =>{
        console.log(quiz[currentQuestion]);
        ShowQuestions()
    });

    //Hook up event listeners
    document.getElementById("next-question").addEventListener('click', (event) =>{
        //Check if there is another question to view
        if (currentQuestion < quiz.length) {
            //Go to next question
            currentQuestion++;
        }
        
        //check if we are at the last question
        if (currentQuestion >= quiz.length - 1) {
            event.target.disabled = true;
        }

        //If there is a previous question, enable the previous button
        if (currentQuestion > 0) {
            document.getElementById("previous-question").disabled = false;
        }

        ShowQuestions();
    });
    document.getElementById("previous-question").addEventListener('click', (event) =>{
        //Check if there is a previous question to view
        if (currentQuestion > 0) {
            //Go to previous question
            currentQuestion--;
        }
        
        //check if we are at the first question
        if (currentQuestion <= 0) {
            event.target.disabled = true;;
        }

        //If there is another question, enable the next button
        if (currentQuestion < quiz.length) {
            document.getElementById("next-question").disabled = false;
        }

        ShowQuestions();
    });
}

function ShowQuestions(){
    //Get the div that we need to append the questions to
    let questionSection = document.getElementById("radio-questions");
    let radioChoices = [];
    //Create four radio buttons and labels from the current question
    for (let i = 0; i < quiz[currentQuestion].choices.length; i++) {
        //Create Label for the question
        let choiceLabel = document.createElement("label");
        choiceLabel.setAttribute("for", `${quiz[currentQuestion].choices[i].replace(/( )/g, "-").toLowerCase()}-radio`)

        //Create Input (Radio)
        let choice = document.createElement("input");
        choice.setAttribute("type", "radio");
        choice.setAttribute("name", "answers-radio");
        choice.setAttribute("id", `${quiz[currentQuestion].choices[i].replace(/( )/g, "-").toLowerCase()}-radio`);
        choice.setAttribute("value",quiz[currentQuestion].choices[i]);

        //Add the input to the label
        choiceLabel.appendChild(choice);

        //append the label text to the label AFTER appending the input node
        choiceLabel.innerHTML += quiz[currentQuestion].choices[i];

        //Add the label to the question div
        questionSection.appendChild(choiceLabel);
    }
}

//Takes in an array of Country JSON Data and
//Returns an array of JSON data containing an array of four answer choices, the correct answer, the correct flag, and an empty field to hold the chosen answer
function CreateQuiz(jsonArray){
    const QUESTION_COUNT = 10;
    let usedCorrectCountryIndices = [];
    let quiz = [];

    for (let i = 0; i < QUESTION_COUNT; i++) {
        let question = {};
        //Selct random country as correct answer
        let gettingCountry = true
        while (gettingCountry) {
            let selectedCountryIndex = GetRandomInteger(0, jsonArray.length);
            //Check to see if we have already used this index
            if (!usedCorrectCountryIndices.includes(selectedCountryIndex)) {
                //append the "correctAnswer" to the question object
                question.correctAnswer = jsonArray[selectedCountryIndex].Name;
                //append "flag" to the question object
                question.flag = `${jsonArray[selectedCountryIndex].Name.replace(/( )/g, "_")}.png`;
                //add correct country to list of used correct countries
                usedCorrectCountryIndices.push(selectedCountryIndex);
                gettingCountry = false;
            }
        }

        //Select three other countries as incorrect answers
        let usedIncorrectCountryIndices = [];
        let incorrectCountries = []
        
        //Get three incorrect answers to the quiz
        for (let j = 0; j < 3; j++) {
            gettingCountry = true;
            while (gettingCountry) {
                let selectedCountryIndex = GetRandomInteger(0, jsonArray.length);
                //Make sure the seleceted index is not the correct answer
                if (question.correctAnswer.Name !== jsonArray[selectedCountryIndex].Name) {
                    //Make sure we haven't already chosen this index as an incorrect answer
                    if (!usedIncorrectCountryIndices.includes(selectedCountryIndex)) {
                        incorrectCountries.push(jsonArray[selectedCountryIndex].Name);
                        //add incorrect country to list of used incorrect countries
                        usedIncorrectCountryIndices.push(selectedCountryIndex);
                        gettingCountry = false;
                    }
                }                    
            }
        }

        //randonmize the question location in the array
        let correctCountryPosition = GetRandomInteger(0, 2);
        let choicesArray = [];
        for (let j = 0; j < 3; j++) {
            if(j === correctCountryPosition){
                choicesArray.push(incorrectCountries[j]);
                choicesArray.push(question.correctAnswer);
            }
            else{
                choicesArray.push(incorrectCountries[j]);
            }
        }
        //append incorrect countries to the question
        question.choices = choicesArray;   
        
        //Create blank field within the object to hold the answer the user selected
        question.answer = "";
        //push question to array
        quiz.push(question);
    }

    return quiz;
}

//Uses the fetchAPI to load the country info file, and returns the data in JSON format
async function FetchJSON(url){
    let response = await fetch(url);
    return response.json();
}

//Generates a random integer between min and max (inclusive)
function GetRandomInteger(min, max)
{
    min = Number.parseInt(min);
    max = Number.parseInt(max);

    if(!Number.isNaN(min) || !Number.isNaN(max)){
        if (min < max) {
            return Math.floor(Math.random() * (max)) + min;
        }
    }
    
    return undefined;
};