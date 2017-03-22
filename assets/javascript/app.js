 var config = {
    apiKey: "AIzaSyCRNAZSGUqAlZUPQFhLk6y_XNyNH2w4lio",
    authDomain: "hw7train.firebaseapp.com",
    databaseURL: "https://hw7train.firebaseio.com",
    storageBucket: "hw7train.appspot.com",
    messagingSenderId: "33620302218"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$("#submitBtn").on("click", function(){

	var newName = $("#trainNameInput").val().trim();
	var newDestination = $("#trainDestinationInput").val().trim();
	var newFrequency = $("#frequencyInput").val().trim();
	var newStart = $("#firstTrainInput").val().trim();

	database.ref().push({
		name: newName,
		destination: newDestination,
		start: newStart,
		frequency: newFrequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
	

	$("#trainNameInput").val(" ");
	$("#trainDestinationInput").val(" ");
	$("#frequencyInput").val(" ");
	$("#firstTrainInput").val(" ");

	return false;
});

database.ref().on("child_added", function(childSnapshot) {
	

	var name = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var start = childSnapshot.val().start;
	var frequency = childSnapshot.val().frequency;


	var newTr = $("<tr>");

	var newTrainTd = $("<td>");
	var newDestinationTd = $("<td>");
	var newFirstTrainTd = $("<td>");
	var newFrequencyTd = $("<td>");
	var newNextTd = $("<td>");
	var newMinutesAwayTd = $("<td>");

	var firstTimeConverted = moment(start,"hh:mm").subtract(1, "years");
	var currentTime = moment();
	var timeDiff = moment().diff(firstTimeConverted, "minutes");
	var timeRemainder = timeDiff % frequency;
	var minutesNextTrain = frequency - timeRemainder;
	var nextTrain = moment().add(minutesNextTrain, "minutes").format("hh:mm");

	newTrainTd.text(name);
	newDestinationTd.text(destination);
	newFirstTrainTd.text(start);
	newFrequencyTd.text(frequency);
	newNextTd.text(nextTrain);
	newMinutesAwayTd.text(minutesNextTrain);



	newTr.append(newTrainTd, newDestinationTd, newFirstTrainTd, newFrequencyTd, newNextTd, newMinutesAwayTd);
	$(".tbody").append(newTr);

});