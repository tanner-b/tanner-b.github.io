var currentEvent = startHacking;

var events = [
  trudeauComesToTown,
  freeBubbleTea,
  firstNightDinner,
  shopifyFreeShirts,
  yourComputerDies
]

function updateEventText() {
  document.getElementById('descriptionText').innerHTML = currentEvent.title;
  events = events.filter(function(event) {
    return event.id !== currentEvent.id;
  });
  currentEvent = events[Math.floor(Math.random()*events.length)] // get random event
}
