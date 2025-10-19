// Get article ID from URL and load detail
document.addEventListener('DOMContentLoaded', function() {
    // Update navigation (show publish link if logged in)
    const loggedInUser = localStorage.getItem('loggedInUser');
    const publishLink = document.querySelector('.publish-link');
    if (loggedInUser) {
        publishLink.style.display = 'inline-block';
    }

    // Get article ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = parseInt(urlParams.get('id'));
    const articles = JSON.parse(localStorage.getItem('blogArticles')) || [];

    // Find the target article
    const targetArticle = articles.find(article => article.id === articleId);

    // If article not found, show error
    if (!targetArticle) {
        document.getElementById('post-title').textContent = 'Article Not Found';
        document.getElementById('post-content').textContent = 'The article you are looking for does not exist or has been deleted.';
        return;
    }

    // Render article detail
    document.getElementById('post-title').textContent = targetArticle.title;
    document.getElementById('post-meta').textContent = `By ${targetArticle.author} | ${targetArticle.category} | ${targetArticle.publishTime}`;
    document.getElementById('post-content').textContent = targetArticle.content;
});