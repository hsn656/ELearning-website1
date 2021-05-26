// Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyCNiYvXdYze9dCL4oANqBigWXdMsqDte0A",
//     authDomain: "elearning-fefd0.firebaseapp.com",
//     projectId: "elearning-fefd0",
//     storageBucket: "elearning-fefd0.appspot.com",
//     messagingSenderId: "558840923885",
//     appId: "1:558840923885:web:2ffb4d2296c24b62f9eee4"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // for data base
// const db = firebase.firestore();
// db.settings({ timestampsInSnapshots: true });


window.onload=function(){
  exec()

    document.getElementsByClassName("quiz-title")[0].innerHTML = `امتحان ${decodeURI(location.search.split('=')[1])}`
}

// DOM variables
let allAnswers = document.getElementsByClassName("answer")
let Answerbtn = document.getElementById("Answerbtn")
let result = document.getElementById("result")
let resultContent = document.getElementById("resultContent")
let profileEmail = document.getElementById("profileEmail")
let signout = document.getElementById("signout")





// My variables
let finalResult = 0;

//to know if user exists or not
// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//         profileEmail.innerHTML = user.email

//     } else {
//         // No user is signed in.
//         alert("no active user")
//     }
// });

//to sign out

// signout.addEventListener("click", () => {
//     // firebase.auth().signout();
//     auth.signOut().then(resp => {
//         location.assign("../login.html")
//     }).catch((error) => {
//         console.log(error.message)
//     })
// })





//event to enhance user experience
for (let i = 0; i < allAnswers.length; i++) {
    allAnswers[i].addEventListener("click", () => {
        allAnswers[i].firstElementChild.checked = true
    })
}

// function to replace english numbers with arabic ones
String.prototype.toIndiaDigits = function() {
    var id = ['۰', '۱', '۲', '۳', '٤', '۵', '٦', '۷', '۸', '۹'];
    return this.replace(/[0-9]/g, function(w) {
        return id[+w]
    });
}



// send answers
Answerbtn.addEventListener("click", () => {
    for (let i = 0; i < allAnswers.length; i++) {
        if (allAnswers[i].firstElementChild.checked) {
            allAnswers[i].classList.add("selected")
        }
        if (allAnswers[i].firstElementChild.dataset.answer == "true") {
            // allAnswers[i].style.backgroundColor = "#72e672"
            // allAnswers[i].style.color = "white"
            allAnswers[i].classList.add("right")

        }

        if ((allAnswers[i].firstElementChild.checked) && (allAnswers[i].firstElementChild.dataset.answer == "true")) {

            finalResult++

        }
    }
    result.innerHTML = finalResult.toString().toIndiaDigits()
    window.scrollTo(0, 0)
    resultContent.classList.remove("hide")
})