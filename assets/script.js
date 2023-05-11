// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.




$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //


    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.

 // Get the array of working hours from the container element
var workingHours = $(".container-lg").data("hours").split(",");

  for (var i = 0; i < workingHours.length ; i++) {
    var timeBlockEl = $("<div>").addClass("row time-block").attr("id", "hour-" + i);
    var hourEl = $("<div>").addClass("col-sm-1 hour").text(workingHours[i]);
    var textAreaEl = $("<textarea>").addClass("col-sm-10 description").attr("id", "text" + i);
    var saveBtnEl = $("<button>").addClass("col-sm-1 saveBtn").html("<i class='fas fa-save'></i>");

    timeBlockEl.append(hourEl, textAreaEl, saveBtnEl);
    $(".container-lg").append(timeBlockEl);
  }


// Get the current time
var currentTime = dayjs().hour();

// Loop through each time-block element
$(".time-block").each(function() {
  // Get the time associated with the time-block
  var blockTime = parseInt($(this).attr("id").split("-")[1]);
console.log(blockTime + "  " + currentTime);
  // Check if the block time is in the past, present, or future
  if (blockTime < currentTime) {
    $(this).addClass("past");
  } else if (blockTime === currentTime) {
    $(this).addClass("present");
  } else {
    $(this).addClass("future");
  }

  // Get the corresponding textarea element
  var textArea = $(this).children(".description");

  // Get the saved user input from localStorage
  var savedInput = localStorage.getItem($(this).attr("id"));

  // Set the value of the textarea to the saved input, if it exists
  if (savedInput !== null) {
    textArea.val(savedInput);
  }
});

// Display the current date in the header of the page
var currentDate = dayjs().format("dddd, MMMM D, YYYY");
$("#currentDay").text(currentDate);

// Add a listener for click events on the save button
$(".saveBtn").on("click", function() {
  // Get the key for the saved input from the containing time-block's id
  var key = $(this).parent().attr("id");

  // Get the value of the user input from the corresponding textarea element
  var value = $(this).siblings(".description").val();

  // Save the user input in localStorage using the key-value pair
  localStorage.setItem(key, value);
});

});



  