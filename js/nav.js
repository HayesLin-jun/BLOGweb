// Unified handling of navigation bar display based on login status
document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const publishLink = document.querySelector('a[href="publish.html"]');
    const loginLink = document.querySelector('a[href="login.html"]');
    const registerLink = document.querySelector('a[href="register.html"]');
    const userLink = document.querySelector('a[href="user.html"]');

    // Show/hide navigation links based on login status
    if (loggedInUser) {
        // Logged in: show publish and user center, hide login/register
        publishLink.style.display = 'inline-block';
        userLink.style.display = 'inline-block';
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
    } else {
        // Not logged in: hide publish and user center, show login/register
        publishLink.style.display = 'none';
        userLink.style.display = 'none';
        loginLink.style.display = 'inline-block';
        registerLink.style.display = 'inline-block';
    }
});