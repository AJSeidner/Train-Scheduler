
// 1. Initialize Firebase
 var config = {
    apiKey: "AIzaSyA1Y6P8S0I9gApZy3BVXumGosM5OgSGbPA",
    authDomain: "train-scheduler-d38c4.firebaseapp.com",
    databaseURL: "https://train-scheduler-d38c4.firebaseio.com",
    projectId: "train-scheduler-d38c4",
    storageBucket: "train-scheduler-d38c4.appspot.com",
    
  };
  firebase.initializeApp(config);

  var database = firebase.database();

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
  var trName = $("#train-name-input").val().trim();
  var trDestination = $("#destination-input").val().trim();
  var trTime = moment($("#time-input").val().trim(),"HH:mm").subtract(10,"years").format("X");
  var trFreq = $("#freq-input").val().trim(); 

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trName,
    destination: trDestination,
    time: trTime,
    frequency: trFreq,
    
  };

  // Uploads train data to the 
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDestination = childSnapshot.val().destination;
  var tTime = childSnapshot.val().time;
  var tFrequency = childSnapshot.val().frequency;


  //Calculating next train arrival
  var differenceTimes = moment().diff(moment.unix(tTime), "minutes");
  var tRemainder = moment().diff(moment.unix(tTime), "minutes") % tFrequency;
  var tMinutes = tFrequency - tRemainder;
  var tArrival = moment().add(tMinutes, "m").format("hh:mm A");


  $("#train-table").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
})