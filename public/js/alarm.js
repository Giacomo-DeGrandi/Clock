

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

    hIn.setAttribute("max", '23');
    hIn.setAttribute("min", '0');
    mIn.setAttribute("max", '59');
    mIn.setAttribute("min", '0');
    sIn.setAttribute("max", '59');
    sIn.setAttribute("min", '0');

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

        // if append else prepend
        let secondFutLi = document.querySelector("#secondFutLi")
        console.log(secondFutLi.innerText)

        if (dat1 > now) {
            if (valHour(parseInt(hIn.value)) === true &&
                valMin(parseInt(mIn.value)) === true &&
                valSec(parseInt(sIn.value)) === true) {

                if (validateText(text.value)) {


                    fetch('php/end.php', {
                        method: 'POST',
                        body: formData,
                    }).then(response => response.json())
                        .then(data => {
                        })

                }

            } else {
                alert.innerHTML = 'wrong time format'
            }
        } else {
            alert.innerHTML = 'You can\'t set an alarm in the past'
        }

    }
})


