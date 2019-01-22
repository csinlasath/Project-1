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

    var userKey = "/users/";
    var database = firebase.database().ref().child(userKey);

    database.on("child_added", snap => {
        console.log(snap.val());

        if (snap.val().mediaType === "Movie") {
            const newListItem = $("<li></li>");
            newListItem.addClass("list-group-item");
            newListItem.text(snap.val().movieTitle + " - (" + snap.val().movieYear.replace("Year Released: ", "") + ")");
            newListItem.attr("id", snap.key);
            newListItem.attr("data-imdb", snap.val().imdbID);
            var deleteWatchListButton = $("<button>");
            deleteWatchListButton.add.id = snap.key + "-button";
            deleteWatchListButton.addClass("btn btn-danger remove-watch-list-button");
            deleteWatchListButton.text("Remove");
            deleteWatchListButton.css("float", "right");
            newListItem.append(deleteWatchListButton);
            $("#watch-list-group").append(newListItem);
        }
        if (snap.val().mediaType === "Show") {
            const newListItem = $("<li></li>");
            newListItem.addClass("list-group-item");
            newListItem.text(snap.val().showTitle + " - (" + snap.val().showNetwork + ")");
            newListItem.attr("id", snap.key);
            var deleteWatchListButton = $("<button>");
            deleteWatchListButton.add.id = snap.key + "-button";
            deleteWatchListButton.addClass("btn btn-danger remove-watch-list-button");
            deleteWatchListButton.text("Remove");
            deleteWatchListButton.css("float", "right");
            newListItem.append(deleteWatchListButton);
            $("#watch-list-group").append(newListItem);
        }
    });

    database.on("child_changed", snap => {
        console.log(snap.val());
        const listItemChanged = $(snap.key);
    });

    database.on("child_removed", snap => {
        console.log(snap.val());
        const listItemRemove = $(snap.key);
    });

    const databaseAuth = firebase.auth();

    databaseAuth.onAuthStateChanged(projectAppUser => {
        if (projectAppUser) {
            $("#account-details").show();
            $("#log-off-button").show();
            $("#watch-button").show();
            $("#loginDropdownMenuLink").text(projectAppUser.email);
            userKey = userKey + firebase.auth().currentUser.uid + "/";
            $("#login-button").hide();
            $("#sign-up-button").hide();
            $("#login-modal").modal("hide");
            $("#sign-up-modal").modal("hide");
            $("#add-to-watch-list-button").show();
            
        } else {
            console.log("Not logged in.");
        }
    });

    $(document).on("click", "#user-info-login", function (event) {
        event.preventDefault();

        const emailText = $("#login-email-field").val().toString().toLowerCase().trim();
        const passwordText = $("#login-password-field").val().toString().toLowerCase().trim();

        var emailIsValid = false;
        var passwordIsValid = false;

        if (emailText.indexOf("@") && emailText.indexOf(".")) {
            emailIsValid = true;
        }
        else {
            console.log("Email is not valid");
        }
        if (passwordText.length > 5) {
            passwordIsValid = true;
        }
        else {
            console.log("Password is not valid");
        }
        if ((emailIsValid === true) && (passwordIsValid === true)) {
            const databasePromise = databaseAuth.signInWithEmailAndPassword(emailText, passwordText);
            databasePromise.catch(event => console.log(event.message));
        }
    });

    $(document).on("click", "#info-user-signup", function (event) {
        event.preventDefault();

        const emailText = $("#sign-up-email-field").val().toString().toLowerCase().trim();
        const passwordText = $("#sign-up-password-field").val().toString().toLowerCase().trim();

        var emailIsValid = false;
        var passwordIsValid = false;

        if (emailText.indexOf("@") && emailText.indexOf(".")) {
            emailIsValid = true;
        }
        else {
            console.log("Email is not valid");
        }
        if (passwordText.length > 5) {
            passwordIsValid = true;
        }
        else {
            console.log("Password is not valid");
        }

        if ((emailIsValid === true) && (passwordIsValid === true)) {
            const databasePromise = databaseAuth.createUserWithEmailAndPassword(emailText, passwordText);
            databasePromise.catch(event => console.log(event.message));
        }


    });

    $(document).on("click", "#log-off-button", function () {
        firebase.auth().signOut();
        $("#account-details").hide();
        $("#log-off-button").hide();
        $("#watch-button").hide();
        $("#loginDropdownMenuLink").text("Menu");
        userKey = "/object/users/";
        $("#login-button").show();
        $("#sign-up-button").show();
        $("#add-to-watch-list-button").hide();
    });

    $(document).on("click", "#add-to-watch-list-button", function () {

        if (($(this).parent().attr("id")) === "media-modal-footer") {
            database.push({
                movieTitle: $("#media-info-modal-title").text(),
                movieYear: $("#media-modal-year").text(),
                imdbID: $("#media-modal-imdb").text(),
                mediaType: "Movie",
                firebaseUserID: firebase.auth().currentUser.uid,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            $("#media-info-modal").modal("hide");
        }
        if (($(this).parent().attr("id")) === "media-modal-tv-footer") {
            database.push({
                showTitle: $("#media-info-modal-title-tv").text(),
                showNetwork: $("#media-modal-network-tv").text(),
                mediaType: "Show",
                firebaseUserID: firebase.auth().currentUser.uid,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            $("#media-info-modal-tv").modal("hide");
        }
        if ($("#watch-list-group").children().length > 0) {
            $("#empty-watch-list").hide();
        }
        $("#watch-modal").modal("show");
    });

    $(document).on("click", ".remove-watch-list-button", function (snap) {
        $(this).closest("li").remove();
        database.child($(this).closest("li").attr("id")).remove();
        if ($("#watch-list-group").children().length < 1) {
            $("#empty-watch-list").show();
        }
    });

    $(document).on("click", "#watch-button", function () {
        if ($("#watch-list-group").children().length > 0) {
            $("#empty-watch-list").hide();
        }
        $("#watch-modal").modal("show");
    });
    $(document).on("click", "#account-details", function () {
        $("#account-modal-body").text("This is placeholder text");
        $("#account-info-modal").modal("show");
    });
});




