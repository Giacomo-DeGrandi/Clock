
///////////////////////////////////////     CLOCK    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//---------   CLOCK -----------------------------------------------!!!!

function myClock(){

    // get my obj Date, necessary to manage time in Js
    let date = new Date()

    // get my hrs min secs
    let hClock = date.getHours();
    let mClock = date.getMinutes();
    let sClock = date.getSeconds();

    //condition ? exprIfTrue : exprIfFalse
    (hClock.toString().length < 2) ? hClock = '0' + hClock.toString() : hClock = hClock.toString();
    (mClock.toString().length < 2) ? mClock = '0' + mClock.toString() : mClock = mClock.toString();
    (sClock.toString().length < 2) ? sClock = '0' + sClock.toString() : sClock = sClock.toString();
    document.querySelector("#clock").innerHTML =  hClock + ':' + mClock + ':' + sClock

}

// set a time interval for the function to repeat
let clockInt = setInterval(myClock, 1000);


















