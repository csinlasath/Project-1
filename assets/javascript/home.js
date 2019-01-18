$(document).ready(function () {
    for (var i = 19; i >= 0; i--) {
        $('#theater').prepend($('<div/>', { id: 'theater' + i, 'class': 'posterContainer' }))
    };
    for (var i = 19; i >= 0; i--) {
        $('#topRated').prepend($('<div/>', { id: 'topRated' + i, 'class': 'posterContainer' }))
    };
    for (var i = 19; i >= 0; i--) {
        $('#popTv').prepend($('<div/>', { id: 'popTv' + i, 'class': 'posterContainer' }))
    };
    for (var i = 19; i >= 0; i--) {
        $('#tonightTv').prepend($('<div/>', { id: 'tonightTv' + i, 'class': 'posterContainer' }))
    };
    var queryURL1 = "https://api.themoviedb.org/3/movie/now_playing?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=";
    var moviePosterSize = "https://image.tmdb.org/t/p/w200";
    var queryURL2 = "https://api.themoviedb.org/3/movie/top_rated?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=";
    var queryURL3 = "https://api.themoviedb.org/3/tv/popular?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=";
    var queryURL4 = "https://api.themoviedb.org/3/tv/airing_today?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=";
    var queryURL5 = "https://api.themoviedb.org/3/movie/";
    var queryURL6 = "http://www.omdbapi.com/?i=";
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
            $('#theater' + i).append($('<img class="moviePoster" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
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
            $('#topRated' + i).append($('<img class="moviePoster" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
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
            console.log(response);

            $.ajax({
                url: queryURL6 + response.imdb_id + omdbAPIKey,
                method: "GET"
            }).then(function (response) {
                console.log(response);
            });
        });
    });
    $(document).on("click", ".tvPoster", function () {
        $.ajax({
            url: queryURL7 + $(this).attr("data-id") + tmdbKey,
            method: "GET"
        }).then(function (response) {
            console.log(response);
        });
    });
    $(document).on("click", "#more1", function () {
        $.ajax({
            url: queryURL1 + page1 + region,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.results.length; i++) {
                $('#more1').before($('<div/>', { id: 'theater'+page1+'-'+ i, 'class': 'posterContainer' }))
            };
            for (var i = 0; i < response.results.length; i++) {
                $('#theater'+page1+'-' + i).append($('<img class="moviePoster" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                $('#theater'+page1+'-' + i).append($('<div><h5>' + response.results[i].title.slice(0 , 28) + '</h5></div>'));
            }
            page1++;
        })
    });
    $(document).on("click", "#more2", function () {
        $.ajax({
            url: queryURL2 + page2 + region,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.results.length; i++) {
                $('#more2').before($('<div/>', { id: 'topRated'+page2+'-'+ i, 'class': 'posterContainer' }))
            };
            for (var i = 0; i < response.results.length; i++) {
                $('#topRated'+page2+'-' + i).append($('<img class="moviePoster" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                $('#topRated'+page2+'-' + i).append($('<div><h5>' + response.results[i].title.slice(0 , 28) + '</h5></div>'));
            }
            page2++;
        })
    });
    $(document).on("click", "#more3", function () {
        $.ajax({
            url: queryURL3 + page3,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.results.length; i++) {
                $('#more3').before($('<div/>', { id: 'popTv'+page3+'-'+ i, 'class': 'posterContainer' }))
            };
            for (var i = 0; i < response.results.length; i++) {
                $('#popTv'+page3+'-' + i).append($('<img class="tvPoster" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                $('#popTv'+page3+'-' + i).append($('<div><h5>' + response.results[i].name.slice(0 , 28) + '</h5></div>'));
            }
            page3++;
        })
    });
    $(document).on("click", "#more4", function () {
        $.ajax({
            url: queryURL4 + page4,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.results.length; i++) {
                $('#more4').before($('<div/>', { id: 'tonightTv'+page4+'-'+ i, 'class': 'posterContainer' }))
            };
            for (var i = 0; i < response.results.length; i++) {
                $('#tonightTv'+page4+'-' + i).append($('<img class="tvPoster" data-id="' + response.results[i].id + '" src="' + moviePosterSize + response.results[i].poster_path + '">'));
                $('#tonightTv'+page4+'-' + i).append($('<div><h5>' + response.results[i].name.slice(0 , 28) + '</h5></div>'));
            }
            page4++;
        })
    });
    $(".levels").mCustomScrollbar({
        set_width: false,
        set_height: false,
        horizontalScroll: false,
        scrollInertia: 850,
        SCROLLINERTIA: "easeOutCirc",
        mouseWheel: "auto",
        autoDraggerLength: true,
        scrollButtons: {
            enable: false,
            scrollType: "continuous",
            SCROLLSPEED: 80,
            SCROLLAMOUNT: 180
        },
        advanced: {
            updateOnBrowserResize: true,
            updateOnContentResize: false,
            autoExpandHorizontalScroll: true,
            autoScrollOnFocus: true
        },
        callbacks: {
            onScrollStart: function () { },
            onScroll: function () { },
            onTotalScroll: function () { },
            onTotalScrollBack: function () { },
            onTotalScrollOffset: 0,
            whileScrolling: false,
            whileScrollingInterval: 30
        }
    });
});
