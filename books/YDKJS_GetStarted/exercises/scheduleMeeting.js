const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime, durationInMinutes) {
  // get time to meet, this value after split are strings
  const [hourStart, minsStart] = dayStart.split(":");
  const [hoursEnd, minsEnd] = dayEnd.split(":");
  const [hourStartMeet, minsStartMeet] = startTime.split(":");

  // using reconvertion in JS transform string in number when multyply by 60
  // and convert the minutes using >>> operator to calculate the range available
  // determinated by two dates in a number
  const timeToStart = hourStart * 60 + (minsStart >>> 0);
  const timeToEnd = hoursEnd * 60 + (minsEnd >>> 0);

  // get total duration for the meet, using a reconvertion in JS from strings to
  // numbers and sum the duration in minutes
  const meetingTime =
    hourStartMeet * 60 + (minsStartMeet >>> 0) + durationInMinutes;

  // compare the time is a valid number between start day and end day
  return meetingTime >= timeToStart && meetingTime <= timeToEnd;
}

console.log(scheduleMeeting("7:30", 30)); // true
console.log(scheduleMeeting("11:30", 60)); // true
console.log(scheduleMeeting("17:00", 45)); // true
console.log(scheduleMeeting("7:00", 15)); // false
console.log(scheduleMeeting("17:30", 30)); // false
console.log(scheduleMeeting("18:00", 15)); // false
