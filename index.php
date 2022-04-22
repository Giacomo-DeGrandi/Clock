<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="style.css">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous">
    <script src="clock.js" type="application/javascript"></script>
    <script async src="timer.js" type="application/javascript"></script>
    <script src="chrono.js" type="application/javascript"></script>
    <script src="alarm.js" type="application/javascript"></script>
    <title>CLOCK</title>
</head>
<body>
<header >
</header>
<main>
    <div class="container-fluid">
        <div class="d-flex flex-column align-items-center justify-content-center">


            <div class="display-1 bg-eerie p-1 w-75 shadow-sm text-center mt-3 border border-light rounded-1">current time</div>

            <div id="clock" class="display-1 py-5 bg-eerie fw-bold w-75 text-center mb-2 mt-4 border border-light rounded-1">
            </div>


            <div class="display-1 bg-eerie p-1 w-75 shadow-sm text-center mt-3 border border-light rounded-1">timer</div>

                <table id="timer" class="text-center text-nowrap shadow-sm w-75 mt-2">
                    <tr class="d-flex flex-row display-1 p-5 bg-eerie  border border-light rounded-1">
                        <th class="col border border border-light rounded-1 shadow-sm p-2">
                            <h1>hour</h1>
                            <p id="tHou">00</p>
                            <button type="submit" class="btn btn-circle text-center btn-outline-light shadow-sm" name="plusH" value="+1">
                                +
                            </button>
                            <button type="submit" class="btn btn-circle text-center btn-outline-light shadow-sm" name="minusH" value="-1">
                                -
                            </button>
                        </th>
                        <th class="col border border-light shadow-sm p-2 border border-light rounded-1">
                            <h1>min</h1>
                            <p id="tMin">00</p>
                            <button type="submit" class="btn btn-circle text-center btn-outline-light shadow-sm" name="plusM" value="+1">
                                +
                            </button>
                            <button type="submit" class="btn btn-circle text-center btn-outline-light shadow-sm" name="minusM" value="-1">
                                -
                            </button>
                        </th>
                        <th class="col border border-light shadow-sm p-2 border border-light rounded-1">
                            <h1>sec</h1>
                            <p id="tSec">00</p>
                            <button type="button" class="btn btn-circle text-center btn-outline-light shadow-sm" name="plusS" value="+1">
                                +
                            </button>
                            <button type="submit" class="btn btn-circle text-center btn-outline-light rounded-4 shadow-sm" name="minusS" value="-1">
                                -
                            </button>
                        </th>
                        <th class="col border border-light shadow-sm p-2">
                            <div class="d-flex flex-column shadow-sm bg-eerie">
                                <button type="submit" class="btn text-center btn-outline-primary shadow-sm p-3 mt-5" name="start" value="+1">
                                    start
                                </button>
                                <button type="submit" class="btn text-center btn-outline-danger shadow-sm p-3 mt-2" name="stop" value="-1">
                                    stop
                                </button>
                            </div>
                        </th>
                    </tr>
                    <tr class="d-flex flex-row display-1 mx-3 mb-2">
                        <td class="d-flex flex-column h3 w-100 mx-5 p-2">
                            <h5 class="text-white bg-eerie border border-light rounded-1">set timer</h5>
                            <div class="row">
                                <input type="number" name="hourIn" class="small p-2" placeholder=" hours"><br>
                                <input type="number" name="minIn" class="small p-2" placeholder=" minutes"><br>
                                <input type="number" name="secIn" class="small p-2" placeholder=" seconds"><br>
                                <button type="submit" class="btn text-center btn-outline-primary shadow-sm p-3 mt-2" name="setTimer" value="+">
                                    set
                                </button>
                            </div>
                        </td>
                    </tr>
                </table>


            <div class="display-1 bg-eerie p-1 shadow-sm text-center mt-3 border border-light rounded-1">chrono</div>

            <div id="chrono" class="w-100 d-flex flex-column align-items-center justify-content-center">

                <table class="text-center text-nowrap bg-eerie shadow-sm mt-2 p-5 w-75 border border-light rounded-1">
                    <tr class="display-1 border border-light rounded-1">
                        <th class="border border-light rounded-1 shadow-sm p-2 w-25">
                            <h1>hour</h1>
                            <p id="cHou">00</p>
                        </th>
                        <th class="border border-light rounded-1 shadow-sm p-2 w-25">
                            <h1>min</h1>
                            <p id="cMin">00</p>
                        </th>
                        <th class="border border-light rounded-1 shadow-sm p-2 w-25">
                            <h1>sec</h1>
                            <p id="cSec">00</p>
                        </th>
                        <th class="border border-light rounded-1 shadow-sm p-2 w-25">
                            <h1>msec</h1>
                            <p id="cMsec">00</p>
                        </th>
                    </tr>
                </table>

                <div class="d-flex flex-row display-1">
                        <div class="d-flex justify-content-between align-items-center shadow-sm bg-eerie display-5 p-4 mt-2 border border-light rounded-1">

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

                <div class="d-flex flex-row text-center text-nowrap bg-eerie shadow-sm mt-2 p-5 border border-light rounded-1">

                    <div class="col w-50">
                        <h1 class="p-2">Times</h1>
                        <ul id="roundList" class="text-center">

                        </ul>
                    </div>

                    <div class="col w-50">
                        <h1 class="p-2 mx-2">Rounds</h1>
                        <ul id="timesList" class="text-center">

                        </ul>
                    </div>

                </div>

            </div>


            <div id="alarm">
            </div>

        </div>
    </div>


</main>

<footer class=" p-5">
    <span class="p-5">
      <a class="link-info" href="https://github.com/Giacomo-DeGrandi" >my github</a>
    </span>
</footer>

</html>