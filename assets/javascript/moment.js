var config = {
    apiKey: "AIzaSyDCU1eTxnGPjO_yOEgfizd9F0v4VYZ2sjc",
    authDomain: "train-scheduler-c1846.firebaseapp.com",
    databaseURL: "https://train-scheduler-c1846.firebaseio.com",
    projectId: "train-scheduler-c1846",
    storageBucket: "train-scheduler-c1846.appspot.com",
    messagingSenderId: "114959605905"
  };
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;

$(document).on("click", "#submitButton", function() {
	event.preventDefault();

	trainName = $("#name-input").val().trim();
	destination = $("#destination-input").val().trim();
	firstTrainTime = $("#time-input").val().trim();
	frequency = $("#frequency-input").val().trim();

	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency
	});

});

database.ref().on("child_added", function(snapshot) {


	console.log(snapshot.val());

	trainName = snapshot.val().trainName;
	destination = snapshot.val().destination;
  	firstTrainTime = snapshot.val().firstTrainTime;
  	frequency = snapshot.val().frequency;

	var firstTrain = moment(firstTrainTime, 'HH:mm');
  	var nowMoment = moment();

  	var minutesFirstArrival = nowMoment.diff(firstTrain, 'minutes');
  	var minutesLastArrival = minutesFirstArrival % frequency;
  	var minutesAway = frequency - minutesLastArrival;

  	var nextArrival = nowMoment.add(minutesAway, 'minutes');
  	var formatNextArrival = nextArrival.format("HH:mm");


  	var row = '<tr><td>' + trainName + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + formatNextArrival + '</td><td>' + minutesAway + '</td></tr>'
  	console.log(row)
  	$("#trainInfo").append(row);



});


