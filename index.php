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
    <script src="https://code.jquery.com/jquery-3.6.0.js"
            integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
            crossorigin="anonymous"></script>
    <script src="clock.js"></script>
    <script async src="timer.js"></script>
    <script async src="chrono.js"></script>
    <title>CLOCK</title>
</head>
<body>
<header >
</header>
<main>
    <div class="container-fluid">
        <div class="d-flex flex-column align-items-center justify-content-center">


            <div class="display-1 bg-light p-1 w-75 shadow-sm text-center mt-3">Current Time</div>

            <div id="clock" class="display-1 py-5 bg-light fw-bold shadow-sm w-75 text-center mb-2 mt-4">
            </div>


            <div class="display-1 bg-light p-1 w-75 shadow-sm text-center mt-3">Timer</div>

                <table id="timer" class="text-center text-nowrap bg-light shadow-sm w-75 mt-2">
                    <tr class="d-flex flex-row display-1 p-5">
                        <th class="col border border-light shadow-sm p-2">
                            <h1>hour</h1>
                            <p id="tHou">00</p>
                            <button type="submit" class="btn text-center btn-dark shadow-sm" name="plusH" value="+1">
                                +
                            </button>
                            <button type="submit" class="btn text-center btn-dark shadow-sm" name="minusH" value="-1">
                                -
                            </button>
                        </th>
                        <th class="col border border-light shadow-sm p-2 ">
                            <h1>min</h1>
                            <p id="tMin">00</p>
                            <button type="submit" class="btn text-center btn-dark shadow-sm" name="plusM" value="+1">
                                +
                            </button>
                            <button type="submit" class="btn text-center btn-dark shadow-sm" name="minusM" value="-1">
                                -
                            </button>
                        </th>
                        <th class="col border border-light shadow-sm p-2 ">
                            <h1>sec</h1>
                            <p id="tSec">00</p>
                            <button type="button" class="btn text-center btn-dark shadow-sm" name="plusS" value="+1">
                                +
                            </button>
                            <button type="submit" class="btn text-center btn-dark shadow-sm" name="minusS" value="-1">
                                -
                            </button>
                        </th>
                        <th class="col border border-light shadow-sm p-2 ">
                            <div class="d-flex flex-column shadow-sm bg-light">
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
                        <td class="d-flex flex-column display-5 w-100 mx-5 p-2">
                            <h5 class="text-muted">Set here the time</h5>
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


            <div class="display-1 bg-light p-1 w-75 shadow-sm text-center mt-3">Chrono</div>

            <div id="chrono">
                div
                <table class="text-center text-nowrap bg-light shadow-sm w-75 mt-2">
                    <tr class="d-flex flex-row display-1 p-5">
                        <th class="col border border-light shadow-sm p-2">
                            <h1>hour</h1>
                            <p id="cHou">00</p>
                        </th>
                        <th class="col border border-light shadow-sm p-2">
                            <h1>min</h1>
                            <p id="cMin">00</p>
                        </th>
                        <th class="col border border-light shadow-sm p-2">
                            <h1>sec</h1>
                            <p id="cSec">00</p>
                        </th>
                    </tr>
                    <tr class="d-flex flex-row display-1">
                        <td class="d-flex flex-row align-items-center justify-content-center display-5 w-100 mx-5 p-2">
                            <div class="d-flex shadow-sm bg-light">
                                <button type="submit" class="btn text-center btn-outline-dark shadow-sm p-3" name="startStop" value="+1">
                                    start/stop
                                </button>
                                <button type="submit" class="btn text-center btn-outline-dark shadow-sm p-3" name="round" value="-1">
                                    round
                                </button>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>


            <div id="alarm">
            </div>

        </div>
    </div>


</main>

<footer class=" p-5">
    <span class="p-5">
      <a href="https://github.com/Giacomo-DeGrandi" >my github</a>
    </span>
</footer>

</html>