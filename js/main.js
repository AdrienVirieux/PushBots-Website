
// All variables
var year;
var month;
var day;
var hours;
var minutes;
var seconds;

// Get time and date
function getTimeDate() {
    var d = new Date();

    //Date
    // Source : https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

    // Time
    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();
    // add a zero in front of numbers<10
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
}

// Source : https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// ------------------------- //

// Cookies
// Create arraws for notification
var TabId = [];
var TabTime = [];
var TabDesc = [];

// Put values in arraws
function cookie(id, time, desc) {
    TabId.push(id);
    TabTime.push(time);
    TabDesc.push(desc);
}

// ------------------------- //
// ------------------------- //

// Show live time and date
function showLiveTime() {
    getTimeDate();
    document.getElementById("date").textContent = day + " " + month + " " + year;
    document.getElementById("time").textContent = hours + ":" + minutes + ":" + seconds;
}
setInterval(showLiveTime,500);

// Set the live time in inputs at the beginning
function setTime() {
    getTimeDate();
    document.getElementById("valueHours").value = hours;
    document.getElementById("valueMinutes").value = minutes;
}

window.onload = setTime;

// ------------------------- //

// Generate random id
// Source : https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function idGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4());
}

// Get value for notification
// Source : https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_template
function createNotif() {
    // Get time from inputs
    var hours = document.getElementById("valueHours").value;
    var minutes = document.getElementById("valueMinutes").value;
    var seconds = document.getElementById("valueSeconds").value;
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);

    var timeNotif = hours + ":" + minutes + ":" + seconds;
    var newId = idGenerator();

    // Create notif
    var cloneNotif = document.getElementsByTagName("template")[0].content.cloneNode(true);
    document.getElementById("notif-box").appendChild(cloneNotif);
    document.getElementById("templateSpan").id = newId;
    document.getElementById(newId).textContent = timeNotif;

    var desc = document.getElementById("valueDesc").value;
    if (document.getElementById("valueDesc").value.length == 0) {
        desc = "undefine";
    }
    document.getElementsByClassName("desc-notif")[TabDesc.length].textContent = desc;

    // Get value into cookie
    cookie(newId, timeNotif, desc);

    // Reset value
    document.getElementById("valueDesc").value = "";
}

// ------------------------- //

// Show / Hide description
function showDesc(elem) {
    var descValue = elem.children[1];
    if (descValue.value == "show") {
        descValue.style.display = "none";
        descValue.value = "hide";
    } else {
        descValue.style.display = "block";
        descValue.value = "show";
    }
}

// Delete the notification
function deleteNotif(elem) {
    for (var i = 0; i < TabId.length; ++i) {
        if (TabId[i] == elem.parentNode.children[0].children[1].id) {
            // Delete values from cookie
            TabId.splice(i, 1);
            TabTime.splice(i, 1);
            TabDesc.splice(i, 1);
            break;
        }
    }
    // Delete notification
    elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
}

// ------------------------- //

// Check when live-time and notif-time are equal
function checkLiveNotif() {
    getTimeDate();
    var time = hours + ":" + minutes + ":" + seconds;
    for (var i = 0; i < TabTime.length; ++i) {
        if (TabTime[i] == time) {
            sendNotification(TabDesc[i]);

            // Delete notification
            document.getElementById("notif-box").removeChild(document.getElementById(TabId[i]).parentNode.parentNode.parentNode);

            // Delete values from cookie
            TabId.splice(i, 1);
            TabTime.splice(i, 1);
            TabDesc.splice(i, 1);
        }
    }
}

setInterval(checkLiveNotif, 250);
