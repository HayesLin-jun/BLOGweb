// Check if user is already logged in (redirect to homepage)
document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        window.location.href = 'index.html';
    }

    // Login form submission logic
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Get form values
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        // Get registered user from localStorage (simulate backend data)
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser')) || null;

        // Validate username existence
        if (!registeredUser || registeredUser.username !== username) {
            showError('loginUserError', 'Username does not exist');
            isValid = false;
        } else {
            hideError('loginUserError');
            // Validate password
            if (registeredUser.password !== password) {
                showError('loginPwdError', 'Incorrect password');
                isValid = false;
            } else {
                hideError('loginPwdError');
            }
        }

        // If validation passes: set login status and redirect
        if (isValid) {
            localStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
            alert('Login successful! Redirecting to homepage...');
            window.location.href = 'index.html';
        }
    });
});

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

// Hide error message
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
}