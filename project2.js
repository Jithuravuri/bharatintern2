document.addEventListener('DOMContentLoaded', function() {
    fetchBlogPosts();
    
    const blogForm = document.getElementById('blog-form');
    blogForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        
        if (title && content) {
            const data = { title, content };
            
            fetch('/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error creating post.');
            })
            .then(post => {
                console.log('Post created:', post);
                fetchBlogPosts();
                blogForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert('Please enter both title and content.');
        }
    });
});

function fetchBlogPosts() {
    fetch('/posts')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error fetching posts.');
    })
    .then(posts => {
        const blogPostsContainer = document.getElementById('blog-posts');
        blogPostsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
            `;
            blogPostsContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}