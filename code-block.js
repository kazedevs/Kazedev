/**
 * Multi-language code block highlighter for Kazedev blog
 * Automatically detects language and applies syntax highlighting
 */

// Language detection function
function detectLanguage(code) {
  // Python detection
  if (code.match(/\b(import|from|def|class)\b/) || 
      code.includes('print(') || 
      code.match(/\bself\./) || 
      code.match(/\s{2,}#/)) {
    return {
      language: 'python',
      displayName: 'Python'
    };
  }
  
  // JavaScript detection
  if (code.match(/\b(function|const|let|var|=>)\b/) || 
      code.includes('document.') || 
      code.includes('console.log') ||
      code.match(/\$\(.*\)/) ||
      code.match(/\{.*:.*\}/)) {
    return {
      language: 'javascript',
      displayName: 'JavaScript'
    };
  }
  
  // HTML detection
  if (code.includes('<!DOCTYPE') || 
      code.includes('<html') || 
      code.match(/<\/?[a-z][^>]*>/i)) {
    return {
      language: 'html',
      displayName: 'HTML'
    };
  }
  
  // CSS detection
  if (code.match(/[.#]?[a-z0-9_-]+\s*\{[^\}]*\}/i) || 
      code.includes('margin:') || 
      code.includes('padding:') ||
      code.match(/@media/)) {
    return {
      language: 'css',
      displayName: 'CSS'
    };
  }
  
  // Bash/Shell detection
  if (code.match(/\b(sudo|apt|cd|ls|mkdir|rm|curl|wget)\b/) || 
      code.includes('#!/bin/') ||
      code.match(/\$\s/)) {
    return {
      language: 'bash',
      displayName: 'Shell'
    };
  }
  
  // Markdown detection
  if (code.match(/^#+\s/) ||
      code.match(/\*\*.*\*\*/) ||
      code.match(/\[.*\]\(.*\)/)) {
    return {
      language: 'markdown',
      displayName: 'Markdown'
    };
  }
  
  // Default to plain text
  return {
    language: 'text',
    displayName: 'Plain Text'
  };
}

// Syntax highlighting function
function highlightSyntax(code, language) {
  // First escape HTML to prevent XSS
  let escapedCode = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Apply appropriate highlighting based on detected language
  switch (language) {
    case 'python':
      return escapedCode
        // Keywords
        .replace(/\b(import|from|class|def|self|if|else|elif|for|while|return|in|is|not|and|or|True|False|None|try|except|finally|raise|with|as|assert|break|continue|global|lambda|nonlocal|pass|yield)\b/g, 
                 '<span class="keyword">$1</span>')
        // Decorators
        .replace(/(@\w+)/g, '<span class="decorator">$1</span>')
        // Strings
        .replace(/(['"])(?:(?!\1).|\\.)*?\1/g, function(match) {
          return '<span class="string">' + match + '</span>';
        })
        // Multi-line strings
        .replace(/("""|''')(?:[\s\S]*?)\1/g, function(match) {
          return '<span class="string">' + match + '</span>';
        })
        // Functions
        .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(')
        // Classes
        .replace(/\bclass\s+([a-zA-Z_][a-zA-Z0-9_]*)/g, 'class <span class="class">$1</span>')
        // Numbers
        .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>')
        // Comments
        .replace(/(#.*)$/gm, '<span class="comment">$1</span>');
      
    case 'javascript':
      return escapedCode
        // Keywords
        .replace(/\b(function|const|let|var|if|else|for|while|do|switch|case|break|continue|return|new|this|class|extends|super|import|export|from|as|async|await|try|catch|finally|throw|typeof|instanceof|in|of|delete|void|yield)\b/g, 
                 '<span class="keyword">$1</span>')
        // Strings
        .replace(/(['"`])(?:(?!\1).|\\.)*?\1/g, function(match) {
          return '<span class="string">' + match + '</span>';
        })
        // Template literals with proper nesting
        .replace(/(`[^`]*`)/g, function(match) {
          return '<span class="string">' + match + '</span>';
        })
        // Functions
        .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(')
        // Classes
        .replace(/\bclass\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g, 'class <span class="class">$1</span>')
        // Numbers
        .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="number">$1</span>')
        // Booleans
        .replace(/\b(true|false)\b/g, '<span class="boolean">$1</span>')
        // Comments (single-line and multi-line)
        .replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
        // Regular expressions
        .replace(/(\/(?:[^\/\\]|\\.)*\/[gimuy]*)/g, '<span class="regex">$1</span>');
      
    case 'html':
      return escapedCode
        // Tags
        .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9-]*)(?=[^>]*&gt;)/g, '$1<span class="tag-name">$2</span>')
        // Attributes
        .replace(/\s([a-zA-Z][a-zA-Z0-9-]*)(?==)/g, ' <span class="attribute-name">$1</span>')
        // Doctype
        .replace(/(&lt;!DOCTYPE[^&]*&gt;)/gi, '<span class="doctype">$1</span>')
        // Comments
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="comment">$1</span>')
        // Strings
        .replace(/=("|')(?:(?!\1).|\\.)*?\1/g, function(match) {
          return '=<span class="string">' + match.substring(1) + '</span>';
        });
      
    case 'css':
      return escapedCode
        // Selectors
        .replace(/([\w.#][-_\w\d.#:]+)\s*(?=\{)/g, '<span class="selector">$1</span>')
        // Properties
        .replace(/(\s*)([-_a-zA-Z][-_a-zA-Z0-9]*\s*)(?=:)/g, '$1<span class="property">$2</span>')
        // Values
        .replace(/(:(?:.*?);)/g, function(match) {
          return ':<span class="value">' + match.substring(1, match.length-1) + '</span>;';
        })
        // Units
        .replace(/(\d+)(px|em|rem|%|vh|vw|s|ms|deg)/g, '<span class="number">$1</span><span class="unit">$2</span>')
        // Colors
        .replace(/(#[0-9a-fA-F]{3,8})/g, '<span class="color">$1</span>')
        // At-rules
        .replace(/(@[a-zA-Z]+\b)/g, '<span class="keyword">$1</span>')
        // Comments
        .replace(/(\/*[^/]*\*\/)/g, '<span class="comment">$1</span>');
      
    case 'bash':
      return escapedCode
        // Command names
        .replace(/^\s*(\w+)\b/gm, '<span class="function">$1</span>')
        // Options/flags
        .replace(/\s-{1,2}[\w-]+/g, '<span class="keyword">$&</span>')
        // Variables
        .replace(/\$\w+/g, '<span class="variable">$&</span>')
        // Strings
        .replace(/(['"])(?:(?!\1).|\\.)*?\1/g, '<span class="string">$&</span>')
        // Comments
        .replace(/(#.*)$/gm, '<span class="comment">$1</span>');
      
    case 'markdown':
      return escapedCode
        // Headers
        .replace(/^(#+)\s+(.*)$/gm, '<span class="keyword">$1</span> <span class="header">$2</span>')
        // Bold
        .replace(/(\*\*|__)(?:(?!\1).)*?\1/g, '<span class="bold">$&</span>')
        // Italic
        .replace(/([*_])(?:(?!\1).)*?\1/g, '<span class="italic">$&</span>')
        // Links
        .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '[<span class="link">$1</span>](<span class="string">$2</span>)')
        // Code blocks
        .replace(/(`{1,3})([^`]+)\1/g, '<span class="code">$1$2$1</span>')
        // Lists
        .replace(/^(\s*[-*+]|\d+\.)\s/gm, '<span class="keyword">$&</span>');
    
    default:
      // For plain text or unrecognized languages, return escaped code without highlighting
      return escapedCode;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Find all pre > code elements and enhance them
  const codeBlocks = document.querySelectorAll('pre > code');
  
  codeBlocks.forEach(function(codeBlock, index) {
    const content = codeBlock.textContent;
    
    // Create container
    const container = document.createElement('div');
    container.className = 'code-block-container';
    
    // Create header with copy button
    const header = document.createElement('div');
    header.className = 'code-block-header';
    
    // Detect the language
    const langInfo = detectLanguage(content);
    
    // Create language label
    const languageLabel = document.createElement('span');
    languageLabel.className = 'language-label';
    languageLabel.textContent = langInfo.displayName;
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.setAttribute('data-index', index);
    copyButton.setAttribute('aria-label', 'Copy code');
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span class="copy-text">Copy</span>
    `;
    
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    
    // Add event listener to copy button
    copyButton.addEventListener('click', function() {
      // Fallback for browsers that don't support clipboard API
      if (!navigator.clipboard) {
        const textArea = document.createElement('textarea');
        textArea.value = content;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          showCopiedFeedback();
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
        
        document.body.removeChild(textArea);
        return;
      }
      
      // Modern clipboard API
      navigator.clipboard.writeText(content).then(function() {
        showCopiedFeedback();
      }).catch(function(err) {
        console.error('Failed to copy: ', err);
      });
    });
    
    function showCopiedFeedback() {
      // Temporary feedback
      const originalText = copyButton.innerHTML;
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="copy-text">Copied!</span>
      `;
      
      // On mobile, show a toast notification
      if (isMobile) {
        const toast = document.createElement('div');
        toast.className = 'copy-toast';
        toast.textContent = 'Code copied!';
        document.body.appendChild(toast);
        
        // Fade in
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Fade out and remove
        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => document.body.removeChild(toast), 300);
        }, 1500);
      }
      
      setTimeout(function() {
        copyButton.innerHTML = originalText;
      }, 2000);
    }
    
    // Add elements to container in right order
    header.appendChild(languageLabel);
    header.appendChild(copyButton);
    container.appendChild(header);
    
    // Apply language class to the code element
    codeBlock.parentNode.className += ` ${langInfo.language}-code`;
    
    // Apply syntax highlighting based on detected language
    codeBlock.innerHTML = highlightSyntax(content, langInfo.language);
    
    // Replace the pre element with our enhanced container
    const pre = codeBlock.parentNode;
    container.appendChild(pre.cloneNode(true));
    pre.parentNode.replaceChild(container, pre);
  });
  
  // Add toast styling to the document if it doesn't exist
  if (!document.getElementById('toast-styles')) {
    const toastStyles = document.createElement('style');
    toastStyles.id = 'toast-styles';
    toastStyles.textContent = `
      .copy-toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
        z-index: 1000;
      }
      
      .dark-theme .copy-toast {
        background-color: rgba(255, 255, 255, 0.8);
        color: black;
      }
      
      .copy-toast.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    `;
    document.head.appendChild(toastStyles);
  }
  
  // Add responsive styles for mobile
  window.addEventListener('resize', function() {
    const isMobile = window.innerWidth < 768;
    const copyTextElements = document.querySelectorAll('.copy-text');
    
    if (isMobile) {
      copyTextElements.forEach(el => el.style.display = 'none');
    } else {
      copyTextElements.forEach(el => el.style.display = 'inline');
    }
  });
  
  // Initial call to set correct display for copy text
  if (window.innerWidth < 768) {
    document.querySelectorAll('.copy-text').forEach(el => el.style.display = 'none');
  }
});
