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

// Your web app's Firebase configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyDWSFvGr-o6QQEbBL2xQojVSSbcVOsfnZk",
//   authDomain: "e-learning-f8f38.firebaseapp.com",
//   projectId: "e-learning-f8f38",
//   storageBucket: "e-learning-f8f38.appspot.com",
//   messagingSenderId: "764663485551",
//   appId: "1:764663485551:web:fda16d1a50b306d27c299a",
// };

var firebaseConfig = {
  apiKey: "AIzaSyCNiYvXdYze9dCL4oANqBigWXdMsqDte0A",
  authDomain: "elearning-fefd0.firebaseapp.com",
  projectId: "elearning-fefd0",
  storageBucket: "elearning-fefd0.appspot.com",
  messagingSenderId: "558840923885",
  appId: "1:558840923885:web:2ffb4d2296c24b62f9eee4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const ref = firebase.storage().ref();
const auth = firebase.auth();

const { serverTimestamp } = firebase.firestore.FieldValue;

const courseCollection = db.collection("course");
const lessonCollection = db.collection("lessons");
const commentCollection = db.collection("comment");
const userCollection = db.collection("users");

function redirectIfAuth(url, lesson) {
  auth.onAuthStateChanged(function (user) {
    if (lesson !== undefined) {
      if (user) {
        // User is signed in.
        location.assign(url);
        // return user
      } else {
        // No user is signed in.
        alert("يلزم تسجيل الدخول");
        location.assign("./login.html");
      }
    } else {
      if (user) {
        // User is signed in.
        // location.assign(url)
        userCollection
          .where("user_email", "==", user.email)
          .get()
          .then((res) => {
            debugger;
            console.log(res.docs[0].data().subscriped);

            res.docs[0].data().subscriped == true
              ? location.assign(url)
              : location.assign("./payment.html");
          })
          .catch((err) => console.log(err));
        // return user
      } else {
        // No user is signed in.
        alert("يلزم تسجيل الدخول");
        location.assign("./login.html");
      }
    }
  });
}

function signOut() {
  document.getElementById("adding").style.display = "none";
  auth
    .signOut()
    .then((resp) => {
      location.assign("./login.html");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function exec() {
  auth.onAuthStateChanged(function (user) {
    debugger;

    if (user) {
      userCollection
        .where("user_email", "==", user.email)
        .get()
        .then((res) => {
          // console.log(res.docs[0].id)
          document.getElementById(
            "adding"
          ).innerHTML += `<div style="width: 100%; display: flex;" class="signout">
          <button style="height: 10%; margin: auto 0;" onclick="signOut()" id="signout">سجل الخروج</button>
          <img src=${user.photoURL!==""?user.photoURL:"images/public/profile.png"} 
          style="width: 8%;height: 30%; margin-left: 10px;margin-top: 1.5em;margin-right: 1em; border-radius: 50% 50%;" alt="">
          <span title="عرض البروفايل" style="cursor: pointer" onclick="goto('./profile.html?id=${res.docs[0].id}')" id="profileEmail">${user.email}</span>
      </div>`;
        });
    } else {
      document.getElementById("adding").innerHTML += `
          <div style="width: 100%" class="signin-signup">
          <button style="cursor: pointer;" onclick="goto('./login.html')" id="signin">دخول</button>
          <button style="cursor: pointer;" onclick="goto('./register.html')" id="signup">سجل مجاناً</button>
      </div>
          `;
    }
  });
}

function getLessonData(id, q) {
  redirectIfAuth(`./lesson.html?id=${id}&q=${q}`, "lesson");
}

function goto(url) {
  document.getElementById("adding").style.display = "none";
  location.assign(url);
}

// preloader
var myVar;
window.onload = function myFunction() {
  exec();
  myVar = setTimeout(showPage, 3000);
};

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.querySelector(".afterloader").style.display = "block";
  clearTimeout(myVar);
}
