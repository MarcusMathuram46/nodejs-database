//Fetching a list of mentors from the server
fetch('http://localhost:4000/mentors')
    .then(response => response.json())
    .then(mentors => {
        // Do something with the retrieved mentors (e.g., display on the web page)
        console.log(mentors);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
    });

//Sending data to create a new mentor
const mentorData = {
    name: 'New Mentor',
    expertise: 'New Expertise',
    experience: 1,
    email: 'newmentor@example.com'
};

fetch('http://localhost:4000/mentors', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(mentorData)
})
    .then(response => response.json())
    .then(newMentor => {
        // Do something with the newly created mentor (e.g., update the UI)
        console.log('New Mentor:', newMentor);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('Error creating mentor:', error);
    });