

///////////////////////////////////////     CLOCK    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


document.addEventListener('DOMContentLoaded', function() {


    // alarm clock ------------------------->
    // select button
    function myClockAlarm() {

        // get my obj Date, necessary to manage time in Js
        let dateC2 = new Date()

        // get my hrs min secs
        let hAlarm = dateC2.getHours();
        let mAlarm = dateC2.getMinutes();
        let sAlarm = dateC2.getSeconds();

        //condition ? exprIfTrue : exprIfFalse
        (hAlarm.toString().length < 2) ? hAlarm = '0' + hAlarm.toString() : hAlarm = hAlarm.toString();
        (mAlarm.toString().length < 2) ? mAlarm = '0' + mAlarm.toString() : mAlarm = mAlarm.toString();
        (sAlarm.toString().length < 2) ? sAlarm = '0' + sAlarm.toString() : sAlarm = sAlarm.toString();
        document.querySelector("#clockAlarm").innerHTML = hAlarm + ':' + mAlarm + ':' + sAlarm

    }

    // the clock interval
    let alarm = setInterval(myClockAlarm, 1000);

    // select inputs
    let hIn = document.querySelector("#Alarm > tbody > tr > td > div > input:nth-child(1)")
    let mIn = document.querySelector("#Alarm > tbody > tr > td > div > input:nth-child(3)")
    let sIn = document.querySelector("#Alarm > tbody > tr > td > div > input:nth-child(5)")
    let text = document.querySelector("#Alarm > tbody > tr > td > textarea");

    // submit button
    let send = document.querySelector("#Alarm > tbody > tr > td > button")

    // alert space on Alarm
    let alert = document.querySelector("#alert");

    // add event listener
    send.addEventListener('click', sendIns)

    let counterBtn = 0;

    function sendIns() {

        alert.innerHTML = ''

        hIn.addEventListener('input', setHour)
        mIn.addEventListener('input', setMin)
        sIn.addEventListener('input', setSec)
        text.addEventListener('input', setText)

        function setHour(e) {
            return e.target.value
        }

        function setMin(e) {
            return e.target.value
        }

        function setSec(e) {
            return e.target.value
        }

        function setText(e) {
            return e.target.value
        }

        let testDate = new Date()

        // set a new FormData object to set the POST
        let formData = new FormData();

        formData.append('hour', hIn.value);
        formData.append('min', mIn.value);
        formData.append('sec', sIn.value);
        formData.append('text', text.value);

        // input regex
        const validateText = (text) => {
            // set validation regex for TEXT
            const reg = new RegExp(/^[_a-z0-9- .#\-@,]+$/)
            // set validation regex for length
            let len = new RegExp(/^.{1,50}$/)

            if (len.test(text) && reg.test(text)) {
                return text;
            }
        }

        // validate time inputs
        function valHour(hour) {
            if (hour === undefined) {
                hour = 0
            }
            return !(hour > 23 || hour < 0);
        }

        function valMin(min) {
            if (min === undefined) {
                min = 0
            }
            return !(min > 59 || min < 0);
        }

        function valSec(sec) {
            if (sec === undefined) {
                sec = 0
            }
            return !(sec > 59 || sec < 0);
        }

        let nowH = testDate.getHours()
        let nowM = testDate.getMinutes()
        let nowS = testDate.getSeconds()
        let nowY = testDate.getFullYear()
        let nowMo = testDate.getMonth()
        let nowD = testDate.getDate()


        let now = new Date(nowY, nowMo, nowD, nowH, nowM, nowS, 0)
        let dat1 = new Date(nowY, nowMo, nowD, hIn.value, mIn.value, sIn.value, 0)

        if (dat1 > now) {
            if (valHour(parseInt(hIn.value)) === true &&
                valMin(parseInt(mIn.value)) === true &&
                valSec(parseInt(sIn.value)) === true) {

                if (validateText(text.value)) {


                    /// futures alarms
                    let futUl = document.querySelector("#nextList")

                    let liFut = document.createElement('li');
                    liFut.setAttribute('class', 'p-1 h5  shadow border-0 rounded-2 text-center fw-lighter');

                    liFut.innerHTML = nowY + '-' + (nowMo+1) + '-' + nowD + ' ' +dat1.toLocaleTimeString('it-IT')

                    console.log(dat1.toLocaleTimeString('it-IT'))

                    liFut.innerHTML = '⏰' + liFut.innerHTML+ ' ' + '📄:' + text.value
                    futUl.insertBefore(liFut,futUl.firstChild);

                    let diffUl = document.querySelector("#countList")

                    let liDiff = document.createElement('li');
                    liDiff.setAttribute('class', 'p-1 h5 shadow border-0 rounded-2 text-center fw-lighter');

                    // substract date
                    let differ = dat1 - now
                    // save diff
                    let dateDiff = new Date(differ)

                    //if(dateDiff.getHours() > 0){ dateDiff.setHours(0) }
                    dateDiff.setHours(dateDiff.getHours() - 1)
                    if(dateDiff.getHours() === 12){ dateDiff.setHours(0) }
                    liDiff.innerHTML = '⌛' + dateDiff.toLocaleTimeString('it-IT')
                    diffUl.insertBefore(liDiff, diffUl.firstChild);

                    fetch('php/end.php', {
                        method: 'POST',
                        body: formData,
                    }).then(response => response.json())
                        .then(data =>{
                        })

                }
            } else {
                alert.innerHTML = 'wrong time format'
            }
        } else {
            alert.innerHTML = 'You can\'t set an alarm in the past'
        }

    }

    let passData = new FormData();

    passData.append('passed','true');

    fetch('php/gettime.php', {
        method: 'POST',
        body: passData,
    }).then(response => response.json())
        .then(data => {
            /// passed alarms
            for(let i=0;i<data.length;i++){
                let passUl = document.querySelector("#passList")
                let liPass = document.createElement('li');
                liPass.setAttribute('class', 'p-1 col h5  shadow border-0 rounded-2 text-center fw-lighter');

                let myPassDate = data[i].time

                liPass.innerHTML = '⏰' + myPassDate + ' ' + '📄:'+data[i].text
                passUl.insertBefore(liPass,passUl.firstChild);
            }
        })

    let futData = new FormData();

    futData.append('futures','true');

    fetch('php/getfutures.php', {
        method: 'POST',
        body: futData,
    }).then(response => response.json())
        .then(data => {

            /// futures alarms
            for(let i=0;i<data.length;i++){

                let dateTestFut = new Date()

                let dTestFu = new Date(data[i].time)

                let nowDiff = dTestFu - dateTestFut
                let aDate = new Date(nowDiff)

                aDate.setHours(aDate.getHours() - 1)
                if(aDate.getHours() === 12){ aDate.setHours(0) }


                let liDateDiff = document.createElement('li');
                liDateDiff.setAttribute('class', 'p-1 col h5 shadow text-nowrap border-0 rounded-2 text-center fw-lighter');

                liDateDiff.innerHTML = '⌛' +  ' ' + aDate.toLocaleTimeString('it-IT')
                let diffUl = document.querySelector("#countList")
                diffUl.appendChild(liDateDiff);

                let futuresUl = document.querySelector("#nextList")
                let liFutu = document.createElement('li');
                liFutu.setAttribute('class', 'p-1 col h5 shadow border-0 rounded-2 text-center fw-lighter');

                let myFutureDate = data[i].time
                let datedeb  = new Date(myFutureDate)

                liFutu.innerHTML = '⏰' + myFutureDate + ' ' + '📄:'+ data[i].text
                futuresUl.appendChild(liFutu);
            }


        })

})

function myCheckAlarm() {

    let futuresLi = document.querySelector("#nextList > li")
    let myText = futuresLi.innerHTML.substring(20)

    let dToC  = futuresLi.innerHTML.substring(1);

    dToC =  dToC.substring(0,19)

    let curDateToTest = new Date();
    let dateToTest = new Date(dToC)

    dateToTest = dateToTest.toLocaleTimeString('it-IT')
    curDateToTest = curDateToTest.toLocaleTimeString('it-IT')


    if( dateToTest === curDateToTest){

        let audio = new Audio('Flute.wav');
        audio.play();

        let dUl = document.querySelector("#countList > li")
        dUl.innerHTML = ''
        futuresLi.innerHTML = ''
        let passedUl = document.querySelector("#passList")
        let liPassed = document.createElement('li');
        liPassed.setAttribute('class', 'p-1 col h5  shadow border-0 rounded-2 text-center fw-lighter');

        let tDates = new Date
        let nowY = tDates.getFullYear()
        let nowMo = tDates.getMonth()
        let nowD = tDates.getDate()

        liPassed.innerHTML = '⏰'+ nowY + '-' + nowMo + '-' + nowD + ' ' + dateToTest + ' ' + '📄:'+ myText
        passedUl.insertBefore(liPassed,passedUl.firstChild);

    }

}

let check = setInterval(myCheckAlarm, 1000);



/*



                    //-----> fetch
                    fetch('php/end.php', {
                        method: 'POST',
                        body: formData,
                    })
                        .then(response => response.json())
                        .then(data => {
                            let infos = data
                            let passed = infos[0]
                            let text = infos[1]
                            let id = infos[2]

                            console.log(passed)

                            let unPass = [...new Set(passed)];
                            let unText = [...new Set(text)];

                            console.log(unPass)
                            for (let p = 0; p < unPass.length; p++) {

                                let liPass = document.createElement('li');
                                liPass.setAttribute('class', 'p-1 h4 shadow border border-0 rounded-2 text-center fw-lighter');
                                liPass.innerHTML = JSON.stringify(unPass[p].date);
                                liPass.innerHTML = '⏰: ' + liPass.innerHTML.substring(0, 20) + ' ' + '📄:'+ unText[p].value
                                passUl.appendChild(liPass);
                            }

                            /*
                            for (let d = 0; d < diff.length; d++) {
                                let liDiff = document.createElement('li');
                                liDiff.setAttribute('class', 'p-1 h4 shadow border-0 rounded-2 text-center fw-lighter');
                                let diff2 = diff
                                diff2 = diff[d].split(',')
                                liDiff.innerHTML = diff2[0] + ':' + diff2[1] + ':' + diff2[2];
                                liDiff.innerHTML = '⏰' + id[d] + '- ' + liDiff.innerHTML
                                diffUl.appendChild(liDiff);
                            }
                            for (let t = 0; t < text.length; t++) {
                                let liText = document.createElement('li');
                                liText.setAttribute('class', 'p-1 h4  shadow border-0 rounded-2 text-center fw-lighter');
                                liText.innerHTML = text[t];
                                liText.innerHTML = '⏰' + id[t] + ': ' + liText.innerHTML
                                textUl.appendChild(liText);
                            }







                .then(data => {
                    let w = data
                    console.log(w)
                    console.log(typeof(w))

                    // do something with your data
                })


            async function fetchDate() {
                const settings = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: formData
                };
                const response = await fetch('php/end.php', settings);
                return await response.json();
            }

            let allDate = fetchDate()
            console.log(fetchDate)


 */
