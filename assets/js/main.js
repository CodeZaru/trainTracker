/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the trains database.
// 4. Create a way to calculate the calculated fields on the train arrivals table--Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Add to table in view 

////////////////////////////////
// 1. Initialize Firebase
///////////////////////////////
  var config = {
    apiKey: "AIzaSyCXN2X28nO04QtATJod1hHVw1Rj0fuJHs4",
    authDomain: "gwbootcamp1.firebaseapp.com",
    databaseURL: "https://gwbootcamp1.firebaseio.com",
    projectId: "gwbootcamp1",
    storageBucket: "gwbootcamp1.appspot.com",
    messagingSenderId: "699275836103"
  };
  firebase.initializeApp(config);

var database = firebase.database();

/////////////////////////////////////////////
// 2. Button for adding Employees
/////////////////////////////////////////////
$("#add-employee-btn").on("click", function(event) {
//prevents default behavior of page refreshing each time submit button is clicked
  event.preventDefault();

// Grabs user input and assigns to variables
//converting firstTrain time to unix format time for calculations 

  trainName = $("#train-name-input").val().trim();
  destination = $("#destination-input").val().trim();
  firstTrainTime = moment($("#firstTrainTime-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  frequency = $("#frequency-input").val().trim();


  // Creates local "temporary" object for holding employee data
  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  };

console.log("newTrain: " + newTrain);

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrainTime);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var trainDest = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().firstTrainTime;
  var trainFreq = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFirst);
  console.log(trainFreq);

////////////////////////////////////////////////////////////////////////////////////////////////////
// 4. Create a way to calculate the calculated fields on the train arrivals table--Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
////////////////////////////////////////////////////////////////////////////////////////////////////
  //calculating time differences
  var timeDifference = moment().diff(moment.unix(trainFirst), "minutes");
  var timeRemaining = moment().diff(moment.unix(trainFirst), "minutes") % trainFreq;
  var timeMinutes = trainFreq - timeRemaining;

  //calculating the next train arrivals and fomat to display in minutes
  var nextTrain = moment().add(timeMinutes, "m").format("hh:mm A");
  console.log("timeMinutes: " + timeMinutes);
  console.log("nextArrival: " + nextTrain);

  // Add each train's data into the table
  $("#arrivals-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainFreq + "</td><td>" + nextTrain + "</td><td>" + timeMinutes + "</td></tr>");
});

