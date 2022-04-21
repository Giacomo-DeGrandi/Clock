
///////////////////////////////////////     CLOCK    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


document.addEventListener('DOMContentLoaded', function(){


//---------  TIMER  ------------------------------------------------!!!!

    // get my divs
    let timerDiv = document.querySelector("#timer > div")
    let tHou = document.querySelector("#tHou")
    let tMin = document.querySelector("#tMin")
    let tSec = document.querySelector("#tSec")

    // initialise my timer
    let h = 0
    let m = 0
    let s = 0;
    (h.toString().length < 2) ?  h = '0' + h.toString() : h = h.toString();
    (m.toString().length < 2) ? m = '0' + m.toString() : m = m.toString();
    (s.toString().length < 2) ? s = '0' + s.toString() : s = s.toString();
    tHou.innerText = h
    tMin.innerText = m
    tSec.innerText =  s

    // get my buttons and ins
    // plus and minus btns
    const pH = document.querySelector("[name=\"plusH\"]")
    const mH = document.querySelector("[name=\"minusH\"]")
    const pM = document.querySelector("[name=\"plusM\"]")
    const mM = document.querySelector("[name=\"minusM\"]")
    const pS = document.querySelector("[name=\"plusS\"]")
    const mS = document.querySelector("[name=\"minusS\"]")
    // start & stop btns
    const start = document.querySelector("[name=\"start\"]")
    const stop = document.querySelector("[name=\"stop\"]")
    // inputs
    let hourIn = document.querySelector("[name=\"hourIn\"]")
    let minIn = document.querySelector("[name=\"minIn\"]")
    let secIn = document.querySelector("[name=\"secIn\"]")
    let setTimer = document.querySelector('[name="setTimer"]')

    //add my event listeners
    // to plus & minus
    pH.addEventListener( 'click', plusHours )
    mH.addEventListener( 'click', minusHours )
    pM.addEventListener( 'click', plusMinutes )
    mM.addEventListener( 'click', minusMinutes )
    pS.addEventListener( 'click', plusSeconds )
    mS.addEventListener( 'click', minusSeconds )
    // to start & stop
    start.addEventListener( 'click', startCount )
    stop.addEventListener( 'click', stopCount )

    hourIn.setAttribute( "max" ,'23');
    hourIn.setAttribute( "min" ,'0');
    minIn.setAttribute( "max" ,'59');
    minIn.setAttribute( "min" ,'0');
    secIn.setAttribute( "max" ,'59');
    secIn.setAttribute( "min" ,'0');

    // to my inputs and store result to check
    hourIn.addEventListener( 'input', checkHours )
    minIn.addEventListener( 'input', checkMinutes )
    secIn.addEventListener( 'input', checkSeconds )
    setTimer.addEventListener( 'click', setTime )


    function checkHours(e){
        if(e.target.value > 23){
            e.target.value = 0
        }
        return e.target.value
    }
    function checkMinutes(e){
        if(e.target.value > 59){
            e.target.value = 0
        }
        return e.target.value
    }
    function checkSeconds(e){
        if(e.target.value > 59){
            e.target.value = 0
        }
        return e.target.value
    }
    function setTime(e){
        let myH = hourIn.value
        let myM = minIn.value
        let myS = secIn.value
        myH = parseInt(myH)
        myM = parseInt(myM)
        myS = parseInt(myS)
        if( myH === 0 || myH === null || myH === 'undefined' || isNaN(myH)){myH = 0}
        if( myM === 0|| myM === null || myM === 'undefined' || isNaN(myM)){myM = 0}
        if( myS === 0|| myS === null || myS === 'undefined' || isNaN(myS)){myS = 0}
        console.log(typeof(myM))
        tHou.innerHTML = myH
        tMin.innerHTML = myM
        tSec.innerHTML = myS
    }

    // plus minus Functions

    function plusHours(){
        console.log(h)
        h = parseInt(h)
        h += 1
        if(h === 24){ h = 0 }
        (h.toString().length < 2) ? h = '0' + h.toString() : h = h.toString();
        tHou.innerHTML = h
    }
    function minusHours(e){
        h = parseInt(h)
        h -= 1
        if(h < 0){ h = 23 }
        (h.toString().length < 2) ? h = '0' + h.toString() : h = h.toString();
        tHou.innerHTML = h
    }
    function plusMinutes(e){
        m = parseInt(m)
        m += 1
        if(m === 60){ m = 0 }
        (m.toString().length < 2) ? m = '0' + m.toString() : m = m.toString();
        tMin.innerHTML = m
    }
    function minusMinutes(e){
        m = parseInt(m)
        m -= 1
        if(m < 0 ){ m = 59 }
        (m.toString().length < 2) ? m = '0' + m.toString() : m = m.toString();
        tMin.innerHTML = m
    }
    function plusSeconds(e){
        s = parseInt(s)
        s += 1
        if(s === 60){ s = 0 }
        (s.toString().length < 2) ? s = '0' + s.toString() : s = s.toString();
        tSec.innerHTML = s
    }
    function minusSeconds(e){
        s = parseInt(s)
        s -= 1
        if(s < 0 ){ s = 59 }
        (s.toString().length < 2) ? s = '0' + s.toString() : s = s.toString();
        tSec.innerHTML = s
    }

    // DECLARE my start stop as Global to get in the other function for the stop event

    let clockInt;

    function startCount(e){

        function countNow(){

            start.style.pointerEvents = "none";

            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth()
            let day =  date.getDate()
            let msec =  date.getMilliseconds()

            let tH = parseInt(tHou.innerHTML)
            let tM = parseInt(tMin.innerHTML)
            let tS = parseInt(tSec.innerHTML)

            let myDate = [year, month, day, tH, tM, tS, msec]
            let nuDate = new Date(...myDate);
            tS -= 1;
            tSec.innerText = tS.toString()

            if( tS < 0){
                tS = 59
                tSec.innerHTML = tS.toString()
                tM -= 1
                tMin.innerHTML = tM.toString()
            }
            if( tM < 0){
                tM = 59
                tMin.innerHTML = tM.toString()
                tH -= 1
                tHou.innerHTML = tH.toString()
            }
            if( tH < 0){
                tH = 23
                tHou.innerHTML = tH.toString()
            }
            if( tH === 0 && tM === 0 && tS === 0 ){
                start.style.pointerEvents = "auto";
                let audio = new Audio('Flute.wav');
                audio.play();
                clearInterval(clockInt);
            }

        }

        clockInt = setInterval(countNow, 1000);
    }

    function stopCount(e){
        start.style.pointerEvents = "auto";
        clearInterval(clockInt);
    }

})







