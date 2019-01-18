$(document).ready(function() {
    var mediaLoaded = 0;
    var lastQueryURL = "";
    var lastPosterSize = "";
    var lastSearchType = "";

    $("#submit-button").on("click", function(event) {
        event.preventDefault();
        var searchTopic = $("#search-bar").val().trim();
        $("#test-div").empty();

        var carouselContainer = $("<div id='results-carousel' class='carousel slide' data-type='multi' data-ride='carousel'>");
        var carouselInner = $(carouselContainer).append("<div id='results-carousel-inner' class='carousel-inner'>");
        var carouselPrev = $(carouselContainer).append("<a  id='search-results-prev' class='carousel-control-prev' href='#results-carousel' role='button' data-slide='prev'><span class='carousel-control-prev-icon'></span><span class='sr-only'> Previous</span></a>");
        var carouselNext = $(carouselContainer).append("<a id='search-results-next' class='carousel-control-next' href='#results-carousel' role='button' data-slide='next'><span class='carousel-control-next-icon'></span><span class='sr-only'> Next</span></a>");
        carouselContainer.append(carouselPrev);
        carouselContainer.append(carouselNext);
        carouselContainer.append(carouselInner);
        $("#test-div").append(carouselContainer);

        if (searchTopic !== "".trim()) {
            $(".card").remove();
            mediaLoaded = 0;

            var searchType = $("#search-type-selector").val(); 
            var omdbAPIKey = "&apikey=3dc16ac5";
            
            //Update This for use with Title
            if (searchType === "Title") {
                var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&query=" + searchTopic + "&page=1&include_adult=false";
                var moviePosterSize = "https://image.tmdb.org/t/p/w500";

                lastQueryURL = queryURL;
                lastPosterSize = moviePosterSize;

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response){
                    console.log(response);
                    var results = response.results;
                    for (var i = mediaLoaded; i < (mediaLoaded + 8); i++) {
                        var resultsID = "card-" + results[i].id;
                        var resultsTitle = results[i].title;
                        var resultsAlt = results[i].title;
                        var resultsOverview = results[i].overview.slice(0, 155) + ". . .";
                        var resultsMoviePoster = results[i].poster_path;
                        var resultsButtonID = results[i].id;

                        if (resultsTitle.length > 11) {
                            resultsTitle = results[i].title.slice(0, 10) + "...";
                        }
                        if (i === 0) {
                            var carouselItemActive = $("<div id='carousel-" + resultsID + "' class='item active' </div>");
                            var cardWrapper = $("<div id='" + resultsID + "' class='card' style='width: 300px;'></div>");
                            var cardImage = $(cardWrapper).append("<img class='card-img-top' src='" + moviePosterSize + resultsMoviePoster + "' alt='" + resultsAlt + " Movie Poster' height='426px'>");
                            var cardBody = $(cardWrapper).append("<div class='card-body'><h1 class='card-title' style='font-size: 35px'><strong>" + resultsTitle + "</strong></h1><hr><p class='card-text' style='font-size: 15px;'>" + resultsOverview + " . . . " + "</p><a id='" + resultsButtonID + "' data-toggle='modal' data-target='#media-info-modal-" + resultsButtonID +  "' class='btn btn-primary movie-info-modal'>More Details</a></div>");
                            cardBody.append(cardImage);
                            $(carouselItemActive).append(cardWrapper);
                            $("#results-carousel-inner").append(carouselItemActive);

                            // //Creates Modal for this media
                            // var modalWrapperDiv = $("<div id='media-info-modal-" + resultsButtonID + "' className='modal fade' tabIndex='-1' role='dialog'></div>");
                            //  var modalDialogDiv = $(modalWrapperDiv).append("<div class='modal-dialog modal-dialog-centered modal-lg' role='document'></div>");
                            //  var modalContentDiv = $(modalDialogDiv).append("<div class='modal-content'></div>");
                            //  var modalHeaderDiv = $(modalContentDiv).append("<div class='modal-title-" + resultsAlt + "'></div>");
                            //  var modalTitleContent = $(modalHeaderDiv).append("<h5 id='modal-title-" + resultsButtonID + " class='modal-title'></h5>");
                            //  var modalHeaderButton = $(modalHeaderDiv).append("<button type='button' class='close' data-dismiss='modal'></button>");
                            //  var modalBodyDiv = $("<div id='media-info-modal-body-" + resultsButtonID + "' class='modal-body'></div>");
                            //  modalBodyDiv.appendTo(modalContentDiv);
                            //  var modalFootDiv = $("<div class='modal-footer'><p><a data-toggle='modal' class='click' data-target='#' data-dismiss='modal'</p><button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary'>Add to Watch List</button></div>");
                            //  $(modalDialogDiv).append(modalContentDiv);
                            //  $(modalWrapperDiv).appendTo("#modal-div");


                        }
                        else {
                            var carouselItem = $("<div id='carousel-" + resultsID + "' class='item' </div>");
                            var cardWrapper = $("<div id='" + resultsID + "' class='card' style='width: 300px;'></div>");
                            var cardImage = $(cardWrapper).append("<img class='card-img-top' src='" + moviePosterSize + resultsMoviePoster + "' alt='" + resultsAlt + " Movie Poster' height='426px'>");
                            var cardBody = $(cardWrapper).append("<div class='card-body'><h1 class='card-title' style='font-size: 35px'><strong>" + resultsTitle + "</strong></h1><hr><p class='card-text' style='font-size: 15px;'>" + resultsOverview + " . . . " + "</p><a id='" + resultsButtonID + "'  data-toggle='modal' data-target='#media-info-modal' class='btn btn-primary movie-info-modal'>More Details</a></div>");
                            cardBody.append(cardImage);
                            $(carouselItem).append(cardWrapper);
                            $("#results-carousel-inner").append(carouselItem);
                        }
                        
                    }
                    mediaLoaded = mediaLoaded + 3;
                });
            }

            //Update This for use with Genre
            if (searchType === "Genre") {
                var searchPerson = $("#search-bar").val().trim();
                var theMovieDBAPIKey = "api_key=b3599d7d48ba417da97cd4b6a2911968";
                var movieLang = "&language=en-US";
                var personParam = "&query="
                var queryURL = "https://api.themoviedb.org/3/search/person?" + theMovieDBAPIKey + movieLang + personParam + searchPerson;

                lastQueryURL = queryURL;
                lastPosterSize = moviePosterSize;

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

                lastQueryURL = queryURL;
                lastPosterSize = moviePosterSize;

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

                lastQueryURL = queryURL;
                lastPosterSize = moviePosterSize;

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    console.log(response);
                });
            }
            $("#search-bar").val("");
        }
    });

    $(".media-info-modal").on("click", function() {
        //Update This for use with Title
        var searchButtonID = $(this).attr("id");
        console.log("test");
        // if (lastSearchType === "Title") {

        //     $.ajax({
        //         url: lastQueryURL,
        //         method: "GET"
        //     }).then(function(response){
        //         console.log(response);
        //         var results = response.results;

        //         var matchedIDNumInArr = "";

        //         for (var i = 0; i < results.length; i++) {
        //             if (results[i].id === searchButtonID ) {
        //                 matchedIDNumInArr = i;
        //                 i = results.length;
        //             }
        //         }
        //         console.log(results[matchedIDNumInArr]);

        //         $("#media-info-modal-title").text(results[matchedIDNumInArr].title);
        //     });
        // }

        // //Update This for use with Genre
        // if (lastSearchType === "Genre") {

        //     $.ajax({
        //         url: lastQueryURL,
        //         method: "GET"
        //     }).then(function(response) {
        //         console.log(response);
                
        //     });
        // }

        // if (lastSearchType === "Actor/Actress") {
        //     var searchPerson = $("#search-bar").val().trim();
        //     var theMovieDBAPIKey = "api_key=b3599d7d48ba417da97cd4b6a2911968";
        //     var movieLang = "&language=en-US";
        //     var personParam = "&query="
        //     var queryURL = "https://api.themoviedb.org/3/search/person?" + theMovieDBAPIKey + movieLang + personParam + searchPerson;

        //     $.ajax({
        //         url: queryURL,
        //         method: "GET"
        //     }).then(function(response) {
        //         console.log(response);
                
        //         var searchParam = "/movie_credits?"
        //         console.log(response.results[0].id);
        //         var queryURL = "https://api.themoviedb.org/3/person/" + response.results[0].id + searchParam + theMovieDBAPIKey + movieLang;

        //         $.ajax({
        //             url: queryURL,
        //             method: "GET"
        //         }).then(function(responseChild) {
        //             console.log(responseChild);
        //         });
        //     });
        // }
        // //Update This for Use with Plot
        // if (lastSearchType === "Plot") {
        //     var queryURL = "https://www.omdbapi.com/?plot=" + searchTopic + omdbAPIKey;

        //     $.ajax({
        //         url: queryURL,
        //         method: "GET"
        //     }).then(function(response) {
        //         console.log(response);
        //     });
        // }
    });

});


