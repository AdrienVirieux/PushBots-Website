document.addEventListener('DOMContentLoaded', init, false);
function init(){

    var funcPath = document.getElementById("notif-button").getAttribute("onclick");

    // Change
    function function1() {
        funcPath = "sendNotification1()";
        document.getElementById("notif-button").setAttribute("onclick", funcPath);
    }
    var button = document.getElementById('but1');
    button.addEventListener('click', function1, true);

    // Change
    function function2() {
        funcPath = "sendNotification2()";
        document.getElementById("notif-button").setAttribute("onclick", funcPath);
    }
    var button = document.getElementById('but2');
    button.addEventListener('click', function2, true);

    // Change
    function function3() {
        funcPath = "sendNotification3()";
        document.getElementById("notif-button").setAttribute("onclick", funcPath);
    }
    var button = document.getElementById('but3');
    button.addEventListener('click', function3, true);

    // Change
    function function4() {
        funcPath = "sendNotification4()";
        document.getElementById("notif-button").setAttribute("onclick", funcPath);
    }
    var button = document.getElementById('but4');
    button.addEventListener('click', function4, true);

};

window.onload = init;
