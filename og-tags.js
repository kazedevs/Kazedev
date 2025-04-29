/**
 * OG-Tags.js - Dynamically generates Open Graph meta tags for Kazedev blog posts
 * 
 * This script should be included in the blog post template to automatically 
 * generate proper meta tags for social media sharing.
 */

// Function to update or create OG meta tags for a blog post
function setupOGTags() {
  // Get current page URL, title, and content
  const currentUrl = window.location.href;
  const pageTitle = document.title || 'Kazedev';
  const metaDescription = document.querySelector('meta[name="description"]')?.content || 
    'Kaze personal blog website - programming, life, and everything in between';
  
  // Default image (use profile pic if no post-specific image is available)
  const defaultImagePath = '../kaze_pfp.jpg';
  
  // Try to find a post image in the article (could be enhanced to look for specific class)
  const articleImage = document.querySelector('article img');
  const imagePath = articleImage ? articleImage.src : defaultImagePath;
  
  // Create or update OG meta tags
  updateMetaTag('og:type', 'article');
  updateMetaTag('og:url', currentUrl);
  updateMetaTag('og:title', pageTitle);
  updateMetaTag('og:description', metaDescription);
  updateMetaTag('og:image', makeAbsoluteUrl(imagePath));
  
  // Create or update Twitter meta tags
  updateMetaTag('twitter:card', 'summary_large_image', 'name');
  updateMetaTag('twitter:title', pageTitle, 'name');
  updateMetaTag('twitter:description', metaDescription, 'name');
  updateMetaTag('twitter:image', makeAbsoluteUrl(imagePath), 'name');
}

// Helper function to update or create meta tags
function updateMetaTag(property, content, attributeName = 'property') {
  let metaTag = document.querySelector(`meta[${attributeName}="${property}"]`);
  
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attributeName, property);
    document.head.appendChild(metaTag);
  }
  
  metaTag.setAttribute('content', content);
}

// Helper to ensure all image URLs are absolute
function makeAbsoluteUrl(url) {
  // If URL is already absolute, return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Base domain - replace with your actual domain in production
  const baseDomain = 'https://kazedev.site';
  
  // Create absolute URL
  if (url.startsWith('/')) {
    return `${baseDomain}${url}`;
  } else {
    // Handle relative paths
    const currentPath = window.location.pathname.split('/').slice(0, -1).join('/');
    return `${baseDomain}${currentPath}/${url}`;
  }
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupOGTags);
