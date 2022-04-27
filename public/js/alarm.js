

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

    hIn.setAttribute( "max" ,'23');
    hIn.setAttribute( "min" ,'0');
    mIn.setAttribute( "max" ,'59');
    mIn.setAttribute( "min" ,'0');
    sIn.setAttribute( "max" ,'59');
    sIn.setAttribute( "min" ,'0');

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

                    
                    // select table
                    let myTable = document.querySelector("#myFutTable")

                    // create a row to store the date selected
                    let newTr = document.createElement('tr')

                    myTable.insertBefore(newTr, document.querySelector('#myFutTable > tr'))

                    let tdSel = document.createElement('td')

                    tdSel.setAttribute('class', 'p-1 h5 shadow border-0 rounded-2 text-center fw-lighter');

                    tdSel.innerHTML = nowY + '-' + (nowMo+1) + '-' + nowD + ' ' + dat1.toLocaleTimeString('it-IT')

                    console.log(dat1.toLocaleTimeString('it-IT'))

                    tdSel.innerHTML = '⏰' + tdSel.innerHTML + ' ' + '📄:' + text.value
                    newTr.append(tdSel);

                    let tdDiff = document.createElement('td');
                    tdDiff.setAttribute('class', 'p-1 h5 shadow border-0 rounded-2 text-center fw-lighter');

                    // substract date
                    let differ = dat1 - now
                    // save diff
                    let dateDiff = new Date(differ)

                    //if(dateDiff.getHours() > 0){ dateDiff.setHours(0) }
                    dateDiff.setHours(dateDiff.getHours() - 1)
                    if(dateDiff.getHours() === 12){ dateDiff.setHours(0) }

                    tdDiff.innerHTML = '⌛' + dateDiff.toLocaleTimeString('it-IT')

                    newTr.append(tdDiff);

                    // SEND date selected TO BD ------->
                    fetch('php/end.php', {
                        method: 'POST',
                        body: formData,
                    }).then(response => response.json())
                        .then(data =>{     //  <------ data
                            console.log(data)
                        })

                }
            } else {
                alert.innerHTML = 'wrong time format'
            }
        } else {
            alert.innerHTML = 'You can\'t set an alarm in the past'
        }

    }

    // ___ get dates to show __________________________________________________________________//

    // set a new form data object for the body
    let passData = new FormData();

    // set the Datas to send
    passData.append('all','true');

    // ask bd PASSED dates ---------------->
    fetch('php/gettime.php', {
        method: 'POST',
        body: passData,
    }).then(response => response.json())
        .then(data => {      //  <--------- data

            console.log(data)

            for (let i = 0; i <= data.length; i++) {

                // select table
                let myFutureTable = document.querySelector("#myFutTable")
                let myPassedTable = document.querySelector("#myPassedTable")

                //create row
                let rowsFut = document.createElement('tr')
                let rowsPass = document.createElement('tr')
                //myTable.appendChild(rows)

                // cells for passed
                let tdPass = document.createElement('td');
                tdPass.setAttribute('class', 'p-1 col h5  shadow border-0 rounded-2 text-center fw-lighter');

                //create a td to store futures ------>
                let tdFut = document.createElement('td');
                tdFut.setAttribute('class', 'p-1 col h5 shadow border-0 rounded-2 text-center fw-lighter');


                let now = new Date()
                let date = new Date(data[i].time)


                if (now > date) {

                    myPassedTable.appendChild(rowsPass)

                    let myPassDate = data[i].time

                    tdPass.innerHTML = '⏰' + myPassDate + ' ' + '📄:' + data[i].text
                    rowsPass.appendChild(tdPass);


                } else if (now < date) {

                    myFutureTable.appendChild(rowsFut)

                    let myFutureDate = data[i].time

                    // store the printed date in td nexta
                    tdFut.innerHTML = '⏰' + myFutureDate + ' ' + '📄:' + data[i].text
                    // append to tr
                    rowsFut.append(tdFut);

                    //create a td to store futures ------>
                    let tdDiff = document.createElement('td');

                    tdDiff.setAttribute('class', 'p-1 col h5 shadow border-0 rounded-2 text-center fw-lighter');

                    let myDatesDiff = date - now

                    let dateDifference = new Date(myDatesDiff)


                    // here I couldn't understand why, but when the
                    // hours difference is less than an hour it marks 12
                    // instead of 00.  I had to add this conversion
                    dateDifference.setHours(dateDifference.getHours() - 1)
                    if (dateDifference.getHours() === 12) {
                        dateDifference.setHours(0)
                    }
                    let y = now.getFullYear()
                    let mo = now.getMonth()
                    let da = now.getDate()
                    dateDifference.setFullYear(y)
                    dateDifference.setMonth(mo)
                    dateDifference.setMonth(da)

                    let h = dateDifference.getHours()
                    let m = dateDifference.getMinutes()
                    let s = dateDifference.getSeconds()

                    // store the printed date in td nexta
                    tdDiff.innerHTML = '⌛' + h + ':' + m + ':' + s
                    // append to tr
                    rowsFut.appendChild(tdDiff);

                }


            }           // <---- for loop for table

        })

        function myCheckAlarm() {

            let testFutTd = document.querySelector("#myFutTable > tr:nth-child(2) > td:nth-child(1)")
            let testFutTdTime = document.querySelector("#myFutTable > tr:nth-child(2) > td:nth-child(2)")

            let curDateToTest = new Date();

            let testFutTdText  = testFutTd.innerText.substring(1);
            testFutTdText  = testFutTdText.substring(0,19);

            let dateToTest = new Date(testFutTdText)

            let dtth = dateToTest.getHours()
            let dttm = dateToTest.getMinutes()
            let dtts = dateToTest.getSeconds()
            let cdth = curDateToTest.getHours()
            let cdtm = curDateToTest.getMinutes()
            let cdts = curDateToTest.getSeconds()


            if(dtth === cdth && dttm === cdtm && dtts === cdts){

                // select passed table
                let myPassedTable = document.querySelector("#myPassedTable")
                // create a row
                let rowsPass = document.createElement('tr')

                // append row
                myPassedTable.appendChild(rowsPass)

                // cells for passed
                let tdPass = document.createElement('td');
                tdPass.setAttribute('class', 'p-1 col h5  shadow border-0 rounded-2 text-center fw-lighter');

                // swap value
                tdPass.innerText = testFutTd.innerText

                // remove from future list
                testFutTd.remove()
                testFutTdTime.remove()

                // append cell
                rowsPass.appendChild(tdPass);

                // ___ALERT __________//

                let alarmAlert = document.querySelector("#alarmAlert")
                alarmAlert.innerText = testFutTd.innerText
            }
        }

        let check = setInterval(myCheckAlarm, 1000);

        if(check++ ){
            function alertNow(){

                let alarmAlert = document.querySelector("#alarmAlert")
                alarmAlert.remove()
            }
            let als = setInterval(alertNow, 1000);

            if(als === 5){
                clearInterval(als)
            }
        }

})

