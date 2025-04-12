// Function to create a blog post card
function createPostCard(post) {
  return `
        <div class="post-card">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-excerpt">${post.excerpt}</p>
            <div class="post-meta">
                <span class="post-date">${post.date}</span>
                <a href="${post.link}" class="read-more" target="_blank" rel="noopener noreferrer">Read More →</a>
            </div>
        </div>
    `;
}

// Function to display all blog posts
function displayAllPosts() {
  const postsContainer = document.getElementById("posts-container");

  // Clear the container
  postsContainer.innerHTML = "";

  // Add each post to the container
  blogPosts.forEach((post) => {
    postsContainer.innerHTML += createPostCard(post);
  });
}

// Display all posts when the page loads
document.addEventListener("DOMContentLoaded", displayAllPosts);
