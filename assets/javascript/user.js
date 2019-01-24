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

    databaseAuth.onAuthStateChanged(projectAppUser => {
        if (projectAppUser) {
            $("#account-details").show();
            $("#log-off-button").show();
            $("#watch-button").show();
            if (firebase.auth().currentUser.displayName === null) {
                $("#loginDropdownMenuLink").text(projectAppUser.email);
            }
            else {
                $("#loginDropdownMenuLink").text(firebase.auth().currentUser.displayName);
            }
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

            database.on("child_added", snap => {
                if (snap.val().firebaseUserID === userSignInID) {
                    if (snap.val().mediaType === "Movie") {
                        const newListItem = $("<li></li>");
                        newListItem.addClass("list-group-item");
                        newListItem.text(snap.val().movieTitle + " - (" + snap.val().movieYear.replace("Year Released: ", "") + ")");
                        newListItem.attr("id", snap.key);
                        newListItem.attr("data-imdb", snap.val().imdbID);
                        newListItem.attr("data-type", snap.val().mediaType);
                        newListItem.css("background-color", "#999898");
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
                        newListItem.attr("data-tvid", snap.val().tvID);
                        newListItem.attr("data-type", snap.val().mediaType);
                        newListItem.css("background-color", "#999898");
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

        $("#signup-email-error").hide();
        $("#login-email-error").hide();
        $("#signup-password-error").hide();
        $("#login-password-error").hide();

        if (emailText.indexOf("@") && emailText.indexOf(".")) {
            emailIsValid = true;
            $("#signup-email-error").hide();
            $("#login-email-error").hide();
        }
        else {
            $("#signup-email-error").show();
            $("#login-email-error").show();
            $("#login-email-field").val("");
        }
        if (passwordText.length > 5) {
            passwordIsValid = true;
            $("#signup-password-error").hide();
            $("#login-password-error").hide();
        }
        else {
            $("#signup-password-error").show();
            $("#login-password-error").show();
            $("#login-password-field").val("");
        }
        if ((emailIsValid === true) && (passwordIsValid === true)) {
            const databasePromise = databaseAuth.signInWithEmailAndPassword(emailText, passwordText);
            databasePromise.catch(event => console.log(event.message));
            $("#signup-email-error").hide();
            $("#signup-password-error").hide();
            $("#login-email-error").hide();
            $("#login-password-error").hide();
            $("#login-email-field").val("");
            $("#login-password-field").val("");
        }
    });

    $(document).on("click", "#info-user-signup", function (event) {
        event.preventDefault();

        const emailText = $("#sign-up-email-field").val().toString().toLowerCase().trim();
        const passwordText = $("#sign-up-password-field").val().toString().toLowerCase().trim();

        var emailIsValid = false;
        var passwordIsValid = false;

        $("#signup-email-error").hide();
        $("#login-email-error").hide();
        $("#signup-password-error").hide();
        $("#login-password-error").hide();

        if (emailText.indexOf("@") && emailText.indexOf(".")) {
            emailIsValid = true;
            $("#signup-email-error").hide();
            $("#login-email-error").hide();
        }
        else {
            $("#signup-email-error").show();
            $("#login-email-error").show();
            $("#sign-up-email-field").val("");
        }
        if (passwordText.length > 5) {
            passwordIsValid = true;
            $("#signup-password-error").hide();
            $("#login-password-error").hide();
        }
        else {
            $("#signup-password-error").show();
            $("#login-password-error").show();
            $("#sign-up-password-field").val("");
        }

        if ((emailIsValid === true) && (passwordIsValid === true)) {
            const databasePromise = databaseAuth.createUserWithEmailAndPassword(emailText, passwordText);
            databasePromise.catch(event => console.log(event.message));

            $("#signup-email-error").hide();
            $("#signup-password-error").hide();
            $("#login-email-error").hide();
            $("#login-password-error").hide();
            $("#sign-up-email-field").val("");
            $("#sign-up-password-field").val("");
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
                tvID: $("#media-modal-imdb-tv").text(),
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

        if (displayName !== null) {
            $("#save-account-settings").hide();
            $("#account-info-display-name").text("Display Name: " + displayName);
            $("#account-info-email-show").text("Email Address: " + emailAddress);

        }
        else {
            var nameFormElement = $("<form>");
            var nameCaptureDiv = $("<div>");
            $(nameCaptureDiv).addClass("form-group");
            var nameLabel = $("<label>");
            nameLabel.attr("for", "firstNameInput");
            nameLabel.text("Please Type Your First Name");
            var nameInputElement = $("<input>");
            nameInputElement.attr("type", "text");
            nameInputElement.attr("id", "display-name-input");
            nameInputElement.addClass("form-control");
            $(nameCaptureDiv).append(nameLabel);
            $(nameLabel).append(nameInputElement);
            $(nameFormElement).append(nameCaptureDiv);
            $("#account-info-display-name").html(nameFormElement);

            var lastFormElement = $("<form>");
            var lastCaptureDiv = $("<div>");
            $(lastCaptureDiv).addClass("form-group");
            var lastLabel = $("<label>");
            lastLabel.attr("for", "lastNameInput");
            lastLabel.text("Please Type Your Last Name");
            var lastInputElement = $("<input>");
            lastInputElement.attr("type", "text");
            lastInputElement.attr("id", "last-name-input");
            lastInputElement.addClass("form-control");
            $(lastCaptureDiv).append(lastLabel);
            $(lastLabel).append(lastInputElement);
            $(lastFormElement).append(lastCaptureDiv);
            $("#account-info-phone-number").html(lastFormElement);
        }
        $("#save-account-settings").show();
        $("#account-info-modal").modal("show");
    });
});

$(document).on("click", "#save-account-settings", function () {
    var capturedFirstName = $("#display-name-input").val().trim();
    var capturedLastName = $("#last-name-input").val().trim();
    var capturedFullName = capturedFirstName + " " + capturedLastName;

    firebase.auth().currentUser.updateProfile({
        displayName: capturedFullName
    }).then(function () {
        console.log("Success");
    }).catch(function (error) {
        console.log(error);
    });
    $("#account-info-modal").modal("hide");
    if (firebase.auth().currentUser.displayName === null) {
        $("#loginDropdownMenuLink").text(projectAppUser.email);
    }
    else {
        $("#loginDropdownMenuLink").text(firebase.auth().currentUser.displayName);
    }
});

$(document).on("click", ".list-group-item", function () {

    if ($(this).attr("data-type") === "Movie") {
        var queryURL6 = "https://www.omdbapi.com/?i=";
        var omdbAPIKey = "&apikey=3dc16ac5";
        var videoSearch = "/videos?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US";
        var queryURL8 = "https://api.themoviedb.org/3/movie/";
        var movieID = $(this).attr("data-imdb");

        $("#watch-modal").modal("hide");
        $("#media-modal-body").prepend("<div id='media-modal-trailer'></div>");
        $.ajax({
            url: queryURL6 + movieID + omdbAPIKey,
            method: "GET"
        }).then(function (response) {
            $("#media-info-modal").modal();
            $("#media-info-modal-title").html(response.Title);
            $("#media-modal-overview").html("<p><q>" + response.Plot + "</q></p><br>");
            $("#media-modal-overview").css("font-weight", "bolder");
            $("#media-modal-year").html("Year Released: " + response.Year)
            $("#media-modal-rating").html("MetaScore: " + response.Metascore + "<br>");
            $("#media-modal-actors").html("Actors: " + response.Actors);
            $("#media-modal-director").html("Directed by: " + response.Director);
            $("#media-modal-genre").html("Genre: " + response.Genre);
            $("#media-modal-imdb").html(response.imdbID);
            $("#media-modal-imdb").attr("data-media-type", "Movie");
            $.ajax({
                url: queryURL8 + movieID + videoSearch,
                method: "GET"
            }).then(function (response) {
                if (!$.trim(response.results)) {
                    $("#media-modal-trailer").remove();
                } else {
                    $("#media-modal-trailer").html('<iframe id="ytplayer" type="text/html" src="https://www.youtube.com/embed/' + response.results[0].key + '" frameborder="0"></iframe>');
                    $("#media-modal-trailer").css("text-align", "center");
                }
            });
        });
    }
    if ($(this).attr("data-type") === "Show") {
        var moviePosterSize2 = "https://image.tmdb.org/t/p/w300";
        var queryURL7 = "https://api.themoviedb.org/3/tv/";
        var tmdbKey = "?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US";
        var videoSearch = "/videos?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US";
        var tvID = $(this).attr("data-tvid");

        $("#watch-modal").modal("hide");
        $("#media-modal-body-tv").prepend("<div id='media-modal-tv-trailer'></div>");
        $.ajax({
            url: queryURL7 + tvID + tmdbKey,
            method: "GET"
        }).then(function (response) {
            var width = 0;
            $("#media-info-modal-tv").modal();
            $("#media-info-modal-title-tv").html(response.name);
            $("#media-modal-overview-tv").html("<p><q>" + response.overview + "</q></p><br>");
            $("#media-modal-overview-tv").css("font-weight", "bolder");
            $("#media-modal-creators-tv").html("Created by: ")

            for (var i = 0; i < response.created_by.length; i++) {
                if (response.created_by.length > 0) {
                    if (i !== 0) {
                        $("#media-modal-creators-tv").append(", ");
                    }
                    $("#media-modal-creators-tv").append(response.created_by[i].name);
                }
            }

            $("#media-modal-first-air-tv").html("Original Air Date: " + response.first_air_date.slice(5, 10) + "-" + response.first_air_date.slice(0, 4) + "</div>");
            $("#media-modal-network-tv").html("Network:  " + response.networks[0].name);
            $("#media-modal-genre-tv").html("Genres: ");
            $("#media-modal-imdb-tv").html(response.id);

            for (var i = 0; i < response.genres.length; i++) {
                if (response.genres.length > 0) {
                    if (i !== 0) {
                        $("#media-modal-genre-tv").append(", ");
                    }
                    $("#media-modal-genre-tv").append(response.genres[i].name);
                }
            }
            if (response.last_episode_to_air !== null) {
                $("#media-modal-previousEpisode").html('<br><h5><strong>Previously on ' + response.name + '</strong></h5>');
                if (response.last_episode_to_air.still_path === null) {
                    $("#media-modal-previousEpisode").append('<img style="width: 100%" src="assets/images/null2.jpg">');
                } else {
                    $("#media-modal-previousEpisode").append('<img style="width: 100%" src="' + moviePosterSize2 + response.last_episode_to_air.still_path + '">');
                }
                $("#media-modal-previousEpisode").append('<div>Season ' + response.last_episode_to_air.season_number + ' Episode ' + response.last_episode_to_air.episode_number + '</div>');
                $("#media-modal-previousEpisode").append('<div>"' + response.last_episode_to_air.name + '"' + '</div>');
                $("#media-modal-previousEpisode").append('<div>Air Date: ' + response.last_episode_to_air.air_date.slice(5.10) + '-' + response.last_episode_to_air.air_date.slice(0, 4) + '</div>');
                $("#media-modal-previousEpisode").append('<hr><div>' + response.last_episode_to_air.overview + '</div>');
            }
            if (response.next_episode_to_air !== null) {
                $("#media-modal-nextEpisode").html('<br><h5><strong>Next on ' + response.name + '</strong></h5>');
                if (response.next_episode_to_air.still_path === null) {
                    $("#media-modal-nextEpisode").append('<img style="width: 100%" src="assets/images/null2.jpg">');
                } else {
                    $("#media-modal-nextEpisode").append('<img style="width: 100%" src="' + moviePosterSize2 + response.next_episode_to_air.still_path + '">');
                }
                $("#media-modal-nextEpisode").append('<div>Season ' + response.next_episode_to_air.season_number + ' Episode ' + response.next_episode_to_air.episode_number + '</div>');
                $("#media-modal-nextEpisode").append('<div>"' + response.next_episode_to_air.name + '"' + '</div>');
                $("#media-modal-nextEpisode").append('<div>Air Date: ' + response.next_episode_to_air.air_date.slice(5.10) + '-' + response.next_episode_to_air.air_date.slice(0, 4) + '</div>');
                $("#media-modal-nextEpisode").append('<hr><div>' + response.next_episode_to_air.overview);
            }
            $.ajax({
                url: queryURL7 + tvID + videoSearch,
                method: "GET"
            }).then(function (response) {
                if (!$.trim(response.results)) {
                    $("#media-modal-tv-trailer").remove();
                } else {
                    $("#media-modal-tv-trailer").html('<iframe id="ytplayer" type="text/html" src="https://www.youtube.com/embed/' + response.results[0].key + '" frameborder="0"></iframe>');
                    $("#media-modal-tv-trailer").css("text-align", "center");
                }
            });
        });
    }
});


