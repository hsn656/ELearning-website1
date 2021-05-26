let myNav = document.querySelector(".header");
// let signout = document.getElementById("signout")

window.onscroll = function () { 
    if (window.scrollY > 10 ) {
        console.log(window.scrollY)
        myNav.classList.add("background");
        myNav.classList.remove("color");
    } 
    else {
        myNav.classList.remove("background");
        myNav.classList.add("color");
    }
};

window.onscroll = function(){
    if(window.pageYOffset >=600){
        document.getElementById("goUp").style.display = "block"
    }else{
        document.getElementById("goUp").style.display = "none"
    }
}

// // preloader
// var myVar;
// window.onload =function myFunction() {
//     exec()
//   myVar = setTimeout(showPage, 3000);

// }

// function showPage() {
//   document.getElementById("loader").style.display = "none";
//   document.querySelector(".afterloader").style.display = "block";
//   clearTimeout(myVar)
// }

// // document.getElementById("loader").parentElement.removeChild(document.getElementById("loader"));


// window.onscroll = function(){
//     if(window.pageYOffset >=600){
//         document.getElementById("goUp").style.display = "block"
//     }else{
//         document.getElementById("goUp").style.display = "none"

//     }
// }


