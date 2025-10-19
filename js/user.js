// Verify login status on page load
document.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Please login first!');
        window.location.href = 'login.html';
        return;
    }

    // Display username
    document.getElementById('username-display').textContent = loggedInUser.username;

    // Load articles published by the user
    loadUserArticles(loggedInUser.username);

    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        alert('Logout successful!');
        window.location.href = 'index.html';
    });
});

// Load user's published articles
function loadUserArticles(username) {
    const articles = JSON.parse(localStorage.getItem('blogArticles')) || [];
    const userArticles = articles.filter(article => article.author === username);
    const articlesList = document.getElementById('my-articles-list');

    if (userArticles.length === 0) {
        articlesList.innerHTML = '<p>No articles published yet.</p>';
        return;
    }

    // Render user's article list (with edit/delete buttons)
    userArticles.forEach(article => {
        const articleCard = `
            <div class="post-card" data-id="${article.id}">
                <h3>${article.title}</h3>
                <p class="post-meta">${article.category} | ${article.publishTime}</p>
                <p class="post-excerpt">${article.content.length > 150 ? article.content.slice(0, 150) + '...' : article.content}</p>
                <div class="article-action">
                    <a href="edit.html?id=${article.id}" class="edit-link">Edit</a>
                    <button class="delete-btn" data-id="${article.id}">Delete</button>
                </div>
            </div>
        `;
        articlesList.innerHTML += articleCard;
    });

    // Bind delete button events
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const articleId = parseInt(this.getAttribute('data-id'));
            if (confirm('Are you sure to delete this article?')) {
                deleteArticle(articleId);
            }
        });
    });
}

// Delete article functionality
function deleteArticle(articleId) {
    let articles = JSON.parse(localStorage.getItem('blogArticles')) || [];
    // Filter out the article to be deleted
    articles = articles.filter(article => article.id !== articleId);
    // Save updated article list
    localStorage.setItem('blogArticles', JSON.stringify(articles));
    // Reload the list
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    loadUserArticles(loggedInUser.username);
}