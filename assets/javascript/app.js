$(document).ready(function() {
    
    $("#submit-button").on("click", function(event) {
        event.preventDefault();
        var searchType = $("#search-type-selector").val();

        var searchTopic = $("#search-bar").val().trim();
        var omdbAPIKey = "&apikey=3dc16ac5";
        
        //Update This for use with Title
        if (searchType === "Title") {

            var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&query=" + searchTopic + "&page=1&include_adult=false";
            var moviePosterSize = "https://image.tmdb.org/t/p/w200";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                console.log(response);
                $("#plot-synopsis").html(
                    "<div class='card' style='width: 300px;'><img class='card-img-top' src='" + moviePosterSize + response.results[0].poster_path + "' alt='Movie Poster'><div class='card-body'><h1 class='card-title' style='font-size: 35px'><strong>" + response.results[0].title + "</strong></h1><hr><p class='card-text' style='font-size: 15px'>" + response.results[0].overview.slice(0,138) + " . . . " + "</p><a href='#' class='btn btn-primary'>See Info</a></div></div>"
                );
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


