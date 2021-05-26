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


// DOM variables
// let allAnswers = document.getElementsByClassName("answer")
// let Answerbtn = document.getElementById("Answerbtn")
// let result = document.getElementById("result")
// let resultContent = document.getElementById("resultContent")
// let profileEmail = document.getElementById("profileEmail")
// let signout = document.getElementById("signout")





// // My variables
// let finalResult = 0;

// //to know if user exists or not
// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         // User is signed in.
//         profileEmail.innerHTML = user.email

//     } else {
//         // No user is signed in.
//         alert("no active user")
//     }
// });

// //to sign out

// signout.addEventListener("click", () => {
//     // firebase.auth().signout();
//     firebase.auth().signOut().then(resp => {
//         location.assign("../login.html")
//     }).catch((error) => {
//         console.log(error.message)
//     })
// })





// //event to enhance user experience
// for (let i = 0; i < allAnswers.length; i++) {
//     allAnswers[i].addEventListener("click", () => {
//         allAnswers[i].firstElementChild.checked = true
//     })
// }

// // function to replace english numbers with arabic ones
// String.prototype.toIndiaDigits = function() {
//     var id = ['۰', '۱', '۲', '۳', '٤', '۵', '٦', '۷', '۸', '۹'];
//     return this.replace(/[0-9]/g, function(w) {
//         return id[+w]
//     });
// }



// // send answers
// Answerbtn.addEventListener("click", () => {
//     for (let i = 0; i < allAnswers.length; i++) {
//         if (allAnswers[i].firstElementChild.checked) {
//             allAnswers[i].classList.add("selected")
//         }
//         if (allAnswers[i].firstElementChild.dataset.answer == "true") {
//             // allAnswers[i].style.backgroundColor = "#72e672"
//             // allAnswers[i].style.color = "white"
//             allAnswers[i].classList.add("right")

//         }

//         if ((allAnswers[i].firstElementChild.checked) && (allAnswers[i].firstElementChild.dataset.answer == "true")) {

//             finalResult++

//         }
//     }
//     result.innerHTML = finalResult.toString().toIndiaDigits()
//     window.scrollTo(0, 0)
//     resultContent.classList.remove("hide")
// })
(function(){
    var courseName = ''
    var tmp=``

    lessonCollection.doc(location.search.split('&')[0].split('=')[1]).get()
    .then(res=> {
        console.log(res.data())
        lessonCollection.doc(location.search.split('&')[0].split('=')[1])
            .update({watched: true})
        debugger
        courseCollection.doc(res.data().courseID).get()
        .then(res=> {
            courseName = res.data().name
            document.getElementById("courseName").innerHTML=res.data().name
            tmp=`<div style="cursor: pointer;" class="lessons-content">
            <div class="show-lessons">
                <button onclick="location.assign('./resources/${res.data().attached}')" class="show-lessons-Btn">الملحقات</button>
            </div>
        </div>`
        document.getElementsByClassName("lessons-list")[0].innerHTML+=tmp

        })
        lessonCollection.where("courseID", "==", res.data().courseID).orderBy('img', 'asc').get()
            .then(res=> {
                res.docs.forEach((data, i) => {
                    // console.log(data.data())
                    tmp+=`<div onclick="getSpecificLesson('${data.id}', '${data.data().videoLink}')" style="cursor: pointer;" class="lessons-content">
                    <div class="show-lessons">
                        <button class="show-lessons-Btn">${i+1}- ${data.data().name}</button>
                        <input style="margin-left: 1em;" ${data.data().watched==true?"checked":""} disabled id="chekbox" type="checkbox">
                    </div>
                </div>`
                });
                tmp+=`
                <div style="cursor: pointer;" class="lessons-content">
                    <div class="show-lessons">
                        <button onclick="location.assign('./quiz .html?name=${courseName}')" class="show-lessons-Btn">الاختبار على الدورة</button>
                    </div>
                </div>`
            document.getElementsByClassName("lessons-list")[0].innerHTML=tmp

            })


            document.getElementsByClassName("lesson-title")[0].innerHTML=res.data().name
            commentCollection.where("lessonID", "==", location.search.split('&')[0].split('=')[1])
            .get()
            .then(res=>{
                var tmp=``
                res.docs.forEach(data=>{
                    tmp+=`<div style="display: flex; margin: .5em;" class="comment">
                    <img src="${data.data().user_image}" style="width: 4%;height: 30%; border-radius: 53% 50%;" alt="">
                    <h4 style="margin: 0 0.5em;">${data.data().user_name}</h4>
                    <p style="margin: 0 0.5em;">${data.data().content}</p>
                </div>`
                })
                document.getElementById("comments").innerHTML=tmp
            })
    }).catch(err => console.error(err))
    
    
})()



function getSpecificLesson(id, q){
    redirectIfAuth(`./lesson.html?id=${id}&q=${q}`)
}

function sendData(data){
    userCollection.where("user_email", "==", auth.currentUser.email).get()
    .then(res=>{
        commentCollection.add({
            content: data,
            lessonID: location.search.split('&')[0].split('=')[1],
            user_image: auth.currentUser.photoURL,
            user_name: res.docs[0].data().name,
        }).then(res=>{
            commentCollection.where("lessonID", "==", location.search.split('&')[0].split('=')[1])
                .get()
                .then(res=>{
                    var tmp=``
                    res.docs.forEach(data=>{
                        tmp+=`<div style="display: flex; margin: .5em;" class="comment">
                        <img src="${data.data().user_image}" style="width: 4%;height: 30%; border-radius: 53% 50%;" alt="">
                        <h4 style="margin: 0 0.5em;">${data.data().user_name}</h4>
                        <p style="margin: 0 0.5em;">${data.data().content}</p>
                    </div>`
                    })
                    document.getElementById("comments").innerHTML=tmp
                })
        })

    }).catch(err=>console.log(err))
}