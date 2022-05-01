

///////////////////////////////////////     CLOCK    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


document.addEventListener('DOMContentLoaded', function() {
	
	// function to translate ms
	
	function msToTime(duration) {
	  let milliseconds = Math.floor((duration % 1000) / 100),
	  	seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
	}


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
		
		// init lists
		
		let passUl = document.querySelector("#passList")
		let futuresUl = document.querySelector("#nextList")
		let diffUl = document.querySelector("#countList")
		passUl.innerHTML = ''
		futuresUl.innerHTML = ''
		diffUl.innerHTML = ''


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

		/*
        // input regex
        const validateText = (text) => {
            // set validation regex for TEXT
            const reg = new RegExp(/^[_a-z0-9- .#\-@,]+$/)
            // set validation regex for length
            let len = new RegExp(/^.{1,50}$/)

            if (len.test(text) && reg.test(text)) {
                return text;
            }
        } */

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

              		// if (validateText(text.value)) {
				/*
                    /// futures alarms
                    let futUl = document.querySelector("#nextList")
					
					let firstFutLi = document.querySelector("#firstFutLi")
					firstFutLi.setAttribute('class', 'p-1 h5  shadow border-0 rounded-2 text-center fw-lighter');	

                    firstFutLi.innerHTML = dat1.toLocaleTimeString('it-IT')

                    console.log(dat1.toLocaleTimeString('it-IT'))

                    firstFutLi.innerHTML = '⏰' + firstFutLi.innerHTML + ' ' + '📄:' + text.value
					
					futUl.prepend(firstFutLi);
								
                    let diffUl = document.querySelector("#countList")

                    let liDiff = document.createElement('li');
                    liDiff.setAttribute('class', 'p-1 h5 shadow border-0 rounded-2 text-center fw-lighter');

                    // substract date
                    let differ = dat1 - now

                    liDiff.innerHTML = '⌛' + msToTime(differ)
                    diffUl.insertBefore(liDiff, diffUl.firstChild);
				*/

                    fetch('php/end.php', {
                        method: 'POST',
                        body: formData,
                    })
					.then(response => response.json())
                    .then(data =>{
						
						let passData = new FormData();

						passData.append('passed','true');

						return fetch('php/gettime.php', {
							method: 'POST',
							body: passData,
						})
					})
					.then(response => response.json())
				    .then(data => {
					console.log(data)
            		// passed alarms
						for(let i=0;i<data.length;i++){
							let passUl = document.querySelector("#passList")
							let liPass = document.createElement('li');
							liPass.setAttribute('class', 'p-1 col h5  shadow border-0 rounded-2 text-center fw-lighter');

							console.log('pass')
							console.log(data[i].id)
							let myPassDate = data[i].time
							liPass.innerHTML = '🆔'+ data[i].id +' ⏰' + myPassDate + ' ' + '📄:'+data[i].text
							passUl.insertBefore(liPass,passUl.firstChild);
						}
						
						let futData = new FormData();

						futData.append('futures','true');

						 return fetch('php/getfutures.php', {
							method: 'POST',
							body: futData,
						})
					})
					.then(response => response.json())
					.then(data => {

						for(let i=0;i<data.length;i++){

							let futuresUl = document.querySelector("#nextList")
							let liFutu = document.createElement('li');
							liFutu.setAttribute('class', 'p-1 col h5 shadow border-0 rounded-2 text-center fw-lighter');

							let efDate = data[i].time.split(':')
							console.log('futu')
							console.log(efDate[0])
							console.log(efDate[1])
							console.log(efDate[2])
							let testNowDate = new Date()
							let testFutDate = new Date()
							testFutDate.setHours(efDate[0])
							testFutDate.setMinutes(efDate[1])
							testFutDate.setSeconds(efDate[2])

							let defDate = testFutDate - testNowDate 

							console.log(msToTime(defDate))

							let liDateDiff = document.createElement('li');
							liDateDiff.setAttribute('class', 'p-1 col h5 shadow text-nowrap border-0 rounded-2 text-center fw-lighter');

							testFutDate = testFutDate.toLocaleTimeString('it-IT')
							liFutu.innerHTML = '🆔'+ data[i].id +' ⏰' + testFutDate + ' ' + '📄:'+ data[i].text
							futuresUl.appendChild(liFutu); 

							liDateDiff.innerHTML = '🆔'+ data[i].id +'⌛' +  ' ' + msToTime(defDate)
							let diffUl = document.querySelector("#countList")
							diffUl.appendChild(liDateDiff);

						}

					})
				
					
						function myCheckAlarm() {

							let futuresLi = document.querySelector("#nextList > li")
							let myText = futuresLi.innerHTML.substring(14)
							
							let dToC  = futuresLi.innerText.substring(6);
							
							console.log(myText)

							dToC =  dToC.substring(0,9)
							console.log(dToC)
							
							console.log(dToC)
							let dTo = dToC.split(':')

							let curDateToTest = new Date();
							let dateToTest = new Date()
							
							dateToTest.setHours(dTo[0])
							dateToTest.setMinutes(dTo[1])
							dateToTest.setSeconds(dTo[2])
														
							console.log(dTo[0])

							dateToTest = dateToTest.toLocaleTimeString('it-IT')
							curDateToTest = curDateToTest.toLocaleTimeString('it-IT')

							console.log(curDateToTest)
							console.log(dateToTest)

							if( dateToTest === curDateToTest){

								let dUl = document.querySelector("#countList > li")
								dUl.remove()
								futuresLi.remove()
								let alarmAlert = document.querySelector("#alarmAlert");
								alarmAlert.innerText = myText
								let passedUl = document.querySelector("#passList")
								let liPassed = document.createElement('li');
								liPassed.setAttribute('class', 'p-1 col h5  shadow border-0 rounded-2 text-center fw-lighter');

								let tDates = new Date
								let nowY = tDates.getFullYear()
								let nowMo = tDates.getMonth()
								let nowD = tDates.getDate()

								liPassed.innerHTML = '⏰'+ dateToTest + ' ' + myText
								passedUl.insertBefore(liPassed,passedUl.firstChild);
								let audio = new Audio('public/js/Flute.wav');
								audio.play();
							}

						}

						let check = setInterval(myCheckAlarm, 1000);
						
	

            } else {
                alert.innerHTML = 'wrong time format'
            }
        } else {
            alert.innerHTML = 'You can\'t set an alarm in the past'
        }

    }

})




