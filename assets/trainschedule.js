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

    function addToDatabase(train, destination, time, frequency) {

        dataBase
            .ref()
            .push({
                train: train,
                destination: destination,
                time: time,
                frequency: frequency,
            })
    }

    dataBase
        .ref()
        .on("child_added", function (snapshot) {

            let trainName = snapshot.val().train,
                trainDestination = snapshot.val().destination,
                firstTime = snapshot.val().time,
                trainFrequency = snapshot.val().frequency

            buildRow(trainName, trainDestination, firstTime, trainFrequency)
        })

    function buildRow(train, destination, time, frequency) {
        let newTrain = $("<tr>")
        let trainNameCol = $("<td>")
        let destinationCol = $("<td>")
        let frequencyCol = $("<td>")
        let nextArrivalCol = $("<td>")
        let minutesAwayCol = $("<td>")

        let nextArrivalConverted = moment(time, "hh:mm").subtract(1, "years");
        console.log(nextArrivalConverted);

        // let currentTime = moment();
        let diffTime = moment().diff(moment(nextArrivalConverted), "minutes");
        console.log(diffTime);

        let timeRemainder = diffTime % frequency;
        console.log(timeRemainder);

        let minutesTillTrain = frequency - timeRemainder;
        console.log(minutesTillTrain);

        nextArrival = moment().add(minutesTillTrain, "minutes");
        console.log(moment(nextArrival).format("HH:mm a"));


        trainNameCol.text(train)
        destinationCol.text(destination)
        frequencyCol.text(frequency)
        nextArrivalCol.text(moment(nextArrival).format("HH:mm a"))
        minutesAwayCol.text(minutesTillTrain)

        newTrain.append(trainNameCol)
        newTrain.append(destinationCol)
        newTrain.append(frequencyCol)
        newTrain.append(nextArrivalCol)
        newTrain.append(minutesAwayCol)

        $("#trainScheduleTable").append(newTrain)

    }

    $("#add-train").click(function () {
        event.preventDefault();
        let trainName = $("#trainName").val(),
            trainDestination = $("#trainDestination").val(),
            firstTime = $("#firstTrainTime").val(),
            trainFrequency = $("#trainFrequency").val()

        $("#train-form")[0].reset();

        addToDatabase(trainName, trainDestination, firstTime, trainFrequency);

    })

})