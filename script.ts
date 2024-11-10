


function addSkill(): void {
    const skillInput = prompt("Enter a new skill:");
    if (skillInput) {
        const skillList = document.getElementById("skills-list") as HTMLUListElement;
        if (skillList) {
            const newSkill = document.createElement("li");
            newSkill.innerText = skillInput;
            skillList.appendChild(newSkill);
        }
    }
}

// Add event listener to the form
document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    // Type assertion and fixing ID names
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const firstNameElement = document.getElementById("firstName") as HTMLInputElement;
    const lastNameElement = document.getElementById("lastName") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const addressElement = document.getElementById("address") as HTMLInputElement;
    const educationElement = document.querySelector("#education p") as HTMLElement; // Changed to select the editable paragraph
    const experienceElement = document.querySelector("#work-experience p") as HTMLElement; // Changed to select the editable paragraph

    if (profilePictureInput && firstNameElement && lastNameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement) {
        const firstName = firstNameElement.value;
        const lastName = lastNameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.innerText; // Get the innerText from the editable paragraph
        const experience = experienceElement.innerText; // Get the innerText from the editable paragraph

        // Profile picture
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

        // Creating Resume Output
        const resumeOutput = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
        <p><strong>First Name:</strong> <span id= "edit-First Name" class="editable"> ${firstName} </span> </p>
        <p><strong>Last Name:</strong> <span id= "edit-Last Name" class="editable"> ${lastName} </span> </p>
        <p><strong>Email:</strong> <span id= "edit-Email" class="editable"> ${email} </span> </p>
        <p><strong>Phone Number:</strong><span id= "edit-Phone" class="editable"> ${phone} </span> </p>
        <p><strong>Address:</strong> <span id= "edit-Address" class="editable"> ${address} </span> </p>

        <h3>Education</h3>
        <p id= "edit-education" class="editable">${education}</p>

        <h3>Experience</h3>
        <p id= "edit-experience" class="editable">${experience}</p>

        <h3>Skills</h3>
        <ul id="skills-list"></ul>
        `;
        
    
        // Populate skills list
const skillItems = document.querySelectorAll("#skills-list li");
const skillsArray: string[] = [];
skillItems.forEach((item) => {
    // Assert that item is an HTMLLIElement
    const liElement = item as HTMLLIElement;
    skillsArray.push(liElement.innerText);
});

        // Append skills to resume output
        const skillsOutput = skillsArray.map(skill => `<li>${skill}</li>`).join('');
        const finalResumeOutput = resumeOutput.replace('<ul id="skills-list"></ul>', `<ul>${skillsOutput}</ul>`);

        const resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = finalResumeOutput;
        makeEditable();
            
        }
    } else {
        console.error('One or more input elements are missing');
    }
});

function makeEditable(){
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element =>{
        element.addEventListener('click' , function (){
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "" ;
        
        //replace content
        if (currentElement.tagName === "P" || currentElement.tagName === `SPAN`) {
            const input = document.createElement('input')
            input.type = 'text'
            input.value = currentValue
            input.classList.add('editing-input')


            input.addEventListener('blur ' , function (){
        currentElement.textContent = input.value;
        currentElement.style.display = 'inline'
        input.remove()
        })
            currentElement.style.display = 'none'
            currentElement.parentNode?.insertBefore(input, currentElement)
            input.focus()
        }


        })
    })

}