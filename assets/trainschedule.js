$(document).ready(function () {

     // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDnjnCumsDvArs9AMZG0FT-vpCu6ajraUE",
    authDomain: "train-scheduler-84974.firebaseapp.com",
    databaseURL: "https://train-scheduler-84974.firebaseio.com",
    projectId: "train-scheduler-84974",
    storageBucket: "",
    messagingSenderId: "591408442224",
    appId: "1:591408442224:web:935ae5e2726bf0a0db7db5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    let dataBase = firebase.database()

    function addToDatabase(train, destination, frequency) {

        dataBase
            .ref()
            .push({
                train: train,
                destination: destination,
                frequency: frequency,
            })
    }

    dataBase
        .ref()
        .on("child_added", function (snapshot) {

            let trainName = snapshot.val().train,
                trainDestination = snapshot.val().destination,
                trainFrequency = snapshot.val().frequency

            buildRow(trainName, trainDestination, trainFrequency)
        })

    function buildRow(train, destination, frequency) {
        let newTrain = $("<tr>")
        let trainNameCol = $("<td>")
        let destinationCol = $("<td>")
        let frequencyCol = $("<td>")
        let nextArrivalCol = $("<td>")
        let minutesAwayCol = $("<td>")

        let startDateMoment = moment(startDate, "MM/DD/YYY");
        let monthsWorked = moment().diff(startDateMoment, "months");
        // let totalBilled = monthsWorked * monthlyRate;

        trainNameCol.text(train)
        destinationCol.text(destination)
        frequencyCol.text(frequency)
        nextArrivalCol.text(nextArrival)
        minutesAwayCol.text(minutesAway)

        newTrain.append(trainNameCol)
        newTrain.append(destinationCol)
        newTrain.append(frequencyCol)
        newTrain.append(minutesAwayCol)
        newTrain.append(nextArrivalCol)

        $("#trainScheduleTable").append(newTrain)

    }

    $("#add-train").click(function () {
        event.preventDefault();
        let trainName = $("#trainName").val(),
            trainDestination = $("#trainDestination").val(),
            trainFrequency = $("#trainFrequency").val()

        addToDatabase(trainName, trainDestination, trainFrequency)
    })

})