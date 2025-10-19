// Verify login status and load article data on page load
document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return;
    }

    // Get article ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));
    const articles = JSON.parse(localStorage.getItem('blogArticles')) || [];
    const targetArticle = articles.find(article => article.id === articleId);

    // Verify article exists and belongs to current user
    if (!targetArticle || targetArticle.author !== loggedInUser.username) {
        alert('Article not found or you do not have permission to edit it.');
        window.location.href = 'user.html';
        return;
    }

    // Populate form data
    document.getElementById('article-id').value = targetArticle.id;
    document.getElementById('edit-title').value = targetArticle.title;
    document.getElementById('edit-category').value = targetArticle.category;
    document.getElementById('edit-content').value = targetArticle.content;

    // Bind form submission event
    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateArticle(articleId);
    });
});

// Update article functionality
function updateArticle(articleId) {
    const articles = JSON.parse(localStorage.getItem('blogArticles')) || [];
    const targetIndex = articles.findIndex(article => article.id === articleId);

    if (targetIndex !== -1) {
        // Update article data (retain original publish time, update content)
        articles[targetIndex] = {
            ...articles[targetIndex], // Copy existing properties
            title: document.getElementById('edit-title').value.trim(),
            category: document.getElementById('edit-category').value,
            content: document.getElementById('edit-content').value.trim(),
            updateTime: new Date().toLocaleString() // Add update time
        };

        // Save updated article list
        localStorage.setItem('blogArticles', JSON.stringify(articles));
        alert('Article updated successfully!');
        window.location.href = 'user.html';
    }
}