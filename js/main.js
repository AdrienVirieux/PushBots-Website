
// Live time and date
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

setInterval(getTime,500);


// get new notification
// Source : https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_template
function showContent() {
    var timeNotif = document.getElementById("Ehours").value + ":" + document.getElementById("Eminutes").value + ":" + document.getElementById("Eseconds").value;
    var temp = document.getElementsByTagName("template")[0];


    var clon = temp.content.cloneNode(true);
    document.getElementById("notif-box").appendChild(clon);

    var newId = guidGenerator();
    document.getElementById("notif-time").id = newId;
    document.getElementById(newId).textContent = timeNotif;


    cookieDoe(newId, timeNotif, document.getElementById("Edesc").value);
}


// generate random id
// Source : https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4());
}

var TabId = [];
var TabTime = [];
var TabDesc = [];
// cookie
function cookieDoe(id, time, desc) {
    TabId.push(id);
    TabTime.push(time);
    TabDesc.push(desc);
}




function check() {
    var d = new Date();

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();

    var time = hours + ":" + minutes + ":" + seconds;
    for (var i = 0; i < TabTime.length; ++i) {
        if (TabTime[i] == time) {
            sendNotification(TabDesc[i]);
        } 
    }
}
setInterval(check,500);
