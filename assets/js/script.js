// ? Grab references to the important DOM elements to link to html.
const timeDisplayEl = $('#time-display');
const historyDisplayEl = $('#history-display');
const searchFormEl = $('#search-form');
const projectNameInputEl = $('#project-name-input');
const projectTypeInputEl = $('#project-type-input');
const projectDateInputEl = $('#taskDueDate');

// ? Called every second in the setInterval function below.
function displayTime() {
  const rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(rightNow);
}

// ? Reads forecasts from localStorage and return/parse the JSON to an array of forecast objects.
// ? If there are no forecasts in localStorage, it initializes an empty array ([]) and returns it.
function readForecastsFromStorage() {
  let forecasts = JSON.parse(localStorage.getItem('forecasts'));
  // ? If no forecasts in localStorage, make a new empty array.
  if (!forecasts) {
    forecasts = [];
  }
  // ? Return the forecasts array either empty or with data in it
  return forecasts;
}



// ? Accepts & stringifys array of forecasts & saves tolocalStorage.
function saveForecastsToStorage(forecasts) {
  localStorage.setItem('forecasts', JSON.stringify(forecasts));
}



// ? Creates a project card from the information passed in `project` parameter and returns it.
function createForecastButton(forecast) {
  const forcastCard = $('<div>')
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
  return taskCard;
}

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
  const projectName = projectNameInputEl.val().trim();
  const projectType = projectTypeInputEl.val(); // don't need to trim select input
  const projectDate = projectDateInputEl.val(); // yyyy-mm-dd format
  // ? Pull the forecasts from localStorage and push the new project to the array
  const forecasts = readForecastsFromStorage();
  forecasts.push(newProject);
  // ? Save the updated forecasts array to localStorage
  saveforecastsToStorage(forecasts);
  // ? Print project data back to the screen
  printProjectData();
  // ? Clear the form inputs
  projectNameInputEl.val('');
  projectTypeInputEl.val('');
  projectDateInputEl.val('');
}

// ? Add event listener to the form element, listen for a submit event, and call the `handleProjectFormSubmit` function.
projectFormEl.on('submit', handleProjectFormSubmit);

// ? Because the cards are dynamically added to the screen, we have to use jQuery event delegation to listen for clicks on the added cards delete button.
// ? We listen for a click on the parent element, and THEN check if the target of the click is the delete button. If it is, we call the `handleDeleteProject` function
projectDisplayEl.on('click', '.btn-delete-project', handleDeleteProject);

// ? Call the `displayTime` function once on page load and then every second after that.
displayTime();
setInterval(displayTime, 1000);

// ? When the document is ready, print the project data to the screen and make the lanes droppable. Also, initialize the date picker.
$(document).ready(function () {
  // ? Print project data to the screen on page load if there is any
  printProjectData();

  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
