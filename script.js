document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    const resumeSection = document.getElementById('resume');
    const downloadBtn = document.getElementById('downloadBtn');
    const resumeUrlInput = document.getElementById('resumeUrl');

    function addField(containerId, inputType, placeholder) {
        const container = document.getElementById(containerId);
        const input = document.createElement(inputType);
        input.placeholder = placeholder;
        container.appendChild(input);
    }

    window.addEducationField = () => {
        addField('education-fields', 'textarea', 'List additional education');
    };

    window.addSkillsField = () => {
        addField('skills-fields', 'textarea', 'List additional skills');
    };

    window.addExperienceField = () => {
        addField('experience-fields', 'textarea', 'Describe additional work experience');
    };

    window.addProjectField = () => {
        const container = document.getElementById('project-fields');
        const projectName = document.createElement('input');
        projectName.type = 'text';
        projectName.name = 'projectName';
        projectName.placeholder = 'Project Name';
        container.appendChild(projectName);
        
        const projectURL = document.createElement('input');
        projectURL.type = 'url';
        projectURL.name = 'projectURL';
        projectURL.placeholder = 'Project URL';
        container.appendChild(projectURL);
    };

    function generateShareableUrl() {
        // Collect form data
        const formData = new FormData(resumeForm);
        let queryString = '?';
        formData.forEach((value, key) => {
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
        });
        // Remove the trailing '&' from queryString
        queryString = queryString.slice(0, -1);
        return `${window.location.origin}${window.location.pathname}${queryString}`;
    }

    resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Display resume data
        document.getElementById('display-name').innerText = document.getElementById('name').value;
        document.getElementById('display-contact').innerText = `${document.getElementById('email').value}, ${document.getElementById('phone').value}`;
        
        const educationList = document.getElementById('display-education');
        educationList.innerHTML = '';
        document.querySelectorAll('#education-fields textarea').forEach(textarea => {
            if (textarea.value.trim()) {
                const li = document.createElement('li');
                li.innerText = textarea.value.trim();
                educationList.appendChild(li);
            }
        });

        const skillsList = document.getElementById('display-skills');
        skillsList.innerHTML = '';
        document.querySelectorAll('#skills-fields textarea').forEach(textarea => {
            if (textarea.value.trim()) {
                const li = document.createElement('li');
                li.innerText = textarea.value.trim();
                skillsList.appendChild(li);
            }
        });

        const experienceList = document.getElementById('display-experience');
        experienceList.innerHTML = '';
        document.querySelectorAll('#experience-fields textarea').forEach(textarea => {
            if (textarea.value.trim()) {
                const li = document.createElement('li');
                li.innerText = textarea.value.trim();
                experienceList.appendChild(li);
            }
        });

        const projectsList = document.getElementById('display-projects');
        projectsList.innerHTML = '';
        const projectFields = document.querySelectorAll('#project-fields input');
        for (let i = 0; i < projectFields.length; i += 2) {
            if (projectFields[i].value.trim() && projectFields[i + 1].value.trim()) {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${projectFields[i + 1].value.trim()}" target="_blank">${projectFields[i].value.trim()}</a>`;
                projectsList.appendChild(li);
            }
        }

        // Handle profile picture
        const profileImage = document.getElementById('profile-image');
        const fileInput = document.getElementById('profilePicture');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }

        // Generate and display shareable URL
        const shareableUrl = generateShareableUrl();
        resumeUrlInput.value = shareableUrl;
    });

    downloadBtn.addEventListener('click', () => {
        html2pdf().from(resumeSection).save('resume.pdf');
    });

    window.copyUrl = () => {
        resumeUrlInput.select();
        document.execCommand('copy');
        alert('URL copied to clipboard');
    };
});
