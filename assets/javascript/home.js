$(document).ready(function () {
    for (var i = 0; i <= 19; i++) {
        $('#theater').append($('<div/>', { id: 'theater' + i, 'class': 'poster' }))
    };
    for (var i = 0; i <= 19; i++) {
        $('#home').append($('<div/>', { id: 'home' + i, 'class': 'poster' }))
    };
    for (var i = 0; i <= 19; i++) {
        $('#popTv').append($('<div/>', { id: 'popTv' + i, 'class': 'poster' }))
    };
    for (var i = 0; i <= 19; i++) {
        $('#tonightTv').append($('<div/>', { id: 'tonightTv' + i, 'class': 'poster' }))
    };
    var queryURL1 = "https://api.themoviedb.org/3/movie/now_playing?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=1&region=us";
    var moviePosterSize = "https://image.tmdb.org/t/p/w200";
    var queryURL2 = "https://api.themoviedb.org/3/movie/top_rated?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=1&region=US";
    var queryURL3 = "https://api.themoviedb.org/3/tv/popular?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=1";
    var queryURL4 = "https://api.themoviedb.org/3/tv/airing_today?api_key=b3599d7d48ba417da97cd4b6a2911968&language=en-US&page=1";

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; 1 <= 19; i++){
        $('#theater' +i).append($('<img src="'+moviePosterSize+response.results[i].poster_path+'">'));
        $('#theater'+i).append($('<div><h5>'+response.results[i].title+'</h5></div>'));
        }
    });
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; 1 <=19; i++){
        $('#home'+i).append($('<img src="'+moviePosterSize+response.results[i].poster_path+'">'));
        $('#home'+i).append($('<div><h5>'+response.results[i].title+'</h5></div>'));
        }
    });
    $.ajax({
        url: queryURL3,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; 1 <=19; i++){
        $('#popTv'+i).append($('<img src="'+moviePosterSize+response.results[i].poster_path+'">'));
        $('#popTv'+i).append($('<div><h5>'+response.results[i].name+'</h5></div>'));
        }
    });
    $.ajax({
        url: queryURL4,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        for (var i = 0; 1 <=19; i++){
        $('#tonightTv'+i).append($('<img src="'+moviePosterSize+response.results[i].poster_path+'">'));
        $('#tonightTv'+i).append($('<div><h5>'+response.results[i].name+'</h5></div>'));
        }
    });  
});
