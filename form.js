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

//--------------------Functions------------------------

function loadSearchHistory() {
  const historyItems = JSON.parse(localStorage.getItem('searchhistory')) || [];
  
  historyDisplayEl.empty(); // Clear any existing buttons
  historyItems.forEach(searchItem => {
      const historyButton = $('<button type="button">')
          .addClass('btn btn-custom col-12 d-flex mb-2') // Add a margin to space out buttons
          .text(searchItem.city); // Use searchItem.city instead of searchhistory.city
      historyDisplayEl.append(historyButton);
  });
}

function getGPS2(city, state, country){
  // event.preventDefault();
  const apiKey = '33bdfcb4f69a12d7c8b759f0808a5e61';
  const geourl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${apiKey}`;
  console.log('I am calling the GPS function');

  fetch(geourl)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function getGPS1(){
loadSearchHistory();
if (historyItems.length > 0) {
    const latestSearch = historyItems[historyItems.length - 1];
    getGPS2(latestSearch.city, latestSearch.state, latestSearch.country);
} else {
    console.log('No search history found.');
}
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
        console.log('Country is blank by defaut; it gets a code of "us" if a state was given.');
        //Declaring and defining an array to hold our list of objects (user submissions), tie it directly to localStorage retrieval.
        let historyArray = JSON.parse(localStorage.getItem('searchhistory')) || [];
        //Declaring and defining the structure for the objects (user submissions).
    
        const newSearch = {
            city: cityValue,
            state: stateValue,
            country: !stateValue ? '' : 'us' // Replace 'Country Value' with the desired default value
        };
        console.log(newSearch);
        //Updating the array and adding an object from the latest submission.
        historyArray.push(newSearch);
        //Updating localStorage with the latest updates to the object array.
        localStorage.setItem('searchhistory', JSON.stringify(historyArray));
    } else {
        //If the city field is empty:
        alert(`You must enter a City. State is an optional field.`);
    }
};



searchFormEl.on('submit', writeToLocalStorage);
searchFormEl.on('submit', loadSearchHistory);
searchFormEl.on('submit', getGPS1);
loadSearchHistory();
