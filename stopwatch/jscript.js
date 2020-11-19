var base ;
var playPause = 0;

function playNow() {
    
    playPause = playPause + 1;

    if(playPause === 1) {
        play();
        document.getElementById('play').classList.add('pause');
        document.getElementById('animateCircle').classList.add('addAnimation');
        $('#animateCircle.addAnimation').css('animation-play-state','running');
    } else if (playPause === 2) {
        document.getElementById('play').classList.remove('pause');
        $('#animateCircle').css('animation-play-state','paused');
        playPause = 0;
        stop();
    }
}

function play() {
    base = setInterval(timer, 10);
}

function stop() {
    clearInterval(base);
}

//default values
var min = 0;
var sec = 0;
var milisec = 0;
var hour = 0;

//returned values
var minValue = 0;
var secValue = 0;
var milisecValue = 0;
var hourValue = 0;

function timer() {
    milisecValue = updateTime(milisec);
    secValue = updateTime(sec);
    hourValue = updateTime(hour);
    minValue = updateTime(min);

    milisec = ++milisec;

    if (milisec === 100) {
        milisec = 0;
        sec = ++sec;
    }

    if (sec === 60) {
        min = ++min;
        sec = 0;
    }

    if (min === 60) {
        hour = ++hour;
        min = 0;
    }
// instead of jquery use javascript
    document.getElementById('milisec').innerHTML = milisecValue;
    document.getElementById('sec').innerHTML = secValue;
    document.getElementById('min').innerHTML = minValue;
    document.getElementById('hour').innerHTML = hourValue;
}

// update time every second and milisecond
function updateTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function stopNow() {
    clearInterval(base);
    resetNow();

    if(document.getElementById('play').classList.contains('pause')) {
        document.getElementById('animateCircle').classList.remove('addAnimation');
    }
}

function resetNow() {
    milisec = 0;
    sec = 0;
    min = 0;
    hour = 0;

    document.getElementById('milisec').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('min').innerHTML = "00";
    document.getElementById('hour').innerHTML = "00";

    if(!document.getElementById('play').classList.contains('pause')){
        document.getElementById('animateCircle').classList.remove('addAnimation')
    } else {
        document.getElementById('animateCircle').classList.remove('addAnimation')
        setTimeout(function(){
            document.getElementById('animateCircle').classList.remove('addAnimation')
        },10)
    }
}