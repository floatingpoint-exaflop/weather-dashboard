//-----------User Input DOM Elements-------------------
const cityInputEl = $('#city-search-input');
  // ? User enters a city which will be passed as part of a parameter to the geolocator function
const usStateInputEl = $('#us-state-input');
  // ? User enters an optional US state which will be passed as part of a parameter to the geolocator function
const searchFormEl = $('#search-form');
  // ? Since the search form only has one submit button, the event listener below can check for 'submit' on the search form as a whole.

//-----------System Output DOM Elements----------------
const timeDisplayEl = $('#time-display');
  // ? This is just where the clock goes in the header
const historyDisplayEl = $('#history-display');
  // ? This is a div element where we can dump the user history.
  const todayDisplayEl = $("contents-today");
// ? This is a div element where we can dump today's forecast on a larger appended tile.
const firstDateDisplayEl = $('#date-day1');
const firstContentsDisplayEl = $('#contents-day1');
const secondDateDisplayEl = $('#date-day2');
const secondContentsDisplayEl = $('#contents-day2');
const thirdDateDisplayEl = $('#date-day3');
const thirdContentsDisplayEl = $('#contents-day3');
const fourthDateDisplayEl = $('#date-day4');
const fourthContentsDisplayEl = $('#contents-day4');
const fifthDateDisplayEl = $('#date-day5');
const fifthContentsDisplayEl = $('#contents-day5');
// ? This is a div element where we can dump today's forecast on a larger appended tile.

//--------------------Functions------------------------

// ? We call displayTime every second to display and update the user's local time.
function displayTime() {
  const now = dayjs().format('MMM DD, YYYY [at] hh:mm a');
  timeDisplayEl.text(now);
}
displayTime();
setInterval(displayTime, 1000);

//---------Search History and localStorage-------------

//Reloads the search history and generates clickable buttons to search that item again.
function loadSearchHistory() {
  const historyItems = JSON.parse(localStorage.getItem('searchhistory')) || [];
  historyDisplayEl.empty();
  historyItems.forEach(searchItem => {
      const historyButton = $('<button type="button">')
          .addClass('btn btn-custom col-12 d-flex mb-2')
          .text(searchItem.city)
          .on('click', function() {
            getGPS2(searchItem.city, searchItem.state, searchItem.country);
        });
      historyDisplayEl.append(historyButton);
  });
}


function clrWeatherTiles() {
  // const historyItems = JSON.parse(localStorage.getItem('searchhistory')) || [];

  todayDisplayEl.empty(); // Clear today's forecast
    firstDateDisplayEl.empty(); //And the other forecasts
      firstContentsDisplayEl.empty();
    secondDateDisplayEl.empty();
      secondContentsDisplayEl.empty();
    thirdDateDisplayEl.empty();
      thirdContentsDisplayEl.empty();
    fourthDateDisplayEl.empty();
      fourthContentsDisplayEl.empty();
    fifthDateDisplayEl.empty();
      fifthContentsDisplayEl.empty();
  };



//Takes the lat and lon values received from 'data' in the getGPS2 function and passes them to a call for the weather API.
function getWeather(lat, lon){
  const apiKey = '33bdfcb4f69a12d7c8b759f0808a5e61';
  const weatherurl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  console.log('I am calling the Weather API...');
  fetch(weatherurl)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      // document.getElementById('contents-today').innerHTML=data.list[0].main.temp;
      for (let index = 0; index < data.list.length; index++) {
        document.getElementById('contents-today').innerHTML=data.list[index].main.temp;
        console.log(data.list[index].main)
      }
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
  // clrWeatherTiles();
}

//Takes the city, state, and country values received from the getGPS1 function and makes a call for the for the GPS API.
function getGPS2(city, state, country){
  const apiKey = '33bdfcb4f69a12d7c8b759f0808a5e61';
  const geourl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${apiKey}`;
  console.log('I am calling the GPS API...');
  fetch(geourl)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
    if (data.length > 0) { // Ensure we have results
        const { lat, lon } = data[0]; // Get the latitude and longitude from the first result
        getWeather(lat, lon); // Pass them to the getWeather function
    } else {
        console.log('No location found.');
    }
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});
}

function getGPS1(){
  const historyItems = JSON.parse(localStorage.getItem('searchhistory')) || [];
  if (historyItems.length > 0) {
      const latestSearch = historyItems[historyItems.length - 1];
      getGPS2(latestSearch.city, latestSearch.state, latestSearch.country);
  } else {
      console.log('No search history found.');
  }
  };


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
        cityInputEl.val('');
        usStateInputEl.val(''); 
    } else {
        //If the city field is empty:
        alert(`You must enter a City. State is an optional field.`);
    }
};

searchFormEl.on('submit', writeToLocalStorage);
searchFormEl.on('submit', loadSearchHistory);
searchFormEl.on('submit', getGPS1);
loadSearchHistory();
