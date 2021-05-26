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
let txtEmail = document.getElementById("txtEmail")
let txtPassword = document.getElementById("txtPassword")
let loginBtn = document.getElementById("loginBtn")
let facebookBtn = document.getElementById("facebookBtn")
let googleBtn = document.getElementById("googleBtn")




//login with email
loginBtn.addEventListener("click", () => {
    document.getElementById("adding").style.display="none"

    //getting email & password
    const email = txtEmail.value;
    const password = txtPassword.value;
    // const auth = firebase.auth();
    //sign in 
    auth.signInWithEmailAndPassword(email, password).then(user => {
        document.getElementById('error').innerHTML = "";
        // location.assign("https://www.facebook.com/")
        console.log(user.user.email)
        userCollection.where("user_email", "==", user.user.email).get()
        .then(res=>{
            if (res.docs[0].data().subscriped == false) {
              redirectIfAuth("./payment.html");
            } else {
              redirectIfAuth("./");
            }
        }).catch(err=>console.log(err))
        // redirectIfAuth("./payment.html")
        
    }).catch(error => {
        document.getElementById('error').style.color = 'red';
        document.getElementById('error').innerHTML = error.message;
    })
})


//login with facebook
facebookBtn.addEventListener("click", () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    // provider.addScope('user_birthday');

    auth.signInWithPopup(provider).then((result) => {
        auth.languageCode = 'it';

        provider.setCustomParameters({
            'display': 'popup'
        });

        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;


        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;
        console.log("done")
        setTimeout(() => {
            redirectIfAuth("/")
        }, 2000);
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorMessage)
        console.log("failed")
    });

})

//login with google
googleBtn.addEventListener("click", () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.languageCode = 'it';

    auth.signInWithPopup(provider).then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        setTimeout(() => {
            redirectIfAuth("/")
        }, 1000);
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        console.log(errorMessage)
        console.log("failed")
    });

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