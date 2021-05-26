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







//  My DOM variables
let txtEmail = document.getElementById("txtEmail");
let txtPassword = document.getElementById("txtPassword");
let confirmPassword = document.getElementById("confirmPassword");
let regBtn = document.getElementById("regBtn")
let fName = document.getElementById("firstName")
let lName = document.getElementById("lastName")
let phone = document.getElementById("phone")



//confirm password
var check = function() {
    if (txtPassword.value == confirmPassword.value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'تم التطابق';
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = 'لم يتم التطابق';
    }
}

txtPassword.addEventListener("keyup", check)
confirmPassword.addEventListener("keyup", check)





//register click
regBtn.addEventListener("click", (e) => {

    e.preventDefault()
  document.getElementById("adding").style.display="none"

        //getting email & password
    const email = txtEmail.value;
    const password = txtPassword.value;

    //sign in
    auth.createUserWithEmailAndPassword(email, password).then(cred => {

        document.getElementById('error').innerHTML = "";
        //adding data to fire store
        db.collection("users").add({
            name: `${fName.value} ${lName.value}`,
            phone: phone.value,
            user_email: txtEmail.value,
            subscriped: false

        })
        setTimeout(() => {
            redirectIfAuth("/login.html")
        }, 1000);
    }).catch(error => {
        document.getElementById('error').style.color = 'red';
        document.getElementById('error').innerHTML = error.message;
    })
})

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//         location.assign("quiz app/quiz .html")

//     } else {
//         // No user is signed in.
//         alert("no active user")
//     }
// });