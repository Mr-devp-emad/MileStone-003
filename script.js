var _a;
function addSkill() {
    var skillInput = prompt("Enter a new skill:");
    if (skillInput) {
        var skillList = document.getElementById("skills-list");
        if (skillList) {
            var newSkill = document.createElement("li");
            newSkill.innerText = skillInput;
            skillList.appendChild(newSkill);
        }
    }
}
// Add event listener to the form
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Type assertion and fixing ID names
    var profilePictureInput = document.getElementById("profilePicture");
    var firstNameElement = document.getElementById("firstName");
    var lastNameElement = document.getElementById("lastName");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var addressElement = document.getElementById("address");
    var educationElement = document.querySelector("#education p"); // Changed to select the editable paragraph
    var experienceElement = document.querySelector("#work-experience p"); // Changed to select the editable paragraph
    if (profilePictureInput && firstNameElement && lastNameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement) {
        var firstName = firstNameElement.value;
        var lastName = lastNameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var address = addressElement.value;
        var education = educationElement.innerText; // Get the innerText from the editable paragraph
        var experience = experienceElement.innerText; // Get the innerText from the editable paragraph
        // Profile picture
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
        // Creating Resume Output
        var resumeOutput = "\n        <h2>Resume</h2>\n        ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">") : '', "\n        <p><strong>First Name:</strong> <span id= \"edit-First Name\" class=\"editable\"> ").concat(firstName, " </span> </p>\n        <p><strong>Last Name:</strong> <span id= \"edit-Last Name\" class=\"editable\"> ").concat(lastName, " </span> </p>\n        <p><strong>Email:</strong> <span id= \"edit-Email\" class=\"editable\"> ").concat(email, " </span> </p>\n        <p><strong>Phone Number:</strong><span id= \"edit-Phone\" class=\"editable\"> ").concat(phone, " </span> </p>\n        <p><strong>Address:</strong> <span id= \"edit-Address\" class=\"editable\"> ").concat(address, " </span> </p>\n\n        <h3>Education</h3>\n        <p id= \"edit-education\" class=\"editable\">").concat(education, "</p>\n\n        <h3>Experience</h3>\n        <p id= \"edit-experience\" class=\"editable\">").concat(experience, "</p>\n\n        <h3>Skills</h3>\n        <ul id=\"skills-list\"></ul>\n        ");
        // Populate skills list
        var skillItems = document.querySelectorAll("#skills-list li");
        var skillsArray_1 = [];
        skillItems.forEach(function (item) {
            // Assert that item is an HTMLLIElement
            var liElement = item;
            skillsArray_1.push(liElement.innerText);
        });
        // Append skills to resume output
        var skillsOutput = skillsArray_1.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
        var finalResumeOutput = resumeOutput.replace('<ul id="skills-list"></ul>', "<ul>".concat(skillsOutput, "</ul>"));
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = finalResumeOutput;
            makeEditable();
        }
    }
    else {
        console.error('One or more input elements are missing');
    }
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            //replace content
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur ', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
