// Function to create a post card
function createPostCard(post) {
  return `
    <div class="post-card">
      <h3 class="post-title"><a href="${post.link}" class="post-title-link">${post.title}</a></h3>
      <p class="post-excerpt">${post.excerpt}</p>
      <div class="post-meta">
        <span class="post-date">${post.date}</span>
        <a href="${post.link}" class="read-more" target="_blank" rel="noopener noreferrer">Read More →</a>
      </div>
    </div>
  `;
}

// Function to display the featured post
function displayFeaturedPost() {
  const featuredPostContainer = document.querySelector(
    ".featured-post .post-card"
  );
  if (!featuredPostContainer) return;

  const latestPost = getLatestPost();
  if (!latestPost) {
    featuredPostContainer.innerHTML = "<p>No posts available</p>";
    return;
  }

  featuredPostContainer.outerHTML = createPostCard(latestPost);
}

// Display the featured post when the page loads
document.addEventListener("DOMContentLoaded", displayFeaturedPost);
