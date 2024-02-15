document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get username and password from the form
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Send AJAX request to the server
    axios.post('/login', { username: username, password: password })
        .then(function(response) {
            // Handle successful login (e.g., redirect to another page)
            console.log('Login successful');
            window.location.href = '/dashboard';
        })
        .catch(function(error) {
            // Handle login error (display error message)
            console.error('Login failed:', error.response.data.message);
            alert('Login failed: ' + error.response.data.message);
        });
});