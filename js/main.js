
// Source : https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getTime() {
    var d = new Date();

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    // add a zero in front of numbers<10
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    document.getElementById("time").textContent = hours + ":" + minutes + ":" + seconds;
}

setInterval(getTime,1000);
