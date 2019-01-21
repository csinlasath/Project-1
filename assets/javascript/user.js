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
    // database.on('value', snap => {
    //     console.log(snap.val());
    //     $("#my-watch-list").html(JSON.stringify(snap.val(), null, 3));
    // });

    database.on("child_added", snap => {
        console.log(snap.val());

        const newListItem = $("<li></li>");
        newListItem.addClass("list-group-item");
        newListItem.text(snap.val().movieTitle + " - (" + snap.val().movieYear.replace("Year Released: ", "") + ")");
        newListItem.attr("id", snap.key);
        var deleteWatchListButton = $("<button>");
        deleteWatchListButton.add.id = snap.key + "-button";
        deleteWatchListButton.addClass("btn btn-danger remove-watch-list-button");
        deleteWatchListButton.text("Remove");
        deleteWatchListButton.css("float", "right");
        newListItem.append(deleteWatchListButton);
        $("#watch-list-group").append(newListItem);
        // $("#my-watch-list").html(JSON.stringify(snap.val(), null, 3));
    });

    database.on("child_changed", snap => {
        console.log(snap.val());
        const listItemChanged = $(snap.key);
        // ("#watch-list-group").remove(listItemChanged);
    });

    database.on("child_removed", snap => {
        console.log(snap.val());
        const listItemRemove = $(snap.key);
        // ("#watch-list-group").remove(listItemRemove);
    });

    const databaseAuth = firebase.auth();

    databaseAuth.onAuthStateChanged(projectAppUser => {
        if (projectAppUser) {
            $("#account-details").show();
            $("#log-off-button").show();
            $("#watch-button").show();
            $("#loginDropdownMenuLink").text(projectAppUser.email);
            userKey = userKey + firebase.auth().currentUser.uid.toString() + "/";
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
                userKey = userKey + firebase.auth().currentUser.uid + "/"; 
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
                userKey = userKey + firebase.auth().currentUser.uid + "/"; 
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
        userKey = "/object/users/";
        $("#login-button").show();
        $("#sign-up-button").show();
    });

    $(document).on("click", "#add-to-watch-list-button", function() {
        database.push({
            movieTitle: $("#media-info-modal-title").text(),
            movieYear: $("#media-modal-year").text(),
            imdbID: $("#media-modal-imdb").text(),
            firebaseUserID: firebase.auth().currentUser.uid,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $("#media-info-modal").modal("hide");
        $("#watch-modal").modal("show");
    });

    $(document).on("click", ".remove-watch-list-button", function(snap) {
        $(this).closest("li").remove();
        database.child($(this).closest("li").attr("id")).remove();
    });
});




