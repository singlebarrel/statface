import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as simpleHRM from "./simple/hrm";
import * as simpleActivity from "./simple/activity";

let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
let monthsShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const txtTime = document.getElementById("txtTime");
const txtDate = document.getElementById("txtDate");
const txtHRM = document.getElementById("txtHRM");
const txtSteps = document.getElementById("txtSteps");
const txtCalories = document.getElementById("txtCalories");
const txtDistance = document.getElementById("txtDistance");
const txtFloors = document.getElementById("txtFloors");
const txtActiveMinutes = document.getElementById("txtActiveMinutes");
const txtChargeLevel = document.getElementById("txtChargeLevel");

// const statsCycle = document.getElementById("stats-cycle");
// const statsCycleItems = statsCycle.getElementsByClassName("cycle-item");

/* ------- ACTIVITY --------- */
function activityCallback(data) {
  
  txtSteps.text = data.steps.pretty;
  txtCalories.text = data.calories.pretty;
  txtDistance.text = data.distance.pretty;
  txtFloors.text = data.elevationGain.pretty;
  txtActiveMinutes.text = data.activeMinutes.pretty;
  txtChargeLevel.text = data.chargeLevel.pretty
}
simpleActivity.initialize("seconds", activityCallback);


/* -------- HRM ------------- */
function hrmCallback(data) {
  txtHRM.text = `${data.bpm}`;
/*  if (data.zone === "out-of-range") {
    imgHRM.href = "images/heart_open.png";
  } else {
    imgHRM.href = "images/heart_solid.png";
  }
  if (data.bpm !== "--") {
    iconHRM.animate("highlight");
  }
  */
}
simpleHRM.initialize(hrmCallback);


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  txtTime.text = `${hours}:${mins}`;

  let monthNameShort = monthsShort[today.getMonth()];
  let dayNumber = util.zeroPad(today.getDate());

  txtDate.text = `${monthNameShort} ${dayNumber}`;
}
