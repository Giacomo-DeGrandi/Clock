<?php


require_once('php/model/Model.php');
require_once('php/model/Alarm.php');
include('php/end.php') ;


ob_start();

?>
<div class="container-fluid">
    <div class="d-flex flex-column align-items-center justify-content-center">

        <!--  CLOCK  -->
        <div class="display-1 bg-coffee p-1 w-100 shadow-sm fw-bolder text-center mt-3 rounded-1">Clock</div>

        <div id="clock" class="display-1 py-5 bg-eerie fw-bold w-75 text-center mb-2 mt-2 rounded-1">
        </div>

        <!--    TIMER   -->
        <div class="display-1 bg-coffee p-1 w-100 shadow-sm fw-bolder text-center mt-5 rounded-1">
            Timer
        </div>

        <!-- H M S MS   &&   INPUTS --->
        <table id="timer" class="text-center text-nowrap shadow-sm w-75 mt-2">

            <!-- H M S MS &&  BUTTONS START STOP --->
            <tr class="d-flex flex-row display-1 p-5 bg-eerie shadow rounded-1">

                <th class="col bg-raisin shadow-sm p-2">
                    <h1>hour</h1>
                    <p id="tHou">00</p>
                    <button type="submit" class="btn btn-circle text-center btn-outline-light shadow-sm" name="plusH" value="+1">
                        +
                    </button>
                    <button type="submit" class="btn btn-circle text-center btn-outline-light shadow-sm" name="minusH" value="-1">
                        -
                    </button>
                </th>

                <th class="col bg-raisin shadow-sm p-2">
                    <h1>min</h1>
                    <p id="tMin">00</p>
                    <button type="submit" class="btn btn-circle text-center btn-outline-light shadow-sm" name="plusM" value="+1">
                        +
                    </button>
                    <button type="submit" class="btn btn-circle text-center btn-outline-light shadow-sm" name="minusM" value="-1">
                        -
                    </button>
                </th>

                <th class="col bg-raisin shadow-sm p-2">
                    <h1>sec</h1>
                    <p id="tSec">00</p>
                    <button type="button" class="btn btn-circle text-center btn-outline-light shadow-sm" name="plusS" value="+1">
                        +
                    </button>
                    <button type="submit" class="btn btn-circle text-center btn-outline-light rounded-4 shadow-sm" name="minusS" value="-1">
                        -
                    </button>
                </th>

                <!-- BUTTONS START STOP --->
                <th class="col shadow-sm p-2">
                    <div class="d-flex flex-column align-items-center justify-content-center shadow-sm">
                        <button type="submit" class="btn text-center btn-outline-info shadow-sm w-100 mt-5" name="start" value="+1">
                            start
                        </button>
                        <button type="submit" class="btn text-center btn-outline-danger shadow-sm w-100 mt-2" name="stop" value="-1">
                            stop
                        </button>
                    </div>
                </th>

            </tr>

            <!-- INPUTS  -->
            <tr class="d-flex flex-row display-1 mx-3 mb-2">
                <td class="d-flex flex-column align-items-center justify-content-center h3 w-100 mx-5 p-2">
                    <h5 class="text-white bg-eerie border-light rounded-1">set timer</h5>
                    <div class="row w-100">
                        <input type="number" name="hourIn" class="small p-2 mt-1" placeholder=" hours"><br>
                        <input type="number" name="minIn" class="small p-2 mt-1" placeholder=" minutes"><br>
                        <input type="number" name="secIn" class="small p-2 mt-1" placeholder=" seconds"><br>
                    </div>
                    <button type="submit" class="btn text-center btn-outline-info shadow-sm w-50 mt-2" name="setTimer" value="+">
                        set
                    </button>
                </td>
            </tr>

        </table>


        <!--   CHRONO   -->
        <div class="display-1 bg-coffee p-1 w-100 shadow-sm fw-bolder text-center mt-3 rounded-1">
            Chrono
        </div>

        <div id="chrono" class="d-flex flex-column align-items-center justify-content-center w-75">

            <!--  H  M  S  MS  --->
            <table class="text-center text-nowrap bg-raisin shadow-sm mt-2 p-5 w-75">
                <tr class="display-1 bg-eerie rounded-1 p-2">

                    <th class="shadow-sm p-2 w-25">
                        <h1>hour</h1>
                        <p id="cHou">00</p>
                    </th>

                    <th class="shadow-sm p-2 w-25">
                        <h1>min</h1>
                        <p id="cMin">00</p>
                    </th>

                    <th class="shadow-sm p-2 w-25">
                        <h1>sec</h1>
                        <p id="cSec">00</p>
                    </th>

                    <th class="shadow-sm p-2 w-25">
                        <h1>msec</h1>
                        <p id="cMsec">00</p>
                    </th>

                </tr>
            </table>

            <!-- BUTTONS --->
            <div class="d-flex flex-row align-items-center justify-content-center display-1 w-75">
                <div class="d-flex justify-content-between align-items-center shadow-sm bg-eerie display-5 p-4 mt-2 rounded-1">

                    <div class="p-3">
                        <button type="submit" class="btn text-center btn-outline-info shadow-sm p-3" name="startStop" value="start">
                            start/stop
                        </button>
                    </div>

                    <div class="p-3">
                        <button type="submit" class="btn text-center btn-outline-warning shadow-sm p-3" name="round" value="round">
                            round
                        </button>
                    </div>

                    <div class="p-3">
                        <button type="submit" class="btn text-center btn-outline-danger shadow-sm p-3" name="reset" value="reset">
                            reset
                        </button>
                    </div>

                </div>
            </div>

            <!-- TIMES ROUNDS -->
            <div class="row text-center text-nowrap bg-coffee shadow-sm mt-2 p-5">

                <div class="col">
                    <h1 class="p-2">Times</h1>
                    <ul id="roundList">

                    </ul>
                </div>

                <div class="col">
                    <h1 class="p-2">Rounds</h1>
                    <ul id="timesList">

                    </ul>
                </div>

            </div>

        </div>


        <!--  ALARM  -->
        <div class="display-1 bg-coffee p-2 w-100 shadow-sm fw-bolder text-center mt-5">
            Alarm
        </div>

        <!-- ALARM CLOCK -->
        <div id="clockAlarm" class="display-3 py-5 p-5 bg-eerie fw-bold text-center mb-2 mt-2 w-75">
        </div>

        <!-- INPUTS -->
        <table id="Alarm" class="text-center text-nowrap shadow-sm mt-2">
            <tr class="d-flex flex-column align-items-center justify-content-center">
                <td class="display-5 p-2">
                    <h5 class="text-white bg-eerie">set alarm</h5>
                    <div class="d-flex flex-row">
                        <input type="number" class="w-75 text-center" name="hourInAlarm" placeholder="hour" value="12">
                        <p class="px-2">:</p>
                        <input type="number" class="w-75 text-center" name="minInAlarm" placeholder=" min" value="0">
                        <p class="px-2">:</p>
                        <input type="number" class="w-75 text-center" name="secInAlarm" placeholder=" sec" value="0">
                    </div>
                    <textarea name="textInAlarm" class="h3 text-center p-2 mt-2 w-100" placeholder="insert your text here to set the alarm" rows="5" cols="10"></textarea><br>
                    <button type="submit" class="btn text-center w-50 btn-outline-primary shadow-sm p-3 mt-2" name="setTimer" value="+">
                        set
                    </button>
                </td>
            </tr>
        </table>

        <h4 class="text-white bg-eerie" id="alert"></h4>


		<div class="d-flex flex-row text-center display-3 bg-eerie shadow-sm mt-2" id="alarmAlert">

        </div>
		
        <!-- ALARMS DASHBOARD  -->
        <div class="d-flex flex-row text-center bg-eerie shadow-sm mt-2">

            <div class="p-2 bg-coffee mt-1">
                <h3 class="p-2 mx-2 text-nowrap text-warning">Time To</h3>
                <ul id="countList" class="text-center">

                </ul>
            </div>

            <div class="p-2 bg-coffee mt-1">
                <h3 class="p-2 mx-2 text-info">Next</h3>
                <ul id="nextList" class="text-center">
					<li id="firstFutLi">
						
					</li>
					<li id="secondFutLi">
						
					</li>
                </ul>
            </div>

            <div class="p-2 bg-coffee mt-1">
                <h3 class="p-2 text-danger">Passed</h3>
                <ul id="passList" class="text-center">

                </ul>
            </div>

        </div>

    </div>

</div>
<?php

$main = ob_get_clean();

require_once('php/view/main.php');
