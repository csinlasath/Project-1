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

    database = firebase.database();

    $("#info-user-signup").on("click", function (event) {
        event.preventDefault();
        var firstName = $("#first-name-field").val().trim();
        var lastName = $("#last-name-field").val().trim();
        var email = $("#sign-up-email-field").val().trim();
        var password = $("#sign-up-password-field").val().trim();


        database.ref("user").push({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
    });

    // $("#user-info-login").on("click", function (event){
    //     event.preventDefault();

    //     database.ref("user").pull({
    //         firstName: firstName,
    //         lastName,
    //         email,
    //         password
    //     });
    //     console.log(firstName);
    // });







});




// function SignIn() {
//     if (firebase.auth().currentUser){

//         firebase.auth().signOut();
//     }
//     else {
//         var email = $("#sign-up-email-field").val();
//         var password = $("#sign-up-password-field").val();
//         if (email.length < 4) {
//             $(function () {
//                 $('[enter-valid-email="popover"]').popover()
//               })
//               return;
//         }
//         if (password.length < 4) {
//             $(function () {
//                 $('[enter-longer-password="popover"]').popover()
//               })
//               return;
//         }
//     }
// }