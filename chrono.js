
///////////////////////////////////////     CLOCK    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


document.addEventListener('DOMContentLoaded', function() {

    // get my divs
    let cHou = document.querySelector("#cHou")
    let cMin = document.querySelector("#cMin")
    let cSec = document.querySelector("#cSec")

    //get my buttons
    let startStop = document.querySelector("[name=\"startStop\"]")
    let roundC = document.querySelector("[name=\"round\"]")

    // add events
    startStop.addEventListener( 'click', startStopClick )
    roundC.addEventListener( 'click', roundClick )

    // initialise counter Start/Stop
    let count = 0

    // add functions
    function startStopClick(e){
        count++;
        if(count >= 1){
            count = 0
        }
    }
    function roundClick(e){

    }
})