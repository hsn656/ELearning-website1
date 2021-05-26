//loading youtuve iframe
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// my dom variables
let myvideos = document.getElementById("myvideos")
let videoBody = document.getElementById("videoBody")

//buttons
let contolBox = document.getElementById("contolBox")
let vDuration = document.getElementById("vDuration")
let vPlay = document.getElementById("vPlay")
let vPause = document.getElementById("vPause")
let vMute = document.getElementById("vMute")
let vUnmute = document.getElementById("vUnmute")
let progressBar = document.getElementById("progressBar")
let vNormalScreen = document.getElementById("vNormalScreen")
let vFullScreen = document.getElementById("vFullScreen")
let settingsBox = document.getElementById("settingsBox")
let settings = document.getElementById("settings")
let speed = document.getElementById("speed")


//my video player
let videoPlayer;

// default settings
vPause.style.display = "none"
vMute.style.display = "none"
vNormalScreen.style.display = "none"


//add video to video player when youtube api is ready


function onYouTubeIframeAPIReady() {
    videoPlayer = new YT.Player(videoBody.id, {
        height: "95%",
        width: "100%",
        playerVars: {
            controls: 0,
            fs: 0,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3
        },
        videoId: decodeURI(location.search.split('&')[1].split('=')[1]),
        events: {
            'onReady': onPlayerReady,
        }
    })

}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    let time = parseInt(getCookie("lastPoint"))
    videoPlayer.seekTo(time)

    // update progress bar
    setInterval(function() {
        updateTimeDisplay()
        updateProgressBar()

        let videoState = videoPlayer.playerInfo.playerState

        if (videoState == 0 || videoState == 2) {
            vPause.style.display = "none"
            vPlay.style.display = ""
        }
        if (videoState == 1) {
            vPause.style.display = ""
            vPlay.style.display = "none"
        }

    }, 1000)
}


// buttons events
vPlay.onclick = function() {
    videoPlayer.playVideo();
    vPause.style.display = "";
    vPlay.style.display = "none"
}


vPause.onclick = function() {
    videoPlayer.pauseVideo();
    vPause.style.display = "none";
    vPlay.style.display = ""
}

vMute.onclick = function() {
    videoPlayer.unMute();
    vMute.style.display = "none";
    vUnmute.style.display = "";
}

vUnmute.onclick = function() {
    videoPlayer.mute();
    vUnmute.style.display = "none";
    vMute.style.display = "";
}

// function videoFullscreen is below
vFullScreen.onclick = function() {
    // videoFullscreen()

    vFullScreen.style.display = "none"
    vNormalScreen.style.display = ""

    // videoContainer.querySelector("iframe").classList.add("full-screen")
    // contolBox.classList.add("full-screen-controls")
    // document.body.style.overflow = "hidden"
    if (myvideos.requestFullscreen) {
        myvideos.requestFullscreen();
    } else if (myvideos.webkitRequestFullscreen) { /* Safari */
        myvideos.webkitRequestFullscreen();
    } else if (myvideos.msRequestFullscreen) { /* IE11 */
        myvideos.msRequestFullscreen();
    }


}

// function videoNormal is below
vNormalScreen.onclick = function() {
    videoNormal()
}

//function updateProgressBar is below
progressBar.onmouseup = function(e) {
    let newTime = videoPlayer.getDuration() * (e.target.value / 100);
    videoPlayer.seekTo(newTime);
    updateProgressBar();
}

settingsBox.onclick = function() {
    settings.classList.toggle("hide")
}


speed.onchange = function() {
    videoPlayer.setPlaybackRate(parseFloat(speed.options[speed.selectedIndex].value))
}






//################################################################//
//functions

// to convert seconds to time (example=> convert (125) to "02:05" )
function formatTime(time) {
    time = Math.round(time)
    let minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let hours = parseInt(minutes / 60)

    minutes = minutes % 60
    minutes = minutes < 10 ? "0" + minutes : minutes;

    if (hours > 0) {
        return hours + ":" + minutes + ":" + seconds
    } else {
        return minutes + ":" + seconds
    }

}

function updateTimeDisplay() {
    vDuration.textContent = formatTime(videoPlayer.getCurrentTime()) + "/" +
        formatTime(videoPlayer.getDuration())
}


//to update progress bar
function updateProgressBar() {
    progressBar.value = (videoPlayer.getCurrentTime() / videoPlayer.getDuration()) * 100
}


function videoNormal() {
    vFullScreen.style.display = ""
    vNormalScreen.style.display = "none"
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}







//get & set cookies to make video continuous
function getCookie(cname) {
    try {
        if (arguments.length != 0) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        } else {
            throw "you must enter the name of cookie"
        }
    } catch (err) {
        alert(err)
    }
}

function setCookie(cname, cvalue, exdays = 10) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//make video continuous
window.onbeforeunload = function() {
    setCookie("lastPoint", Math.floor(videoPlayer.getCurrentTime()))
}