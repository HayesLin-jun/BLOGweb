// Protect publish page: redirect if not logged in
document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Please login first to publish articles!');
        window.location.href = 'login.html';
    }

    // Publish form submission logic
    document.getElementById('publishForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const title = document.getElementById('article-title').value.trim();
        const category = document.getElementById('article-category').value;
        const content = document.getElementById('article-content').value.trim();
        const author = JSON.parse(loggedInUser).username;
        const publishTime = new Date().toLocaleString(); // Current time

        // Create article object
        const newArticle = {
            id: Date.now(), // Unique ID using timestamp
            title: title,
            category: category,
            content: content,
            author: author,
            publishTime: publishTime
        };

        // Get existing articles from localStorage (or empty array)
        const articles = JSON.parse(localStorage.getItem('blogArticles')) || [];
        articles.unshift(newArticle); // Add new article to the front

        // Save back to localStorage
        localStorage.setItem('blogArticles', JSON.stringify(articles));

        // Success feedback and redirect
        alert('Article published successfully!');
        window.location.href = 'index.html';
    });
});