$(document).ready(function () {
    var queryURL7 = "https://api.themoviedb.org/3/discover/movie?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=";
    var queryURL8 = "https://api.themoviedb.org/3/discover/tv?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&sort_by=popularity.desc&page=";
    var page0 = 2;
    var withGenre = "&with_genres=";
    var langOriginal = "&with_original_language=en";
    var searchTopicsub = "";
    var moviePosterSize = "https://image.tmdb.org/t/p/w200";
    var searchTopicMain = "";
    var timeGenre = "&timezone=America%2FNew_York&with_genres=";
    $(document).on("click", "#submit-button", function (event) {
        event.preventDefault();
        window.location.href = "#topPush";
        $("#searchResults").empty();
        $("#searchResults").append('<div id="results" class="scrolling-wrapper"></div>');
        $("#results").html('<div id="searchLeft" class="left"></div>');
        $("#results").append('<div id="searchRight" class="right"></div>');
        searchTopicMain = $("#mainSearch").val();
        searchTopicsub = $("#subSearch").val();
        var searchTopicBar = $("#search-bar").val().trim();
        var tmdbKey = "?api_key=b3599d7d48ba417da97cd4b6a2911968";
        var lang = "&language=en-US";
        var adult = "&include_adult=false";
        var combined = "/combined_credits";
        var queryURL1 = "https://api.themoviedb.org/3/search/movie?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&query=";
        var queryURL2 = "https://api.themoviedb.org/3/search/tv?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&query=";
        var queryURL3 = "https://api.themoviedb.org/3/search/person?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&query=";
        var queryURL4 = "https://api.themoviedb.org/3/person/";
        var queryURL5 = "https://api.themoviedb.org/3/discover/movie?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=";
        var queryURL6 = "https://api.themoviedb.org/3/discover/tv?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=";

        $('input').val("");

        if (searchTopicMain === "Movie") {
            if (searchTopicBar !== "") {
                $("#searchResults").prepend('<h1>Search results</h1>');
                $.ajax({
                    url: queryURL1 + searchTopicBar + adult,
                    method: "GET"
                }).then(function (response) {
                    if (response.results.length > 3) {
                        $('#searchLeft').append($('<button class="arrow" id="left-button0"><img src="assets/images/arrowLeft.png"></button>'));
                        $('#searchRight').append($('<button class="arrow" id="right-button0"><img src="assets/images/arrowRight.png"></button>'));
                    };
                    for (var i = 0; i < response.results.length; i++) {
                        $('#searchRight').before($('<div/>', { id: 'results' + i, 'class': 'posterContainer' }));
                    };
                    for (var i = 0; i < response.results.length; i++) {
                        if (response.results[i].poster_path === null) {
                            $('#results' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
                        } else {
                            $('#results' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                        }
                        $('#results' + i).append($('<div><h5>' + response.results[i].title.slice(0, 28) + '</h5></div>'));
                    };
                });

            } else {
                $("searchResults").prepend('<h2 style="color: red">Please Enter a Search Parameter</h2>');
            }

        } else if (searchTopicMain === "TV Show") {
            if (searchTopicBar !== "") {
                $("#searchResults").prepend('<h1>Search results</h1>');
                $.ajax({
                    url: queryURL2 + searchTopicBar,
                    method: "GET"
                }).then(function (response) {
                    if (response.results.length > 3) {
                        $('#searchLeft').append($('<button class="arrow" id="left-button0"><img src="assets/images/arrowLeft.png"></button>'));
                        $('#searchRight').append($('<button class="arrow" id="right-button0"><img src="assets/images/arrowRight.png"></button>'));
                    };
                    for (var i = 0; i < response.results.length; i++) {
                        $('#searchRight').before($('<div/>', { id: 'results' + i, 'class': 'posterContainer' }));
                    };
                    for (var i = 0; i < response.results.length; i++) {
                        if (response.results[i].poster_path === null) {
                            $('#results' + i).append($('<img class="tvPoster" data-toggle="modal" data-target="#myModal" data-id="' + castArray[i].id + '" src="assets/images/null.jpg">'));
                        } else {
                            $('#results' + i).append($('<img class="tvPoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                        };
                        $('#results' + i).append($('<div><h5>' + response.results[i].name.slice(0, 28) + '</h5></div>'));
                    };
                });
            } else {
                $("searchResults").prepend('<h2 style="color: red">Please Enter a Search Parameter</h2>');
            }
        } else if (searchTopicMain === "Actor/Actress") {
            if (searchTopicBar !== "") {
                $("#searchResults").prepend('<h1>Search results</h1>');
                $.ajax({
                    url: queryURL3 + searchTopicBar,
                    method: "GET"
                }).then(function (response) {
                    $.ajax({
                        url: queryURL4 + response.results[0].id + tmdbKey + lang,
                        method: "GET"
                    }).then(function (response) {
                        $('#searchRight').before($('<div/>', { id: 'resultsa', 'class': 'posterContainer' }));
                        $('#resultsa').append($('<img class="actorPoster" data-toggle="modal" data-target="#myModal" data-id="' + response.id + '" src="' + moviePosterSize + response.profile_path + '">'));
                        $('#resultsa').append($('<div><h5>' + response.name.slice(0, 28) + '</h5></div>'));
                        $.ajax({
                            url: queryURL4 + response.id + combined + tmdbKey + lang,
                            method: "GET"
                        }).then(function (response) {
                            var castArray = [];
                            for (i = 0; i < response.cast.length; i++) {
                                castArray.push(response.cast[i]);
                            };
                            castArray.sort(function (b, a) {
                                return parseFloat(a.popularity) - parseFloat(b.popularity);
                            });
                            for (i = 0; i < castArray.length; i++) {
                                if (castArray[i].genre_ids.includes(10763)) {
                                    delete castArray[i];
                                };
                            };
                            var filtered = castArray.filter(function (el) {
                                return el != null;
                            });
                            for (i = 0; i < filtered.length; i++) {
                                if (filtered[i].genre_ids.includes(10767)) {
                                    delete filtered[i];
                                };
                            };
                            filtered2 = filtered.filter(function (el) {
                                return el != null;
                            });
                            for (i = 0; i < filtered2.length; i++) {
                                if (filtered2[i].character === "") {
                                    delete filtered2[i];
                                };
                            };
                            castArray = filtered2.filter(function (el) {
                                return el != null;
                            });
                            if (castArray.length > 2) {
                                $('#searchLeft').append($('<button class="arrow" id="left-button0"><img src="assets/images/arrowLeft.png"></button>'));
                                $('#searchRight').append($('<button class="arrow" id="right-button0"><img src="assets/images/arrowRight.png"></button>'));
                            };
                            for (var i = 0; i < castArray.length; i++) {
                                $('#searchRight').before($('<div/>', { id: 'results' + i, 'class': 'posterContainer' }));
                            };
                            for (var i = 0; i < castArray.length; i++) {
                                if (castArray[i].media_type === "tv") {
                                    if (castArray[i].poster_path === null) {
                                        $('#results' + i).append($('<img class="tvPoster" data-toggle="modal" data-target="#myModal" data-id="' + castArray[i].id + '" src="assets/images/null.jpg">'));
                                    } else {
                                        $('#results' + i).append($('<img class="tvPoster" data-toggle="modal" data-target="#myModal" data-id="' + castArray[i].id + '" src="' + moviePosterSize + castArray[i].poster_path + '">'));
                                    };
                                    $('#results' + i).append($('<div><h5>' + castArray[i].character.slice(0, 28) + '</h5></div>'));
                                } else if (castArray[i].media_type === "movie") {
                                    if (castArray[i].poster_path === null) {
                                        $('#results' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + castArray[i].id + '" src="assets/images/null.jpg">'));
                                    } else {
                                        $('#results' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + castArray[i].id + '" src="' + moviePosterSize + castArray[i].poster_path + '">'));
                                    }
                                    $('#results' + i).append($('<div><h5>' + castArray[i].character.slice(0, 28) + '</h5></div>'));
                                };
                            };
                        });
                    });
                });
            } else {
                $("searchResults").prepend('<h2 style="color: red">Please Enter a Search Parameter</h2>');
            }
        } else if (searchTopicMain === "Movie Genre") {
            $("#searchResults").prepend('<h1>Search results</h1>');
            page0 = 2;
            $.ajax({
                url: queryURL5 + searchTopicsub + langOriginal,
                method: "GET"
            }).then(function (response) {
                if (response.results.length > 3) {
                    $('#searchLeft').append($('<button class="arrow" id="left-button0"><img src="assets/images/arrowLeft.png"></button>'));
                    $('#searchRight').append($('<button class="arrow" id="right-button0"><img src="assets/images/arrowRight.png"></button>'));
                };
                if (response.results.length >= 20) {
                    $("#searchRight").before('<div id="more0" class="posterContainer"></div>');
                    $('#more0').html($('<img id="moreButton" src="assets/images/more.jpg">'));
                    $('#more0').append($('<div><h5>More</h5></div>'));
                    for (var i = 0; i < response.results.length; i++) {
                        $('#more0').before($('<div/>', { id: 'results' + i, 'class': 'posterContainer' }));
                    };
                } else {
                    for (var i = 0; i < response.results.length; i++) {
                        $('#searchRight').before($('<div/>', { id: 'results' + i, 'class': 'posterContainer' }));
                    };
                }
                for (var i = 0; i < response.results.length; i++) {
                    if (response.results[i].poster_path === null) {
                        $('#results' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
                    } else {
                        $('#results' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                    }
                    $('#results' + i).append($('<div><h5>' + response.results[i].title.slice(0, 28) + '</h5></div>'));
                };
            });
        } else if (searchTopicMain === "TV Genre") {
            $("#searchResults").prepend('<h1>Search results</h1>');
            page0 = 2;
            $.ajax({
                url: queryURL6 + searchTopicsub + langOriginal,
                method: "GET"
            }).then(function (response) {
                if (response.results.length > 3) {
                    $('#searchLeft').append($('<button class="arrow" id="left-button0"><img src="assets/images/arrowLeft.png"></button>'));
                    $('#searchRight').append($('<button class="arrow" id="right-button0"><img src="assets/images/arrowRight.png"></button>'));
                };
                if (response.results.length >= 20) {
                    $("#searchRight").before('<div id="more0" class="posterContainer"></div>');
                    $('#more0').append($('<img id="moreButton" src="assets/images/more.jpg">'));
                    $('#more0').append($('<div><h5>More</h5></div>'));
                    for (var i = 0; i < response.results.length; i++) {
                        $('#more0').before($('<div/>', { id: 'results' + i, 'class': 'posterContainer' }));
                    };
                } else {
                    for (var i = 0; i < response.results.length; i++) {
                        $('#searchRight').before($('<div/>', { id: 'results' + i, 'class': 'posterContainer' }));
                    };
                }
                for (var i = 0; i < response.results.length; i++) {
                    if (response.results[i].poster_path === null) {
                        $('#results' + i).append($('<img class="tvPoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
                    } else {
                        $('#results' + i).append($('<img class="tvPoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                    };
                    $('#results' + i).append($('<div><h5>' + response.results[i].name.slice(0, 28) + '</h5></div>'));
                };
            });
        };
    });
    $(document).on("click", "#more0", function () {
        if (searchTopicMain === "Movie Genre") {
            $.ajax({
                url: queryURL7 + page0 + withGenre + searchTopicsub + langOriginal,
                method: "GET"
            }).then(function (response) {
                for (var i = 0; i < response.results.length; i++) {
                    $('#more0').before($('<div/>', { id: 'results' + page0 + '-' + i, 'class': 'posterContainer' }))
                };
                for (var i = 0; i < response.results.length; i++) {
                    if (response.results[i].poster_path === null) {
                        $('#results' + page0 + '-' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
                    } else {
                        $('#results' + page0 + '-' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                    }
                    $('#results' + page0 + '-' + i).append($('<div><h5>' + response.results[i].title.slice(0, 28) + '</h5></div>'));
                }
                page0++;
                if (response.results.length < 20) {
                    $("#more0").empty();
                };
            });
        } else if (searchTopicMain === "TV Genre") {
            $.ajax({
                url: queryURL8 + page0 + timeGenre + searchTopicsub + langOriginal,
                method: "GET"
            }).then(function (response) {
                for (var i = 0; i < response.results.length; i++) {
                    $('#more0').before($('<div/>', { id: 'results' + page0 + '-' + i, 'class': 'posterContainer' }))
                };
                for (var i = 0; i < response.results.length; i++) {
                    if (response.results[i].poster_path === null) {
                        $('#results' + page0 + '-' + i).append($('<img class="tvPoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
                    } else {
                        $('#results' + page0 + '-' + i).append($('<img class="tvPoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                    };
                    $('#results' + page0 + '-' + i).append($('<div><h5>' + response.results[i].name.slice(0, 28) + '</h5></div>'));
                };
                page0++;
                if (response.results.length < 20) {
                    $("#more0").empty();
                };
            });
        }
    });
});