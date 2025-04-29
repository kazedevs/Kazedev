/**
 * Share Button Functionality for Kazedev Blog
 * Provides a simple way to share blog posts to social media
 */

// Initialize share buttons once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the article URL and title for sharing
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);
  
  // Set up click handlers for each share button
  const shareButtons = document.querySelectorAll('.share-button');
  
  shareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const type = this.getAttribute('data-share-type');
      let shareUrl = '';
      
      // Define share URLs for different platforms
      switch(type) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
          break;
        case 'copy':
          // Copy URL to clipboard
          navigator.clipboard.writeText(window.location.href)
            .then(() => {
              // Show a small tooltip/notification to indicate successful copy
              const tooltip = document.createElement('span');
              tooltip.className = 'copy-tooltip';
              tooltip.textContent = 'URL copied!';
              tooltip.style.position = 'absolute';
              tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
              tooltip.style.color = 'white';
              tooltip.style.padding = '5px 10px';
              tooltip.style.borderRadius = '3px';
              tooltip.style.fontSize = '12px';
              tooltip.style.zIndex = '1000';
              tooltip.style.transition = 'opacity 0.3s ease';
              
              // Position the tooltip
              const rect = this.getBoundingClientRect();
              tooltip.style.top = `${rect.top - 30}px`;
              tooltip.style.left = `${rect.left - 20}px`;
              
              document.body.appendChild(tooltip);
              
              // Remove the tooltip after 2 seconds
              setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                  document.body.removeChild(tooltip);
                }, 300);
              }, 2000);
            })
            .catch(err => {
              console.error('Failed to copy: ', err);
            });
          return;
        default:
          return;
      }
      
      // Open share dialog in a new window
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });
});
