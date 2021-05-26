// Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyB96lcccUfjnSvSaouH4dZwYn7mTAIKZnM",
//     authDomain: "profile-5bd53.firebaseapp.com",
//     projectId: "profile-5bd53",
//     storageBucket: "profile-5bd53.appspot.com",
//     messagingSenderId: "368629863337",
//     appId: "1:368629863337:web:e0cd2aa984e72aca5a6ab8"
//   };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// db.settings({timeStampsInSnapshots:true});
var user = firebase.auth().currentUser;
// getting 
var fname = document.querySelector(".first-name input");
var lname = document.querySelector(".last-name input");
var email = document.getElementById("email");
var fullName = document.querySelector("#profile-name h3");
var profileImg = document.getElementById("profile-img");



// getting and setting data
function setData (doc){
    fname.value = doc.data().name.split(" ")[0];
    lname.value = doc.data().name.split(" ")[1];
    email.value = doc.data().user_email;
    fullName.innerHTML = doc.data().name; 
    // img.src = doc.data().photo;
}



auth.onAuthStateChanged((user) => {
    if (user){
    document.getElementById("profile-img").src=user.photoURL!=""?user.photoURL:""
     userCollection.doc(decodeURI(location.search.split('=')[1])).get().then(doc =>{
        // console.log(doc.data())
        setData(doc);
        })
    }
})
//  updaitng data

// update the profile section

var profileSaveNewData = document.getElementById("save-profile");
profileSaveNewData.addEventListener("click",updateData);

function updateData(){
    auth.onAuthStateChanged((user) => {
        if (user){
         userCollection.doc(decodeURI(location.search.split('=')[1])).update({
            "name":`${fname.value} ${lname.value}`,
         }).then(res => alert("تم"))
         .catch(e=>console.log(e))
        }
    })
}

// update the account section (Email , password)
var writeEmailButton = document.getElementById("changeEmail");
var changeEmail = document.getElementById("email");
var changeEmailPasswordBtn = document.getElementById("changePassword");
var currntPassword = document.getElementById("currnt-password");
var newPassword = document.getElementById("new-password");
var rNewPassword = document.getElementById("r-new-password");

writeEmailButton.onclick = function(){
    changeEmail.removeAttribute('readonly');
    changeEmail.style.borderColor = "#51c4d3";
    changeEmail.focus();
    changeEmail.value = "";
}

changeEmailPasswordBtn.addEventListener("click",updateEmail)

function updateEmail(){

    //update email in firestore
    auth.onAuthStateChanged((user) => {
        if(user){
         userCollection.doc(decodeURI(location.search.split('=')[1])).update({
            user_email:changeEmail.value
        })
        
        //update email in auth
        auth.currentUser.updateEmail(changeEmail.value).then(res => alert("تم"))
            .catch(e =>console.log(e))
        
        // change the passowrd 
        
        
            debugger
            if(newPassword.value == rNewPassword.value){
                console.log("hi")
                // newPassword.value = getASecureRandomPassword();
                console.log("hi")
                
                auth.currentUser.updatePassword(newPassword.value).then(function() {
                        console.log("hi")
                        alert("تم")
                        location.assign("./login.html")
                    }).catch(function(error) {
                        console.log(error)
                    });
            }
        
     } });
}    

    

  


// delete the account
var closeAccountBtn = document.getElementById("closeAcount");

closeAccountBtn.addEventListener("click",()=>{
   var makeSure= confirm("هل تريد تأكيد حذف الحساب؟");
   if(makeSure){
    // deleteAccount()
   }

});

function deleteAccount(){

    firebase.auth().onAuthStateChanged((user) => {
        if(user){

            db.collection("users").doc(firebase.auth().currentUser.uid).delete().then(()=>{
                // console.log("deleted")
                firebase.auth().currentUser.delete().then(()=>{
                alert("account deleted");
                location.replace("project/landing_page/index.html")
                })
            })
            

        }
    })
}


// Upload Image 

// const ref = firebase.storage().ref();
var save_Photo = document.getElementById("save-photo");

save_Photo.addEventListener("click",uploadPhoto);

function uploadPhoto(){
    auth.onAuthStateChanged((user) => {
        if(user){
debugger
            var file = document.getElementById("file-upload").files[0];
            var name = user.uid;
            var metaData = {
                contentType:file.type
            }
            const task = ref.child(name).put(file,metaData);

            task.then(snapshot => snapshot.ref.getDownloadURL())
                .then(url =>{
                    console.log(url)
                // set img in firestore  // 
                user.updateProfile({
                    photoURL: url
                  }).then(function() {
                    console.log("done")
                  }).catch(function(error) {
                    console.log(error) 
                  });
                  
                document.getElementById("profile-img").src=url
                
            }).catch(e => console.log(e))
        }
    })        
}
    

