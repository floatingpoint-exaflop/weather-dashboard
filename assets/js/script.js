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
const todayDisplayEl = $('#divider-today');
// ? This is a div element where we can dump today's forecast on a larger appended tile.
const fiveDayDisplayEl = $('#divider-5day');
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



/*


// ? WHEN CALLED:
  // ? Reads forecast search history from localStorage & parses/returns the JSON to an array of forecast objects.
  // ? If there are no forecasts in localStorage, it makes and returns an empty array []).
function readForecastsFromStorage() {
  let historyArray = JSON.parse(localStorage.getItem('searches'));
  // ? If no forecasts in localStorage, make a new empty array.
  if (!historyArray) {
    historyArray = [];
  }
  // ? Return the forecasts array either empty or with data in it
  return history;
}

// ? WHEN CALLED BY BUTTON CLICK:
// ? Accepts & stringifys array of forecasts & saves tolocalStorage.
function saveForecastsToStorage(history) {
  localStorage.setItem('forecasts', JSON.stringify(history));
}

// ? Creates a clickable search history button from the information passed in `project` parameter and returns it.

blogPosts.forEach(blogPost => {
  // Create article div; this and its children will be styled in css but we just need a container for this stuff first.
  const blogPostTile = document.createElement('article');
  blogPostTile.classList.add('blog-post-tile');

  function createHistoryButtons(forecast) {
    const historyButton = $('<button type=submit>')
      .addClass('btn btn-custom col-12 d-flex').text(forecast.cityName);

  // 1. postTitle as an <h4>.
  const postTitle = document.createElement('h4');
  postTitle.textContent = blogPost.postTitle;
  postTitle.classList.add('post-title-h4');

  // 5. Searched cities' values go into the <button> div we generated for each object in the array.
  blogPostTile.appendChild(postTitle);
  blogPostTile.append(byLine);
  blogPostTile.appendChild(postContent);
  blogPostTile.appendChild(userName);

  // 6. Dump all the <article> tiles on the page via appending the container div to the main section.
  mainTag.appendChild(blogPostTile);
});

function createHistoryButtons(forecast) {
  const historyButton = $('<button type=submit>')
    .addClass('btn btn-custom col-12 d-flex').text(forecast.cityName);


  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete');
  cardDeleteBtn.on('click', handleDeleteForecast);
  // ? Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDeleteBtn);
  forecastCard.append(cardHeader, cardBody);

  // ? Return the card so it can be appended to the correct lane.
  return forecastCard;
}



// ? Because the cards are dynamically added to the screen, we have to use jQuery event delegation to listen for clicks on the added cards delete button.
// ? We listen for a click on the parent element, and THEN check if the target of the click is the delete button. If it is, we call the `handleDeleteProject` function
// projectDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);





//---Submit Search, Run API Queries, Display Results---

// ? Creates a project card from the information passed in `project` parameter and returns it.
function createForecastButton(forecast) {
  const forecastCard = $('<div>')
    .addClass('card project-card my-3');
  const cardHeader = $('<div>').addClass('card-header h4').text(forecast.name);
  const cardBody = $('<div>').addClass('card-body');

  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete');
  cardDeleteBtn.on('click', handleDeleteForecast);
  // ? Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDeleteBtn);
  forecastCard.append(cardHeader, cardBody);

  // ? Return the card so it can be appended to the correct lane.
  return forecastCard;

function printForecastData() {
  const forecasts = readForecastsFromStorage();
  // ? Empty existing project cards out of the lanes
  const forecastList = $('#todo-cards');
  forecastList.empty();
  // ? Loop through forecasts and create forecast cards for each day
  for (let forecast of forecasts) {
    if (forecast.status === 'to-do') {
      todoList.append(createProjectCard(project));
    } else if (project.status === 'in-progress') {
      inProgressList.append(createProjectCard(project));
    } else if (project.status === 'done') {
      doneList.append(createProjectCard(project));
    }
  }
  // ? Remove project from the array with a `forEach()` loop to remove the project.
  forecasts.forEach((forecast) => {
    if (forecast.id === forecastId) {
      forecasts.splice(forecasts.indexOf(forecast), 1);
    }
  });
  // ? We will use our helper function to save the forecasts to localStorage
  saveforecastsToStorage(forecasts);
  // ? Here we use our other function to print forecasts back to the screen
  printForecastData();
}

// ? Adds a forecast search to local storage and prints the forecast data for today and for five days ahead
function handleForecastFormSubmit(event) {
  event.preventDefault();
  // ? Read user input from the form
  const cityName = cityInputEl.val().trim();
  const usStateName = usStateInputEl.val(); // don't need to trim select input
  // ? Pull the forecasts from localStorage and push the new project to the array
  const forecasts = readForecastsFromStorage();
  forecasts.push(newProject);
  // ? Save the updated forecasts array to localStorage
  saveforecastsToStorage(forecasts);
  // ? Print project data back to the screen
  printProjectData();
  // ? Clear the form inputs
  cityInputEl.val('');
  usStateInputEl.val('');
  projectDateInputEl.val('');
}

// ? Add event listener to the form element, listen for a submit event, and call the `handleProjectFormSubmit` function.
// searchFormEl.on('submit', searchFormSubmit);




// ? When the document is ready, print the project data to the screen and make the lanes droppable. Also, initialize the date picker.
// $(document).ready(function () {
  // ? Print project data to the screen on page load if there is any
//   printProjectData();

//   $('#taskDueDate').datepicker({
//     changeMonth: true,
//     changeYear: true,
//   });
// });


*/
