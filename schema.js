/**
 * Adds schema.org JSON-LD structured data to blog posts
 * This helps search engines better understand your content
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a blog post page
  const isPostPage = document.querySelector('article .post-title') !== null;
  
  if (isPostPage) {
    // Extract post information
    const postTitle = document.querySelector('.post-title').innerText;
    const postDate = document.querySelector('.post-date').innerText;
    const postUrl = window.location.href;
    const metaDesc = document.querySelector('meta[name="description"]').getAttribute('content');
    const ogImage = document.querySelector('meta[property="og:image"]').getAttribute('content');
    const authorName = document.querySelector('meta[name="author"]').getAttribute('content');
    
    // Format date for schema (needs ISO format)
    const datePublished = formatDateForSchema(postDate);
    
    // Create the JSON-LD structured data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": postTitle,
      "description": metaDesc,
      "image": ogImage,
      "url": postUrl,
      "datePublished": datePublished,
      "dateModified": datePublished,
      "author": {
        "@type": "Person",
        "name": authorName
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kazedev",
        "logo": {
          "@type": "ImageObject",
          "url": "https://kazedev.site/kazedev_pfp.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": postUrl
      }
    };
    
    // Add the structured data to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);
  } else if (window.location.pathname.endsWith('blog.html')) {
    // Add BlogSite schema for the blog listing page
    const blogSchema = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "url": window.location.href,
      "name": "Kazedev Blog",
      "description": document.querySelector('meta[name="description"]').getAttribute('content'),
      "publisher": {
        "@type": "Organization",
        "name": "Kazedev",
        "logo": {
          "@type": "ImageObject",
          "url": "https://kazedev.site/kazedev_pfp.png"
        }
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(blogSchema);
    document.head.appendChild(script);
  } else if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
    // Add WebSite schema for the homepage
    const siteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": window.location.origin,
      "name": "Kazedev",
      "description": document.querySelector('meta[name="description"]').getAttribute('content'),
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://kazedev.site/blog.html?s={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(siteSchema);
    document.head.appendChild(script);
  }
});

/**
 * Convert a date string like "April 30, 2025" to ISO format
 */
function formatDateForSchema(dateString) {
  const months = {
    'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
    'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
  };
  
  // Parse the date string
  const parts = dateString.match(/(\w+)\s+(\d+),\s+(\d+)/);
  if (!parts) return new Date().toISOString();
  
  const month = months[parts[1]];
  const day = parseInt(parts[2], 10);
  const year = parseInt(parts[3], 10);
  
  // Create a date object and convert to ISO
  const date = new Date(year, month, day);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
}
