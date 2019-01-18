$(document).ready(function () {



    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBOB9TkbAPtIjCrgXC5_vHKVms283aQx4o",
        authDomain: "project-1-music-trivia.firebaseapp.com",
        databaseURL: "https://project-1-music-trivia.firebaseio.com",
        projectId: "project-1-music-trivia",
        storageBucket: "project-1-music-trivia.appspot.com",
        messagingSenderId: "743814852234"
    };
    firebase.initializeApp(config);

    database = firebase.database();

    $("#info-user-signup").on("click", function (event) {
        event.preventDefault();
        var firstName = $("#first-name-field").val().trim();
        var lastName = $("#last-name-field").val().trim();
        var email = $("#sign-up-email-field").val().trim();
        var password = $("#sign-up-password-field").val().trim();


        database.ref("user").push({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
    });

    $("#user-info-login").on("click", function (event) {
        event.preventDefault();

        var userRef = database.ref('user');
        userRef.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                console.log(childData);

                var emailTrue = false;

                var passwordTrue = false;

                if($("#login-email-field").val().trim() == childData.email){
                    console.log(childData.email + "It Works!");
                    emailTrue = true;
                }
                else{
                    console.log("Wrong!")
                }
                if($("#login-password-field").val().trim() == childData.password){
                    console.log(childData.password + "It Works Again!");
                    passwordTrue = true;
                }

                else{
                    console.log("Wrong Again!")
                }

                if (emailTrue == true && passwordTrue == true){
                    $("#")
                }
            });
        })

    });







});




