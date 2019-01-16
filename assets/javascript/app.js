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

$(document).ready(function() {
    
    $("#submit-button").on("click", function(event) {
        event.preventDefault();
        var searchType = $("#search-type-selector").val();

        var searchTopic = $("#search-bar").val().trim();
        var omdbAPIKey = "&apikey=3dc16ac5";
        
        //Update This for use with Title
        if (searchType === "Title") {
            var queryURL = "https://www.omdbapi.com/?t=" + searchTopic + omdbAPIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
            });
        }
        //Update This for use with Genre
        if (searchType === "Genre") {
            var searchPerson = $("#search-bar").val().trim();
            var theMovieDBAPIKey = "api_key=b3599d7d48ba417da97cd4b6a2911968";
            var movieLang = "&language=en-US";
            var personParam = "&query="
            var queryURL = "https://api.themoviedb.org/3/search/person?" + theMovieDBAPIKey + movieLang + personParam + searchPerson;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                
                var searchParam = "/movie_credits?"
                console.log(response.results[0].id);
                var queryURL = "https://api.themoviedb.org/3/person/" + response.results[0].id + searchParam + theMovieDBAPIKey + movieLang;

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(responseChild) {
                    console.log(responseChild);
                });
            });
        }

        if (searchType === "Actor/Actress") {
            var searchPerson = $("#search-bar").val().trim();
            var theMovieDBAPIKey = "api_key=b3599d7d48ba417da97cd4b6a2911968";
            var movieLang = "&language=en-US";
            var personParam = "&query="
            var queryURL = "https://api.themoviedb.org/3/search/person?" + theMovieDBAPIKey + movieLang + personParam + searchPerson;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                
                var searchParam = "/movie_credits?"
                console.log(response.results[0].id);
                var queryURL = "https://api.themoviedb.org/3/person/" + response.results[0].id + searchParam + theMovieDBAPIKey + movieLang;

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(responseChild) {
                    console.log(responseChild);
                });
            });
        }
        //Update This for Use with Plot
        if (searchType === "Plot") {
            var queryURL = "https://www.omdbapi.com/?plot=" + searchTopic + omdbAPIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
            });
        }
        $("#search-bar").val("");
    });

});
