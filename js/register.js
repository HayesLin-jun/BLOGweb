// Registration form validation logic
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    let isValid = true;

    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate username (at least 3 characters)
    if (username.length < 3) {
        showError('usernameError', 'Username must be at least 3 characters');
        isValid = false;
    } else {
        hideError('usernameError');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email');
        isValid = false;
    } else {
        hideError('emailError');
    }

    // Validate password (at least 6 characters)
    if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters');
        isValid = false;
    } else {
        hideError('passwordError');
    }

    // Validate password consistency
    if (password !== confirmPassword) {
        showError('confirmError', 'Passwords do not match');
        isValid = false;
    } else {
        hideError('confirmError');
    }

    // If validation passes: simulate successful registration
    if (isValid) {
        // Simulate backend storage (replace with API request in real project)
        const userData = { username, email, password };
        localStorage.setItem('registeredUser', JSON.stringify(userData));
        
        // Show success message and redirect to login page
        alert('Registration successful! Please login.');
        window.location.href = 'login.html';
    }
});

// Display error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

// Hide error message
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = '';
}