
///////////////////////////////////////     CLOCK    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


document.addEventListener('DOMContentLoaded', function() {

    // get my divs
    let cHou = document.querySelector("#cHou")
    let cMin = document.querySelector("#cMin")
    let cSec = document.querySelector("#cSec")
    let cMsec = document.querySelector("#cMsec")

    //get my buttons
    let startStop = document.querySelector("[name=\"startStop\"]")
    let roundC = document.querySelector("[name=\"round\"]")

    // get round lists
    let roundUl = document.querySelector("#roundList")
    let timesUl = document.querySelector("#timesList")

    // add events
    startStop.addEventListener( 'click', startStopClick )
    roundC.addEventListener( 'click', roundClick )

    // get my obj Date, necessary to manage time
    let date = new Date(0,0,0,0,0,0,0)

    // get my hrs min secs
    let hClock = date.getHours();
    let mClock = date.getMinutes();
    let sClock = date.getSeconds();
    let msClock = date.getMilliseconds();

    // scope the caller to global
    let chronoInt;

    // add functions
    function startStopClick(e){

            // init counter

            let count;

            if(e.target.value === 'start'){

                function myChrono(){
                    msClock += 10
                    if(msClock >= 1000){
                        msClock = 0
                        sClock ++;
                        if(sClock === 60){
                            sClock = 0
                            mClock ++;
                            if(mClock === 60){
                                mClock = 0;
                                hClock ++;
                                if(hClock === 24 ){
                                    hClock = 0
                                    mClock = 0
                                    sClock = 0
                                    msClock= 0
                                }
                            }
                        }

                    }
                    cHou.innerHTML = hClock
                    cMin.innerHTML = mClock
                    cSec.innerHTML = sClock

                    date.setMilliseconds(parseInt(cMsec.innerHTML))

                    let msClock2 = msClock / 10
                    cMsec.innerHTML = msClock2.toString()

                }

                chronoInt = setInterval( myChrono, 10);

                e.target.value = 'stop'

            } else {

                clearInterval(chronoInt)
                e.target.value = 'start'
            }
    }

    // init my roundCounter
    let roundCounter = 0;

    // my array to push rounds
    let arr = []
    let arr2 = []

    function roundClick(e){

        //init roundcounter
        roundCounter ++;

        let li = document.createElement('li');
        li.setAttribute('class','p-2 display-6 w-100');

        // get my hrs min secs
        let hRound = parseInt(cHou.innerHTML)
        let mRound = parseInt(cMin.innerHTML)
        let sRound = parseInt(cSec.innerHTML)
        let msRound = date.getMilliseconds();

        li.innerText = '✅' + 'n.'+ roundCounter + ' ' + '🔁' + ' ' + hRound + ':' + mRound + ':' + sRound + ':' + msRound

        roundUl.appendChild(li);

        // get two results in separate arrays to subtract them
        if(roundCounter % 2 === 0){
            arr.push(hRound)
            arr.push(mRound)
            arr.push(sRound)
            arr.push(msRound)
        } else {
            arr2.push(hRound)
            arr2.push(mRound)
            arr2.push(sRound)
            arr2.push(msRound)
        }

        // init array to catch differences
        let roundDiff = []

        roundDiff = arr.map(function(item, index) {
            // In this case item correspond to currentValue of array arr,
            // using index to get value from array arr2
            return item - arr2[index];
        })

        // set condition to empty arrays to be have to have jjust lasts couple of values
        if(roundCounter % 2 === 0){
            arr2 = []
        } else {
            arr = []
        }

        let li2 = document.createElement('li');
        li2.setAttribute('class','p-2 display-6 w-100');

        // first Round is always NaN
        if(roundCounter > 1){

            li2.innerText = '⏲️'
                + Math.abs(roundDiff[0]) + ':' + Math.abs(roundDiff[1]) + ':'
                + Math.abs(roundDiff[2]) + ':' + Math.abs(roundDiff[3])

            timesUl.appendChild(li2);
        } else  {

            li2.innerText = '⏲️' + ' ' + hRound + ':' + mRound + ':' + sRound + ':' + msRound
            timesUl.appendChild(li2);
        }
    }
})