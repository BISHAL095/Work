
  const inputs = document.querySelectorAll(".input");

  function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
  }

  function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
  });
  function validateForm() {
       // Get the input value
       var phoneNumber = document.getElementById("phoneNumber").value;

       // Remove any non-digit characters
       phoneNumber = phoneNumber.replace(/\D/g, '');

       // Check if the length is exactly 10 digits and contains only numbers
       if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
         alert("Please enter a valid 10-digit phone number.");
         return false; // Prevent form submission
       }

       return true; // Allow form submission
     }
