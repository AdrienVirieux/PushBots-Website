//some default pre init
var PB = PB || {};PB.q = PB.q || [];PB.events = PB.events || [];

//PushBots ApplicationId (required)
PB.app_id = "5ff7ea9307bb72775842c2c2";
//Your domain name, must be HTTPS or localhost  (required)
PB.domain = "https://hungry-johnson-311663.netlify.app";
//Update and uncomment it if you are using custom safari certificate for your app
PB.safari_push_id = "web.com.pushbots.safaripush";
//****************************************

PB.logging_enabled = true;
PB.auto_subscribe = true;

//Custom worker and manifest URL
//PB.worker_url = PB.domain + "/pushbots-worker.js";

//Welcome notification message
PB.welcome = {title:"Welcome ",message:"Thanks for subscribing!", url :PB.domain};

function sendNotification(desc){
      PB.register();
      PB.q.push(["sendNotification", {title:"REMINDER ",message:desc, url :"https://hungry-johnson-311663.netlify.app"}]);
}
