

///////////////////////////////////////     CLOCK    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


document.addEventListener('DOMContentLoaded', function() {
	
	// function to translate ms
	

	
	function msToTime(s) {

	  // Pad to 2 or 3 digits, default is 2
	  function pad(n, z) {
		z = z || 2;
		return ('00' + n).slice(-z);
	  }

	  var ms = s % 1000;
	  s = (s - ms) / 1000;
	  var secs = s % 60;
	  s = (s - secs) / 60;
	  var mins = s % 60;
	  var hrs = (s - mins) / 60;

	  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) ;
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

	let reset = document.querySelector("#reset")
	reset.style.display = "none";
	
	let testDate2 = new Date()	
	let nowH = testDate2.getHours()
    let nowM = testDate2.getMinutes()
    let nowS = testDate2.getSeconds()
	let nowY = testDate2.getFullYear()
    let nowMo = testDate2.getMonth()
    let nowD = testDate2.getDate()

    let now = new Date(nowY, nowMo, nowD, nowH, nowM, nowS, 0)

    // add event listener
    send.addEventListener('click', function (event) {
		
		
		let dli = document.querySelector("#countList > li:nth-child(1)")
		let lui = document.querySelector("#nextList > li:nth-child(1)")
		let futuresUl = document.querySelector("#nextList")
		let passUl = document.querySelector("#passList")
		let diffUl = document.querySelector("#countList")
		
		// init lists	
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
		
		if(hIn.value===undefined){hIn.value=0}
		if(mIn.value===undefined){mIn.value=0}
		if(sIn.value===undefined){sIn.value=0}
		(hIn.value.toString().length < 2) ? hIn.value = '0' + hIn.value.toString() : hIn.value = hIn.value.toString();
        (mIn.value.toString().length < 2) ? mIn.value = '0' + mIn.value.toString() : mIn.value = mIn.value.toString();
        (sIn.value.toString().length < 2) ? sIn.value = '0' + sIn.value.toString() : sIn.value = sIn.value.toString();
		let stringDates = hIn.value +':'+ mIn.value +':'+ sIn.value
		let valData = stringDates.match(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm);
		console.log(valData)

        let dat1 = new Date(nowY, nowMo, nowD, hIn.value, mIn.value, sIn.value, 0)
		
		
        if (dat1 > now) {
            if (valData) {

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
						console.log('<-passed')

							// passed alarms
							for(let i=0;i<data.length;i++){
								let liPass = document.createElement('li');
								liPass.setAttribute('class', 'p-1 col h5  shadow border-0 rounded-2 text-center fw-lighter');
								let myPassDate = data[i].time
								liPass.innerText = '🆔'+ data[i].id +' ⏰' + myPassDate + ' ' + '📄:'+data[i].text
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
							console.log(data)
							for(let i=0;i<data.length;i++){

								let liFutu = document.createElement('li');
								liFutu.setAttribute('class', 'p-1 col h5 shadow border-0 rounded-2 text-center fw-lighter');

								console.log(data[i].time)
								let efDate = data[i].time.split(':')

								let testNowDate = new Date()
								let testFutDate = new Date()
								testFutDate.setHours(parseInt(efDate[0]))
								testFutDate.setMinutes(parseInt(efDate[1]))
								testFutDate.setSeconds(parseInt(efDate[2]))

								let defDate = testFutDate - testNowDate 

								let liDateDiff = document.createElement('li');
								liDateDiff.setAttribute('class', 'p-1 col h5 shadow text-nowrap border-0 rounded-2 text-center fw-lighter');

								testFutDate = testFutDate.toLocaleTimeString('it-IT')
								liFutu.innerText = '🆔'+ data[i].id +' ⏰' + testFutDate + ' ' + '📄:'+ data[i].text
								lui = liFutu
								futuresUl.appendChild(lui); 
								liDateDiff.innerHTML = '🆔'+ data[i].id +'⌛' +  ' ' + msToTime(defDate)
								dli = liDateDiff
								diffUl.appendChild(dli);
							}

							function myCheckAlarm() {

								let dli2 = document.querySelector("#countList > li:nth-child(1)")
								let lui2 = document.querySelector("#nextList > li:nth-child(1)")

								let myText = lui2.innerText.substring(14)

								let dToC  = lui2.innerText;

								var test = dToC.match(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm);

								let dTo = test[0].split(':')
								console.log(dTo)

								let curDateToTest = new Date();
								let dateToTest = new Date()

								dateToTest.setHours(parseInt(dTo[0]))
								dateToTest.setMinutes(parseInt(dTo[1]))
								dateToTest.setSeconds(parseInt(dTo[2]))

								dateToTest = dateToTest.toLocaleTimeString('it-IT')
								curDateToTest = curDateToTest.toLocaleTimeString('it-IT')

								if( dateToTest === curDateToTest){

									let alarmAlert = document.querySelector("#alarmAlert");
									alarmAlert.innerText = myText
									let liPassed = document.createElement('li');
									liPassed.setAttribute('class', 'p-1 col h5  shadow border-0 rounded-2 text-center fw-lighter');

									liPassed.innerHTML = '⏰'+ dateToTest + ' ' + myText
									passUl.insertBefore(liPassed,passUl.firstChild);

									let audio = new Audio('public/js/Flute.wav');
									audio.play();
									send.disabled = true;
									reset.style.display = "block";
									dli2.remove()
									lui2.remove()
								}
							}
							let check = setInterval(myCheckAlarm, 1000);
				})
								
			} else {
        		alert.innerHTML = 'wrong time format'
    		}

		} else {
      		alert.innerHTML = 'You can\'t set an alarm in the past'
   		}
		
	event.preventDefault();
	}, false)	// <--- sendins
		
})