/*


            // check if time s up
            function myCheckAlarm() {

                let futuresLi = document.querySelector("#nextList > li")
                let myText = futuresLi.innerHTML.substring(20)

                let dToC  = futuresLi.innerText.substring(1);

                dToC =  dToC.substring(0,19)

                let curDateToTest = new Date();
                let dateToTest = new Date(dToC)

                dateToTest = dateToTest.toLocaleTimeString('it-IT')
                curDateToTest = curDateToTest.toLocaleTimeString('it-IT')


                if( dateToTest === curDateToTest){

                    let dUl = document.querySelector("#countList > li")
                    dUl.innerHTML = ''
                    futuresLi.innerHTML = ''
                    let alarmAlert = document.querySelector("#alarmAlert");
                    alarmAlert.innerText = myText
                    let passedUl = document.querySelector("#passList")
                    let liPassed = document.createElement('li');
                    liPassed.setAttribute('class', 'p-1 col h5  shadow border-0 rounded-2 text-center fw-lighter');

                    let tDates = new Date
                    let nowY = tDates.getFullYear()
                    let nowMo = tDates.getMonth()
                    let nowD = tDates.getDate()

                    liPassed.innerHTML = '⏰'+ nowY + '-' + nowMo + '-' + nowD + ' ' + dateToTest + ' ' + myText
                    passedUl.insertBefore(liPassed,passedUl.firstChild);

                }

            }

            let check = setInterval(myCheckAlarm, 1000);

 */



