// Load published articles to homepage
document.addEventListener('DOMContentLoaded', function() {
    // Update navigation: show/hide publish link based on login status
    const loggedInUser = localStorage.getItem('loggedInUser');
    const publishLink = document.querySelector('.publish-link');
    if (loggedInUser) {
        publishLink.style.display = 'inline-block';
    }

    // Load articles from localStorage
    const articles = JSON.parse(localStorage.getItem('blogArticles')) || [];
    const blogList = document.querySelector('.blog-list');

    // If no articles, show default message
    if (articles.length === 0) {
        blogList.innerHTML += `
            <div class="post-card">
                <h3>No Articles Yet</h3>
                <p class="post-excerpt">Be the first to publish an article!</p>
            </div>
        `;
        return;
    }

    // Render articles to homepage
    articles.forEach(article => {
        const articleCard = `
            <div class="post-card" data-id="${article.id}">
                <h3>${article.title}</h3>
                <p class="post-meta">By ${article.author} | ${article.category} | ${article.publishTime}</p>
                <p class="post-excerpt">${article.content.length > 150 ? article.content.slice(0, 150) + '...' : article.content}</p>
                <a href="post.html?id=${article.id}" class="read-more">Read More</a>
            </div>
        `;
        blogList.innerHTML += articleCard;
    });
});