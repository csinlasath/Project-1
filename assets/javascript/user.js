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

    const databaseAuth = firebase.auth();

    databaseAuth.onAuthStateChanged(projectAppUser => {
        if (projectAppUser) {
            $("#account-details").show();
            $("#log-off-button").show();
            $("#watch-button").show();
            $("#loginDropdownMenuLink").text(projectAppUser.email);
            $("#login-button").hide();
            $("#sign-up-button").hide();
        } else {
            console.log("Not logged in.");
        }
    });

    $(document).on("click", "#user-info-login", function(event) {
        event.preventDefault();

        const emailText = $("#login-email-field").val().toString().toLowerCase().trim();
        const passwordText = $("#login-password-field").val().toString().toLowerCase().trim();
        
        const databasePromise = databaseAuth.signInWithEmailAndPassword(emailText, passwordText);
        databasePromise.catch(event => console.log(event.message));

        databaseAuth.onAuthStateChanged(projectAppUser => {
            if (projectAppUser) {
                $("#account-details").show();
                $("#log-off-button").show();
                $("#watch-button").show();
                $("#loginDropdownMenuLink").text(projectAppUser.email);
                $("#login-button").hide();
                $("#sign-up-button").hide();
                $("#login-modal").modal("hide");
            } else {
                console.log("Not logged in.");
            }
        });
    });

    $(document).on("click", "#info-user-signup", function(event) {
        event.preventDefault();

        const emailText = $("#sign-up-email-field").val().toString().toLowerCase().trim();
        const passwordText = $("#sign-up-password-field").val().toString().toLowerCase().trim();

        const databasePromise = databaseAuth.createUserWithEmailAndPassword(emailText, passwordText);
        databasePromise.catch(event => console.log(event.message));
        databaseAuth.onAuthStateChanged(projectAppUser => {
            if (projectAppUser) {
                $("#account-details").show();
                $("#log-off-button").show();
                $("#watch-button").show();
                $("#loginDropdownMenuLink").text(projectAppUser.email);
                $("#login-button").hide();
                $("#sign-up-button").hide();
                $("#sign-up-modal").modal("hide");
            } else {
                console.log("Not logged in.");
            }
        });
    });

    $(document).on("click", "#log-off-button", function() {
        firebase.auth().signOut();
        $("#account-details").hide();
        $("#log-off-button").hide();
        $("#watch-button").hide();
        $("#loginDropdownMenuLink").text("Menu");
        $("#login-button").show();
        $("#sign-up-button").show();
    });
});




