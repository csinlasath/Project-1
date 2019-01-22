$(document).ready(function () {
    for (var i = 0; i <= 19; i++) {
        $('#more1').before($('<div/>', { id: 'theater' + i, 'class': 'posterContainer' }))
    };
    for (var i = 0; i <= 19; i++) {
        $('#more2').before($('<div/>', { id: 'topRated' + i, 'class': 'posterContainer' }))
    };
    for (var i = 0; i <= 19; i++) {
        $('#more3').before($('<div/>', { id: 'popTv' + i, 'class': 'posterContainer' }))
    };
    for (var i = 0; i <= 19; i++) {
        $('#more4').before($('<div/>', { id: 'tonightTv' + i, 'class': 'posterContainer' }))
    };
    var queryURL1 = "https://api.themoviedb.org/3/movie/now_playing?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=";
    var moviePosterSize = "https://image.tmdb.org/t/p/w200";
    var queryURL2 = "https://api.themoviedb.org/3/movie/top_rated?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=";
    var queryURL3 = "https://api.themoviedb.org/3/tv/popular?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=";
    var queryURL4 = "https://api.themoviedb.org/3/tv/airing_today?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=";
    var queryURL5 = "https://api.themoviedb.org/3/movie/";
    var queryURL6 = "https://www.omdbapi.com/?i=";
    var queryURL7 = "https://api.themoviedb.org/3/tv/"
    var tmdbKey = "?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US";
    var omdbAPIKey = "&apikey=3dc16ac5";
    var region = "&region=US"
    var page1 = 1;
    var page2 = 1;
    var page3 = 1;
    var page4 = 1;

    $.ajax({
        url: queryURL1 + page1 + region,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (var i = 19; i >= 0; i--) {         
            if (response.results[i].poster_path === null){
                $('#theater' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
            }else {
                $('#theater' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
            }

            $('#theater' + i).append($('<div><h5>' + response.results[i].title + '</h5></div>'));
        }
        page1 = 2;
    });
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 19; i >= 0; i--) {            
            if (response.results[i].poster_path === null){
                $('#topRated' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
            }else {
                $('#topRated' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
            }
            $('#topRated' + i).append($('<div><h5>' + response.results[i].title + '</h5></div>'));
        }
        page2 = 2;
    });
    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 19; i >= 0; i--) {
            $('#popTv' + i).append($('<img class="tvPoster" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
            $('#popTv' + i).append($('<div><h5>' + response.results[i].name + '</h5></div>'));
        }
        page3 = 2;
    });
    $.ajax({
        url: queryURL4,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 19; i >= 0; i--) {
            $('#tonightTv' + i).append($('<img class="tvPoster" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
            $('#tonightTv' + i).append($('<div><h5>' + response.results[i].name + '</h5></div>'));
        }
        page4 = 2;

    });
    $(document).on("click", ".moviePoster", function () {
        $.ajax({
            url: queryURL5 + $(this).attr("data-id") + tmdbKey,
            method: "GET"
        }).then(function (response) {
            $.ajax({
                url: queryURL6 + response.imdb_id + omdbAPIKey,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $("#media-info-modal").modal();
                $("#media-info-modal-title").html(response.Title);
                $("#media-modal-year").html("Year Released: " + response.Year)
                $("#media-modal-rating").html("MetaScore: " + response.Metascore + "<br>");
                $("#media-modal-actors").html("Actors: " + response.Actors);
                $("#media-modal-director").html("Directed by: " + response.Director);
                $("#media-modal-genre").html("Genre: " + response.Genre);
                $("#media-modal-imdb").html(response.imdbID);

            });
        });
    });
    $(document).on("click", ".tvPoster", function () {
        $.ajax({
            url: queryURL7 + $(this).attr("data-id") + tmdbKey,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#media-info-modal-tv").modal();
            $("#media-info-modal-title-tv").html(response.name);
            $("#media-modal-creators-tv").html("Created by: ")

            for (var i = 0; i < response.created_by.length; i++) {
                if (response.created_by.length > 0) {
                    if (i !== 0) {
                        $("#media-modal-creators-tv").append(", ");
                        console.log(response.created_by[i].name);
                    }
                    $("#media-modal-creators-tv").append(response.created_by[i].name);
                }
            }

            $("#media-modal-latest-epi-tv").html("Latest Episode: " + response.last_episode_to_air.name + " (Season: " + response.number_of_seasons + " Episode: " + response.last_episode_to_air.episode_number + ")");

            $("#media-modal-network-tv").html("Network:  " + response.networks[0].name);

            $("#media-modal-genre-tv").html("Genres: ")
            
                for (var i = 0; i < response.genres.length; i++) {
                    if (response.genres.length > 0) {
                        if (i !== 0) {
                            $("#media-modal-genre-tv").append(", ");
                            console.log(response.genres[i].name);
                        }
                        $("#media-modal-genre-tv").append(response.genres[i].name);
                        }
                }
            }
        );
    });
    $(document).on("click", "#more1", function () {
        $.ajax({
            url: queryURL1 + page1 + region,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.results.length; i++) {
                $('#more1').before($('<div/>', { id: 'theater' + page1 + '-' + i, 'class': 'posterContainer' }))
            };
            for (var i = 0; i < response.results.length; i++) {

                if (response.results[i].poster_path === null){
                    $('#theater'+page1+'-' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
                }else {
                    $('#theater'+page1+'-' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                }
                $('#theater'+page1+'-' + i).append($('<div><h5>' + response.results[i].title.slice(0 , 28) + '</h5></div>'));

            }
            page1++;
            if (response.results.length < 20) {
                $("#more1").empty();
            };
        });
    });
    $(document).on("click", "#more2", function () {
        $.ajax({
            url: queryURL2 + page2 + region,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.results.length; i++) {
                $('#more2').before($('<div/>', { id: 'topRated' + page2 + '-' + i, 'class': 'posterContainer' }))
            };
            for (var i = 0; i < response.results.length; i++) {

                if (response.results[i].poster_path === null){
                    $('#topRated'+page2+'-' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
                }else {
                    $('#topRated'+page2+'-' + i).append($('<img class="moviePoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                }
                $('#topRated'+page2+'-' + i).append($('<div><h5>' + response.results[i].title.slice(0 , 28) + '</h5></div>'));

            }
            page2++;
            if (response.results.length < 20) {
                $("#more2").empty();
            };
        })
    });
    $(document).on("click", "#more3", function () {
        $.ajax({
            url: queryURL3 + page3,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.results.length; i++) {
                $('#more3').before($('<div/>', { id: 'popTv' + page3 + '-' + i, 'class': 'posterContainer' }))
            };
            for (var i = 0; i < response.results.length; i++) {

                if (response.results[i].poster_path === null) {
                    $('#popTv'+page3+'-' + i).append($('<img class="tvPoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
                } else {
                    $('#popTv'+page3+'-' + i).append($('<img class="tvPoster" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                };
                $('#popTv'+page3+'-' + i).append($('<div><h5>' + response.results[i].name.slice(0 , 28) + '</h5></div>'));

            }
            page3++;
            if (response.results.length < 20) {
                $("#more3").empty();
            };
        })
    });
    $(document).on("click", "#more4", function () {
        $.ajax({
            url: queryURL4 + page4,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.results.length; i++) {
                $('#more4').before($('<div/>', { id: 'tonightTv' + page4 + '-' + i, 'class': 'posterContainer' }))
            };
            for (var i = 0; i < response.results.length; i++) {

                if (response.results[i].poster_path === null) {
                    $('#tonightTv'+page4+'-' + i).append($('<img class="tvPoster" data-toggle="modal" data-target="#myModal" data-id="' + response.results[i].id + '" src="assets/images/null.jpg">'));
                } else {
                    $('#tonightTv'+page4+'-' + i).append($('<img class="tvPoster" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                };
                $('#tonightTv'+page4+'-' + i).append($('<div><h5>' + response.results[i].name.slice(0 , 28) + '</h5></div>'));

            }
            page4++;
            if (response.results.length < 20) {
                $("#more4").empty();
            };
        })
    });

    $(document).on('mousedown', '#right-button0', function() {
        event.preventDefault();
        $('#results').animate({
          scrollLeft: "+=80600px"
        }, 28000)
      });
    $(document).on('mouseup', '#right-button0', function() {
        event.preventDefault();
        $('#results').stop();
    });
    $(document).on('mousedown', '#left-button0', function() {
        event.preventDefault();
        $('#results').animate({
          scrollLeft: "-=80600px"
        }, 28000);
      });
    $(document).on('mouseup', '#left-button0', function() {
        event.preventDefault();
        $('#results').stop();
    });
    $('#right-button').mousedown(function() {
        event.preventDefault();
        $('#theater').animate({
            scrollLeft: "+=25600px"
        }, 12000);
    });
    $('#right-button').mouseup(function () {
        event.preventDefault();
        $('#theater').stop();
    });
    $('#left-button').mousedown(function () {
        event.preventDefault();
        $('#theater').animate({
            scrollLeft: "-=25600px"
        }, 12000);
    });
    $('#left-button').mouseup(function () {
        event.preventDefault();
        $('#theater').stop();
    });
    $('#right-button2').mousedown(function () {
        event.preventDefault();
        $('#topRated').animate({
            scrollLeft: "+=25600px"
        }, 12000);
    });
    $('#right-button2').mouseup(function () {
        event.preventDefault();
        $('#topRated').stop();
    });
    $('#left-button2').mousedown(function () {
        event.preventDefault();
        $('#topRated').animate({
            scrollLeft: "-=25600px"
        }, 12000);
    });
    $('#left-button2').mouseup(function () {
        event.preventDefault();
        $('#topRated').stop();
    });
    $('#right-button3').mousedown(function () {
        event.preventDefault();
        $('#popTv').animate({
            scrollLeft: "+=25600px"
        }, 12000);
    });
    $('#right-button3').mouseup(function () {
        event.preventDefault();
        $('#popTv').stop();
    });
    $('#left-button3').mousedown(function () {
        event.preventDefault();
        $('#popTv').animate({
            scrollLeft: "-=25600px"
        }, 12000);
    });
    $('#left-button3').mouseup(function () {
        event.preventDefault();
        $('#popTv').stop();
    });
    $('#right-button4').mousedown(function () {
        event.preventDefault();
        $('#tonightTv').animate({
            scrollLeft: "+=25600px"
        }, 12000);
    });
    $('#right-button4').mouseup(function () {
        event.preventDefault();
        $('#tonightTv').stop();
    });
    $('#left-button4').mousedown(function () {
        event.preventDefault();
        $('#tonightTv').animate({
            scrollLeft: "-=25600px"
        }, 12000);
    });
    $('#left-button4').mouseup(function () {
        event.preventDefault();
        $('#tonightTv').stop();
    });
    // $(".levels").mCustomScrollbar({
    //     set_width: false,
    //     set_height: false,
    //     horizontalScroll: false,
    //     scrollInertia: 850,
    //     SCROLLINERTIA: "easeOutCirc",
    //     mouseWheel: "auto",
    //     autoDraggerLength: true,
    //     scrollButtons: {
    //         enable: false,
    //         scrollType: "continuous",
    //         SCROLLSPEED: 80,
    //         SCROLLAMOUNT: 180
    //     },
    //     advanced: {
    //         updateOnBrowserResize: true,
    //         updateOnContentResize: false,
    //         autoExpandHorizontalScroll: true,
    //         autoScrollOnFocus: true
    //     },
    //     callbacks: {
    //         onScrollStart: function () { },
    //         onScroll: function () { },
    //         onTotalScroll: function () { },
    //         onTotalScrollBack: function () { },
    //         onTotalScrollOffset: 0,
    //         whileScrolling: false,
    //         whileScrollingInterval: 30
    //     }
    // });
});