/*
let timerDiv = document.querySelector("#timer > div")
const input = document.querySelector("[name='timeR']")
const plus = document.querySelector("[name='plus']")
const minus =document.querySelector("[name='minus']")
const start =document.querySelector("[name='start']")
let timerDate = new Date(0, 0, 0, 0, 0, 0, 0)

// get my time for timer
let hT = timerDate.getHours();
let mT = timerDate.getMinutes();
let sT = timerDate.getSeconds();
let msT = timerDate.getMilliseconds();

// format time with double 00
(hT.toString().length < 2) ? hT = '0' + hT.toString() : hT = hT.toString();
(mT.toString().length < 2) ? mT = '0' + mT.toString() : mT = mT.toString();
(sT.toString().length < 2) ? sT = '0' + sT.toString() : sT = sT.toString();
(msT.toString().length < 2) ? msT = '0' + msT.toString() : msT = msT.toString();
timerDiv.innerText = hT + ':' + mT + ':' + sT + ':' + msT


// add my events to inputs and btns
input.addEventListener('input', getNumIn )
plus.addEventListener('click', addNum )
minus.addEventListener('click', subNum )

function getNumIn (e) {
    (e.target.value.length < 2) ? mT = '0' + e.target.value : mT = e.target.value;
    timerDate.setMinutes(mT)
    timerDiv.innerText = hT + ':' + mT + ':' + sT + ':' + msT
}
function addNum (e) {
    mT = timerDate.getMinutes()
    sT = timerDate.getSeconds();
    (sT >= 59 ) ? mT += 1  : sT += 1 ;
    ( mT >= 59 ) ? hT += 1  : mT += 1;
    (parseInt(sT).toString().length < 2) ? sT = '0' + parseInt(sT).toString() : sT = parseInt(sT).toString();
    (mT.toString().length < 2) ? mT = '0' + mT.toString() : mT = mT.toString();
    timerDate.setSeconds(hT)
    timerDate.setMinutes(mT)
    timerDate.setSeconds(sT)
    timerDiv.innerText = hT + ':' + mT + ':' + sT + ':' + msT

}
function subNum (e) {
    hT = timerDate.getHours()
    mT = timerDate.getMinutes()
    sT = timerDate.getSeconds();
    ( hT <= 0) ? mT -= 1 : hT -= 1;
    ( mT <= 0) ? sT -= 1 : mT -= 1;
    timerDate.setSeconds(sT)
    timerDate.setMinutes(mT);
    (mT.toString().length < 2) ? mT = '0' + mT.toString() : mT = mT.toString();
    timerDiv.innerText = hT + ':' + mT + ':' + sT + ':' + msT
}*/













