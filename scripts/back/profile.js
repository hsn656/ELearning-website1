// Image Preview 
var customUploadImg = document.querySelector(".chose-image-btn");
var fileUpload = document.querySelector("#file-upload"); 
var img = document.getElementById("choseImg");
var customBtn = document.getElementById("customBtn");
// click file input 
uploadImg.addEventListener("click",()=>{
    fileUpload.click();
    });

// Profile photo Preview

function readURL(e) {
  if (e.files && e.files[0]) {
    var reader = new FileReader();
    

    reader.onload = function(event) {
      img.setAttribute('src', event.target.result);
      // imgSrc = event.target.result; 
    }
    
    reader.readAsDataURL(e.files[0]); 
  }
}

fileUpload.onchange = function() {
  readURL(this);
  customBtn.value = fileUpload.value
};

//////////////////////////////////////////////////////////////////////////////////
// get profile bar elements 
var publicProfile = document.getElementById("publicProfile");
var profile =document.getElementById("profile");
var photo = document.getElementById("photo");
var account = document.getElementById("account");
var close_ = document.getElementById("delete");
//get sections
var profile_basic = document.querySelector(".profile-basic");
var edit_photo = document.querySelector(".edit-photo");
var edit_account =document.querySelector(".account");
var close_account = document.querySelector(".close-account")
/******************************************************************/
var list = document.querySelector(".profile-bar-list li");

for( var i = 0 ; i< list.length ; i++ ){
  if(list[i] == clicked){
    console.log("hg")
  }
}
profile.onclick = ()=>{
  if(profile_basic.style.display !="block"){
    profile.classList.add("active");
    profile_basic.style.display = "block";

    edit_photo.style.display = "none";
    photo.classList.remove("active");

    edit_account.style.display = "none";
    account.classList.remove("active");

    close_account.style.display = "none";
    close_.classList.remove("active");

}
}

photo.onclick = ()=>{
  if(photo.style.display !="block"){
  
    photo.classList.add("active");
    edit_photo.style.display = "block";

    profile_basic.style.display = "none";
    profile.classList.remove("active");

    edit_account.style.display = "none";
    account.classList.remove("active");

    close_account.style.display = "none";
    close_.classList.remove("active");

  }}
  
  account.onclick = ()=>{
    if(edit_account.style.display !="block"){
      account.classList.add("active");
      edit_account.style.display = "block";

      edit_photo.style.display = "none";
      photo.classList.remove("active");

      profile_basic.style.display = "none";
      profile.classList.remove("active");

      close_account.style.display = "none";
      close_.classList.remove("active");

}}

close_.onclick = ()=>{
  if(close_account.style.display !="block"){
    close_.classList.add("active");
    close_account.style.display = "block";

    edit_account.style.display = "none";
   account.classList.remove("active");

    edit_photo.style.display = "none";
    photo.classList.remove("active");

    profile_basic.style.display = "none";
    profile.classList.remove("active");

}}
