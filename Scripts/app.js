
// Variables
var lists = document.getElementById("list");
var input = document.getElementById("userInput");

// An event listener on the whole doc
document.addEventListener('DOMContentLoaded', function () {
  var calendarIcon = document.getElementById('calendar-icon');
  var dateInput = document.getElementById('date');

  // When the calendar icon is clicked, show the date picker and hide the icon
  calendarIcon.addEventListener('click', function () {
    calendarIcon.style.display = 'none'; // Hide the calendar icon
    dateInput.style.display = 'block'; // Show the input field
    dateInput.focus(); // Focus the input to open the date picker
  });

  // When the input loses focus, hide it again and show the icon
  dateInput.addEventListener('blur', function () {
    dateInput.style.display = 'none'; // Hide the input field
    calendarIcon.style.display = 'block'; // Show the calendar icon
  });
});


function add() {
  // An alert if nothing is written in the input field.
  if (input.value == "") {
    Swal.fire({
      title: "Write Something!",
      icon: 'warning',
      customClass: {
        confirmButton: 'custom-confirm-button'
      },
      confirmButtonText: 'OK'
    });
  }

  else {
    var list = document.createElement("li"); //Creating an <li> element
    list.setAttribute("class", "color"); //Setting an attribute on <li>
    list.setAttribute("id", "li"); // Setting an attribute on <li>

    var liPara = document.createElement("p"); //Creating a <p> element
    liPara.setAttribute("id", "li-p"); //Setting an attribute on <p>
    liPara.innerHTML = input.value; //Assigning the <p> a value
    input.value = ""; //Clearing the input field after the content is added to the list

    var liDiv = document.createElement("div"); //Creating a <div> element
    liDiv.setAttribute("id", "liDiv"); //Setting an attribute on <div>

    var deleteBtn = document.createElement("button"); //Creating a Delete button
    deleteBtn.setAttribute("id", "deleteBtn"); // Setting an attribute on the Delete button
    deleteBtn.setAttribute("onclick", "removelist(event)"); // Setting an attribute on the Delete button
    deleteBtn.setAttribute("type", "button"); // Setting an attribute on the Delete button
    deleteBtn.innerHTML = "Delete"; // Adding text in the Delete button

    var editBtn = document.createElement("button"); //Creating an Edit button
    editBtn.setAttribute("type", "button"); // Setting an attribute on the Edit button
    editBtn.setAttribute("onclick", "edit(event)"); // Setting an attribute on the Edit button
    editBtn.setAttribute("id", "editBtn"); // Setting an attribute on the Edit button
    editBtn.innerHTML = "Edit"; // Adding text in the Edit button

    liDiv.appendChild(deleteBtn); // Putting the Delete button in the <div> present in the <li>
    liDiv.appendChild(editBtn); // Putting the Edit button in the <div> present in the <li>
    list.appendChild(liPara); // Putting the <p> in the <li>
    list.appendChild(liDiv); // Putting the <<div> in the <li>
    lists.appendChild(list); //Putting the <li> in the <ul>
  }
}

// A function the delete all the tasks in the list
function dltAll() {
  lists.innerHTML = "";
}

// A function to delete a specific task in the list
function removelist(event) {
  event.target.parentNode.parentNode.remove();
}

// A function to edit the task
async function edit(event) {
  // Target the <p> element inside the clicked <li>
  var listItem = event.target.parentNode.parentNode;
  var listContent = listItem.querySelector('p');  // Target the <p> containing the text

  // Get the current text content of the <p>
  var currentContent = listContent.innerHTML;

  // Open the SweetAlert2 prompt with the current content
  const { value: formValues } = await Swal.fire({
    title: 'Update Post',
    html: `
      <label>
        <strong>Content: </strong><br>
        <input id="swal-input1" class="swal2-input" value="${currentContent}">
      </label>
    `,
    focusConfirm: false,
    preConfirm: () => {
      return [document.getElementById('swal-input1').value];
    },
    customClass: {
      confirmButton: 'custom-confirm-button'
    },
  });

  // If the user submitted new content, update the <p> text
  if (formValues) {
    listContent.innerHTML = formValues[0];  // Update the <p> content with new input

    // Show success alert
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'List has been updated!',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

