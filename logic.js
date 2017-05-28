/
// 1. Initialize Firebase
 var config = {
    apiKey: "AIzaSyA1Y6P8S0I9gApZy3BVXumGosM5OgSGbPA",
    authDomain: "train-scheduler-d38c4.firebaseapp.com",
    databaseURL: "https://train-scheduler-d38c4.firebaseio.com",
    projectId: "train-scheduler-d38c4",
    storageBucket: "train-scheduler-d38c4.appspot.com",
    messagingSenderId: "202992679929"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var trName = "";
var trDestination = "";
var trTime = "";
var trFreq = "";
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
//var keyHolder = '';
//var getKey = '';
$( document ).ready(function() {
// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  trName = $("#train-name-input").val().trim();
  trDestination = $("#destination-input").val().trim();
  trTime = $("#time-input").val().trim();
  trFreq = $("#freq-input").val().trim
    firstTimeConverted = moment(trTime, "hh:mm").subtract(1, "years");
    currentTime = moment();
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    tRemainder = diffTime % trFreq;
    minutesTillTrain = trFreq - tRemainder;
    nextTrain = moment().add(minutesTillTrain, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm");

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trName,
    destination: trDestination,
    time: trTime,
    frequency: trFreq,
    nextTrainFormatted: nextTrainFormatted,
    minutesTillTrain: minutesTillTrain
  };

  // Uploads train data to the 
  database.ref().push(newTrain);

  // Logs everything to console
  //console.log(newTrain.name);
  //.log(newTrain.destination);
  //console.log(newTrain.time);
  //console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trName = childSnapshot.val().name;
  var trDestination = childSnapshot.val().destination;
  var trTime = childSnapshot.val().time;
  var trFrequency = childSnapshot.val().frequency;
  var nextTrainFormatted = childSnapshot.val().nextTrainFormatted;
  var minutesTillTrain = childSnapshot.val().minutesTillTrain;

  // Train Info
 //console.log(trName);
  //console.log(trDestination);
  //console.log(trTime);
  //console.log(trFrequency);

  // Prettify the train start
  //var trStartPretty = moment.unix(trTime).format();

  // Calculate the months worked using hardcore math
  // To calculate the months worked


  //var trNextArrival = "coming soon";

  // Add each train's data into the table
  $("#train-table").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" + trFrequency + "</td><td>" + nextTrainFormatted + "</td><td>" + minutesTillTrain + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
})