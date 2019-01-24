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
    const databaseAuth = firebase.auth();
    var userSignInID = "";
    var displayName = "";
    var emailAddress = "";
    var phoneNumber = "";

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
            $("#add-to-watch-list-button-tv").show();
            userSignInID = projectAppUser.uid;
            displayName = projectAppUser.displayName;
            emailAddress = projectAppUser.email;
            phoneNumber = projectAppUser.phoneNumber;

            $("#watch-list-group").empty();

            console.log(projectAppUser);
            console.log(displayName);
            console.log(emailAddress);
            console.log(phoneNumber);

            database.on("child_added", snap => {
                if (snap.val().firebaseUserID === userSignInID) {
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
                }
            });
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
            $("#signup-email-error").hide();
            $("#login-email-error").hide();
        }
        else {
            $("#signup-email-error").show();
            $("#login-email-error").show();
        }
        if (passwordText.length > 5) {
            passwordIsValid = true;
            $("#signup-password-error").hide();
            $("#login-password-error").hide();
        }
        else {
            $("#signup-password-error").show();
            $("#login-password-error").show();
        }
        if ((emailIsValid === true) && (passwordIsValid === true)) {
            const databasePromise = databaseAuth.signInWithEmailAndPassword(emailText, passwordText);
            databasePromise.catch(event => console.log(event.message));
            $("#signup-email-error").hide();
            $("#signup-password-error").hide();
            $("#login-email-error").hide();
            $("#login-password-error").hide();
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
            $("#signup-email-error").hide();
            $("#login-email-error").hide();
        }
        else {
            $("#signup-email-error").show();
            $("#login-email-error").show();
        }
        if (passwordText.length > 5) {
            passwordIsValid = true;
            $("#signup-password-error").hide();
            $("#login-password-error").hide();
        }
        else {
            $("#signup-password-error").show();
            $("#login-password-error").show();
        }

        if ((emailIsValid === true) && (passwordIsValid === true)) {
            const databasePromise = databaseAuth.createUserWithEmailAndPassword(emailText, passwordText);
            databasePromise.catch(event => console.log(event.message));

            $("#signup-email-error").hide();
            $("#signup-password-error").hide();
            $("#login-email-error").hide();
            $("#login-password-error").hide();
        }
    });

    $(document).on("click", "#log-off-button", function () {
        firebase.auth().signOut().then(function () {
            $("#account-details").hide();
            $("#log-off-button").hide();
            $("#watch-button").hide();
            $("#loginDropdownMenuLink").text("Menu");
            $("#login-button").show();
            $("#sign-up-button").show();
            $("#add-to-watch-list-button").hide();
            $("#add-to-watch-list-button-tv").hide();
        }).catch(function (error) {
            console.log(error);
        });
    });

    $(document).on("click", ".add-watch-list", function () {
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

        if ((displayName !== null) && (phoneNumber !== null)) {
            $("#account-info-display-name").text("Display Name: " + displayName);
            $("#account-info-email-show").text("Email Address: " + emailAddress);
            $("#account-info-phone-number").text("Phone Number: " + phoneNumber);
        }
        else {
            var nameFormElement = $("<form>");
            var nameCaptureDiv = $("<div>");
            $(nameCaptureDiv).addClass("form-group");
            var nameLabel = $("<label>");
            nameLabel.attr("for", "displayNameInput");
            nameLabel.text("Please Set a Display Name");
            var nameInputElement = $("<input>");
            nameInputElement.attr("type", "text");
            nameInputElement.attr("id", "display-name-input");
            nameInputElement.addClass("form-control");
            $(nameCaptureDiv).append(nameLabel);
            $(nameLabel).append(nameInputElement);
            $(nameFormElement).append(nameCaptureDiv);
            $("#account-info-display-name").html(nameFormElement);

            var phoneFormElement = $("<form>");
            var phoneCaptureDiv = $("<div>");
            $(phoneCaptureDiv).addClass("form-group");
            var phoneLabel = $("<label>");
            phoneLabel.attr("for", "displayNameInput");
            phoneLabel.text("Please Set a Phone Number");
            var phoneInputElement = $("<input>");
            phoneInputElement.attr("type", "text");
            phoneInputElement.attr("id", "display-name-input");
            phoneInputElement.addClass("form-control");
            $(phoneCaptureDiv).append(phoneLabel);
            $(phoneLabel).append(phoneInputElement);
            $(phoneFormElement).append(phoneCaptureDiv);
            $("#account-info-phone-number").html(phoneFormElement);
        }
        $("#account-info-modal").modal("show");
    });
});




