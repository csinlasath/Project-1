
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