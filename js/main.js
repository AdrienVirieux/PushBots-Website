
// Set the live time in inputs at the beginning
function setTime() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();

    document.getElementById("valueHours").value = hours;
    document.getElementById("valueMinutes").value = minutes;
}

window.onload = setTime;

// ------------------------- //

// Live time and date
// Source : https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function getLiveTime() {
    var d = new Date();
    //Date
    // Source : https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    var year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    var month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    var day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    document.getElementById("date").textContent = day + " " + month + " " + year;

    // Time
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    // add a zero in front of numbers<10
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    document.getElementById("time").textContent = hours + ":" + minutes + ":" + seconds;
}

setInterval(getLiveTime,500);

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
    var desc;
    if (document.getElementById("valueDesc").value.length == 0) {
        desc = "undefine";
    } else {
        desc = document.getElementById("valueDesc").value;
    }
    document.getElementsByClassName("desc-notif")[TabDesc.length].textContent = desc;

    // Get value
    cookie(newId, timeNotif, desc);

    // Add more unique ID
    var newId = idGenerator();
    document.getElementById("notif").id = newId;
    var newId = idGenerator();
    document.getElementById("delete").id = newId;

    // Reset value
    document.getElementById("valueDesc").value = "";
}

// ------------------------- //

//
function showDesc(id) {
    var elem = document.getElementById(id).parentNode.children[1];
    if (elem.value == "show") {
        elem.style.display = "none";
        elem.value = "hide";
    } else {
        elem.style.display = "block";
        elem.value = "show";
    }
}

// Delete the notification
function deleteNotif(id) {
    document.getElementById(id).parentNode.parentNode.parentNode.removeChild(document.getElementById(id).parentNode.parentNode);
    var elem = document.getElementById(id).parentNode.children[0].children[2].id;
    for (var i = 0; i < TabId.length; ++i) {
        if (TabId[i] == elem) {
            TabTime.splice(i, 1);
            TabDesc.splice(i, 1);
            TabId.splice(i, 1);
            break;
        }
    }
}


// ------------------------- //

// Check when live-time and notif-time are equal
function check() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    // add a zero in front of numbers<10
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);

    var time = hours + ":" + minutes + ":" + seconds;
    for (var i = 0; i < TabTime.length; ++i) {
        if (TabTime[i] == time) {
            sendNotification(TabDesc[i]);

            // Delete notification
            var dummy = document.getElementById("notif-box");
            dummy.removeChild(document.getElementById(TabId[i]).parentNode.parentNode.parentNode);

            // Delete values from cookie
            TabTime.splice(i, 1);
            TabDesc.splice(i, 1);
            TabId.splice(i, 1);
        }
    }
}

setInterval(check,500);

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
