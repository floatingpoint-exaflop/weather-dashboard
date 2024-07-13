//-----------User Input DOM Elements-------------------
const cityInputEl = $('#city-search-input');
  // ? User enters a city which will be passed as part of a parameter to the geolocator function
const usStateInputEl = $('#us-state-input');
  // ? User enters an optional US state which will be passed as part of a parameter to the geolocator function
//-----------User Input DOM Elements-------------------
const searchFormEl = $('#search-form');
  // ? Since the search form only has one submit button, the event listener below can check for 'submit' on the search form as a whole.

//-----------System Output DOM Elements----------------
const historyDisplayEl = $('#history-display');

function getGPS(event){
    event.preventDefault();
    console.log('I am calling the GPS function');
}

function writeToLocalStorage(event){
    event.preventDefault();
    const cityValue = cityInputEl.val();
    const stateValue = usStateInputEl.val();
    console.log('I am writing these search parameters to localStorage');
    //We want to check both input fields have data in them. We don't care how much; they just need something.

    if (cityValue !== '') {
        console.log(`Searched city was ${cityValue}`);
        console.log(`Searched state was ${stateValue}`);
        console.log('I am writing these search parameters to localStorage, along with a county code of us if a state was given');
        //Declaring and defining an array to hold our list of objects (user submissions), tie it directly to localStorage retrieval.
        let historyArray = JSON.parse(localStorage.getItem('search history')) || [];
        //Declaring and defining the structure for the objects (user submissions).
    
        const newSearch = {
            City: cityValue,
            State: stateValue,
            Country: !stateValue ? '' : 'us' // Replace 'Country Value' with the desired default value
        };
        console.log(newSearch);
        //Updating the array and adding an object from the latest submission.
        historyArray.push(newSearch);
        //Updating localStorage with the latest updates to the object array.
        localStorage.setItem('search history', JSON.stringify(historyArray));

       
    } else {
        //If the city field is empty:
        alert(`You must enter a City. State is an optional field.`);
    }
};
searchFormEl.on('submit', (getGPS));
searchFormEl.on('submit', writeToLocalStorage);

//Then, we must put an event listener on the submit button, so it actually does things.

    